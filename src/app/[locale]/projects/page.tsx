import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectsPage from "@/components/pages/ProjectsPage";
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
  return buildMetadata(locale, "/projects", getContent(locale).projects.meta);
}

export default async function Projects({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === DEFAULT_LOCALE) notFound();
  return <ProjectsPage locale={locale as Locale} />;
}
