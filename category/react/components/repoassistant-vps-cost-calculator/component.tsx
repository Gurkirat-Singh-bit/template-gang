"use client";

import * as React from "react";
import {
  ArrowRightIcon as ArrowRight,
  MinusIcon as Minus,
  PlusIcon as Plus,
} from "@phosphor-icons/react";
import { CalPopupButton } from "./support/src/components/CalPopupButton";
// Per-app cost of a typical managed stack (frontend hosting + database +
// analytics/logs + storage/backups). One VPS is a flat monthly cost that hosts
// several small apps. Editable in one place if the market shifts.
const MANAGED_PER_APP = 65;
const VPS_MONTHLY = 12;
const SETUP_FEE = 39;
function usd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
function Column({
  label,
  monthly,
  yearly,
  featured,
}: {
  label: string;
  monthly: number;
  yearly: number;
  featured?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-5 md:p-6 ${featured ? "bg-ra-soft-green" : "bg-white border border-neutral-900/10"}`}
    >
      <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
        {label}
      </p>
      <p className="mt-2 text-4xl font-medium text-neutral-900">
        {usd(monthly)}
        <span className="text-base font-normal text-neutral-500"> /mo</span>
      </p>
      <p className="mt-1 text-sm text-neutral-500">{usd(yearly)} / year</p>
    </div>
  );
}
export function VpsCostCalculator() {
  const [apps, setApps] = React.useState(5);
  const managedMonthly = apps * MANAGED_PER_APP;
  const vpsMonthly = VPS_MONTHLY;
  const monthlySavings = Math.max(0, managedMonthly - vpsMonthly);
  const yearlySavings = monthlySavings * 12;
  function step(delta: number) {
    setApps((n) => Math.min(50, Math.max(1, n + delta)));
  }
  return (
    <div className="rounded-2xl border border-neutral-900/10 bg-white p-5 md:p-8">
      <h3 className="text-2xl font-medium text-neutral-900">
        VPS cost calculator
      </h3>
      <p className="mt-1 max-w-xl text-sm leading-relaxed text-neutral-500">
        One VPS you own can host several small apps. See what you&apos;d pay on
        a managed stack versus one server we set up for you.
      </p>

      {/* Single input */}
      <div className="mt-6 flex items-center justify-between gap-4 rounded-xl bg-neutral-50 px-4 py-3">
        <span className="text-sm font-medium text-neutral-900">
          Apps on one VPS
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Fewer apps"
            className="grid size-9 place-items-center rounded-lg border border-neutral-900/15 text-neutral-900 transition-colors hover:bg-ra-soft-green disabled:opacity-40"
            disabled={apps <= 1}
          >
            <Minus className="size-4" />
          </button>
          <span className="w-8 text-center text-2xl font-medium text-neutral-900">
            {apps}
          </span>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="More apps"
            className="grid size-9 place-items-center rounded-lg border border-neutral-900/15 text-neutral-900 transition-colors hover:bg-ra-soft-green disabled:opacity-40"
            disabled={apps >= 50}
          >
            <Plus className="size-4" />
          </button>
        </div>
      </div>

      {/* Two-column comparison */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Column
          label="Managed stack"
          monthly={managedMonthly}
          yearly={managedMonthly * 12}
        />
        <Column
          label="Your VPS + us"
          monthly={vpsMonthly}
          yearly={vpsMonthly * 12}
          featured
        />
      </div>

      {/* Savings + CTA */}
      <div className="mt-4 flex flex-col gap-4 rounded-2xl bg-neutral-900 p-5 text-white md:flex-row md:items-center md:justify-between md:p-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider opacity-70">
            You save
          </p>
          <p className="mt-1 text-2xl font-medium md:text-3xl">
            ~{usd(monthlySavings)} / mo · {usd(yearlySavings)} / yr
          </p>
          <p className="mt-1 text-sm opacity-70">
            One-time setup from {usd(SETUP_FEE)}. You own the server and every
            credential.
          </p>
        </div>
        <CalPopupButton className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 font-mono text-sm uppercase text-neutral-900 transition-colors hover:bg-neutral-100">
          Book a meeting <ArrowRight className="size-4" />
        </CalPopupButton>
      </div>
    </div>
  );
}
