import Link from "next/link";
import { getContent, type Locale } from "@/lib/i18n";

export default function Hero({ locale }: { locale: Locale }) {
  const { heading, description, socials } = getContent(locale).common.hero;
  return (
    <header className="mb-24">
      <div className="accent-rule mb-8 animate-in stagger-1" />
      <h1 className="text-5xl lg:text-6xl tracking-tight text-primary mb-8 leading-[1.1] animate-in stagger-2">
        {heading}
      </h1>
      <div className="max-w-2xl">
        {(Array.isArray(description) ? description : [description]).map((paragraph, index) => (
          <p
            key={index}
            className="text-lg text-on-surface-variant leading-relaxed mb-6 animate-in stagger-3"
          >
            {paragraph}
          </p>
        ))}
        <div className="flex gap-5 items-center pt-2 animate-in stagger-4">
          {socials.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant/80 hover:text-accent transition-colors flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-mono"
            >
              <span className="material-symbols-outlined !text-sm">
                {social.icon}
              </span>
              {social.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
