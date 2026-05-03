"use client";

import content from "@/data/writing.json";

const { categories } = content;

interface WritingFiltersProps {
  active: string;
  onChange: (category: string) => void;
}

export default function WritingFilters({
  active,
  onChange,
}: WritingFiltersProps) {
  return (
    <nav className="flex gap-8 border-b border-outline-variant/20 pb-2 mb-16">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`text-[11px] font-mono uppercase tracking-[0.2em] pb-2 transition-colors ${
            active === cat
              ? "text-accent border-b border-accent -mb-[9px]"
              : "text-on-surface-variant/70 hover:text-primary"
          }`}
        >
          {cat}
        </button>
      ))}
    </nav>
  );
}
