import Link from "next/link";
import content from "@/data/en.json";
import Reveal from "./Reveal";

const { sectionTitle, posts } = content.latestWriting;

export default function LatestWriting() {
  return (
    <section className="mb-20 animate-in stagger-5">
      <h2 className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/60 font-mono mb-10">
        {sectionTitle}
      </h2>
      <div className="space-y-6">
        {posts.map((post, i) => (
          <Reveal key={post.title} delay={i * 0.1}>
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
              <Link
                href={post.href}
                className="text-primary hover:text-accent transition-colors duration-300 nav-link"
              >
                {post.title}
              </Link>
              <span className="text-accent/40 text-xs font-mono mt-0.5 md:mt-0">
                {post.date}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
