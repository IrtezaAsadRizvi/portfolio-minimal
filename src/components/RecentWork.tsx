import content from "@/data/en.json";
import projectsData from "@/data/projects.json";
import ProjectItem from "./ProjectItem";
import Reveal from "./Reveal";

const { sectionTitle } = content.recentWork;
const projects = projectsData.projects.filter((p) => p.showOnHomePage);

export default function RecentWork() {
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
