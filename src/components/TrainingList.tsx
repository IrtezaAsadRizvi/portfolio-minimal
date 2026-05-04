"use client";

import { useMemo, useState } from "react";
import { getContent, type Locale } from "@/lib/i18n";
import Reveal from "./Reveal";
import TrainingFilters from "./TrainingFilters";
import TrainingItem from "./TrainingItem";
import TrainingModal, { type TrainingItemData } from "./TrainingModal";

interface TrainingListProps {
  locale: Locale;
  includeOnly?: string[];
  excludeCategories?: string[];
  sectionTitle?: string;
}

export default function TrainingList({
  locale,
  includeOnly,
  excludeCategories,
  sectionTitle,
}: TrainingListProps) {
  const training = getContent(locale).about.training;

  const allItems = training.items as TrainingItemData[];
  const visibleItems = useMemo(() => {
    if (includeOnly?.length) {
      return allItems.filter((it) => includeOnly.includes(it.category));
    }
    if (excludeCategories?.length) {
      return allItems.filter((it) => !excludeCategories.includes(it.category));
    }
    return allItems;
  }, [allItems, includeOnly, excludeCategories]);

  const visibleCategories = useMemo(() => {
    return training.categories.filter((c) => {
      if (c.key === "All") return true;
      if (includeOnly?.length) return includeOnly.includes(c.key);
      if (excludeCategories?.length) return !excludeCategories.includes(c.key);
      return true;
    });
  }, [training.categories, includeOnly, excludeCategories]);

  const showFilterRow = visibleCategories.length > 2;

  const [activeCategory, setActiveCategory] = useState<string>(
    visibleCategories[0]?.key ?? "All"
  );
  const [selected, setSelected] = useState<TrainingItemData | null>(null);

  const filteredItems = useMemo(() => {
    if (!showFilterRow || activeCategory === "All") return visibleItems;
    return visibleItems.filter((it) => it.category === activeCategory);
  }, [visibleItems, activeCategory, showFilterRow]);

  if (visibleItems.length === 0) return null;

  const title = sectionTitle ?? training.sectionTitle;

  return (
    <section className="mb-24">
      <Reveal>
        <h2 className="text-[11px] uppercase tracking-widest text-on-surface-variant/80 font-mono mb-10">
          {title}
        </h2>
      </Reveal>

      {showFilterRow && (
        <Reveal delay={0.05}>
          <TrainingFilters
            categories={visibleCategories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </Reveal>
      )}

      <div className="space-y-12">
        {filteredItems.map((item, i) => (
          <Reveal key={item.slug} delay={i * 0.08}>
            <TrainingItem item={item} onSelect={setSelected} />
          </Reveal>
        ))}
      </div>

      <TrainingModal item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
