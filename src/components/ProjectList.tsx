"use client";

import { useState } from "react";
import { getContent, type Locale } from "@/lib/i18n";
import ProjectFilters from "./ProjectFilters";
import ProjectItem from "./ProjectItem";
import Reveal from "./Reveal";

export default function ProjectList({ locale }: { locale: Locale }) {
  const { categories, projects } = getContent(locale).projects;
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <>
      <ProjectFilters categories={categories} active={active} onChange={setActive} />
      <section className="space-y-16">
        {filtered.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.07}>
            <ProjectItem {...project} />
          </Reveal>
        ))}
      </section>
    </>
  );
}
