import { getContent, type Locale } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function SystemMeta({ locale }: { locale: Locale }) {
  const { systemStatus, environment, publicKey } = getContent(locale).contact;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-12 border-t border-outline-variant/10">
      <Reveal>
        <section>
          <h2 className="text-[0.75rem] uppercase tracking-widest text-on-surface-variant/80 font-mono mb-4">
            {systemStatus.sectionTitle}
          </h2>
          <div className="font-mono text-[0.7rem] space-y-2 text-on-surface-variant">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-accent status-dot" />
              <span className="text-on-surface">{systemStatus.online}</span>
            </div>
            {systemStatus.details.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.12}>
        <section>
          <h2 className="text-[0.75rem] uppercase tracking-widest text-on-surface-variant/80 font-mono mb-4">
            {environment.sectionTitle}
          </h2>
          <div className="font-mono text-[0.7rem] space-y-1 text-on-surface-variant">
            {environment.entries.map((entry) => (
              <p key={entry.key}>
                <span className="text-accent/80">{entry.key}:</span>{" "}
                {entry.value}
              </p>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.24} className="sm:col-span-2">
        <section>
          <h2 className="text-[0.75rem] uppercase tracking-widest text-on-surface-variant/80 font-mono mb-4">
            {publicKey.sectionTitle}
          </h2>
          <div className="bg-surface-container-low p-4 font-mono text-[0.65rem] leading-relaxed text-on-surface-variant overflow-x-auto border border-outline-variant/10">
            <code className="block whitespace-pre">{publicKey.content}</code>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
