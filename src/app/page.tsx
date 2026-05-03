import type { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { getContent } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

const meta = getContent("en").common.meta;

export const metadata: Metadata = {
  ...buildMetadata("en", "/", meta),
  title: { absolute: meta.title },
};

export default function Home() {
  return <HomePage locale="en" />;
}
