import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import WritingHeader from "@/components/WritingHeader";
import WritingList from "@/components/WritingList";
import Footer from "@/components/Footer";
import content from "@/data/writing.json";

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
};

export default function Writing() {
  return (
    <>
      <Navigation />
      <main className="max-w-5xl mx-auto px-6 pt-16 pb-32">
        <WritingHeader />
        <WritingList />
      </main>
      <Footer />
    </>
  );
}
