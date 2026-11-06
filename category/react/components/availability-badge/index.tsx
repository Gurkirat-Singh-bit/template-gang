"use client";

import { useState } from "react";

/** A compact status control with semantic color and the shared neutral surface. */
export default function AvailabilityBadge() {
  const [available, setAvailable] = useState(true);
  return (
    <button
      aria-pressed={available}
      onClick={() => setAvailable(!available)}
      className="inline-flex items-center gap-2.5 rounded-full border border-[var(--vng-border,#282828)] bg-[var(--vng-background,#080808)] px-4 py-2 text-[var(--vng-foreground,#ededed)] shadow-xs transition-colors hover:bg-[var(--vng-secondary,#1a1a1a)] focus-visible:outline-2 focus-visible:outline-offset-4"
    >
      <span
        className={`size-1.5 rounded-full ${available ? "bg-green-600" : "bg-amber-500"}`}
        aria-hidden="true"
      />
      <span className="text-sm leading-5 font-medium">
        {available ? "Available for new ideas" : "Heads down, building"}
      </span>
    </button>
  );
}
