import content from "@/data/ai.json";
import ProjectItem from "./ProjectItem";
import Reveal from "./Reveal";

const { sectionTitle, tools } = content.toolsAndExperiments;

export default function ToolsAndExperiments() {
  return (
    <section className="mb-16">
      <Reveal>
        <h2 className="text-[11px] font-mono text-on-surface-variant/60 uppercase tracking-widest mb-8">
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
