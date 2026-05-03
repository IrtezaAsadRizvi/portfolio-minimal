import Navigation from "@/components/Navigation";
import WritingHeader from "@/components/WritingHeader";
import WritingList from "@/components/WritingList";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import BlogListingSchema from "@/components/BlogListingSchema";
import { getContent, localePath, type Locale } from "@/lib/i18n";

export default function WritingPage({ locale }: { locale: Locale }) {
  const home = getContent(locale).common.navigation.links[0]?.label ?? "Home";
  const writingTitle = getContent(locale).writing.header.title;
  return (
    <>
      <Breadcrumb
        items={[
          { name: home, href: localePath(locale, "/") },
          { name: writingTitle, href: localePath(locale, "/writing") },
        ]}
      />
      <BlogListingSchema locale={locale} />
      <Navigation locale={locale} />
      <main className="max-w-5xl mx-auto px-6 pt-16 pb-32">
        <WritingHeader locale={locale} />
        <WritingList locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
