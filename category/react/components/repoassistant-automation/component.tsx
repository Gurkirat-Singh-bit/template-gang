import Link from "next/link";
const stuckOn = [
  "Lovable, Bolt, Base44, or v0 got you close, but the app still needs a real server.",
  "Vercel is fine until logs, seats, usage, or edge limits start raising the bill.",
  "Supabase is convenient, but the project limits and monthly cost are still there.",
  "Replit, domain, SSL, email, auth, database, and backups are half-wired.",
  "The AI builder gave you code, but not a server you actually own.",
  "You want one VPS that can run multiple small apps and cost less overall.",
];
export function Automation() {
  return (
    <section className="bg-white rounded-xl px-3 py-12 lg:py-25">
      <div className="max-w-7xl mx-auto">
        <div className="flex-col flex lg:flex-row justify-between gap-10 sm:gap-14 lg:gap-16 xl:gap-23.5">
          <div className="lg:w-1/2 flex flex-col justify-between gap-10 lg:gap-0">
            <div>
              <p className="flex font-mono gap-2 items-center uppercase text-neutral-900 mb-4">
                <span className="size-2 rounded-full bg-neutral-700" />
                What you are stuck on
              </p>
              <h2 className="text-3xl -tracking-[2px] sm:text-4xl lg:text-5xl font-medium text-neutral-900 lg:leading-14 mb-4">
                The builder got you close. Production is still messy.
              </h2>
              <p className="text-lg text-neutral-500 mb-8 sm:mb-11 font-normal max-w-lg">
                We finish the deploy step you have been stuck on for two
                weekends. Fixed price per repo, refund if we miss the SLA. No
                hourly billing, no retainers.
              </p>
              <Link
                prefetch={false}
                href="/#capabilities"
                className="py-3 px-5 inline-flex text-white font-mono text-sm uppercase gap-2 items-center rounded-lg bg-neutral-900 transition-colors duration-300 hover:bg-neutral-700"
              >
                Start a project
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row gap-8 mt-10 lg:mt-0">
              <div>
                <h3 className="text-neutral-900 text-[52px] mb-4">
                  <span>17+</span>
                </h3>
                <p className="text-neutral-500 text-base font-normal">
                  Projects shipped to production
                </p>
              </div>
              <div>
                <h3 className="text-neutral-900 text-[52px] mb-4">
                  <span>24h</span>
                </h3>
                <p className="text-neutral-500 text-base font-normal">
                  Fix and Deploy SLA, or refund
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="grid gap-3 sm:grid-cols-2">
              {stuckOn.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-neutral-900/10 bg-ra-soft-green p-4 text-sm font-normal text-neutral-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
