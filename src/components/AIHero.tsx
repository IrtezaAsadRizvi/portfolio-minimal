import { getContent, type Locale } from "@/lib/i18n";

export default function AIHero({ locale }: { locale: Locale }) {
  const { title, description } = getContent(locale).ai.hero;
  return (
    <section className="mb-16 animate-in">
      <div className="accent-rule mb-6" />
      <h1 className="text-4xl text-primary tracking-tight mb-6 leading-[1.1]">
        {title}
      </h1>
      <div className="max-w-2xl">
        <p className="text-xl text-on-surface-variant leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
}
