import enCommon from "@/data/en/common.json";
import enAbout from "@/data/en/about.json";
import enAi from "@/data/en/ai.json";
import enContact from "@/data/en/contact.json";
import enProjects from "@/data/en/projects.json";
import enWriting from "@/data/en/writing.json";

import deCommon from "@/data/de/common.json";
import deAbout from "@/data/de/about.json";
import deAi from "@/data/de/ai.json";
import deContact from "@/data/de/contact.json";
import deProjects from "@/data/de/projects.json";
import deWriting from "@/data/de/writing.json";

import esCommon from "@/data/es/common.json";
import esAbout from "@/data/es/about.json";
import esAi from "@/data/es/ai.json";
import esContact from "@/data/es/contact.json";
import esProjects from "@/data/es/projects.json";
import esWriting from "@/data/es/writing.json";

export const LOCALES = ["en", "de", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export type Common = typeof enCommon;
export type About = typeof enAbout;
export type Ai = typeof enAi;
export type Contact = typeof enContact;
export type Projects = typeof enProjects;
export type Writing = typeof enWriting;

export interface Dictionary {
  common: Common;
  about: About;
  ai: Ai;
  contact: Contact;
  projects: Projects;
  writing: Writing;
}

const dictionaries: Record<Locale, Dictionary> = {
  en: { common: enCommon, about: enAbout, ai: enAi, contact: enContact, projects: enProjects, writing: enWriting },
  de: { common: deCommon as Common, about: deAbout as About, ai: deAi as Ai, contact: deContact as Contact, projects: deProjects as Projects, writing: deWriting as Writing },
  es: { common: esCommon as Common, about: esAbout as About, ai: esAi as Ai, contact: esContact as Contact, projects: esProjects as Projects, writing: esWriting as Writing },
};

export function getContent(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function localePath(locale: Locale, path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return cleanPath;
  return `/${locale}${cleanPath === "/" ? "" : cleanPath}`;
}
