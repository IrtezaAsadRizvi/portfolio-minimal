import content from "@/data/about.json";

const { title, description } = content.header;

export default function AboutHeader() {
  return (
    <section className="mb-24 animate-in">
      <div className="accent-rule mb-6" />
      <h1 className="text-4xl text-primary tracking-tight mb-4">
        {title}
      </h1>
      <p className="text-on-surface-variant max-w-2xl leading-relaxed">
        {description}
      </p>
    </section>
  );
}
