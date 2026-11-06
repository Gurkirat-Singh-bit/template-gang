"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRightIcon as ArrowRight,
  CheckCircleIcon as CheckCircle2,
  CircleNotchIcon as Loader2,
  MagnifyingGlassIcon as Search,
  XCircleIcon as XCircle,
} from "@phosphor-icons/react";
type Check = {
  label: string;
  ok: boolean;
  detail: string;
};
export type Result = {
  url: string;
  finalUrl?: string;
  checks: Check[];
  error?: string;
};
export function LaunchUrlTester({
  testUrl = async (value: string): Promise<Result> => {
    const url = new URL(value.includes("://") ? value : `https://${value}`);
    if (!["http:", "https:"].includes(url.protocol))
      throw new Error("Enter an HTTP or HTTPS URL.");
    return {
      url: url.href,
      finalUrl: url.href,
      checks: [
        {
          label: "Demo response",
          ok: true,
          detail: "Local fixture only. No network request was made.",
        },
      ],
    };
  },
}: {
  testUrl?: (url: string) => Promise<Result>;
}) {
  const [url, setUrl] = React.useState("");
  const [result, setResult] = React.useState<Result | null>(null);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  async function runTest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const payload = await testUrl(url);
      setResult(payload);
    } catch {
      setError("Could not run the test. Try again.");
    } finally {
      setLoading(false);
    }
  }
  const passed = result?.checks.filter((check) => check.ok).length ?? 0;
  const total = result?.checks.length ?? 0;
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="min-w-0 rounded-2xl border border-neutral-900/10 bg-white p-5 md:p-7">
        <div className="mb-6 flex items-start gap-3">
          <div className="rounded-xl bg-ra-soft-green p-3">
            <Search className="size-5 text-neutral-900" />
          </div>
          <div>
            <h3 className="text-2xl font-medium text-neutral-900">
              Launch URL tester
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-neutral-500">
              Check whether a public URL responds, ends on HTTPS, returns HTML,
              and exposes basic crawl files.
            </p>
          </div>
        </div>

        <form onSubmit={runTest} className="grid gap-3">
          <label className="grid gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              Website URL
            </span>
            <input
              type="text"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="repoassistant.com"
              className="min-w-0 w-full rounded-lg border border-neutral-900/15 bg-neutral-50 px-4 py-3 text-base font-medium text-neutral-900 outline-none focus:border-neutral-900"
              required
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 py-3 px-5 font-mono text-sm uppercase rounded-lg bg-neutral-900 text-white hover:bg-neutral-700 transition-colors duration-300 disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Search className="size-4" />
            )}
            Test launch URL
          </button>
        </form>

        <p className="mt-4 text-xs leading-relaxed text-neutral-500">
          Demo mode uses a local fixture. Pass testUrl to connect your own
          endpoint.
        </p>
        {error ? (
          <p className="mt-4 rounded-lg border border-neutral-900/10 bg-neutral-50 p-3 text-sm font-medium text-neutral-900">
            {error}
          </p>
        ) : null}
      </div>

      <div className="min-w-0 rounded-2xl bg-ra-soft-green p-5 md:p-7">
        <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
          Result
        </p>
        {result ? (
          <>
            <h3 className="mt-2 text-4xl font-medium text-neutral-900">
              {passed}/{total} checks passed
            </h3>
            {result.finalUrl ? (
              <p className="mt-2 break-all text-xs font-medium text-neutral-600">
                Final URL: {result.finalUrl}
              </p>
            ) : null}
            {result.error ? (
              <p className="mt-4 rounded-lg border border-neutral-900/10 bg-white p-3 text-sm font-medium text-neutral-900">
                {result.error}
              </p>
            ) : null}
            <div className="mt-5 grid gap-3">
              {result.checks.map((check) => (
                <div
                  key={check.label}
                  className="rounded-xl border border-neutral-900/10 bg-white p-4"
                >
                  <div className="flex items-start gap-2">
                    {check.ok ? (
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-neutral-900" />
                    ) : (
                      <XCircle className="mt-0.5 size-4 shrink-0 text-neutral-400" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-neutral-900">
                        {check.label}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                        {check.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="mt-4 rounded-xl border border-neutral-900/10 bg-white p-5">
            <p className="text-sm font-medium text-neutral-900">
              Enter a public URL to see launch checks here.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-neutral-500">
              This is a lightweight smoke test, not a full security audit or
              uptime monitor.
            </p>
          </div>
        )}

        <Link
          prefetch={false}
          href="/#capabilities"
          className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3 px-5 font-mono text-sm uppercase rounded-lg bg-neutral-900 text-white hover:bg-neutral-700 transition-colors duration-300"
        >
          Fix my launch <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
