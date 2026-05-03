import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomePage from "@/components/pages/HomePage";
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
  const meta = getContent(locale).common.meta;
  return {
    ...buildMetadata(locale, "/", meta),
    title: { absolute: meta.title },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === DEFAULT_LOCALE) notFound();
  return <HomePage locale={locale as Locale} />;
}
