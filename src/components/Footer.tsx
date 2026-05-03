import { getContent, type Locale } from "@/lib/i18n";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Footer({ locale }: { locale: Locale }) {
  const { copyright, tagline } = getContent(locale).common.footer;
  return (
    <footer className="flex flex-col md:flex-row md:items-center justify-between gap-6 w-full px-6 py-12 max-w-5xl mx-auto border-t border-outline-variant/10">
      <div className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/70 font-mono">
        {copyright}
      </div>
      <div className="flex items-center gap-6">
        <div className="font-mono text-[10px] text-accent/80 tracking-wider">
          {tagline}
        </div>
        <LocaleSwitcher locale={locale} />
      </div>
    </footer>
  );
}
