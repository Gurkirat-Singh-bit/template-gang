import type { ComponentProps } from "react";

/** Adapted from VengeanceUI's MIT-licensed button. See THIRD_PARTY_NOTICES.md. */
export type ButtonVariant = "primary" | "outline" | "secondary" | "ghost";
export type ButtonSize = "default" | "sm" | "icon";

export function buttonClass({
  variant = "primary",
  size = "default",
  className = "",
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  return `ui-button ui-button--${variant} ui-button--${size} ${className}`.trim();
}

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ComponentProps<"button"> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return (
    <button
      type={type}
      className={buttonClass({ variant, size, className })}
      {...props}
    />
  );
}
