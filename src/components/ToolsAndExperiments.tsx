import { getContent, type Locale } from "@/lib/i18n";
import ProjectItem from "./ProjectItem";
import Reveal from "./Reveal";

export default function ToolsAndExperiments({ locale }: { locale: Locale }) {
  const { sectionTitle, tools } = getContent(locale).ai.toolsAndExperiments;
  return (
    <section className="mb-16">
      <Reveal>
        <h2 className="text-[11px] font-mono text-on-surface-variant/80 uppercase tracking-widest mb-8">
          {sectionTitle}
        </h2>
      </Reveal>
      <div className="space-y-16">
        {tools.map((tool, i) => (
          <Reveal key={tool.name} delay={i * 0.07}>
            <ProjectItem
              title={tool.name}
              tag={tool.status}
              description={tool.description}
              stack={[]}
              link={{ label: "GitHub", href: tool.github_url }}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
