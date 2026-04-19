"use client";

import { useState } from "react";
import content from "@/data/projects.json";
import ProjectFilters from "./ProjectFilters";
import ProjectItem from "./ProjectItem";
import Reveal from "./Reveal";

const { projects } = content;

export default function ProjectList() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <>
      <ProjectFilters active={active} onChange={setActive} />
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
