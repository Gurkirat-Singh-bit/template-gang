import asset0 from "./assets/testmonial-1.png";
import asset1 from "./assets/testmonial-2.png";
import asset2 from "./assets/testmonial-3.jpg";
import asset3 from "./assets/testmonial-5.png";
import Image from "next/image";
const testimonials = [
  {
    client: "Govt. Polytechnic Nilokheri",
    location: "India",
    tag: "Government deployment",
    quote:
      "A student-built portal that only worked on localhost. We moved it to the college's own VPS with Traefik HTTPS, Postgres, MinIO storage, Umami analytics, and an auto-deploy pipeline so students can ship updates themselves.",
    metric: "Institution-owned stack",
    metricSub: "Deployed, documented, and handed over with full control.",
    image: asset0.src,
    featured: true,
  },
  {
    client: "AutoWokr",
    location: "Vietnam",
    tag: "Side project",
    quote:
      "A marketplace where AI agents hire humans, burning cash on bandwidth and scattered services. We migrated everything to one dedicated VPS with MongoDB, Nginx, and push-to-deploy from GitHub.",
    metric: "90%+ cost reduction",
    metricSub: "From $200 to $400/mo down to a single VPS.",
    image: asset1.src,
    featured: false,
  },
  {
    client: "Amin",
    location: "UAE",
    tag: "Startup founder",
    quote:
      "He bought a new VPS thinking he needed separate infra. We audited his existing server, found it was barely at 20% usage, and deployed all his projects onto it. No new VPS needed.",
    metric: "Zero additional cost",
    metricSub: "Existing VPS was already enough.",
    image: asset2.src,
    featured: false,
  },
  {
    client: "Hamanshu Agarwal",
    location: "India",
    tag: "Automation architect",
    quote:
      "Running 3 AI employees across 3 servers. We made homelab agents VPS-native, added an auth layer, and consolidated all 3 workloads onto a single server with MCP for dynamic agent creation.",
    metric: "3x consolidation",
    metricSub: "3 servers to 1. Same output, lower cost.",
    image: asset3.src,
    featured: false,
  },
];
function OutcomeBadge({
  metric,
  metricSub,
}: {
  metric: string;
  metricSub: string;
}) {
  return (
    <div className="mt-6 rounded-xl bg-neutral-900 text-white p-4">
      <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">
        Outcome
      </p>
      <p className="mt-0.5 text-base font-medium">{metric}</p>
      <p className="mt-0.5 text-xs opacity-80">{metricSub}</p>
    </div>
  );
}
export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-white rounded-xl px-3 py-12 lg:py-25"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-lg mx-auto text-center relative z-10 mb-10 sm:mb-16">
          <p className="flex font-mono justify-center text-center gap-2 items-center uppercase text-neutral-900 mb-4">
            <span className="size-2 rounded-full bg-neutral-700" />
            Proof, not hype
          </p>
          <h2 className="text-3xl -tracking-[2px] sm:text-4xl lg:text-5xl font-medium text-neutral-900 lg:leading-14">
            Ships that crossed the horizon
          </h2>
          <p className="mt-4 text-neutral-500">
            Screenshot proof included. No stock photos. Just shipped projects
            and the people behind them.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          {/* Featured card */}
          <div className="bg-ra-soft-green rounded-3xl p-6 sm:p-8 flex flex-col lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center rounded-full bg-neutral-900 text-white px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider">
                {testimonials[0].tag}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                {testimonials[0].location}
              </span>
            </div>
            <h3 className="text-2xl font-medium text-neutral-900 mb-3">
              {testimonials[0].client}
            </h3>
            <div className="overflow-hidden rounded-xl border border-neutral-900/10 bg-white mb-4">
              <Image
                src={testimonials[0].image}
                alt={`Screenshot proof for ${testimonials[0].client}`}
                width={1100}
                height={650}
                className="w-full object-contain"
              />
            </div>
            <p className="text-base text-neutral-600 leading-relaxed">
              {testimonials[0].quote}
            </p>
            <OutcomeBadge
              metric={testimonials[0].metric}
              metricSub={testimonials[0].metricSub}
            />
          </div>

          {/* Side cards */}
          <div className="grid gap-5 lg:col-span-5">
            {testimonials.slice(1).map((t) => (
              <div
                key={t.client}
                className="rounded-3xl p-6 bg-neutral-100 flex flex-col"
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="inline-flex items-center rounded-full bg-neutral-900 text-white px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider">
                    {t.tag}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                    {t.location}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-neutral-900 mb-2">
                  {t.client}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {t.quote}
                </p>
                <div className="mt-auto pt-4">
                  <p className="text-sm font-medium text-neutral-900">
                    {t.metric}
                  </p>
                  <p className="text-xs text-neutral-500">{t.metricSub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
