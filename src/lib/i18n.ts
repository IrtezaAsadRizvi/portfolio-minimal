import enCommon from "@/data/en/common.json";
import enAbout from "@/data/en/about.json";
import enAi from "@/data/en/ai.json";
import enWebdev from "@/data/en/webdev.json";
import enContact from "@/data/en/contact.json";
import enProjects from "@/data/en/projects.json";
import enWriting from "@/data/en/writing.json";

import deCommon from "@/data/de/common.json";
import deAbout from "@/data/de/about.json";
import deAi from "@/data/de/ai.json";
import deWebdev from "@/data/de/webdev.json";
import deContact from "@/data/de/contact.json";
import deProjects from "@/data/de/projects.json";
import deWriting from "@/data/de/writing.json";

import esCommon from "@/data/es/common.json";
import esAbout from "@/data/es/about.json";
import esAi from "@/data/es/ai.json";
import esWebdev from "@/data/es/webdev.json";
import esContact from "@/data/es/contact.json";
import esProjects from "@/data/es/projects.json";
import esWriting from "@/data/es/writing.json";

import frCommon from "@/data/fr/common.json";
import frAbout from "@/data/fr/about.json";
import frAi from "@/data/fr/ai.json";
import frWebdev from "@/data/fr/webdev.json";
import frContact from "@/data/fr/contact.json";
import frProjects from "@/data/fr/projects.json";
import frWriting from "@/data/fr/writing.json";

import zhCommon from "@/data/zh/common.json";
import zhAbout from "@/data/zh/about.json";
import zhAi from "@/data/zh/ai.json";
import zhWebdev from "@/data/zh/webdev.json";
import zhContact from "@/data/zh/contact.json";
import zhProjects from "@/data/zh/projects.json";
import zhWriting from "@/data/zh/writing.json";

import bnCommon from "@/data/bn/common.json";
import bnAbout from "@/data/bn/about.json";
import bnAi from "@/data/bn/ai.json";
import bnWebdev from "@/data/bn/webdev.json";
import bnContact from "@/data/bn/contact.json";
import bnProjects from "@/data/bn/projects.json";
import bnWriting from "@/data/bn/writing.json";

import arCommon from "@/data/ar/common.json";
import arAbout from "@/data/ar/about.json";
import arAi from "@/data/ar/ai.json";
import arWebdev from "@/data/ar/webdev.json";
import arContact from "@/data/ar/contact.json";
import arProjects from "@/data/ar/projects.json";
import arWriting from "@/data/ar/writing.json";

export const LOCALES = ["en", "de", "es", "fr", "zh", "bn", "ar"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const RTL_LOCALES: ReadonlyArray<Locale> = ["ar"];

export function isRtl(locale: Locale): boolean {
  return RTL_LOCALES.includes(locale);
}

export type Common = typeof enCommon;
export type About = typeof enAbout;
export type Ai = typeof enAi;
export type Webdev = typeof enWebdev;
export type Contact = typeof enContact;
export type Projects = typeof enProjects;
export type Writing = typeof enWriting;

export interface Dictionary {
  common: Common;
  about: About;
  ai: Ai;
  webdev: Webdev;
  contact: Contact;
  projects: Projects;
  writing: Writing;
}

const dictionaries: Record<Locale, Dictionary> = {
  en: { common: enCommon, about: enAbout, ai: enAi, webdev: enWebdev, contact: enContact, projects: enProjects, writing: enWriting },
  de: { common: deCommon as Common, about: deAbout as About, ai: deAi as Ai, webdev: deWebdev as Webdev, contact: deContact as Contact, projects: deProjects as Projects, writing: deWriting as Writing },
  es: { common: esCommon as Common, about: esAbout as About, ai: esAi as Ai, webdev: esWebdev as Webdev, contact: esContact as Contact, projects: esProjects as Projects, writing: esWriting as Writing },
  fr: { common: frCommon as Common, about: frAbout as About, ai: frAi as Ai, webdev: frWebdev as Webdev, contact: frContact as Contact, projects: frProjects as Projects, writing: frWriting as Writing },
  zh: { common: zhCommon as Common, about: zhAbout as About, ai: zhAi as Ai, webdev: zhWebdev as Webdev, contact: zhContact as Contact, projects: zhProjects as Projects, writing: zhWriting as Writing },
  bn: { common: bnCommon as Common, about: bnAbout as About, ai: bnAi as Ai, webdev: bnWebdev as Webdev, contact: bnContact as Contact, projects: bnProjects as Projects, writing: bnWriting as Writing },
  ar: { common: arCommon as Common, about: arAbout as About, ai: arAi as Ai, webdev: arWebdev as Webdev, contact: arContact as Contact, projects: arProjects as Projects, writing: arWriting as Writing },
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
