import Navigation from "@/components/Navigation";
import WebdevHero from "@/components/WebdevHero";
import WebdevCurrentFocus from "@/components/WebdevCurrentFocus";
import WebdevSelectedWork from "@/components/WebdevSelectedWork";
import WebdevCodeBlock from "@/components/WebdevCodeBlock";
import WebdevWritings from "@/components/WebdevWritings";
import TrainingList from "@/components/TrainingList";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { getContent, localePath, type Locale } from "@/lib/i18n";

export default function WebdevPage({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const home = content.common.navigation.links[0]?.label ?? "Home";
  const webdevTitle = content.webdev.hero.title;
  return (
    <>
      <Breadcrumb
        items={[
          { name: home, href: localePath(locale, "/") },
          { name: webdevTitle, href: localePath(locale, "/webdev") },
        ]}
      />
      <Navigation locale={locale} />
      <main className="max-w-5xl mx-auto px-6 pt-16 pb-32">
        <WebdevHero locale={locale} />
        <WebdevCurrentFocus locale={locale} />
        <Reveal>
          <div className="w-full h-px bg-outline-variant/20 mb-16 line-draw" />
        </Reveal>
        <WebdevSelectedWork locale={locale} />
        <WebdevCodeBlock locale={locale} />
        <Reveal>
          <div className="w-full h-px bg-outline-variant/20 mb-16 line-draw" />
        </Reveal>
        <TrainingList
          locale={locale}
          includeOnly={["Engineering", "Awards"]}
          excludeSlugs={["ssc-best-student-2011"]}
          sectionTitle={content.webdev.training.sectionTitle}
        />
        <WebdevWritings locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
