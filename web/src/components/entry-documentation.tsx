"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { CatalogEntry } from "@/lib/types";

export function EntryDocumentation({
  entry,
  onOpenFile,
}: {
  entry: CatalogEntry;
  onOpenFile: (file: string) => void;
}) {
  return (
    <article className="markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h2 className="doc-title">{children}</h2>,
          a: ({ href, children }) => {
            const local = href?.replace(/^\.\//, "").split("#")[0];
            return local && entry.files.includes(local) ? (
              <button className="doc-link" onClick={() => onOpenFile(local)}>
                {children}
              </button>
            ) : (
              <a
                href={href}
                target={href?.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
              >
                {children}
              </a>
            );
          },
        }}
      >
        {entry.readme ||
          `# ${entry.title}\n\nAdd a README.md to document setup and usage.\n\nThe source files are available in the Source code tab.`}
      </ReactMarkdown>
    </article>
  );
}
