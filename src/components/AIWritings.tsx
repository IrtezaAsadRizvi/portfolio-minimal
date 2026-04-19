import Link from "next/link";
import aiContent from "@/data/ai.json";
import writingData from "@/data/writing.json";
import Reveal from "./Reveal";

const { sectionTitle } = aiContent.writings;
const posts = writingData.posts.filter((p) => p.category === "AI");

export default function AIWritings() {
  return (
    <section className="mb-12">
      <Reveal>
        <h2 className="text-[11px] font-mono text-on-surface-variant/60 uppercase tracking-widest mb-8">
          {sectionTitle}
        </h2>
      </Reveal>
      <div className="space-y-6">
        {posts.map((post, i) => (
          <Reveal key={post.title} delay={i * 0.08}>
            <Link href={post.href} className="group block">
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-1">
                <h3 className="text-primary group-hover:text-accent transition-colors duration-300 nav-link">
                  {post.title}
                </h3>
                <span className="text-accent/40 text-xs font-mono shrink-0">
                  {post.date}
                </span>
              </div>
              <p className="text-on-surface-variant/70 text-sm max-w-2xl mt-1 leading-relaxed">
                {post.excerpt}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
