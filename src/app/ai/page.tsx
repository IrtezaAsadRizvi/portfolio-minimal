import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import AIHero from "@/components/AIHero";
import CurrentFocus from "@/components/CurrentFocus";
import ToolsAndExperiments from "@/components/ToolsAndExperiments";
import CodeBlock from "@/components/CodeBlock";
import AIWritings from "@/components/AIWritings";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import content from "@/data/ai.json";

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  alternates: { canonical: "/ai" },
  openGraph: {
    title: content.meta.title,
    description: content.meta.description,
    url: "/ai",
    type: "website",
  },
  twitter: {
    title: content.meta.title,
    description: content.meta.description,
  },
};

export default function AI() {
  return (
    <>
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "AI", href: "/ai" },
        ]}
      />
      <Navigation />
      <main className="max-w-5xl mx-auto px-6 pt-16 pb-32">
        <AIHero />
        <CurrentFocus />
        <Reveal>
          <div className="w-full h-px bg-outline-variant/20 mb-16 line-draw" />
        </Reveal>
        <ToolsAndExperiments />
        <CodeBlock />
        <Reveal>
          <div className="w-full h-px bg-outline-variant/20 mb-16 line-draw" />
        </Reveal>
        <AIWritings />
      </main>
      <Footer />
    </>
  );
}
