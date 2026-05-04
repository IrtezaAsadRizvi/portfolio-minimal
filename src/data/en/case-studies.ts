export interface CaseStudySection {
  heading: string;
  paragraphs: string[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  tagline: string;
  githubUrl: string;
  intro: string;
  sections: CaseStudySection[];
}

const STUDIES: CaseStudy[] = [
  {
    slug: "nip",
    title: "nip - A Local-First ReAct Code Agent",
    metaTitle: "nip: Local-First ReAct Code Agent on Ollama",
    metaDescription:
      "nip is an open-source local-first CLI code agent powered by Gemma on Ollama. A tight ReAct loop with schema-validated tool calls, no cloud, no vendor lock-in. Notes on why I built it and what it taught me.",
    tagline: "Open-source CLI · ReAct agent · Ollama / Gemma",
    githubUrl: "https://github.com/IrtezaAsadRizvi/nip",
    intro:
      "nip is the local-first coding agent I wanted to exist. A small CLI that reads a prompt, plans a sequence of tool calls, and rewrites your codebase the way a careful pair programmer would - without ever sending source code past the firewall. It runs on Ollama with Gemma as the reasoning model and implements a tight ReAct loop with structured, schema-validated tool calls. I built it because every customer contract that forbids cloud LLM calls is, eventually, a forcing function in the same direction, and I wanted to know how far the local-first version could go.",
    sections: [
      {
        heading: "Why I built it",
        paragraphs: [
          "Most LLM coding agents in 2026 still assume a willing connection to a hosted model. That assumption fails the moment your customer's contract forbids it, your repo holds private health data, or you're on a flight (which, hah, is when I tend to want to refactor things). I wanted to know how far a small open-weight model on a laptop could go if the loop around it was sharp enough.",
          "nip is the answer: a tiny ReAct runtime, a clean tool-calling protocol, and a deliberately modest set of filesystem primitives. The intelligence lives in the loop and the prompt - not in cloud capacity.",
        ],
      },
      {
        heading: "How it works",
        paragraphs: [
          "Each iteration: the agent emits a thought, picks a tool (read_file, write_file, list_dir, run_shell, ...), observes the result, repeats. The loop terminates when the model emits a final answer or hits a guard rail. Tool calls are validated against a JSON schema before execution, so a hallucinated path can't escape the workspace.",
          "Gemma on Ollama is, surprisingly, quite competent at this scale - especially for narrow tasks like \"refactor this callback to async/await and add an LRU cache.\" Not as competent as Claude. Not trying to be. The full session is auditable: every thought, tool call, observation, and patch goes to disk so you can replay or revert.",
        ],
      },
      {
        heading: "What I take from it",
        paragraphs: [
          "Local-first agents aren't a downgrade - they're a different point on the curve. For surgical refactors, scaffolding, and codebase Q&A, the gap between Gemma-on-Ollama-with-a-good-loop and a hosted frontier model is much smaller than the marketing on either side will admit. And the local version keeps every byte of source code, secret, and customer data on your machine.",
          "nip is the reference implementation I point at when a team asks whether AI-enabled web development can survive an enterprise security review. As far as I can tell, yes. The harder question is taste - what to give the agent permission to do - and that one is just as hard for the hosted models.",
        ],
      },
    ],
  },
  {
    slug: "claude-human-review",
    title: "claude-human-review - Plain-English Diff Narration for Claude Code",
    metaTitle: "claude-human-review: Plain-English Diff Narration for Claude Code",
    metaDescription:
      "claude-human-review is an open-source Claude Code plugin that narrates every edit the agent makes in plain English so you can approve or undo with full context. Notes on the build and why diff hunts are the wrong review surface.",
    tagline: "Claude Code plugin · Open source · Human-in-the-loop",
    githubUrl: "https://github.com/IrtezaAsadRizvi/claude-human-review",
    intro:
      "claude-human-review is a Claude Code plugin that pauses on every diff and tells you, in plain English, what the agent is about to do. Why it's renaming the function. Why it's deleting the test. Why it touched the migration file. I built it because I love what Claude Code can do in a tight loop, and I do not love the failure mode where it rewrites three unrelated files because the prompt was ambiguous and you only notice on the PR.",
    sections: [
      {
        heading: "Why I built it",
        paragraphs: [
          "I love what Claude Code can do in a tight loop. I do not love the failure mode where the agent rewrites three unrelated files because the prompt was ambiguous and you only notice on the PR. The fix isn't \"don't use the agent\" - it's \"make every edit cheap to review.\"",
          "claude-human-review hooks the plugin lifecycle and emits a short narration before each apply. Reviewing becomes a paragraph of English instead of a diff hunt. (I am, hah, the demographic for this.)",
        ],
      },
      {
        heading: "How it works",
        paragraphs: [
          "The plugin registers a pre-edit hook with Claude Code. When the agent proposes a change, the plugin asks Claude to summarize the diff against the user's original request, surfaces that summary in the terminal, and waits for approve / reject / amend. The narration is structured: what file, what change, why it serves the goal.",
          "The implementation is small on purpose. Most of the value isn't in the code - it's in the discipline it forces. Every edit becomes a checkpoint instead of a silent step in a sequence.",
        ],
      },
      {
        heading: "What I take from it",
        paragraphs: [
          "Human-in-the-loop doesn't have to be friction. With the right narration you can move at agent speed for routine work and slow down only when the explanation doesn't match expectation. That's the right shape of trust for AI agent development on real codebases - and, I suspect, the part of the practice that ages best as the underlying models keep changing.",
        ],
      },
    ],
  },
  {
    slug: "article-writing-skills",
    title: "article-writing-skills - A Style-Transfer Library for LLM Writing",
    metaTitle:
      "article-writing-skills: Voice & Style Skills for Claude, ChatGPT and Gemini",
    metaDescription:
      "An open-source collection of writing prompts and Claude skills modeled on the voices of well-known engineers and researchers. Works with Claude Code, ChatGPT, Gemini, and any LLM - a public testbed for prompt-based style transfer.",
    tagline: "Claude Skills · Prompt library · Style transfer",
    githubUrl: "https://github.com/IrtezaAsadRizvi/article-writing-skills",
    intro:
      "article-writing-skills is a deliberately opinionated prompt library. Each skill takes the rough notes you have and rewrites them in the cadence of a specific engineer or researcher you respect. It runs as a Claude Code skill, but the prompts are LLM-agnostic - drop them into ChatGPT, Gemini, or your own MCP server and you get the same effect. I started it because I wanted to know how far prompt-shaped style transfer could actually go without fine-tuning.",
    sections: [
      {
        heading: "Why I built it",
        paragraphs: [
          "Generic \"professional blog post\" prompts produce generic professional blog posts. I wanted to know how far prompt-shaped style transfer could go without fine-tuning - could a sufficiently detailed system prompt actually impart voice, sentence shape, structural preference?",
          "The library is the public testbed for that experiment.",
        ],
      },
      {
        heading: "How it works",
        paragraphs: [
          "Each skill is a Markdown file with a long system prompt: the writer's stated principles, examples of their cadence, do/don't lists, and structural rules. When you invoke the skill, Claude (or any LLM) loads the prompt as context and rewrites your draft against it.",
          "The skills compose. You can stack a \"voice\" skill on top of an \"argument structure\" skill and get something that reads like the target writer thinking about your topic. (This very page was rewritten with the karpathy-article-writing skill out of the same library - meta, I know.)",
        ],
      },
      {
        heading: "What I take from it",
        paragraphs: [
          "Prompt-shaped style transfer is good enough to be useful in real LLM engineering workflows, more often than I expected. You don't always need a fine-tune - a 600-token system prompt and the right examples will land 80% of the effect for 0% of the training cost. The remaining 20%, I suspect, is where fine-tuning starts to actually matter.",
        ],
      },
    ],
  },
  {
    slug: "mern-mcp",
    title: "MERN MCP - Full-Stack CRUD Scaffolding for AI Agents",
    metaTitle: "MERN MCP: A Model Context Protocol Server for Full-Stack CRUD",
    metaDescription:
      "MERN MCP is an open-source Model Context Protocol server that automates full-stack CRUD scaffolding for MERN apps - Mongoose models, Express routes, React components - with a preview-before-apply workflow that keeps the agent on a leash.",
    tagline: "MCP server · Open source · Full-stack scaffolding",
    githubUrl: "https://github.com/IrtezaAsadRizvi/mern-mcp",
    intro:
      "MERN MCP is a Model Context Protocol server I wrote so my coding agents could do the boring half of full-stack CRUD without me typing it. Point an MCP-aware client at the server, ask it to add an Order resource, and you get the Mongoose schema, the Express route, the React form, and a preview diff to approve before any file actually changes. The agent can't drift on field names, because the server is authoritative about what the field names are.",
    sections: [
      {
        heading: "Why I built it",
        paragraphs: [
          "Eighty percent of MERN feature work is the same shape: model, route, validator, form, list view, detail view. Hand-rolling that shape every time is a tax on real product thinking. Modern code agents will happily write it for you, but they tend to drift - slightly wrong field names, slightly wrong Mongoose conventions, slightly wrong test setup, the kind of subtle wrongness that takes longer to fix than to write from scratch.",
          "An MCP server fixes the drift by making the server authoritative. The schema lives in one place and the agent's tool calls are typed against it.",
        ],
      },
      {
        heading: "How it works",
        paragraphs: [
          "The server exposes tools like generate_model, generate_route, generate_react_form, and apply_patch. Each tool returns a structured proposal - files, hunks, descriptions - and the agent must call apply_patch explicitly to commit. The preview-before-apply boundary is the leash.",
          "It plugs into any MCP-compatible client (Claude Code, custom agents, your own LangChain wrapper) and ships with project templates so you can boot a new MERN app, scaffold five resources, and have a running CRUD UI in under ten minutes.",
        ],
      },
      {
        heading: "What I take from it",
        paragraphs: [
          "MCP servers are, I think, the right shape for AI-enabled web development. Instead of giving the agent free run of a codebase, you give it a typed surface that knows your conventions. As far as I can tell, MCP server development is the highest-leverage skill a senior full-stack engineer can pick up right now - every team has 5–10 internal procedures that would be better as typed agent tools than as tribal knowledge.",
        ],
      },
    ],
  },
  {
    slug: "bg-remover-ai",
    title: "BG Remover AI - Browser-Native ML for Background Removal",
    metaTitle: "BG Remover AI: ONNX Runtime Background Removal in the Browser",
    metaDescription:
      "BG Remover AI is a fast, private, serverless background removal tool that runs entirely in the browser via ONNX models. No uploads, no tracking - a worked example of how much real ML can ship to the client in 2026.",
    tagline: "Browser ML · ONNX Runtime · Privacy-first",
    githubUrl: "https://github.com/IrtezaAsadRizvi/bg-remover-ai",
    intro:
      "BG Remover AI is a single-page web app that strips backgrounds from photos using an ONNX segmentation model - running entirely in the visitor's browser. No upload. No server roundtrip. No quiet retention for training. I built it as a worked example to point at when teams ask whether browser-native inference is real (it is).",
    sections: [
      {
        heading: "Why I built it",
        paragraphs: [
          "Most \"free background remover\" sites on the open web take your photo, run it on a server they control, and retain it for training or marketing. That trade-off is unnecessary in 2026 - modern ONNX Runtime Web is fast enough to run a real segmentation model in WebAssembly on commodity hardware.",
          "I wanted a worked example I could point engineers at when the question came up. \"Yes, you can ship the model to the client. Here's what it looks like.\"",
        ],
      },
      {
        heading: "How it works",
        paragraphs: [
          "The app loads an ONNX model into ONNX Runtime Web, lazy-fetched on first use. Image preprocessing happens in a Web Worker so the UI thread doesn't stutter. The model emits a mask, which is composited back over the source. The whole flow is client-side; the server's only job is to serve static assets.",
          "Built with React, TypeScript, and Vite. Streams the model in chunks so first paint stays fast even on slow connections.",
        ],
      },
      {
        heading: "What I take from it",
        paragraphs: [
          "Browser-native inference is production-ready for the right model sizes. For privacy-sensitive AI features in web products, shipping the model to the client is now a real architectural option - not a research curiosity. That changes the architecture of a lot of AI-enabled web development going forward, and I suspect WebGPU will widen the window over the next 12–18 months.",
        ],
      },
    ],
  },
  {
    slug: "mars-snap",
    title: "Mars Snap - A Procedural Mars Landscape Generator",
    metaTitle: "Mars Snap: WebGL Shader-Driven Procedural Mars Landscapes",
    metaDescription:
      "Mars Snap is a shader-driven procedural Mars landscape generator with atmosphere, fog, shadows, and filmic lighting. Built with WebGL, GLSL, and regl - exports wallpaper-quality PNGs.",
    tagline: "WebGL · GLSL · Procedural graphics",
    githubUrl: "https://github.com/IrtezaAsadRizvi/mars-snap",
    intro:
      "Mars Snap is a single-purpose creative tool: open the page, generate a believable Martian landscape with atmospheric haze, soft shadows, and filmic color grading, and export it as a wallpaper-resolution PNG. It's pure WebGL - no off-the-shelf engine - and it exists mostly because building it taught me more about real-time rendering than any tutorial would have.",
    sections: [
      {
        heading: "Why I built it",
        paragraphs: [
          "AI gets most of my attention. The web platform's graphics stack does not, but it should - WebGL plus GLSL plus a thin wrapper like regl is enough to ship cinematic visuals from a static page, and most engineers I know underestimate how much capability sits there unused.",
          "I wanted a portfolio piece that proved I'd actually shipped one. (I also just wanted to make a Mars wallpaper.)",
        ],
      },
      {
        heading: "How it works",
        paragraphs: [
          "Terrain comes from layered noise functions in the vertex shader. Atmosphere and fog come from a screen-space pass that mixes color based on view depth, plus a Henyey–Greenstein scattering approximation. Shadows are baked from a directional sun. A final post-processing pass tonemaps the scene to give it a filmic feel.",
          "It runs in real time at 60fps on a mid-tier laptop. The export pipeline renders at 4K, downloads as PNG, and reuses the same shaders.",
        ],
      },
      {
        heading: "What I take from it",
        paragraphs: [
          "Senior full-stack work isn't only React and Node. The shader and graphics work in Mars Snap is the same kind of careful systems thinking that goes into AI agent loops - different domain, same discipline. (Different aesthetic, too, which I think matters more than people admit.)",
        ],
      },
    ],
  },
];

export const caseStudies: Record<string, CaseStudy> = Object.fromEntries(
  STUDIES.map((s) => [s.slug, s]),
);

export const caseStudySlugs = STUDIES.map((s) => s.slug);
