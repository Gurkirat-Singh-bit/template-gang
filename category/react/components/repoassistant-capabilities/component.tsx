import { CheckIcon as Check } from "@phosphor-icons/react/ssr";
import { ProjectIntakeButton } from "./support/src/components/ProjectIntakeButton";
const services = [
  {
    name: "Starter",
    price: "$99",
    cadence: "one-time",
    tagline: "Your code, on infrastructure you control.",
    features: [
      "Server, domain, HTTPS, and secrets wired",
      "Push-to-main deployment pipeline",
      "Production smoke test and handover guide",
      "Zero lock-in, all credentials yours",
    ],
    cta: "Start from $99",
    highlighted: false,
  },
  {
    name: "Fix & Deploy",
    price: "$149",
    cadence: "24h or refund",
    tagline: "Fix the blocker, then ship the whole stack.",
    features: [
      "Fix code, build, env, domain, or server blockers",
      "Everything in Starter, plus database setup",
      "Reliable deploy pipeline with a rollback path",
      "Infrastructure and backup plan tailored to the app",
      "Production smoke test and handover",
      "Shipped in 24h or refunded",
    ],
    cta: "Get unstuck from $149",
    highlighted: true,
  },
  {
    name: "Full Setup",
    price: "$249",
    cadence: "one-time",
    tagline: "A complete production foundation, handed over.",
    features: [
      "Everything in Fix & Deploy",
      "Postgres, MySQL, or MongoDB set up properly",
      "Daily backups and one-command restore",
      "Self-hosted analytics and server monitoring",
      "Release, rollback, and recovery runbook",
      "Priority support and full handover",
    ],
    cta: "Start from $249",
    highlighted: false,
  },
];
export function Capabilities() {
  return (
    <section
      id="capabilities"
      className="bg-white rounded-xl px-3 py-12 lg:py-25"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl -tracking-[1px] font-medium text-neutral-900">
            Choose the help your launch needs.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {services.map((service) => (
            <div
              key={service.name}
              className={`flex flex-col rounded-2xl p-7 lg:p-8 ${
                service.highlighted
                  ? "bg-neutral-900 text-white md:scale-[1.03] ring-2 ring-neutral-900"
                  : "bg-ra-soft-green"
              }`}
            >
              {service.highlighted && (
                <span className="inline-flex w-fit items-center rounded-full bg-white text-neutral-900 px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider mb-4">
                  Most popular
                </span>
              )}
              <h3
                className={`text-2xl font-medium ${service.highlighted ? "text-white" : "text-neutral-900"}`}
              >
                {service.name}
              </h3>
              <p
                className={`mt-1 text-sm ${service.highlighted ? "text-neutral-400" : "text-neutral-500"}`}
              >
                {service.tagline}
              </p>

              <div className="mt-5 flex items-baseline gap-2">
                <span
                  className={`text-5xl font-medium ${service.highlighted ? "text-white" : "text-neutral-900"}`}
                >
                  {service.price}
                </span>
                <span
                  className={`text-sm ${service.highlighted ? "text-neutral-400" : "text-neutral-500"}`}
                >
                  {service.cadence}
                </span>
              </div>

              <ul className="mt-7 flex-1 space-y-3">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check
                      className={`w-5 h-5 mt-0.5 shrink-0 ${service.highlighted ? "text-white" : "text-neutral-900"}`}
                    />
                    <span
                      className={`text-sm ${service.highlighted ? "text-neutral-300" : "text-neutral-600"}`}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <ProjectIntakeButton
                eventName={`cta-checkout-${service.name === "Fix & Deploy" ? "fix-deploy" : service.name === "Full Setup" ? "full-setup" : "starter"}`}
                initialTier={
                  service.name === "Fix & Deploy"
                    ? "fix-deploy"
                    : service.name === "Full Setup"
                      ? "full-setup"
                      : "starter"
                }
                className={`mt-8 w-full text-center py-3 px-5 font-mono text-sm uppercase rounded-lg transition-colors duration-300 ${
                  service.highlighted
                    ? "bg-white text-neutral-900 hover:bg-neutral-100"
                    : "bg-neutral-900 text-white hover:bg-neutral-700"
                }`}
              >
                {service.cta}
              </ProjectIntakeButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
