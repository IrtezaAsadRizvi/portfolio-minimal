import { getContent, type Locale } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function CurrentFocus({ locale }: { locale: Locale }) {
  const { sectionTitle, items } = getContent(locale).ai.currentFocus;
  return (
    <section className="mb-16">
      <Reveal>
        <h2 className="text-[11px] font-mono text-on-surface-variant/80 uppercase tracking-widest mb-4">
          {sectionTitle}
        </h2>
      </Reveal>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <Reveal key={item} delay={i * 0.1}>
            <li className="flex items-start">
              <span className="mr-4 text-accent/70">-</span>
              <span className="text-lg text-on-surface">{item}</span>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
