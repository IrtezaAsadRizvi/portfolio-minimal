import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import Reveal from "@/components/Reveal";
import { nativePosts, nativePostSlugs } from "@/data/en/posts";
import { buildMetadata } from "@/lib/metadata";

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
      <main className="max-w-3xl mx-auto px-6 pt-16 pb-32">
        <article>
          <Reveal>
            <div className="accent-rule mb-6" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/80 font-mono mb-4">
              [{post.category}] · {post.dateLabel}
            </p>
            <h1 className="text-4xl text-primary tracking-tight mb-6 leading-[1.15]">
              {post.title}
            </h1>
            <p className="text-lg text-on-surface-variant leading-relaxed max-w-2xl">
              {post.excerpt}
            </p>
          </Reveal>

          {post.tldr.length > 0 && (
            <Reveal delay={0.1}>
              <aside className="my-12 bg-surface-container-low border-l-2 border-accent p-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-accent/80 font-mono mb-3">
                  TL;DR
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant leading-relaxed">
                  {post.tldr.map((line, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-accent/70">-</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </Reveal>
          )}

          <div className="space-y-12 mt-12">
            {post.sections.map((section, i) => {
              const HeadingTag = section.level === 3 ? "h3" : "h2";
              const headingClass =
                section.level === 3
                  ? "text-xl text-primary font-medium tracking-tight mb-4"
                  : "text-2xl text-primary tracking-tight mb-6";
              return (
                <Reveal key={`${section.heading}-${i}`} delay={0.04 * i}>
                  <section>
                    <HeadingTag className={headingClass}>
                      {section.heading}
                    </HeadingTag>
                    {section.paragraphs && section.paragraphs.length > 0 && (
                      <div className="space-y-4">
                        {section.paragraphs.map((p, j) => (
                          <p
                            key={j}
                            className="text-on-surface text-base leading-relaxed"
                          >
                            {p}
                          </p>
                        ))}
                      </div>
                    )}
                    {section.list && section.list.length > 0 && (
                      <ul className="space-y-2 text-on-surface text-base leading-relaxed">
                        {section.list.map((item, j) => (
                          <li key={j} className="flex gap-3">
                            <span className="text-accent/70 shrink-0">-</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-20 pt-12 border-t border-outline-variant/20 flex flex-wrap gap-6 text-sm">
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
          </Reveal>
        </article>
      </main>
      <Footer locale="en" />
    </>
  );
}
