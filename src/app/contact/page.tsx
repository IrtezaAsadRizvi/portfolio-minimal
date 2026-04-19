import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import ContactForm from "@/components/ContactForm";
import SystemMeta from "@/components/SystemMeta";
import ContactSidebar from "@/components/ContactSidebar";
import Footer from "@/components/Footer";
import content from "@/data/contact.json";

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
};

export default function Contact() {
  return (
    <>
      <Navigation />
      <main className="max-w-5xl mx-auto px-6 pt-16 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-8 animate-in">
            <div className="accent-rule mb-6" />
            <h1 className="text-4xl tracking-tight text-primary mb-8 leading-tight">
              {content.header.title}
            </h1>
            <div className="mb-12 max-w-xl">
              <p className="text-on-surface-variant text-lg leading-relaxed">
                {content.header.description}
              </p>
            </div>
            <ContactForm />
            <SystemMeta />
          </div>
          <div className="md:col-span-4">
            <ContactSidebar />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
