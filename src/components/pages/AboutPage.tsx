import Navigation from "@/components/Navigation";
import AboutHeader from "@/components/AboutHeader";
import ExperienceList from "@/components/ExperienceList";
import TrainingList from "@/components/TrainingList";
import TechnicalMeta from "@/components/TechnicalMeta";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { getContent, localePath, type Locale } from "@/lib/i18n";

export default function AboutPage({ locale }: { locale: Locale }) {
  const home = getContent(locale).common.navigation.links[0]?.label ?? "Home";
  const aboutTitle = getContent(locale).about.header.title;
  return (
    <>
      <Breadcrumb
        items={[
          { name: home, href: localePath(locale, "/") },
          { name: aboutTitle, href: localePath(locale, "/about") },
        ]}
      />
      <Navigation locale={locale} />
      <main className="max-w-5xl mx-auto px-6 pt-16 pb-32">
        <AboutHeader locale={locale} />
        <ExperienceList locale={locale} />
        <TrainingList locale={locale} />
        <TechnicalMeta locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
