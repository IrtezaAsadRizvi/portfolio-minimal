import type { Metadata } from "next";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

const HTML_LANG: Record<Locale, string> = {
  en: "en",
  de: "de",
  es: "es",
};

function pathFor(locale: Locale, path: string): string {
  const cleanPath = path === "/" ? "" : path;
  if (locale === DEFAULT_LOCALE) return cleanPath || "/";
  return `/${locale}${cleanPath}`;
}

export function buildAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[HTML_LANG[l]] = pathFor(l, path);
  }
  languages["x-default"] = pathFor(DEFAULT_LOCALE, path);
  return {
    canonical: pathFor(DEFAULT_LOCALE === DEFAULT_LOCALE ? DEFAULT_LOCALE : DEFAULT_LOCALE, path),
    languages,
  };
}

interface PageMeta {
  title: string;
  description: string;
}

export function buildMetadata(
  locale: Locale,
  path: string,
  meta: PageMeta,
  type: "website" | "profile" = "website",
): Metadata {
  const canonical = pathFor(locale, path);
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[HTML_LANG[l]] = pathFor(l, path);
  }
  languages["x-default"] = pathFor(DEFAULT_LOCALE, path);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical, languages },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      type,
      locale: HTML_LANG[locale],
    },
    twitter: {
      title: meta.title,
      description: meta.description,
    },
  };
}
