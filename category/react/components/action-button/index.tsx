"use client";

import { useState } from "react";
import { ArrowUpRightIcon, CheckIcon } from "@phosphor-icons/react";
import "./styles.css";

/** Adapted from VengeanceUI AnimatedButton (MIT); preserves the confirmation toggle. */
export default function ActionButton({
  label = "Start building",
}: {
  label?: string;
}) {
  const [saved, setSaved] = useState(false);
  return (
    <button
      className="vng-action-button"
      onClick={() => setSaved(!saved)}
      aria-pressed={saved}
    >
      <span>{saved ? "Ready to build" : label}</span>
      {saved ? (
        <CheckIcon size={16} aria-hidden="true" />
      ) : (
        <ArrowUpRightIcon size={16} aria-hidden="true" />
      )}
    </button>
  );
}
