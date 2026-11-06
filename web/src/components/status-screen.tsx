import Link from "next/link";
import type { ReactNode } from "react";
import { Brand } from "./library-shell";
import { buttonClass } from "./ui/button";

export function StatusScreen({
  label,
  title,
  children,
  action,
}: {
  label: string;
  title: string;
  children?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <main className="status-page">
      <header className="status-header">
        <Brand />
      </header>
      <div className="status-content">
        <span className="section-kicker">{label}</span>
        <h1>{title}</h1>
        {children}
        {action ?? (
          <Link className={buttonClass({ variant: "outline" })} href="/">
            Back to library
          </Link>
        )}
      </div>
    </main>
  );
}
