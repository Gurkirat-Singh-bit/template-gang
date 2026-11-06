import Link from "next/link";
import { ArrowUpRightIcon as ArrowUpRight } from "@phosphor-icons/react/ssr";
import { builders } from "./support/src/lib/builders";
import { platforms } from "./support/src/lib/compare";
export function DeployFrom() {
  return (
    <section className="bg-white rounded-xl px-5 py-10 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <p className="font-mono text-sm uppercase text-neutral-500">
              Deploy from any builder
            </p>
            <h2 className="mt-2 text-xl font-medium text-neutral-900 lg:text-2xl">
              AI-built app, infrastructure you own.
            </h2>
          </div>
          <Link
            prefetch={false}
            href="/guides"
            className="group inline-flex items-center gap-1 font-mono text-xs uppercase text-neutral-700 hover:text-neutral-900"
          >
            All deployment guides{" "}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.values(builders).map((builder) => (
            <Link
              prefetch={false}
              key={builder.slug}
              href={`/deploy/${builder.slug}`}
              className="group flex items-center justify-between gap-3 rounded-lg border border-neutral-200 px-4 py-3 text-neutral-800 transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
            >
              <span className="font-medium">{builder.label}</span>
              <ArrowUpRight className="size-4 text-neutral-400 transition-colors group-hover:text-white" />
            </Link>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-neutral-500">
          <span>Moving off a platform?</span>
          {Object.values(platforms).map((platform, index) => (
            <span key={platform.slug}>
              {index > 0 ? <span className="text-neutral-300"> · </span> : null}
              <Link
                prefetch={false}
                href={`/compare/${platform.slug}`}
                className="underline decoration-neutral-300 underline-offset-2 hover:decoration-neutral-900 hover:text-neutral-900"
              >
                {platform.label}
              </Link>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
