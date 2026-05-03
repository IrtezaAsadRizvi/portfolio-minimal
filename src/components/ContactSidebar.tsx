import Link from "next/link";
import { getContent, type Locale } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function ContactSidebar({ locale }: { locale: Locale }) {
  const { connect, status } = getContent(locale).contact;
  return (
    <div className="md:border-l border-outline-variant/10 md:pl-12 flex flex-col gap-16">
      <section>
        <h2 className="text-[0.75rem] uppercase tracking-widest text-on-surface-variant/80 font-mono mb-4">
          {connect.sectionTitle}
        </h2>
        <div className="flex flex-col gap-3.5 text-xs font-mono tracking-[0.15em] uppercase pt-4 border-t border-outline-variant/20">
          {connect.links.map((link, i) => {
            const isExternal = link.href.startsWith("http");
            return (
              <Reveal key={link.label} delay={i * 0.06}>
                <Link
                  href={link.href}
                  {...(isExternal && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className="text-on-surface-variant/80 hover:text-accent transition-colors duration-300 flex items-center justify-between group"
                >
                  {link.label}
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform duration-300">
                    north_east
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Reveal delay={0.15}>
        <section>
          <h2 className="text-[0.75rem] uppercase tracking-widest text-on-surface-variant/80 font-mono mb-6">
            {status.sectionTitle}
          </h2>
          <div className="bg-surface-container-low p-6 border-l-2 border-accent">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 bg-accent status-dot" />
              <span className="text-[0.65rem] font-mono font-bold tracking-widest uppercase text-on-surface">
                {status.label}
              </span>
            </div>
            <p className="text-xs text-on-surface-variant font-mono whitespace-pre-line">
              {status.details}
            </p>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
