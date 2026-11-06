"use client";

import type { ComponentProps } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CaretDownIcon, CheckIcon } from "@phosphor-icons/react";

/** Adapted from VengeanceUI Input; shared focus, invalid and disabled states. */
export function Input({ className = "", ...props }: ComponentProps<"input">) {
  return (
    <input data-slot="input" className={`ui-input ${className}`} {...props} />
  );
}

/** VengeanceUI's Radix select architecture, using the shared carbon tokens and Phosphor. */
export function Select({
  id,
  className = "",
  value,
  onValueChange,
  options,
  label,
  labelledBy,
  disabled = false,
}: {
  id?: string;
  className?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string; disabled?: boolean }[];
  label?: string;
  labelledBy?: string;
  disabled?: boolean;
}) {
  return (
    <SelectPrimitive.Root
      value={value}
      onValueChange={onValueChange}
      disabled={disabled || !options.length}
    >
      <SelectPrimitive.Trigger
        id={id}
        aria-label={label}
        aria-labelledby={labelledBy}
        className={`ui-input ui-select ${className}`}
      >
        <SelectPrimitive.Value placeholder="Select…" />
        <SelectPrimitive.Icon asChild>
          <CaretDownIcon size={14} />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          align="end"
          sideOffset={6}
          collisionPadding={12}
          className="ui-select-content"
        >
          <SelectPrimitive.Viewport className="ui-select-viewport">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="ui-select-item"
              >
                <SelectPrimitive.ItemIndicator className="ui-select-indicator">
                  <CheckIcon size={14} />
                </SelectPrimitive.ItemIndicator>
                <SelectPrimitive.ItemText>
                  {option.label}
                </SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
