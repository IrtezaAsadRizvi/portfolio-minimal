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
  keywords: [
    "Irteza Asad Rizvi",
    "Irteza",
    "senior software engineer",
    "full-stack developer",
    "full stack developer",
    "web developer",
    "AI expert",
    "AI automation expert",
    "AI workflow expert",
    "AI engineer",
    "AI agent developer",
    "LLM engineer",
    "Claude Code plugin developer",
    "MCP server developer",
    "Model Context Protocol",
    "agentic AI",
    "Next.js developer",
    "Node.js developer",
    "React developer",
    "Vue developer",
    "MERN stack developer",
    "TypeScript engineer",
    "JavaScript engineer",
    "Nuxt.js developer",
    "Jenkins CI/CD",
    "Docker",
    "DevOps",
    "Toronto software engineer",
    "remote software engineer",
    "freelance full-stack developer",
    "consulting AI automation",
    "adversarial machine learning",
    "applied ML",
    "open source developer",
  ],
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
    // Add your Google Search Console verification token here after creating the property.
    // google: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
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
  knowsLanguage: ["English"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
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
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
