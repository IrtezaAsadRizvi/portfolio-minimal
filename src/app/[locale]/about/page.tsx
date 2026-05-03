import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AboutPage from "@/components/pages/AboutPage";
import { getContent, isLocale, LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return LOCALES.filter((l) => l !== DEFAULT_LOCALE).map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata(locale, "/about", getContent(locale).about.meta, "profile");
}

export default async function About({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === DEFAULT_LOCALE) notFound();
  return <AboutPage locale={locale as Locale} />;
}
