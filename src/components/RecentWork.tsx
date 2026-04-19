import Link from "next/link";
import content from "@/data/en.json";
import projectsData from "@/data/projects.json";
import Reveal from "./Reveal";

const { sectionTitle } = content.recentWork;
const projects = projectsData.projects.filter((p) => p.showOnHomePage);

export default function RecentWork() {
  return (
    <section className="mb-24 animate-in stagger-4">
      <h2 className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/60 font-mono mb-10">
        {sectionTitle}
      </h2>
      <div className="space-y-8">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.08}>
            <Link href={project.link.href} className="group block">
              <div className="flex justify-between items-end border-b border-outline-variant/20 pb-3 group-hover:border-accent/50 transition-colors duration-300">
                <div>
                  <h3 className="text-primary text-lg font-medium tracking-tight group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-on-surface-variant/60 text-sm mt-0.5">
                    {project.description}
                  </p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant/30 group-hover:text-accent transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  arrow_outward
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
