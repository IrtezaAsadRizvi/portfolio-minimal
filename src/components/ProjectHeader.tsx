import content from "@/data/projects.json";

const { title, description } = content.header;

export default function ProjectHeader() {
  return (
    <div className="mb-12 animate-in">
      <div className="accent-rule mb-6" />
      <h1 className="text-4xl tracking-tight text-primary mb-4">
        {title}
      </h1>
      <p className="text-on-surface-variant max-w-xl leading-relaxed">
        {description}
      </p>
    </div>
  );
}
