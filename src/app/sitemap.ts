import type { MetadataRoute } from "next";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n";
import { caseStudySlugs } from "@/data/en/case-studies";
import { nativePostSlugs } from "@/data/en/posts";

export const dynamic = "force-static";

const SITE_URL = "https://irtezaasadrizvi.github.io";

const HTML_LANG: Record<string, string> = {
  en: "en",
  de: "de",
  es: "es",
  fr: "fr",
  zh: "zh",
  bn: "bn",
  ar: "ar",
};

function pathFor(locale: string, path: string): string {
  if (locale === DEFAULT_LOCALE) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/ai", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/webdev", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/projects", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/writing", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
  ];

  const entries: MetadataRoute.Sitemap = [];
  for (const { path, priority, changeFrequency } of pages) {
    const languages: Record<string, string> = {};
    for (const l of LOCALES) {
      languages[HTML_LANG[l]] = `${SITE_URL}${pathFor(l, path)}`;
    }
    languages["x-default"] = `${SITE_URL}${pathFor(DEFAULT_LOCALE, path)}`;
    for (const l of LOCALES) {
      entries.push({
        url: `${SITE_URL}${pathFor(l, path)}`,
        lastModified: now,
        changeFrequency,
        priority: l === DEFAULT_LOCALE ? priority : Math.max(0.3, priority - 0.2),
        alternates: { languages },
      });
    }
  }

  for (const slug of caseStudySlugs) {
    entries.push({
      url: `${SITE_URL}/projects/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    });
  }

  for (const slug of nativePostSlugs) {
    entries.push({
      url: `${SITE_URL}/writing/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return entries;
}
