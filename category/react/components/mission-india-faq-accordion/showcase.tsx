"use client";

import { useState, type MouseEvent, type ReactNode } from "react";

/** Preview-only link isolation; reusable components keep their real links. */
export function ImportedPreview({
  children,
  integrationDemo = false,
  layout = "section",
}: {
  children: ReactNode;
  integrationDemo?: boolean;
  layout?: "section" | "contained" | "control";
}) {
  const [destination, setDestination] = useState("");
  function followLink(event: MouseEvent<HTMLDivElement>) {
    const link = (event.target as Element).closest("a");
    if (!link || link.target === "_blank") return;
    const href = link.getAttribute("href");
    if (!href || /^(https?:|mailto:|tel:)/.test(href)) return;
    event.preventDefault();
    event.stopPropagation();
    if (href.startsWith("#")) {
      const target = document.getElementById(href.slice(1));
      if (target) {
        target.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "auto"
            : "smooth",
        });
        return;
      }
    }
    setDestination(`Link destination: ${href}`);
  }
  return (
    <div
      className={`imported-preview imported-preview--${layout}`}
      onClickCapture={followLink}
    >
      {integrationDemo && (
        <div className="imported-preview-note">Local demo · no data sent</div>
      )}
      {children}
      {destination && (
        <div className="imported-preview-link" role="status">
          <span>{destination}</span>
          <button
            type="button"
            onClick={() => setDestination("")}
            aria-label="Dismiss link destination"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
