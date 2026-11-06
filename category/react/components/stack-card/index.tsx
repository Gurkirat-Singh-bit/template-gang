"use client";

import { useState } from "react";
import { CheckIcon, FolderSimpleIcon, PlusIcon } from "@phosphor-icons/react";

/** A project card using the shared VengeanceUI palette, radii and spacing. */
export default function StackCard() {
  const [saved, setSaved] = useState(false);
  return (
    <div className="w-full max-w-[320px] rounded-[var(--vng-radius-lg,8px)] border border-[var(--vng-border,#282828)] bg-[var(--vng-background,#080808)] p-6 text-[var(--vng-foreground,#ededed)] shadow-xs">
      <div className="mb-5 flex items-center justify-between">
        <FolderSimpleIcon size={22} weight="regular" />
        <span className="font-mono text-[11px] text-[var(--vng-muted-foreground,#a3a3a3)]">
          SIDE PROJECT
        </span>
      </div>
      <h2 className="text-lg leading-6 font-semibold tracking-tight">
        New project
      </h2>
      <p className="mt-2 text-sm leading-6 text-[var(--vng-muted-foreground,#a3a3a3)]">
        Your next starting point.
      </p>
      <div className="mt-5 flex items-center justify-between border-t border-[var(--vng-border,#282828)] pt-4">
        <span className="text-xs text-[var(--vng-muted-foreground,#a3a3a3)]">
          Ready to build
        </span>
        <button
          aria-pressed={saved}
          onClick={() => setSaved(!saved)}
          className="inline-flex h-8 items-center gap-1.5 rounded-[var(--vng-radius-md,6px)] border border-[var(--vng-border,#282828)] px-3 text-xs font-medium transition-colors hover:bg-[var(--vng-secondary,#1a1a1a)] focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {saved ? <CheckIcon size={14} /> : <PlusIcon size={14} />}
          {saved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
}
