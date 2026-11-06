import Link from "next/link";
import { CalPopupButton } from "./support/src/components/CalPopupButton";
export function CTA() {
  return (
    <section className="ra-asset-cta-bg-png py-16 relative overflow-hidden bg-no-repeat bg-cover rounded-xl">
      <div className="max-w-3xl text-center flex-col items-center flex mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-neutral-900 xl:leading-none mb-6">
          Stop treating your app like a preview link.
        </h2>
        <p className="text-neutral-500 text-lg mb-11 max-w-xl">
          Bring the code that already works. We turn it into a live, documented
          production setup your team controls.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <CalPopupButton
            eventName="cta-footer-audit"
            className="py-3 px-5 inline-flex text-white h-11 font-mono text-sm uppercase gap-2 items-center rounded-lg bg-neutral-900 transition-colors duration-300 hover:bg-neutral-700"
          >
            Get a free deployment audit
          </CalPopupButton>
          <Link
            prefetch={false}
            href="/#capabilities"
            data-umami-event="cta-footer-pricing"
            className="py-3 bg-white text-neutral-900 h-11 border border-neutral-900 hover:bg-neutral-100 transition-colors duration-300 px-5 rounded-lg text-sm font-mono uppercase inline-flex items-center"
          >
            View fixed-price options
          </Link>
        </div>
      </div>
    </section>
  );
}
