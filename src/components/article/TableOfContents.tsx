"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/article";

// Sticky "On this page" list; highlights the section currently in view.
export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    // Active = the last heading that has scrolled past the top third.
    const update = () => {
      const line = window.innerHeight / 3;
      let current = els[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label="On this page">
      <p className="text-[10px] uppercase tracking-[0.3em] font-mono text-on-surface-variant/70 mb-4">
        On this page
      </p>
      <ol className="space-y-1 border-l border-outline-variant/40">
        {headings.map((h) => {
          const isActive = h.id === active;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`block -ml-px border-l pl-4 py-1.5 text-[13px] leading-snug transition-colors ${
                  isActive
                    ? "border-accent text-primary"
                    : "border-transparent text-on-surface-variant/70 hover:text-on-surface"
                }`}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
