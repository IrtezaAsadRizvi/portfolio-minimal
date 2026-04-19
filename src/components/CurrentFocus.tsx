import content from "@/data/ai.json";
import Reveal from "./Reveal";

const { sectionTitle, items } = content.currentFocus;

export default function CurrentFocus() {
  return (
    <section className="mb-16">
      <Reveal>
        <h2 className="text-[11px] font-mono text-on-surface-variant/60 uppercase tracking-widest mb-4">
          {sectionTitle}
        </h2>
      </Reveal>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <Reveal key={item} delay={i * 0.1}>
            <li className="flex items-start">
              <span className="mr-4 text-accent/40">&mdash;</span>
              <span className="text-lg text-on-surface">{item}</span>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
