import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import RecentWork from "@/components/RecentWork";
import LatestWriting from "@/components/LatestWriting";
import Collaborate from "@/components/Collaborate";
import Footer from "@/components/Footer";
import type { Locale } from "@/lib/i18n";

export default function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <Navigation locale={locale} />
      <main className="max-w-5xl mx-auto px-6 pt-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <Hero locale={locale} />
            <RecentWork locale={locale} />
            <LatestWriting locale={locale} />
          </div>
          <div className="lg:col-span-4">
            <Collaborate locale={locale} />
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
