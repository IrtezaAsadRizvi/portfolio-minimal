import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { getContent } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(
  "en",
  "/about",
  getContent("en").about.meta,
  "profile",
);

export default function About() {
  return <AboutPage locale="en" />;
}
