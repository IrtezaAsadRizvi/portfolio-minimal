import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import ProjectHeader from "@/components/ProjectHeader";
import ProjectList from "@/components/ProjectList";
import Footer from "@/components/Footer";
import content from "@/data/projects.json";

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
};

export default function Projects() {
  return (
    <>
      <Navigation />
      <main className="max-w-5xl mx-auto px-6 pt-16 pb-32">
        <ProjectHeader />
        <ProjectList />
      </main>
      <Footer />
    </>
  );
}
