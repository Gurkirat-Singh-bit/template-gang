"use client";

import { PreviewFallback } from "@/components/preview-fallback";

export default function PreviewError({ reset }: { reset: () => void }) {
  return (
    <main className="preview-page">
      <PreviewFallback
        description="This component couldn’t be rendered."
        onRetry={reset}
      />
    </main>
  );
}
