import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import { getContent } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(
  "en",
  "/contact",
  getContent("en").contact.meta,
);

export default function Contact() {
  return <ContactPage locale="en" />;
}
