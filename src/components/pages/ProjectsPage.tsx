import Navigation from "@/components/Navigation";
import ProjectHeader from "@/components/ProjectHeader";
import ProjectList from "@/components/ProjectList";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { getContent, localePath, type Locale } from "@/lib/i18n";

export default function ProjectsPage({ locale }: { locale: Locale }) {
  const home = getContent(locale).common.navigation.links[0]?.label ?? "Home";
  const projectsTitle = getContent(locale).projects.header.title;
  return (
    <>
      <Breadcrumb
        items={[
          { name: home, href: localePath(locale, "/") },
          { name: projectsTitle, href: localePath(locale, "/projects") },
        ]}
      />
      <Navigation locale={locale} />
      <main className="max-w-5xl mx-auto px-6 pt-16 pb-32">
        <ProjectHeader locale={locale} />
        <ProjectList locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
