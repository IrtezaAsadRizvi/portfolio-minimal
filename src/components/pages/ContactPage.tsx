import Navigation from "@/components/Navigation";
import ContactForm from "@/components/ContactForm";
import SystemMeta from "@/components/SystemMeta";
import ContactSidebar from "@/components/ContactSidebar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { getContent, localePath, type Locale } from "@/lib/i18n";

export default function ContactPage({ locale }: { locale: Locale }) {
  const dict = getContent(locale);
  const home = dict.common.navigation.links[0]?.label ?? "Home";
  const { header } = dict.contact;
  return (
    <>
      <Breadcrumb
        items={[
          { name: home, href: localePath(locale, "/") },
          { name: header.title, href: localePath(locale, "/contact") },
        ]}
      />
      <Navigation locale={locale} />
      <main className="max-w-5xl mx-auto px-6 pt-16 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-8 animate-in">
            <div className="accent-rule mb-6" />
            <h1 className="text-4xl tracking-tight text-primary mb-8 leading-tight">
              {header.title}
            </h1>
            <div className="mb-12 max-w-xl">
              <p className="text-on-surface-variant text-lg leading-relaxed">
                {header.description}
              </p>
            </div>
            <ContactForm locale={locale} />
            <SystemMeta locale={locale} />
          </div>
          <div className="md:col-span-4">
            <ContactSidebar locale={locale} />
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
