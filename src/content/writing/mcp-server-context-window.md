## The empty chat that wasn't empty

I connected a handful of MCP servers to my agent, typed "hi", and paid for tens of thousands of tokens before the model said a word. Nothing was broken. That is just what MCP does by default: every tool from every connected server gets described to the model, in full, on every single turn.

So I set out to measure it. In this post we are going to look at where those tokens go, what the published numbers say, build a small TypeScript script that measures the "tool tax" of your own setup, and then walk through the fixes, ranked from five minutes of work to a change in architecture.

(If you only have one MCP server with three tools, you can stop here and go outside. This post is for the rest of us, the ones who connected GitHub, Jira, Slack and a filesystem server "just to try it".)

## What actually gets sent

**Every tool is a little resume the model has to read before every turn.** When an MCP client connects to a server, it calls `tools/list` and gets back each tool's name, a natural language description, and a JSON Schema for its inputs. Most clients then paste all of that into the model's context, up front, for every request.

The flow looks like this:

1. The client connects to N servers and calls `tools/list` on each.
2. It merges every definition into one big `tools` array.
3. That array rides along with every API call, whether the user asks about GitHub or about lunch.
4. Tool results come back into the same context, so a big response gets paid for again on the next turn.

Anthropic's engineering team names the same two problems: [tool definitions overload the context window, and intermediate tool results consume additional tokens](https://www.anthropic.com/research/code-execution-with-mcp). Their example: a 2-hour meeting transcript copied from Google Drive into Salesforce flows through the model twice, which can add about 50,000 tokens.

The analogy I keep coming back to is a restaurant that reads you the entire menu, including the wine list, every time you ask for water. The waiter is not wrong, exactly. Just expensive.

One more detail that matters: the cost repeats. Tool definitions are billed as input tokens on every request, so a 20 turn conversation pays for the same menu 20 times. Prompt caching softens the price but not the space, because cached tokens still occupy the window.

## The numbers

**Five ordinary servers cost about 55,000 tokens before anyone types anything.** That figure is not mine. It comes from Anthropic's [advanced tool use post](https://www.anthropic.com/research/advanced-tool-use), which breaks down a realistic five server setup. I added the last column by dividing their totals.

| Server | Tools | Definition tokens (approx.) | Tokens per tool (my division) |
| --- | --- | --- | --- |
| GitHub | 35 | 26,000 | \~743 |
| Slack | 11 | 21,000 | \~1,909 |
| Jira | not stated | 17,000 | n/a |
| Splunk | 2 | 2,000 | \~1,000 |
| Sentry | 5 | 3,000 | \~600 |
| Grafana | 5 | 3,000 | \~600 |

The first five rows add up to 58 tools and roughly 55K tokens. Add Jira and you are past 70K. The same post says Anthropic has internally [seen tool definitions reach 134K tokens before optimization](https://www.anthropic.com/research/advanced-tool-use), which is most of a 200K window spent on describing tools rather than using them.

Two things jump out of that table:

1. **Tool count is a bad proxy for cost.** Slack has a third of GitHub's tools but costs 81% as much. Per tool, a Slack definition is about 2.6X a GitHub one. Long descriptions and deep schemas matter more than how many tools you have.
2. **It's additive and nobody owns the total.** Each server author made reasonable choices. The bill only exists at the client, where the servers meet.

This is not just a lab curiosity either. In September 2026, storage vendor Komprise launched a product pitched explicitly at "MCP bloat", describing it as [agents overloaded with tool definitions from nearly every vendor, leading to lower accuracy, slower performance and higher costs](https://www.blocksandfiles.com/file/2026/09/30/komprise-fights-model-context-protocol-bloat/5300005). When vendors start selling the cure, you can be fairly sure the disease is real. (Their fix is, of course, another MCP server. Hah.)

## Build it: measure your own tool tax

**Published numbers are someone else's setup. Here is how to get yours in about 60 lines of TypeScript.** The trick is simple: ask the API to count tokens for a request with no tools, then for the same request with one tool, and subtract. Whatever is left is what that tool costs you on every turn.

The script reads the same `mcpServers` config format that Claude Desktop and most clients use, connects to each server over stdio, lists its tools, and prices them.

```bash
npm i @modelcontextprotocol/sdk @anthropic-ai/sdk
export ANTHROPIC_API_KEY=...
export MODEL=claude-sonnet-5-5
npx tsx tool-tax.ts ./mcp-config.json
```

```typescript
// tool-tax.ts
// Measures how many input tokens each MCP tool adds to every request.
import { readFileSync } from "node:fs";
import Anthropic from "@anthropic-ai/sdk";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const anthropic = new Anthropic();
const model = process.env.MODEL!;
const messages = [{ role: "user" as const, content: "hi" }];

// Token count for "hi" plus the given tools.
async function count(tools: Anthropic.Tool[] = []) {
  const res = await anthropic.messages.countTokens({ model, messages, tools });
  return res.input_tokens;
}

const config = JSON.parse(readFileSync(process.argv[2], "utf8"));
const baseline = await count();
const all: { server: string; tool: string; tokens: number }[] = [];

for (const [name, cfg] of Object.entries<any>(config.mcpServers)) {
  const client = new Client({ name: "tool-tax", version: "1.0.0" });
  await client.connect(new StdioClientTransport(cfg));
  const { tools } = await client.listTools();

  for (const t of tools) {
    // MCP calls it inputSchema, the Anthropic API calls it input_schema.
    const def = { name: t.name, description: t.description ?? "", input_schema: t.inputSchema as any };
    all.push({ server: name, tool: t.name, tokens: (await count([def])) - baseline });
  }
  await client.close();
}

// Per server totals, biggest first.
const byServer = new Map<string, { tools: number; tokens: number }>();
for (const r of all) {
  const s = byServer.get(r.server) ?? { tools: 0, tokens: 0 };
  byServer.set(r.server, { tools: s.tools + 1, tokens: s.tokens + r.tokens });
}
console.table([...byServer].sort((a, b) => b[1].tokens - a[1].tokens)
  .map(([server, s]) => ({ server, ...s, perTool: Math.round(s.tokens / s.tools) })));

// The ten fattest tools, usually where the easy wins are.
console.table(all.sort((a, b) => b.tokens - a.tokens).slice(0, 10));
console.log("Total tool tax per request:", all.reduce((n, r) => n + r.tokens, 0));
```

A few honest caveats about this measurement:

- **Per tool counts slightly overstate the sum.** The API wraps the tools array in some fixed scaffolding, so a single tool carries a share of that overhead. If you want the exact total, also call `count()` once with every tool at once. I suspect the gap is a few hundred tokens, but measure it rather than trust me.
- **Token counts are model specific.** Different models use different tokenizers, so run it against the model you actually ship with.
- **The SDKs move fast.** MCP shipped its biggest spec rewrite in July 2026, so pin your versions and check the import paths if something has shifted.

**My numbers:** \[run `tool-tax.ts` on my own setup and paste the two tables here\]

## It's not just the bill

**The bigger cost is that a crowded context makes the model worse at picking the right tool.** If this were only about money, prompt caching would mostly solve it and I would not be writing this. It's about attention.

Three facts, all from Anthropic's own engineering posts:

1. **Context rot is real.** As the token count grows, [a model's ability to accurately recall information from its context decreases](https://www.anthropic.com/research/effective-context-engineering-for-ai-agents), and this shows up across all models. They frame it as an "attention budget": every token you add draws it down a little.
2. **The common failures are selection failures.** Anthropic reports that [the most common failures are wrong tool selection and incorrect parameters](https://www.anthropic.com/research/advanced-tool-use), especially with near duplicate names like `notification-send-user` and `notification-send-channel`.
3. **Fewer visible tools measurably helps.** On MCP evaluations with large tool libraries, letting the model search for tools instead of seeing all of them [took Opus 4 from 49% to 74% and Opus 4.5 from 79.5% to 88.1%](https://www.anthropic.com/research/advanced-tool-use).

That third number is the one I find wild. Same model, same tools available, 25 points of accuracy just from not showing it everything at once. It's the difference between finding a book in a library with a catalog and finding it in a library where every book is open on one giant table.

Anthropic's context engineering post has a line I would tape to every MCP server author's monitor: [if a human engineer can't say which tool should be used in a given situation, an agent can't be expected to do better](https://www.anthropic.com/research/effective-context-engineering-for-ai-agents). If your GitHub server and your Jira server both have a `search_issues` tool, the model is going to have a confusing afternoon.

## The fixes, ranked by effort

**Most setups can cut the tool tax by more than 80% without writing a new server.** Here is the ladder, cheapest rung first. Run the script before and after each step, otherwise you are just vibing.

| Fix | Effort | Published saving | Trade off |
| --- | --- | --- | --- |
| 1. Disconnect servers you don't use in this project | 5 minutes | Whatever that server costs (Slack alone: \~21K) | You reconnect when you need it |
| 2. Disable unused tools inside a server | 15 minutes | Proportional to what you turn off | Client support varies |
| 3. Trim the fattest descriptions and schemas | An afternoon | Not published; measure it | Too terse hurts selection |
| 4. Tool search with deferred loading | A config change | [\~77K down to \~8.7K, an 85% cut](https://www.anthropic.com/research/advanced-tool-use) | One extra search step per new tool |
| 5. Tools as code, run in a sandbox | A rearchitecture | [150,000 down to 2,000 tokens, 98.7%](https://www.anthropic.com/research/code-execution-with-mcp) | You now operate a code sandbox |

**Rungs 1 to 3: hygiene.** The table in the numbers section already tells you where to look. One Slack server costs about 2.6X Sentry, Grafana and Splunk combined. Per project configs are the easy win: my frontend repo does not need the Splunk server, and my Jenkins work does not need Figma.

For trimming, sort by the script's "fattest tools" table and rewrite the top ten. Anthropic's advice cuts both ways here: tool search [matches against names and descriptions](https://www.anthropic.com/research/advanced-tool-use), so clear beats short. A good rewrite deletes repetition, not meaning.

**Rung 4: stop showing the whole menu.** With tool search, you mark tools with `defer_loading: true` and the model only sees a small search tool plus a few always loaded ones. It searches "github", and only the matching definitions get expanded into context. Anthropic recommends keeping [your three to five most used tools always loaded and deferring the rest](https://www.anthropic.com/research/advanced-tool-use), and says it is worth it once definitions pass 10K tokens or you have 10+ tools. A nice detail: deferred tools stay out of the initial prompt, so prompt caching still works.

**Rung 5: let the model write code instead.** Here each MCP server becomes a folder of typed functions, one file per tool, and the agent reads only the files it needs. Their Google Drive to Salesforce example went from [150,000 tokens to 2,000](https://www.anthropic.com/research/code-execution-with-mcp). Bonus: a 10,000 row spreadsheet can be filtered in the sandbox, so the model sees 5 rows instead of all of them. The cost is real though. You are now running agent written code, which [needs sandboxing, resource limits and monitoring](https://www.anthropic.com/research/code-execution-with-mcp). As someone who maintains Jenkins agents for a living, I can confirm "just run the code somewhere safe" is a sentence that hides a whole quarter of work.

A related trick for the results side of the problem: Programmatic Tool Calling keeps intermediate results inside the code environment. On complex research tasks it cut average usage [from 43,588 to 27,297 tokens, about 37%](https://www.anthropic.com/research/advanced-tool-use).

## Reflections, and where this is going

**The surprising part is that nobody did anything wrong.** Every server author wrote helpful descriptions. Every client did the simple, correct thing and passed them all along. The bloat only exists in the sum, which is the classic shape of a tragedy of the commons, except the commons is your context window and the cows are JSON Schemas.

What was easier than I expected: measuring it. Token counting endpoints make this a 60 line script, and I suspect most people have simply never looked. What is harder than it looks: trimming. Cut a description too far and you save 300 tokens but lose the one sentence that told the model *when not* to use the tool.

The pressure is only going up. The MCP SDKs [passed 400M monthly downloads, a 4X increase this year](https://claude.com/resources/articles/bringing-mcp-2026-07-28-to-claude), and Claude's connectors directory alone lists over 950 servers. The July 2026 spec went stateless so servers can live on serverless and edge infrastructure, which means spinning up yet another server just got cheaper. More servers, cheaper to run, all describing themselves to the same finite window.

So here is my bet. In a year or two, "load every tool up front" will look the way `SELECT *` on a production table looks today: technically fine, quietly expensive, and a little embarrassing in code review. Tool search becomes the default, servers ship with a tiny always on surface and a long deferred tail, and someone builds the `EXPLAIN ANALYZE` for agent context that tells you which tool definitions never earned their tokens.

Until then, run the script. If your empty chat costs more than your actual question, you know where to start.

## Sources

1. Anthropic Engineering, [Introducing advanced tool use on the Claude Developer Platform](https://www.anthropic.com/research/advanced-tool-use), Nov 2025. Five server token breakdown, 134K internal figure, tool search accuracy and the 85% reduction, Programmatic Tool Calling results.
2. Anthropic Engineering, [Code execution with MCP: building more efficient agents](https://www.anthropic.com/research/code-execution-with-mcp), Nov 2025. The two bloat patterns, the 150,000 to 2,000 token example, sandboxing caveats.
3. Anthropic Applied AI, [Effective context engineering for AI agents](https://www.anthropic.com/research/effective-context-engineering-for-ai-agents), Sep 2025. Context rot, the attention budget, bloated tool sets as a common failure mode.
4. Claude, [Bringing MCP 2026-07-28 to Claude](https://claude.com/resources/articles/bringing-mcp-2026-07-28-to-claude), Jul 2026. Stateless core, 400M monthly SDK downloads, 950+ servers in the connectors directory.
5. Blocks and Files, [Komprise fights Model Context Protocol bloat](https://www.blocksandfiles.com/file/2026/09/30/komprise-fights-model-context-protocol-bloat/5300005), Sep 2026. Industry framing of MCP bloat.
