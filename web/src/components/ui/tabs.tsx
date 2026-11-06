"use client";

import { useId, useRef, type ReactNode } from "react";

export interface TabOption<T extends string> {
  value: T;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

/** VengeanceUI's quiet segmented treatment with WAI-ARIA keyboard behavior. */
export function Tabs<T extends string>({
  label,
  value,
  onChange,
  options,
  variant = "segmented",
  id,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: TabOption<T>[];
  variant?: "segmented" | "underline";
  id?: string;
}) {
  const generatedId = useId();
  const prefix = id ?? generatedId;
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <div
      role="tablist"
      aria-label={label}
      className={`ui-tabs ui-tabs--${variant}`}
    >
      {options.map((option, index) => (
        <button
          key={option.value}
          ref={(element) => {
            buttons.current[index] = element;
          }}
          type="button"
          role="tab"
          id={`${prefix}-${option.value}-tab`}
          aria-controls={id ? `${id}-${option.value}-panel` : undefined}
          aria-selected={value === option.value}
          tabIndex={value === option.value ? 0 : -1}
          disabled={option.disabled}
          onClick={() => onChange(option.value)}
          onKeyDown={(event) => {
            if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key))
              return;
            event.preventDefault();
            const enabled = options
              .map((item, itemIndex) => (!item.disabled ? itemIndex : -1))
              .filter((itemIndex) => itemIndex >= 0);
            const current = enabled.indexOf(index);
            const next =
              event.key === "Home"
                ? enabled[0]
                : event.key === "End"
                  ? enabled.at(-1)!
                  : enabled[
                      (current +
                        (event.key === "ArrowRight" ? 1 : -1) +
                        enabled.length) %
                        enabled.length
                    ];
            buttons.current[next]?.focus();
            onChange(options[next].value);
          }}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
}
