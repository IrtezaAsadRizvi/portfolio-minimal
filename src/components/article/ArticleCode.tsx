"use client";

import { useState } from "react";

interface ArticleCodeProps {
  language?: string;
  code: string;
}

// Fenced code block with a language label and a copy button.
export default function ArticleCode({ language, code }: ArticleCodeProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be blocked; nothing useful to do.
    }
  };

  return (
    <figure className="article-code">
      <figcaption className="flex items-center justify-between px-4 py-2 border-b border-outline-variant/30">
        <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-on-surface-variant/70">
          {language ?? "code"}
        </span>
        <button
          type="button"
          onClick={copy}
          className="text-[10px] uppercase tracking-[0.2em] font-mono text-on-surface-variant/70 hover:text-accent transition-colors"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </figcaption>
      <pre>
        <code>{code}</code>
      </pre>
    </figure>
  );
}
