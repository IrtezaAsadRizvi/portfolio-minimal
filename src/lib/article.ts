import { readFileSync } from "node:fs";
import path from "node:path";
import type { NativePost } from "@/data/en/posts";

export interface Heading {
  id: string;
  text: string;
}

// "The fixes, ranked by effort" -> "the-fixes-ranked-by-effort"
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[`*_~[\]()]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// Older posts store plain-text sections; turn them into markdown
// so every post goes through the same renderer.
function sectionsToMarkdown(post: NativePost): string {
  return (post.sections ?? [])
    .map((s) => {
      const hashes = s.level === 3 ? "###" : "##";
      const body = [
        ...(s.paragraphs ?? []),
        (s.list ?? []).map((item) => `- ${item}`).join("\n"),
      ].filter(Boolean);
      return [`${hashes} ${s.heading}`, ...body].join("\n\n");
    })
    .join("\n\n");
}

export function getPostMarkdown(post: NativePost): string {
  if (post.bodyFile) {
    const file = path.join(process.cwd(), "src/content/writing", post.bodyFile);
    return readFileSync(file, "utf8");
  }
  return sectionsToMarkdown(post);
}

// Top-level (##) headings for the table of contents. Skips code fences.
export function getHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  let inFence = false;
  for (const line of markdown.split("\n")) {
    if (line.startsWith("```")) inFence = !inFence;
    if (inFence) continue;
    const m = line.match(/^##\s+(.+)$/);
    if (m) {
      const text = m[1].replace(/[`*_]/g, "").trim();
      headings.push({ id: slugify(text), text });
    }
  }
  return headings;
}

export function getReadingMinutes(markdown: string): number {
  const words = markdown.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}
