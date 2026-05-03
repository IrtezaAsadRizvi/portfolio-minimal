import Link from "next/link";
import { getContent, type Locale } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function TechnicalMeta({ locale }: { locale: Locale }) {
  const { coreStack, availability } = getContent(locale).about;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
      <Reveal>
        <section>
          <h2 className="text-[11px] uppercase tracking-widest text-on-surface-variant/80 font-mono mb-6">
            {coreStack.sectionTitle}
          </h2>
          <p className="text-on-surface-variant text-sm leading-loose">
            {coreStack.items}
          </p>
        </section>
      </Reveal>
      <Reveal delay={0.15}>
        <section>
          <h2 className="text-[11px] uppercase tracking-widest text-on-surface-variant/80 font-mono mb-6">
            {availability.sectionTitle}
          </h2>
          <p className="text-primary text-sm">{availability.status}</p>
          <div className="mt-8">
            <Link
              href={availability.cta.href}
              className="text-accent text-sm nav-link pb-0.5"
            >
              {availability.cta.label}
            </Link>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
