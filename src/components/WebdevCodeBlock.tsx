import { getContent, type Locale } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function WebdevCodeBlock({ locale }: { locale: Locale }) {
  const { filename, lines } = getContent(locale).webdev.codeBlock;
  return (
    <Reveal>
      <section className="mb-12">
        <div className="bg-surface-container-low p-6 border border-outline-variant/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 bg-accent/40 status-dot" />
            <span className="text-[10px] text-on-surface-variant/80 font-mono">
              {filename}
            </span>
          </div>
          <code className="text-sm font-mono text-on-surface-variant/70 block leading-relaxed">
            {lines.map((line, i) => (
              <span key={i}>
                {line}
                {i < lines.length - 1 && <br />}
              </span>
            ))}
          </code>
        </div>
      </section>
    </Reveal>
  );
}
