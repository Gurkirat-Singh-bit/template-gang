import Link from "next/link";
import {
  UploadSimpleIcon as Upload,
  WrenchIcon as Wrench,
  HardDrivesIcon as Server,
} from "@phosphor-icons/react/ssr";
const services = [
  {
    icon: Upload,
    title: "Move your code to production",
    body: "We move your repository to infrastructure you control: domain, HTTPS, secrets, push-to-main deployment, a smoke test, and a handover with every login and credential.",
  },
  {
    icon: Wrench,
    title: "Fix and deploy the actual problem",
    body: "Build failure, missing environment variable, 502, or database connection issue? We fix the release blocker and leave a deployment path your next release can use too.",
  },
  {
    icon: Server,
    title: "Build the production foundation",
    body: "For Postgres, MySQL, or MongoDB: database setup, daily backups with a restore path, monitoring, release and rollback procedures, server hardening, and a full runbook.",
  },
];
export function ServicesDetail() {
  return (
    <section className="bg-white rounded-xl px-3 py-12 lg:py-25">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-10 lg:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl -tracking-[1px] font-medium text-neutral-900">
            From working repo to a production setup your team can run.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl bg-ra-soft-green p-7 flex gap-5"
            >
              <div className="shrink-0 rounded-xl bg-white p-3 h-fit">
                <s.icon className="size-5 text-neutral-900" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-neutral-900 mb-1">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-500">
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-4 border-t border-neutral-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-neutral-500">
            Choose the level of help you need. Every option ends with a clear
            handover.
          </p>
          <Link
            prefetch={false}
            href="/guides"
            className="font-mono text-sm uppercase text-neutral-900 underline underline-offset-4 hover:text-neutral-600"
          >
            Read the deployment guides
          </Link>
        </div>
      </div>
    </section>
  );
}
