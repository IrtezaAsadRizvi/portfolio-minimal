import type { Metadata } from "next";
import WritingPage from "@/components/pages/WritingPage";
import { getContent } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(
  "en",
  "/writing",
  getContent("en").writing.meta,
);

export default function Writing() {
  return <WritingPage locale="en" />;
}
