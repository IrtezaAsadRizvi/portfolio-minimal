import { getContent, type Locale } from "@/lib/i18n";
import ProjectItem from "./ProjectItem";
import Reveal from "./Reveal";

export default function WebdevSelectedWork({ locale }: { locale: Locale }) {
  const { sectionTitle, tools } = getContent(locale).webdev.toolsAndExperiments;
  return (
    <section className="mb-16">
      <Reveal>
        <h2 className="text-[11px] font-mono text-on-surface-variant/80 uppercase tracking-widest mb-8">
          {sectionTitle}
        </h2>
      </Reveal>
      <div className="space-y-16">
        {tools.map((tool, i) => {
          const isExternalSite = !tool.github_url.includes("github.com");
          return (
            <Reveal key={tool.name} delay={i * 0.07}>
              <ProjectItem
                title={tool.name}
                tag={tool.status}
                description={tool.description}
                stack={[]}
                link={{
                  label: isExternalSite ? "Visit" : "GitHub",
                  href: tool.github_url,
                }}
              />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
