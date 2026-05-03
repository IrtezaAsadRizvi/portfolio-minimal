import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  variable: "--font-instrument-serif",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://irtezaasadrizvi.github.io";
const AUTHOR = "Irteza Asad Rizvi";
const DEFAULT_TITLE =
  "Irteza Asad Rizvi — Senior Full-Stack & AI Automation Engineer";
const DEFAULT_DESCRIPTION =
  "Senior software engineer and AI automation expert. I build production full-stack systems (Next.js, Node.js, MERN), AI agents, Claude Code plugins, and MCP servers that automate real engineering workflows.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s — Irteza Asad Rizvi",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: "Irteza Asad Rizvi Portfolio",
  authors: [{ name: AUTHOR, url: SITE_URL }],
  creator: AUTHOR,
  publisher: AUTHOR,
  generator: "Next.js",
  category: "technology",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Irteza Asad Rizvi",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Irteza Asad Rizvi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    creator: "@IrtezaAsad",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  verification: {
    google: "wSAkGfAf4CSWulVgO9OauOzC85hcY2_TVue1ftZJlF4",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
    { media: "(prefers-color-scheme: light)", color: "#F5F1E8" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: AUTHOR,
  givenName: "Irteza",
  familyName: "Asad Rizvi",
  alternateName: ["Irteza", "Irteza Rizvi"],
  url: SITE_URL,
  image: `${SITE_URL}/logo.png`,
  jobTitle: "Senior Software Engineer · AI Automation Engineer",
  description: DEFAULT_DESCRIPTION,
  worksFor: {
    "@type": "Organization",
    name: "TransMedia Inc.",
    url: "https://www.trmedia.ca/",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toronto",
    addressCountry: "CA",
  },
  knowsAbout: [
    "Full-stack web development",
    "Next.js",
    "Node.js",
    "React",
    "Vue.js",
    "Nuxt.js",
    "TypeScript",
    "MongoDB",
    "Express",
    "Artificial Intelligence",
    "Large Language Models",
    "AI agents",
    "AI automation",
    "AI workflows",
    "Claude Code",
    "Model Context Protocol (MCP)",
    "Retrieval-Augmented Generation",
    "Adversarial Machine Learning",
    "CI/CD",
    "Docker",
    "Jenkins",
    "Web security",
  ],
  knowsLanguage: ["English", "German", "Spanish", "French", "Chinese", "Bengali", "Arabic"],
  sameAs: [
    "https://github.com/IrtezaAsadRizvi",
    "https://www.linkedin.com/in/irtezaasad",
    "https://medium.com/@irtezaasadrizvi",
    "https://codepen.io/IrtezaAsad",
    "https://www.behance.net/irtezaasad",
    "https://irtezaasadrizvi.github.io",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Irteza Asad Rizvi",
  alternateName: "Irteza Asad Rizvi Portfolio",
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  inLanguage: "en",
  author: {
    "@type": "Person",
    name: AUTHOR,
    url: SITE_URL,
  },
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Irteza Asad Rizvi — Full-Stack & AI Automation Consulting",
  url: SITE_URL,
  image: `${SITE_URL}/logo.png`,
  description:
    "Consulting and development for full-stack web products, AI automation, AI workflows, LLM-powered agents, Claude Code plugins, and MCP servers.",
  areaServed: "Worldwide",
  priceRange: "$$",
  provider: {
    "@type": "Person",
    name: AUTHOR,
    url: SITE_URL,
  },
  serviceType: [
    "Full-stack web development",
    "AI automation",
    "AI workflow design",
    "LLM integration",
    "AI agent development",
    "Claude Code plugin development",
    "MCP server development",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is AI-enabled web development?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It's the new layer of full-stack work in 2026 — large language models, agents, and ML inference wired into both the product (chat, copilot, summarization, semantic search) and the engineering loop (Claude Code plugins, MCP servers, local-first coding agents). I've been shipping it for the last year or two across Next.js, Node.js, and the MERN stack. The high-leverage piece is almost always the typed integration surface, not the prompt.",
      },
    },
    {
      "@type": "Question",
      name: "What is an MCP server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An MCP (Model Context Protocol) server is just a process that exposes tools, data, and capabilities to an LLM client over a standardized protocol — kind of like a GraphQL endpoint, but for an agent. It lets a client like Claude Code read your database, call your APIs, or run domain-specific actions without bespoke integration code. I build custom MCP servers, including the open-source MERN MCP, that automate full-stack CRUD scaffolding and developer workflows.",
      },
    },
    {
      "@type": "Question",
      name: "What is a Claude Code plugin?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Claude Code plugin extends the Claude Code CLI with custom commands, hooks, MCP servers, sub-agents, or skills tailored to your codebase. Plugins can narrate edits, enforce conventions, run pre-commit checks, or wire in proprietary tools. I've authored claude-human-review, which describes each edit Claude is about to make in plain English so engineers can approve or undo with full context — diff hunts are the wrong review surface.",
      },
    },
    {
      "@type": "Question",
      name: "What is a ReAct agent?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A ReAct (Reasoning + Acting) agent is an LLM that interleaves thoughts with concrete tool calls — read a file, run a search, write a patch — until a task is complete. It's the loop behind most modern coding agents. My open-source project nip is a local-first ReAct agent powered by Gemma on Ollama, with no cloud calls and no vendor lock-in.",
      },
    },
    {
      "@type": "Question",
      name: "Is Irteza Asad Rizvi available for hire?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. I'm open to senior full-stack roles, AI-focused contracts, and consulting engagements. Remote out of Toronto, specializing in shipping production AI features — LLM agents, Claude Code plugins, MCP servers — into Next.js, Node.js, Vue, and Nuxt apps. Fastest way to reach me: irtezaasad@gmail.com.",
      },
    },
    {
      "@type": "Question",
      name: "What stack does Irteza work in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Primary: TypeScript, Node.js, Next.js, React, Vue, Nuxt, Python, MongoDB, PostgreSQL, Docker, AWS, Linux. AI-specific: Claude SDK, Model Context Protocol, Ollama, ONNX Runtime. CI/CD: Jenkins and Docker. Seven-plus years of production web work and active AI tooling on top.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${sora.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Irteza Asad Rizvi — Writing"
          href="/rss.xml"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var RTL={ar:1};var SUPP={en:1,de:1,es:1,fr:1,zh:1,bn:1,ar:1};function setLang(l){document.documentElement.lang=l;document.documentElement.dir=RTL[l]?'rtl':'ltr';}var p=location.pathname;var m=p.match(/^\\/(de|es|fr|zh|bn|ar)(?:\\/|$)/);var urlLocale=m?m[1]:null;if(urlLocale){setLang(urlLocale);try{localStorage.setItem('locale',urlLocale);}catch(e){}return;}var englishOnly=/^\\/(projects|writing)\\/[^\\/]+/.test(p);if(englishOnly){setLang('en');return;}var stored=null;try{stored=localStorage.getItem('locale');}catch(e){}var target=stored&&SUPP[stored]?stored:null;if(!target){var nav=(navigator.language||'en').toLowerCase();var two=nav.split('-')[0];if(SUPP[two])target=two;else target='en';}if(target&&target!=='en'){var rest=p==='/'?'':p;location.replace('/'+target+rest+location.search+location.hash);}else{setLang('en');}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
