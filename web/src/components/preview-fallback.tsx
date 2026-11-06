"use client";

import { CodeIcon } from "@phosphor-icons/react";
import { Button } from "./ui/button";

export function PreviewFallback({
  title = "Preview unavailable",
  description,
  onRetry,
}: {
  title?: string;
  description: string;
  onRetry?: () => void;
}) {
  return (
    <div className="preview-unavailable">
      <CodeIcon size={22} aria-hidden="true" />
      <h2>{title}</h2>
      <p>{description}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
