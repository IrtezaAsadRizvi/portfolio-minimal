import Navigation from "@/components/Navigation";
import AIHero from "@/components/AIHero";
import CurrentFocus from "@/components/CurrentFocus";
import ToolsAndExperiments from "@/components/ToolsAndExperiments";
import CodeBlock from "@/components/CodeBlock";
import AIWritings from "@/components/AIWritings";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { getContent, localePath, type Locale } from "@/lib/i18n";

export default function AIPage({ locale }: { locale: Locale }) {
  const home = getContent(locale).common.navigation.links[0]?.label ?? "Home";
  const aiTitle = getContent(locale).ai.hero.title;
  return (
    <>
      <Breadcrumb
        items={[
          { name: home, href: localePath(locale, "/") },
          { name: aiTitle, href: localePath(locale, "/ai") },
        ]}
      />
      <Navigation locale={locale} />
      <main className="max-w-5xl mx-auto px-6 pt-16 pb-32">
        <AIHero locale={locale} />
        <CurrentFocus locale={locale} />
        <Reveal>
          <div className="w-full h-px bg-outline-variant/20 mb-16 line-draw" />
        </Reveal>
        <ToolsAndExperiments locale={locale} />
        <CodeBlock locale={locale} />
        <Reveal>
          <div className="w-full h-px bg-outline-variant/20 mb-16 line-draw" />
        </Reveal>
        <AIWritings locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
