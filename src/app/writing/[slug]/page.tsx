import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import Reveal from "@/components/Reveal";
import { nativePosts, nativePostSlugs } from "@/data/en/posts";
import { buildMetadata } from "@/lib/metadata";
import { getHeadings, getPostMarkdown, getReadingMinutes } from "@/lib/article";
import ArticleBody from "@/components/article/ArticleBody";
import ReadingProgress from "@/components/article/ReadingProgress";
import TableOfContents from "@/components/article/TableOfContents";

const SITE_URL = "https://irtezaasadrizvi.github.io";

export function generateStaticParams() {
  return nativePostSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = nativePosts[slug];
  if (!post) return {};
  return buildMetadata("en", `/writing/${slug}`, {
    title: post.metaTitle,
    description: post.metaDescription,
  });
}

export default async function NativePostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = nativePosts[slug];
  if (!post) notFound();

  const markdown = getPostMarkdown(post);
  const headings = getHeadings(markdown);
  const minutes = getReadingMinutes(markdown);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    url: `${SITE_URL}/writing/${slug}`,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    articleSection: post.category,
    inLanguage: "en",
    isAccessibleForFree: true,
    author: {
      "@type": "Person",
      name: "Irteza Asad Rizvi",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Irteza Asad Rizvi",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/writing/${slug}`,
    },
  };

  return (
    <>
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "Writing", href: "/writing" },
          { name: post.title, href: `/writing/${slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Navigation locale="en" />
      <ReadingProgress />
      <main className="max-w-6xl mx-auto px-6 pt-16 pb-32">
        <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_15rem] xl:gap-16">
          <article className="max-w-[42rem] mx-auto xl:mx-0 xl:ml-auto w-full">
            <Reveal>
              <header className="mb-14">
                <div className="accent-rule mb-8" />
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.25em] text-on-surface-variant/80 font-mono mb-6">
                  <span className="text-accent/90">{post.category}</span>
                  <span aria-hidden className="text-outline">/</span>
                  <time dateTime={post.date}>{post.dateLabel}</time>
                  <span aria-hidden className="text-outline">/</span>
                  <span>{minutes} min read</span>
                </p>
                <h1 className="text-[2.5rem] sm:text-5xl md:text-[3.5rem] text-primary tracking-tight leading-[1.08] mb-8 text-balance">
                  {post.title}
                </h1>
                {/* Markdown posts render exactly as written, so no extra summary here. */}
                {!post.bodyFile && (
                  <p className="text-lg sm:text-xl text-on-surface-variant leading-relaxed text-pretty">
                    {post.excerpt}
                  </p>
                )}
                <p className="mt-8 pt-6 border-t border-outline-variant/30 text-sm text-on-surface-variant/80">
                  By <span className="text-on-surface">Irteza Asad Rizvi</span>
                </p>
              </header>
            </Reveal>

            {post.tldr.length > 0 && (
              <Reveal delay={0.08}>
                <aside className="mb-14 rounded-sm bg-surface-container-low/70 border border-outline-variant/30 p-6 sm:p-7">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-accent/90 font-mono mb-4">
                    TL;DR
                  </p>
                  <ul className="space-y-3 text-[15px] text-on-surface/90 leading-relaxed">
                    {post.tldr.map((line, i) => (
                      <li key={i} className="flex gap-3">
                        <span aria-hidden className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </aside>
              </Reveal>
            )}

            <Reveal delay={0.12}>
              <ArticleBody markdown={markdown} />
            </Reveal>

            <div className="mt-20 pt-10 border-t border-outline-variant/30 flex flex-wrap gap-x-8 gap-y-4 text-sm">
              <Link
                href="/writing"
                className="text-on-surface-variant hover:text-accent transition-colors"
              >
                ← All writing
              </Link>
              <Link
                href="/projects"
                className="text-on-surface-variant hover:text-accent transition-colors"
              >
                See the projects →
              </Link>
              <Link
                href="/contact"
                className="text-accent hover:text-primary transition-colors"
              >
                Hire me →
              </Link>
            </div>
          </article>

          <aside className="hidden xl:block">
            <div className="sticky top-24 pt-2">
              <TableOfContents headings={headings} />
            </div>
          </aside>
        </div>
      </main>
      <Footer locale="en" />
    </>
  );
}
