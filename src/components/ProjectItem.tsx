import Link from "next/link";

interface ProjectItemProps {
  title: string;
  tag: string;
  description: string;
  stack: string[];
  link: {
    label: string;
    href: string;
  };
}

export default function ProjectItem({
  title,
  tag,
  description,
  stack,
  link,
}: ProjectItemProps) {
  return (
    <Link
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group item-reveal relative flex flex-col md:flex-row md:items-baseline md:justify-between gap-2"
    >
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-lg font-medium text-primary group-hover:text-accent transition-colors duration-300">
            {title}
          </h2>
          <span className="text-[10px] text-on-surface-variant/60 font-mono tracking-tighter uppercase">
            [{tag}]
          </span>
        </div>
        <p className="text-on-surface-variant text-sm mb-3 max-w-2xl leading-relaxed">
          {description}
        </p>
        <div className="flex gap-4 text-[11px] font-mono text-accent/30">
          {stack.map((tech) => (
            <span key={tech}>[{tech}]</span>
          ))}
        </div>
      </div>
      <div className="mt-4 md:mt-0">
        <span className="project-link flex items-center gap-1 text-sm text-on-surface-variant/50 group-hover:text-accent transition-colors duration-300">
          {link.label}
          <span className="material-symbols-outlined arrow text-sm">
            north_east
          </span>
        </span>
      </div>
    </Link>
  );
}
