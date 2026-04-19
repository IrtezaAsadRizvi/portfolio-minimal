import content from "@/data/about.json";
import Reveal from "./Reveal";

const { sectionTitle, positions } = content.experience;

export default function ExperienceList() {
  return (
    <section className="mb-24">
      <Reveal>
        <h2 className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-mono mb-10">
          {sectionTitle}
        </h2>
      </Reveal>
      <div className="space-y-14">
        {positions.map((pos, i) => (
          <Reveal key={pos.role} delay={i * 0.12}>
            <article className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2">
              <div>
                <h3 className="text-primary font-medium">{pos.role}</h3>
                <p className="text-on-surface-variant/50 text-sm mb-4">
                  {pos.website ? (
                    <a
                      href={pos.website}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-accent transition-colors"
                    >
                      {pos.company}
                    </a>
                  ) : (
                    pos.company
                  )}
                  {pos.location && (
                    <span className="text-on-surface-variant/40">
                      {" · "}
                      {pos.location}
                    </span>
                  )}
                </p>
                {pos.bullets && pos.bullets.length > 0 && (
                  <ul className="text-on-surface-variant text-sm space-y-2 max-w-xl">
                    {pos.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span className="text-accent/40">&mdash;</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="text-accent/40 text-sm font-mono tabular-nums md:text-right">
                {pos.period}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
