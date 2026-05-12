import type { Metadata } from "next";
import WebdevPage from "@/components/pages/WebdevPage";
import { getContent } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(
  "en",
  "/webdev",
  getContent("en").webdev.meta,
);

export default function Webdev() {
  return <WebdevPage locale="en" />;
}
