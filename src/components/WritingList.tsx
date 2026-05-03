"use client";

import { useState } from "react";
import { getContent, type Locale } from "@/lib/i18n";
import WritingFilters from "./WritingFilters";
import WritingItem from "./WritingItem";
import Reveal from "./Reveal";

export default function WritingList({ locale }: { locale: Locale }) {
  const { categories, posts } = getContent(locale).writing;
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? posts
      : posts.filter((p) => p.category === active);

  return (
    <>
      <WritingFilters categories={categories} active={active} onChange={setActive} />
      <section className="space-y-12">
        {filtered.map((post, i) => (
          <Reveal key={post.title} delay={i * 0.06}>
            <WritingItem {...post} />
          </Reveal>
        ))}
      </section>
    </>
  );
}
