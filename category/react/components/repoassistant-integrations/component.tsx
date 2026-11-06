import Link from "next/link";
const tools = [
  {
    tool: "Lovable",
    anchor: "Deploy a Lovable app to production",
    body: "Supabase env wired, custom domain, GitHub-connected auto-deploy on a server you own, not Lovable's subdomain.",
  },
  {
    tool: "Cursor",
    anchor: "Deploy a Cursor-built app to production",
    body: "Whatever Cursor helped you build, we wire domain, SSL, env vars, database, backups, and a clean handover on a real server.",
  },
  {
    tool: "Bolt.new",
    anchor: "Deploy a Bolt.new app to production",
    body: "Vite build pipeline configured, dist served via Nginx, env vars and Stripe keys set on your VPS, not StackBlitz.",
  },
  {
    tool: "Claude Code",
    anchor: "Deploy a Claude Code project to production",
    body: "Scaffolded but never deployed? Server provisioned, secrets piped in, smoke-tested, handover doc included.",
  },
];
export function Integrations() {
  return (
    <section
      id="tools"
      className="bg-white rounded-xl px-3 py-12 lg:py-25 relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="lg:max-w-2xl mx-auto text-center relative z-10 mb-12 sm:mb-16">
          <p className="flex font-mono justify-center text-center gap-2 items-center uppercase text-neutral-900 mb-4">
            <span className="size-2 rounded-full bg-neutral-700" />
            Built with an AI tool? We ship it.
          </p>
          <h2 className="text-3xl -tracking-[2px] sm:text-4xl lg:text-5xl font-medium text-neutral-900 lg:leading-14 mb-4">
            From AI prototype to production URL
          </h2>
          <p className="text-lg text-neutral-500 mb-8 lg:mb-11 font-normal mx-auto max-w-lg">
            Whichever AI tool you used to build, we know the exact failure modes
            that block deploy. Fixed price per repo, refund if we miss the SLA.
          </p>
          <Link
            prefetch={false}
            href="/guides"
            className="py-3 px-5 inline-flex text-white font-mono text-sm uppercase gap-2 items-center rounded-lg bg-neutral-900 transition-colors duration-300 hover:bg-neutral-700"
          >
            Read deployment guides
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {tools.map((t) => (
            <Link
              prefetch={false}
              key={t.tool}
              href="/guides"
              className="group flex h-full flex-col rounded-2xl border border-neutral-900/10 bg-white p-5 transition-all hover:-translate-y-1 hover:border-neutral-900 hover:shadow-ra-integration"
            >
              <span className="inline-flex w-fit items-center rounded-full border border-neutral-900/15 bg-neutral-900 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                {t.tool}
              </span>
              <h3 className="mt-3 text-base font-medium text-neutral-900">
                {t.anchor}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-500">
                {t.body}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
