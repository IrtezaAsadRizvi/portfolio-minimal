import Link from "next/link";
import content from "@/data/contact.json";
import Reveal from "./Reveal";

const { connect, status } = content;

export default function ContactSidebar() {
  return (
    <div className="md:border-l border-outline-variant/10 md:pl-12 flex flex-col gap-16">
      <Reveal>
        <section>
          <h2 className="text-[0.75rem] uppercase tracking-widest text-on-surface-variant/60 font-mono mb-4">
            {connect.sectionTitle}
          </h2>
          <ul className="font-mono text-[0.7rem] space-y-1.5 text-on-surface-variant">
            {connect.links.map((link, i) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="flex items-center gap-3 hover:text-accent transition-colors duration-300 group"
                >
                  <span className="text-accent/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-on-surface tracking-wider flex-1">
                    {link.label}
                  </span>
                  <span className="material-symbols-outlined text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300">
                    north_east
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal delay={0.15}>
        <section>
          <h2 className="text-[0.75rem] uppercase tracking-widest text-on-surface-variant/60 font-mono mb-6">
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
