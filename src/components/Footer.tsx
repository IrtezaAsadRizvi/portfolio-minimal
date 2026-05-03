import content from "@/data/en.json";

const { copyright, tagline } = content.footer;

export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row justify-between items-center w-full px-6 py-12 max-w-5xl mx-auto border-t border-outline-variant/10">
      <div className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/70 font-mono mb-4 md:mb-0">
        {copyright}
      </div>
      <div className="font-mono text-[10px] text-accent/80 tracking-wider">
        {tagline}
      </div>
    </footer>
  );
}
