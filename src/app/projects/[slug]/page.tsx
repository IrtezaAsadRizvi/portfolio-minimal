import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import Reveal from "@/components/Reveal";
import { caseStudies, caseStudySlugs } from "@/data/en/case-studies";
import { buildMetadata } from "@/lib/metadata";
import enProjects from "@/data/en/projects.json";

const SITE_URL = "https://irtezaasadrizvi.github.io";

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) return {};
  return buildMetadata("en", `/projects/${slug}`, {
    title: study.metaTitle,
    description: study.metaDescription,
  });
}

export default async function ProjectCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) notFound();

  const project = enProjects.projects.find(
    (p) => "slug" in p && (p as { slug?: string }).slug === slug,
  );

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: study.title,
    description: study.metaDescription,
    url: `${SITE_URL}/projects/${slug}`,
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
    inLanguage: "en",
    isAccessibleForFree: true,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/projects/${slug}`,
    },
  };

  return (
    <>
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
          { name: study.title, href: `/projects/${slug}` },
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
              {study.tagline}
            </p>
            <h1 className="text-4xl text-primary tracking-tight mb-6 leading-[1.15]">
              {study.title}
            </h1>
            <p className="text-lg text-on-surface-variant leading-relaxed max-w-2xl">
              {study.intro}
            </p>
          </Reveal>

          {project?.stack && project.stack.length > 0 && (
            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-wrap gap-3 text-[11px] font-mono text-accent/80">
                {project.stack.map((tech) => (
                  <span key={tech}>[{tech}]</span>
                ))}
              </div>
            </Reveal>
          )}

          <Reveal delay={0.15}>
            <div className="my-12 flex flex-wrap gap-4">
              <Link
                href={study.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-background px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-widest hover:bg-accent/80 hover-lift transition-colors duration-300"
              >
                View on GitHub
              </Link>
              <Link
                href="/contact"
                className="border border-outline-variant text-primary px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-widest hover:border-accent hover:text-accent hover-lift transition-all duration-300"
              >
                Hire me for similar work
              </Link>
            </div>
          </Reveal>

          <div className="mt-16 space-y-12">
            {study.sections.map((section, i) => (
              <Reveal key={section.heading} delay={0.05 * i}>
                <section>
                  <h2 className="text-[11px] uppercase tracking-widest text-on-surface-variant/80 font-mono mb-4">
                    {section.heading}
                  </h2>
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
                </section>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-20 pt-12 border-t border-outline-variant/20 flex flex-wrap gap-6 text-sm">
              <Link
                href="/projects"
                className="text-on-surface-variant hover:text-accent transition-colors"
              >
                ← All projects
              </Link>
              <Link
                href="/ai"
                className="text-on-surface-variant hover:text-accent transition-colors"
              >
                More on AI engineering →
              </Link>
              <Link
                href="/writing"
                className="text-on-surface-variant hover:text-accent transition-colors"
              >
                Writing on AI & engineering →
              </Link>
            </div>
          </Reveal>
        </article>
      </main>
      <Footer locale="en" />
    </>
  );
}
