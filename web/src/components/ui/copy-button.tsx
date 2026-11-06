"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { Button } from "./button";

/** Adapted from VengeanceUI CopyButton, with error feedback that keeps source visible. */
export function CopyButton({
  text,
  label = "Copy",
  disabled = false,
}: {
  text: string;
  label?: string;
  disabled?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  useEffect(() => {
    if (status === "idle") return;
    const timeout = setTimeout(() => setStatus("idle"), 2500);
    return () => clearTimeout(timeout);
  }, [status]);
  return (
    <span className="copy-control">
      <Button
        variant="ghost"
        size="sm"
        disabled={disabled}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(text);
            setStatus("copied");
          } catch {
            setStatus("error");
          }
        }}
      >
        {status === "copied" ? <CheckIcon /> : <CopyIcon />}
        {status === "copied" ? "Copied" : label}
      </Button>
      <span
        className={status === "error" ? "copy-error" : "sr-only"}
        role="status"
      >
        {status === "error"
          ? "Copy unavailable. Select the text to copy manually."
          : status === "copied"
            ? "Copied to clipboard."
            : ""}
      </span>
    </span>
  );
}
