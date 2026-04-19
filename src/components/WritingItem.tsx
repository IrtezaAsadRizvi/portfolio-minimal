import Link from "next/link";

interface WritingItemProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  href: string;
}

export default function WritingItem({
  title,
  excerpt,
  category,
  date,
  href,
}: WritingItemProps) {
  return (
    <Link href={href} className="group block item-reveal">
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-lg font-medium text-primary group-hover:text-accent transition-colors duration-300">
              {title}
            </h2>
            <span className="text-[10px] text-on-surface-variant/60 font-mono tracking-tighter uppercase">
              [{category}]
            </span>
          </div>
          <p className="text-on-surface-variant text-sm max-w-2xl leading-relaxed">
            {excerpt}
          </p>
        </div>
        <div className="flex items-center gap-3 mt-2 md:mt-0 shrink-0">
          <span className="text-accent/30 text-xs font-mono">{date}</span>
          <span className="material-symbols-outlined text-sm text-on-surface-variant/30 group-hover:text-accent transition-all duration-300 group-hover:translate-x-0.5">
            north_east
          </span>
        </div>
      </div>
    </Link>
  );
}
