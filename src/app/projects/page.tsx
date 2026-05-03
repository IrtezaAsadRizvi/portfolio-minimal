import type { Metadata } from "next";
import ProjectsPage from "@/components/pages/ProjectsPage";
import { getContent } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(
  "en",
  "/projects",
  getContent("en").projects.meta,
);

export default function Projects() {
  return <ProjectsPage locale="en" />;
}
