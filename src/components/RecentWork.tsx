import { getContent, type Locale } from "@/lib/i18n";
import ProjectItem from "./ProjectItem";
import Reveal from "./Reveal";

export default function RecentWork({ locale }: { locale: Locale }) {
  const dict = getContent(locale);
  const { sectionTitle } = dict.common.recentWork;
  const projects = dict.projects.projects.filter((p) => p.showOnHomePage);
  return (
    <section className="mb-24 animate-in stagger-4">
      <h2 className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/80 font-mono mb-10">
        {sectionTitle}
      </h2>
      <div className="space-y-16">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.07}>
            <ProjectItem {...project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
