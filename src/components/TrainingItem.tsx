"use client";

import type { TrainingItemData } from "./TrainingModal";

interface TrainingItemProps {
  item: TrainingItemData;
  onSelect: (item: TrainingItemData) => void;
}

export default function TrainingItem({ item, onSelect }: TrainingItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      aria-label={`${item.viewLabel.replace(/[→←]/g, "").trim()}: ${item.title}`}
      className="group w-full text-start"
    >
      <article className="grid grid-cols-[auto_1fr_auto] gap-x-5 gap-y-1 items-start">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.providerIcon}
          alt={item.provider}
          width={40}
          height={40}
          loading="lazy"
          decoding="async"
          className="row-span-2 mt-1 w-10 h-10 object-contain"
        />

        <div className="min-w-0">
          <h3 className="text-primary font-medium group-hover:text-accent transition-colors">
            {item.title}
          </h3>
          <p className="text-on-surface-variant/80 text-sm mb-2">
            {item.provider}
            <span className="text-on-surface-variant/60"> · {item.tag}</span>
          </p>
          <p className="text-on-surface-variant text-sm max-w-xl">
            {item.description}
          </p>
          <span className="inline-block mt-3 text-accent text-sm nav-link pb-0.5">
            {item.viewLabel}
          </span>
        </div>

        <div className="text-accent/80 text-sm font-mono tabular-nums text-end mt-1">
          {item.period}
        </div>
      </article>
    </button>
  );
}
