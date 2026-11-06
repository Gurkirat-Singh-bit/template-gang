"use client";

import * as React from "react";
import {
  ArrowRightIcon as ArrowRight,
  HardDrivesIcon as Server,
} from "@phosphor-icons/react";
import { CalPopupButton } from "./support/src/components/CalPopupButton";
type AppType = "static" | "next" | "api" | "fullstack";
const appProfiles: Record<
  AppType,
  {
    label: string;
    ramMb: number;
    cpuShare: number;
    note: string;
  }
> = {
  static: {
    label: "Static / Vite app",
    ramMb: 80,
    cpuShare: 0.08,
    note: "Mostly served by the reverse proxy. Good fit for many small marketing apps.",
  },
  next: {
    label: "Small Next.js app",
    ramMb: 300,
    cpuShare: 0.2,
    note: "Assumes a modest Node process, not heavy SSR on every request.",
  },
  api: {
    label: "Small API worker",
    ramMb: 220,
    cpuShare: 0.18,
    note: "Good for light FastAPI/Express-style APIs with modest traffic.",
  },
  fullstack: {
    label: "Full-stack app + worker",
    ramMb: 550,
    cpuShare: 0.35,
    note: "More conservative. Includes background jobs or heavier runtime.",
  },
};
function NumberField({
  label,
  value,
  onChange,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  suffix?: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
        {label}
      </span>
      <span className="flex items-center rounded-lg border border-neutral-900/15 bg-neutral-50 px-3 py-2">
        <input
          type="number"
          min="0"
          value={value}
          onChange={(event) => onChange(Number(event.target.value || 0))}
          className="w-full bg-transparent text-base font-medium text-neutral-900 outline-none"
        />
        {suffix ? (
          <span className="text-xs font-medium text-neutral-500">{suffix}</span>
        ) : null}
      </span>
    </label>
  );
}
export function VpsCapacityEstimator() {
  const [ramGb, setRamGb] = React.useState(4);
  const [cpuCores, setCpuCores] = React.useState(2);
  const [systemReserve, setSystemReserve] = React.useState(900);
  const [dbReserve, setDbReserve] = React.useState(700);
  const [appType, setAppType] = React.useState<AppType>("next");
  const profile = appProfiles[appType];
  const usableRamMb = Math.max(0, ramGb * 1024 - systemReserve - dbReserve);
  const ramLimited = Math.floor(usableRamMb / profile.ramMb);
  const cpuLimited = Math.floor(cpuCores / profile.cpuShare);
  const estimatedApps = Math.max(0, Math.min(ramLimited, cpuLimited));
  const conservativeApps = Math.max(0, Math.floor(estimatedApps * 0.7));
  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="rounded-2xl border border-neutral-900/10 bg-white p-5 md:p-7">
        <div className="mb-6 flex items-start gap-3">
          <div className="rounded-xl bg-ra-soft-green p-3">
            <Server className="size-5 text-neutral-900" />
          </div>
          <div>
            <h3 className="text-2xl font-medium text-neutral-900">
              VPS capacity estimator
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-neutral-500">
              Estimate how many small apps a VPS can run using conservative RAM
              and CPU assumptions. This is planning math, not a load test.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField
            label="VPS RAM"
            value={ramGb}
            onChange={setRamGb}
            suffix="GB"
          />
          <NumberField
            label="CPU cores"
            value={cpuCores}
            onChange={setCpuCores}
            suffix="cores"
          />
          <NumberField
            label="System reserve"
            value={systemReserve}
            onChange={setSystemReserve}
            suffix="MB"
          />
          <NumberField
            label="Database reserve"
            value={dbReserve}
            onChange={setDbReserve}
            suffix="MB"
          />
        </div>

        <div className="mt-5">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-neutral-500">
            App profile
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {(Object.keys(appProfiles) as AppType[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setAppType(key)}
                className={`rounded-xl border px-3 py-3 text-left transition-colors ${
                  appType === key
                    ? "border-neutral-900 bg-ra-soft-green"
                    : "border-neutral-900/10 bg-neutral-50 hover:border-neutral-900"
                }`}
              >
                <span className="block text-sm font-medium text-neutral-900">
                  {appProfiles[key].label}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-neutral-500">
                  {appProfiles[key].ramMb}MB RAM, {appProfiles[key].cpuShare}{" "}
                  CPU share each
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <aside className="rounded-2xl bg-ra-soft-green p-6 md:p-7">
        <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
          Conservative estimate
        </p>
        <p className="mt-2 text-6xl font-medium text-neutral-900">
          {conservativeApps}
        </p>
        <p className="mt-1 text-sm font-medium text-neutral-700">
          small {profile.label.toLowerCase()} projects on this VPS
        </p>

        <div className="mt-6 grid gap-3">
          <div className="rounded-xl border border-neutral-900/10 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Usable app RAM
            </p>
            <p className="mt-1 text-2xl font-medium text-neutral-900">
              {usableRamMb}MB
            </p>
          </div>
          <div className="rounded-xl border border-neutral-900/10 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Why conservative?
            </p>
            <p className="mt-1 text-sm leading-relaxed text-neutral-500">
              The result keeps roughly 30% headroom for spikes, deploys, logs,
              backups, and unexpected memory growth.
            </p>
          </div>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-neutral-600">
          {profile.note} Split services when traffic grows, database memory
          rises, or one app becomes important enough to deserve its own box.
        </p>

        <CalPopupButton className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3 px-5 font-mono text-sm uppercase rounded-lg bg-neutral-900 text-white hover:bg-neutral-700 transition-colors duration-300">
          Book a meeting <ArrowRight className="size-4" />
        </CalPopupButton>
      </aside>
    </div>
  );
}
