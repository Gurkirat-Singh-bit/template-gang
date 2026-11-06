import Link from "next/link";
import { ArrowRightIcon as ArrowRight } from "@phosphor-icons/react/ssr";
const items = [
  {
    client: "Govt. Polytechnic Nilokheri",
    tag: "Government deployment",
    metric: "Institution-owned infrastructure",
    line: "A student-built portal moved from localhost to the college’s own VPS, with the team retaining full control of the stack.",
  },
  {
    client: "YourOnlyAi",
    tag: "Startup Infra Setup",
    metric: "90%+ infrastructure cost reduction",
    line: "A multi-service AI platform moved to one dedicated VPS with MongoDB, automated backups, monitoring, and GitHub deployments.",
  },
  {
    client: "Amin - UAE",
    tag: "Trading Bots & Openclaw agents",
    metric: "Zero additional infrastructure cost",
    line: "An existing VPS had room to spare, so we consolidated the founder’s projects onto the server he already owned.",
  },
];
export function TestimonialsTeaser() {
  return (
    <section className="bg-white rounded-xl px-3 py-12 lg:py-25">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl -tracking-[1px] font-medium text-neutral-900">
              Real projects. Clear outcomes.
            </h2>
          </div>
          <Link
            prefetch={false}
            href="/testimonials"
            className="shrink-0 inline-flex items-center gap-1 font-mono text-sm uppercase text-neutral-900 hover:text-neutral-500 transition-colors"
          >
            All stories <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((t) => (
            <Link
              prefetch={false}
              key={t.client}
              href="/testimonials"
              className="rounded-2xl bg-ra-soft-green p-6 flex flex-col transition-transform hover:-translate-y-1"
            >
              <span className="inline-flex w-fit items-center rounded-full bg-white px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-900 mb-4">
                {t.tag}
              </span>
              <p className="text-2xl font-medium text-neutral-900">
                {t.metric}
              </p>
              <p className="mt-1 text-sm text-neutral-500 flex-1">{t.line}</p>
              <p className="mt-4 text-sm font-medium text-neutral-900">
                {t.client}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
