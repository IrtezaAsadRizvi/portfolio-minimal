export interface PostSection {
  heading: string;
  level?: 2 | 3;
  paragraphs?: string[];
  list?: string[];
}

export interface NativePost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  date: string;
  dateLabel: string;
  excerpt: string;
  tldr: string[];
  sections: PostSection[];
}

const POSTS: NativePost[] = [
  {
    slug: "ai-enabled-web-development",
    title: "AI-enabled web development: notes from a year of shipping it",
    metaTitle:
      "AI-enabled web development: notes from a year of shipping it",
    metaDescription:
      "Notes on what 'AI-enabled web development' actually means in 2026, written from inside it: local-first LLM agents, Claude Code plugins, MCP servers, browser-native ML, and what I think the senior full-stack engineer's job actually is now.",
    category: "AI",
    date: "2026-05-03",
    dateLabel: "MAY 2026",
    excerpt:
      "I've been shipping what people are now calling 'AI-enabled web development' for about a year — local-first coding agents on top of Ollama, Claude Code plugins, MCP servers wired into real codebases, ONNX models running in the browser. Here's what's worked, what hasn't, and the loops I keep coming back to.",
    tldr: [
      "AI-enabled web development is the new shape of senior full-stack work — agents in the loop, MCP servers as typed integration surfaces, Claude Code plugins as production tooling.",
      "Browser-native ML (ONNX Runtime, WebGPU) makes a category of privacy-respecting AI features genuinely free in 2026.",
      "The leverage is in narrow, well-scoped agent loops, not 'replace your engineers'. I suspect this is also the part that will age well.",
      "If you're hiring or being hired in 2026, these are the skills I'd test for and demonstrate.",
    ],
    sections: [
      {
        heading: "What I actually mean by AI-enabled web development",
        level: 2,
        paragraphs: [
          "The phrase gets thrown around loosely. The shape I keep landing on, after building the projects this site links to, is something like: large language models, agents, and ML inference wired into both the product you ship and the workflow you ship it with. So a superset of \"add a chatbot to the sidebar.\" The interesting work is at the boundary where LLMs meet typed APIs, structured data, version control, and real users — most of which were already part of being a senior full-stack engineer; the LLM just became another component.",
          "If you're a senior engineer in 2026, this is no longer a side specialty. It's the table-stakes layer on top of Next.js, Node.js, Vue, Nuxt, and the MERN ecosystem. As far as I can tell from hiring conversations and contract pipelines, it's also the differentiating one.",
        ],
      },
      {
        heading: "The four loops that keep showing up",
        level: 2,
        paragraphs: [
          "After a year of shipping AI features into real codebases — both at $work and across the open-source projects I link to from the home page — I keep coming back to the same four loops. Most other patterns I've seen reduce to one of these.",
        ],
      },
      {
        heading: "1. Agent-in-the-codebase (Claude Code, ReAct loops)",
        level: 3,
        paragraphs: [
          "The most universally applicable loop, by a wide margin. Claude Code in the editor and a ReAct loop on a local model both belong to this family — the agent reads files, writes patches, runs tests, and either stops when the task looks done or asks. The trap, which I have walked into more than once, is unscoped use: the agent rewrites three unrelated files because the prompt was ambiguous and you only notice on the PR.",
          "The fix is plugin tooling, not \"don't use the agent.\" claude-human-review hooks Claude Code's pre-edit lifecycle, asks the model to summarize the proposed diff in plain English against the original request, and waits for approve / reject / amend. Reviewing becomes a paragraph instead of a diff hunt. (I built this because I had gotten tired of the diff hunt — yolo it once on a Friday afternoon and you'll see what I mean.)",
          "On the model side, nip is my running experiment in how far a small open-weight model can go with a tight enough loop around it. It's a CLI ReAct agent powered by Gemma over Ollama; tools are validated against a JSON schema before they fire so a hallucinated path can't escape the workspace. I suspect the local-first variant is going to matter a lot more in 2026 than people are pricing in — every customer contract that forbids cloud LLM calls is a forcing function in the same direction.",
        ],
      },
      {
        heading: "2. MCP servers as typed integration surfaces",
        level: 3,
        paragraphs: [
          "The most under-appreciated AI primitive of the year, I think. An MCP (Model Context Protocol) server is just a process that exposes tools, data, and capabilities to an LLM client over a standardized protocol — kind of like a GraphQL endpoint, but for an agent instead of a frontend. Instead of hand-rolling integration prompts (\"here is how to call our database, here is how to update tickets, please don't hallucinate field names\"), you declare a typed tool surface and the agent is constrained to it.",
          "MERN MCP is my worked example. \"Add an Order resource to this app\" turns into a typed tool call that produces a Mongoose schema, an Express route, a React form, and a preview diff to approve before any file changes. The agent literally cannot drift on field names because the server is authoritative about what the field names are. (This is the part where the framework analogy gets useful: a typed surface is to a freeform prompt what GraphQL is to handcrafted REST glue.)",
          "If you're a senior full-stack engineer and you only have time to add one new skill this quarter, I'd add MCP server development. It scales: every team I've worked with has 5–10 internal procedures that would benefit from being typed agent tools instead of tribal knowledge.",
        ],
      },
      {
        heading: "3. Production LLM features in the product",
        level: 3,
        paragraphs: [
          "This is the loop most people picture when they hear \"AI-enabled web development\": shipping LLM-powered features inside the product itself. Summarization, semantic search, transcription, classification, extraction, conversational copilots. The technical questions — embeddings vs. keyword search, structured outputs, streaming, prompt caching, evaluation — are well understood by now, and there are good libraries for most of them.",
          "The harder questions are organizational and they're the ones I keep getting pulled into. Who owns the prompts? How do you regression-test them when the model upgrades and silently drifts? How do you keep p95 under 500ms when the median LLM round-trip is two seconds? These are senior engineering problems dressed up as prompt engineering problems, and they're where most product AI features quietly fail. (I have some war stories.)",
        ],
      },
      {
        heading: "4. Browser-native ML",
        level: 3,
        paragraphs: [
          "ONNX Runtime Web plus WebGPU has quietly made a category of AI features genuinely free in 2026. Things that would have required a hosted GPU even a year ago now run in WebAssembly on commodity laptops — background removal, on-device transcription, semantic search over a user's own documents, light image classification. All shippable from a static page with no server cost and no privacy footnote.",
          "BG Remover AI is my proof point. Open the page, drop in an image, and the segmentation runs entirely in the browser via ONNX. The server's only job is to serve static assets. I built it partly because I wanted a worked example to point at when teams ask whether this is real or research-curiosity (it's real), and partly because every \"free background remover\" site on the open web takes your photo, runs it on a server they control, and quietly retains it. That trade-off is unnecessary now.",
        ],
      },
      {
        heading: "What the senior full-stack engineer actually does in this stack",
        level: 2,
        paragraphs: [
          "Roughly, the work splits three ways. About 40% is still classical web engineering — schemas, APIs, components, performance, deploys, the stuff I was doing at TransMedia and Sheba years before any of this. About 40% is the AI plumbing — agent loops, MCP servers, prompt structure, eval harnesses, observability. The remaining 20% is the new craft, and it's the part that's hardest to test for: deciding when not to add AI, when to keep humans in the loop, when to ship a smaller local model instead of a bigger hosted one.",
          "If you're hiring an AI-enabled full-stack engineer and you only test for prompt cleverness, you'll get a prompt engineer who can't ship. If you only test for React proficiency, you'll get a great React developer who'll bolt a chatbot onto your sidebar and call it AI strategy. The signal you actually want is someone who moves comfortably across all three layers and tells you when each is the wrong tool. That's also, I suspect, what makes this work robust to the next round of model upgrades.",
        ],
      },
      {
        heading: "How I'd evaluate work in this space (hiring or being hired)",
        level: 2,
        list: [
          "Look for production deployments, not demos. Ask what broke after launch.",
          "Ask about evaluation. \"How do you know the prompt regressed?\" separates serious engineers from prompt fiddlers.",
          "Ask about cost. Anyone who's run real LLM features in production has a story about token spend going sideways at 2am.",
          "Ask about boundaries. When did you choose not to use an LLM, and why?",
          "Look for typed integration surfaces — MCP servers, structured tool schemas. Untyped agent prompts age badly, as far as I can tell.",
          "Look for human-in-the-loop discipline. Plugin work like claude-human-review signals someone who has thought about the review surface, not just the generation surface.",
        ],
      },
      {
        heading: "Reflections",
        level: 2,
        paragraphs: [
          "What surprised me most was how much of the leverage came from constraints, not capability. Tighter agent loops with smaller surface areas beat looser loops on bigger models almost every time. Typed tools beat clever prompts. Five hundred lines of guard-railed plugin code beats a thousand lines of \"please don't hallucinate.\"",
          "What was harder than I expected: evaluation. \"Did the prompt get worse?\" is genuinely difficult to answer without a fairly serious harness, and most teams (including ones I respect) don't have one. I think this is going to bite the field over the next year as model providers keep silently rotating versions.",
          "What was easier than I expected: shipping local-first. Gemma on Ollama on a MacBook is, hah, surprisingly competent for narrow refactors and codebase Q&A. I would not have predicted this 12 months ago.",
        ],
      },
      {
        heading: "Looking forward",
        level: 2,
        paragraphs: [
          "The 12-month bet is that the line between \"web developer\" and \"AI engineer\" keeps blurring. Agents become a normal part of the engineering loop the way Git did fifteen years ago. MCP servers become as common as GraphQL endpoints. Browser-native ML eats a chunk of features that currently sit on hosted GPUs.",
          "The 36-month bet, more speculatively: \"AI-enabled web development\" stops being a phrase the way \"JavaScript-enabled web development\" did. It's just web development. The senior engineers who ride that transition well are most likely the ones who already treat agents and MCP servers as normal infrastructure, not a separate practice.",
          "If you're hiring along these lines, or you have an AI-enabled web project that needs someone who's actually shipped Claude Code plugins, MCP servers, and production LLM features in real apps — I'm Irteza, I work remote out of Toronto, and irtezaasad@gmail.com is the fastest way to reach me. The repos in /projects are the receipts.",
        ],
      },
    ],
  },
];

export const nativePosts: Record<string, NativePost> = Object.fromEntries(
  POSTS.map((p) => [p.slug, p]),
);

export const nativePostSlugs = POSTS.map((p) => p.slug);
export const nativePostsList = POSTS;
