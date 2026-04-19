"use client";

import { useState } from "react";
import content from "@/data/writing.json";
import WritingFilters from "./WritingFilters";
import WritingItem from "./WritingItem";
import Reveal from "./Reveal";

const { posts } = content;

export default function WritingList() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? posts
      : posts.filter((p) => p.category === active);

  return (
    <>
      <WritingFilters active={active} onChange={setActive} />
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
