import Link from "next/link";
import content from "@/data/en.json";

const { heading, description, socials } = content.hero;

export default function Hero() {
  return (
    <header className="mb-24">
      <div className="accent-rule mb-8 animate-in stagger-1" />
      <h1 className="text-5xl lg:text-6xl tracking-tight text-primary mb-8 leading-[1.1] animate-in stagger-2">
        {heading}
      </h1>
      <div className="max-w-2xl">
        <p className="text-lg text-on-surface-variant leading-relaxed mb-6 animate-in stagger-3">
          {description}
        </p>
        <div className="flex gap-5 items-center pt-2 animate-in stagger-4">
          {socials.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              className="text-on-surface-variant/60 hover:text-accent transition-colors flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-mono"
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
