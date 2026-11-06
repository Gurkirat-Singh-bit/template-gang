import asset0 from "./assets/hero-octopus.webp";
import Image from "next/image";
import { CalPopupButton } from "./support/src/components/CalPopupButton";
import Link from "next/link";
export function Hero() {
  return (
    <section className="bg-ra-soft-green pt-30 lg:pt-40 lg:pb-40 pb-16 sm:pb-20 relative overflow-hidden rounded-xl">
      <div className="max-w-7xl mx-auto px-4 xl:px-0">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="max-w-xl relative z-30">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-medium text-neutral-900 mb-6 leading-tight">
              Get your AI-built app live on infrastructure you control.
            </h1>
            <p className="text-base sm:text-lg text-neutral-500 mb-8 lg:mb-10 font-normal">
              Bring us the repo and the blocker. We set up the domain, HTTPS,
              secrets, database, backups, and deployment path—then hand over the
              keys.
            </p>
            <div className="flex flex-wrap gap-4">
              <CalPopupButton
                eventName="cta-hero-audit"
                className="py-3 px-5 inline-flex text-white font-mono text-sm uppercase gap-2 items-center rounded-lg bg-neutral-900 hover:bg-neutral-700 transition-colors duration-300"
              >
                Get a free deployment audit
              </CalPopupButton>
              <Link
                prefetch={false}
                href="/#capabilities"
                data-umami-event="cta-hero-pricing"
                className="py-3 bg-white text-neutral-900 border border-neutral-900 hover:bg-neutral-900 hover:text-white px-5 inline-flex font-mono text-sm uppercase gap-2 items-center rounded-lg transition-colors duration-300"
              >
                See fixed-price options
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-neutral-600">
                <span className="size-1.5 rounded-full bg-neutral-900" />
                Ship-or-refund
              </span>
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-neutral-600">
                <span className="size-1.5 rounded-full bg-neutral-900" />
                24h SLA on Fix &amp; Deploy
              </span>
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-neutral-600">
                <span className="size-1.5 rounded-full bg-neutral-900" />
                Zero lock-in
              </span>
            </div>
          </div>

          <div className="hidden lg:block absolute right-0 bottom-0 translate-x-[20%] translate-y-[18%]">
            <Image
              src={asset0.src}
              alt="RepoAssistant octopus mascot"
              width={960}
              height={960}
              sizes="(min-width: 1280px) 960px, 64vw"
              className="h-auto w-[64vw] max-w-[960px] object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
