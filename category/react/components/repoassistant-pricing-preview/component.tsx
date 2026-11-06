import Link from "next/link";
const plans = [
  { name: "Starter", price: "from $99", href: "/#capabilities" },
  { name: "Fix & Deploy", price: "from $149", href: "/#capabilities" },
  { name: "Full Setup", price: "from $249", href: "/#capabilities" },
];
export function PricingPreview() {
  return (
    <section className="bg-white rounded-xl px-3 py-12 lg:py-25">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-10 sm:mb-14">
          <p className="font-mono text-sm uppercase text-neutral-500 mb-3">
            Pricing
          </p>
          <h2 className="text-3xl -tracking-[2px] sm:text-4xl lg:text-5xl font-medium text-neutral-900 lg:leading-14 mb-4">
            Fixed-price help for the production step.
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {plans.map((plan) => (
            <Link
              prefetch={false}
              key={plan.name}
              href={plan.href}
              className="border border-neutral-200 rounded-full px-6 py-3 inline-flex items-center gap-3 hover:border-neutral-400 transition-colors"
            >
              <span className="text-base font-medium text-neutral-900">
                {plan.name}
              </span>
              <span className="text-sm text-neutral-500">{plan.price}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
