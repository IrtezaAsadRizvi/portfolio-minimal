import Link from "next/link";
import content from "@/data/en.json";
import Reveal from "./Reveal";

const { sectionTitle, description, cta, socials } = content.collaborate;

export default function Collaborate() {
  return (
    <div className="fixed-sidebar space-y-8 animate-in stagger-3">
      <section>
        <h2 className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/60 font-mono mb-6">
          {sectionTitle}
        </h2>
        <div className="space-y-6">
          <p className="text-on-surface-variant/60 text-sm leading-relaxed max-w-sm">
            {description}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={cta.primary.href}
              className="bg-accent text-background px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-widest hover:bg-accent/80 hover-lift transition-colors duration-300"
            >
              {cta.primary.label}
            </Link>
            <Link
              href={cta.secondary.href}
              className="border border-outline-variant text-primary px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-widest hover:border-accent hover:text-accent hover-lift transition-all duration-300"
            >
              {cta.secondary.label}
            </Link>
          </div>
          <div className="flex flex-col gap-3.5 text-xs font-mono tracking-[0.15em] uppercase pt-4 border-t border-outline-variant/20">
            {socials.map((social, i) => {
              const isExternal = social.href.startsWith("http");
              return (
                <Reveal key={social.label} delay={i * 0.06}>
                  <Link
                    href={social.href}
                    {...(isExternal && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                    className="text-on-surface-variant/60 hover:text-accent transition-colors duration-300 flex items-center justify-between group"
                  >
                    {social.label}
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform duration-300">
                      {social.icon}
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
