"use client";

import { Highlight, themes } from "prism-react-renderer";

const languages: Record<string, string> = {
  ts: "typescript",
  tsx: "tsx",
  js: "javascript",
  jsx: "jsx",
  json: "json",
  css: "css",
  yml: "yaml",
  yaml: "yaml",
  sh: "bash",
  md: "markdown",
  html: "markup",
};

/** Matches the reference's light code surface, syntax colors and line-number rhythm. */
export function CodeBlock({
  code,
  file = "tsx",
}: {
  code: string;
  file?: string;
}) {
  const extension = file.split(".").at(-1) ?? "tsx";
  return (
    <Highlight
      theme={themes.vsDark}
      code={code.replace(/\n$/, "")}
      language={languages[extension] ?? "plain"}
    >
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre
          className="highlighted-code"
          tabIndex={0}
          aria-label={`${file} source code`}
        >
          <code>
            {tokens.map((line, index) => (
              <span
                key={index}
                {...getLineProps({ line })}
                className="code-line"
              >
                <span className="line-number" aria-hidden="true">
                  {index + 1}
                </span>
                <span>
                  {line.map((token, tokenIndex) => (
                    <span key={tokenIndex} {...getTokenProps({ token })} />
                  ))}
                </span>
                {"\n"}
              </span>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  );
}
