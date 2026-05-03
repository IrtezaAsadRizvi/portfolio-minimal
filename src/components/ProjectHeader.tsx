import { getContent, type Locale } from "@/lib/i18n";

export default function ProjectHeader({ locale }: { locale: Locale }) {
  const { title, description } = getContent(locale).projects.header;
  return (
    <div className="mb-12 animate-in">
      <div className="accent-rule mb-6" />
      <h1 className="text-4xl tracking-tight text-primary mb-4">
        {title}
      </h1>
      <p className="text-on-surface-variant max-w-xl leading-relaxed">
        {description}
      </p>
    </div>
  );
}
