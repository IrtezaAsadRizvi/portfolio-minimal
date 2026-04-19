import content from "@/data/ai.json";
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
      <div className="space-y-10">
        {tools.map((tool, i) => (
          <Reveal key={tool.name} delay={i * 0.1}>
            <div className="group">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-1">
                <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                  {tool.name}
                </h3>
                <span className="text-[10px] uppercase tracking-widest text-accent/40 font-mono">
                  {tool.status}
                </span>
              </div>
              <p className="text-on-surface-variant max-w-2xl leading-relaxed">
                {tool.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
