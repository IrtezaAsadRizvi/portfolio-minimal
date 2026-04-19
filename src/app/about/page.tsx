import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import AboutHeader from "@/components/AboutHeader";
import ExperienceList from "@/components/ExperienceList";
import TechnicalMeta from "@/components/TechnicalMeta";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import content from "@/data/about.json";

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: content.meta.title,
    description: content.meta.description,
    url: "/about",
    type: "profile",
  },
  twitter: {
    title: content.meta.title,
    description: content.meta.description,
  },
};

export default function About() {
  return (
    <>
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />
      <Navigation />
      <main className="max-w-5xl mx-auto px-6 pt-16 pb-32">
        <AboutHeader />
        <ExperienceList />
        <TechnicalMeta />
      </main>
      <Footer />
    </>
  );
}
