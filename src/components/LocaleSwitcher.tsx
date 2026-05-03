"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

const LABELS: Record<Locale, string> = {
  en: "EN",
  de: "DE",
  es: "ES",
  fr: "FR",
  zh: "ZH",
  bn: "BN",
  ar: "AR",
};

const FULL_NAMES: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  es: "Español",
  fr: "Français",
  zh: "中文",
  bn: "বাংলা",
  ar: "العربية",
};

function stripLocalePrefix(pathname: string): { locale: Locale; rest: string } {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first && (LOCALES as readonly string[]).includes(first)) {
    const rest = "/" + segments.slice(1).join("/");
    return { locale: first as Locale, rest: rest === "/" ? "/" : rest };
  }
  return { locale: DEFAULT_LOCALE, rest: pathname || "/" };
}

function buildLocalizedPath(locale: Locale, rest: string): string {
  const cleanRest = rest.startsWith("/") ? rest : `/${rest}`;
  if (locale === DEFAULT_LOCALE) return cleanRest;
  return cleanRest === "/" ? `/${locale}` : `/${locale}${cleanRest}`;
}

export default function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleSelect = (next: Locale) => {
    setOpen(false);
    if (next === locale) return;
    try {
      window.localStorage.setItem("locale", next);
    } catch {
      /* ignore */
    }
    const { rest } = stripLocalePrefix(pathname);
    router.push(buildLocalizedPath(next, rest));
  };

  return (
    <div ref={ref} className="relative font-mono text-[10px] tracking-widest uppercase">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 text-on-surface-variant/80 hover:text-accent transition-colors"
      >
        <span className="material-symbols-outlined !text-[14px]">language</span>
        {LABELS[locale]}
        <span
          className="material-symbols-outlined !text-[14px] transition-transform"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          expand_more
        </span>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 bottom-full mb-2 min-w-[140px] bg-surface border border-outline-variant/30 shadow-lg py-1"
        >
          {LOCALES.map((l) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === locale}
                onClick={() => handleSelect(l)}
                className={`w-full text-left px-4 py-2 transition-colors flex items-center justify-between gap-4 ${
                  l === locale
                    ? "text-accent"
                    : "text-on-surface-variant/80 hover:text-primary hover:bg-surface-container-low"
                }`}
              >
                <span>{FULL_NAMES[l]}</span>
                <span className="text-[9px] opacity-70">{LABELS[l]}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
