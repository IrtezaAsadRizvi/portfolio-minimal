"use client";

interface Category {
  key: string;
  label: string;
}

interface WritingFiltersProps {
  categories: Category[];
  active: string;
  onChange: (category: string) => void;
}

export default function WritingFilters({
  categories,
  active,
  onChange,
}: WritingFiltersProps) {
  return (
    <nav className="flex gap-8 border-b border-outline-variant/20 pb-2 mb-16">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onChange(cat.key)}
          className={`text-[11px] font-mono uppercase tracking-[0.2em] pb-2 transition-colors ${
            active === cat.key
              ? "text-accent border-b border-accent -mb-[9px]"
              : "text-on-surface-variant/70 hover:text-primary"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </nav>
  );
}
