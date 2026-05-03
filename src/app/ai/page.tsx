import type { Metadata } from "next";
import AIPage from "@/components/pages/AIPage";
import { getContent } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(
  "en",
  "/ai",
  getContent("en").ai.meta,
);

export default function AI() {
  return <AIPage locale="en" />;
}
