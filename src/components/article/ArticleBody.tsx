import { Children, isValidElement, type ReactNode } from "react";
import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify } from "@/lib/article";
import ArticleCode from "./ArticleCode";

// Flatten React children to plain text (for heading ids and code).
function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return textOf(node.props.children);
  }
  return "";
}

const components: Components = {
  h2: ({ children }) => (
    <h2 id={slugify(textOf(children))}>{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 id={slugify(textOf(children))}>{children}</h3>
  ),
  a: ({ href = "", children }) => {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  },
  // Fenced code: hand off to the client component with a copy button.
  pre: ({ children }) => {
    const codeEl = Children.toArray(children)[0];
    const className = isValidElement<{ className?: string }>(codeEl)
      ? codeEl.props.className ?? ""
      : "";
    const language = className.match(/language-(\w+)/)?.[1];
    return (
      <ArticleCode language={language} code={textOf(children).replace(/\n$/, "")} />
    );
  },
  // Wide tables scroll sideways on phones instead of breaking the layout.
  table: ({ children }) => (
    <div className="article-table">
      <table>{children}</table>
    </div>
  ),
};

export default function ArticleBody({ markdown }: { markdown: string }) {
  return (
    <div className="article-prose">
      <Markdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </Markdown>
    </div>
  );
}
