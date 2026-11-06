import type { CSSProperties } from "react";

export function Skeleton({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={`skeleton ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

export function PreviewSkeleton() {
  return (
    <div
      className="preview-skeleton"
      role="status"
      aria-label="Loading preview"
    >
      <Skeleton className="skeleton-preview-control" />
      <span className="sr-only">Loading preview…</span>
    </div>
  );
}

export function CodeSkeleton() {
  return (
    <div className="code-skeleton" role="status" aria-label="Loading source">
      <span className="sr-only">Loading source…</span>
      {[72, 48, 84, 62, 45, 76, 90, 56, 68, 40, 78, 50].map((width, index) => (
        <Skeleton key={index} style={{ width: `${width}%` }} />
      ))}
    </div>
  );
}

export function DocumentSkeleton() {
  return (
    <div
      className="document-skeleton"
      role="status"
      aria-label="Loading documentation"
    >
      <span className="sr-only">Loading documentation…</span>
      <Skeleton className="skeleton-doc-heading" />
      {[100, 90, 72].map((width) => (
        <Skeleton key={width} style={{ width: `${width}%` }} />
      ))}
      <Skeleton className="skeleton-doc-subheading" />
      {[95, 82, 100].map((width) => (
        <Skeleton key={width} style={{ width: `${width}%` }} />
      ))}
      <Skeleton className="skeleton-doc-block" />
    </div>
  );
}
