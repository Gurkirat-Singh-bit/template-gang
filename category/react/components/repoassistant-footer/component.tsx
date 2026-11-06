import asset0 from "./assets/logo-white.png";
import Link from "next/link";
import Image from "next/image";
import { CTA } from "./support/src/components/CTA";
const mainPages = [
  { label: "Home", href: "/" },
  { label: "For startups", href: "/for/startups" },
  { label: "For businesses", href: "/for/businesses" },
  { label: "For colleges", href: "/for/colleges" },
  { label: "Guides", href: "/guides" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contacts" },
];
const resources = [
  { label: "Tools", href: "/tools" },
  { label: "Free audit", href: "/contacts" },
];
const popularGuides = [
  {
    label: "Deploy a Lovable app",
    href: "/guides/deploy-lovable-app-on-your-infrastructure",
  },
  {
    label: "Move from Vercel",
    href: "/guides/move-vercel-app-to-your-own-infrastructure",
  },
  {
    label: "Deploy a Bolt app",
    href: "/guides/deploy-bolt-app-with-a-real-release-pipeline",
  },
  {
    label: "Move from Netlify",
    href: "/guides/move-netlify-site-to-a-controlled-production-stack",
  },
];
const legalPages = [
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms and conditions", href: "/terms" },
];
export function Footer() {
  return (
    <footer className="bg-black p-3 rounded-[22px] mt-3">
      <CTA />
      <div className="px-4 sm:px-6 lg:px-10">
        <div className="pt-12 lg:pt-16 2xl:pt-20 grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-4 2xl:pr-40">
            <Link
              prefetch={false}
              href="/"
              className="mb-7 inline-flex items-center gap-2"
            >
              <Image
                src={asset0.src}
                alt="RepoAssistant logo"
                width={44}
                height={40}
                className="h-10 w-auto"
              />
              <span className="font-mono text-lg font-bold tracking-tight text-white">
                RepoAssistant
              </span>
            </Link>
            <p className="text-neutral-400 text-base mb-8">
              Fixed-price app deployment to a VPS you own. We move AI-built and
              custom apps to production with HTTPS, databases, backups, and a
              clean handover. Ship-or-refund.
            </p>
            <a
              href="mailto:hello@repoassistant.com"
              className="text-white hover:text-white transition-colors font-mono text-sm"
            >
              hello@repoassistant.com
            </a>
          </div>

          <div className="lg:col-span-8 lg:ml-10 lg:border-l border-white/12 pb-8 sm:pb-10 lg:pb-16 2xl:pb-25 mt-10 lg:mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 pl-0 lg:pl-10 xl:pl-20 2xl:pl-30">
              <div>
                <h3 className="mb-4 text-white -tracking-[0.2px] text-base font-medium">
                  Pages
                </h3>
                <ul className="space-y-2">
                  {mainPages.map((page) => (
                    <li key={page.label}>
                      <Link
                        prefetch={false}
                        href={page.href}
                        className="text-neutral-400 text-sm hover:text-white transition-colors"
                      >
                        {page.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-white -tracking-[0.2px] text-base font-medium">
                  Resources
                </h3>
                <ul className="space-y-2">
                  {resources.map((page) => (
                    <li key={page.label}>
                      <Link
                        prefetch={false}
                        href={page.href}
                        className="text-neutral-400 text-sm hover:text-white transition-colors"
                      >
                        {page.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-white -tracking-[0.2px] text-base font-medium">
                  Popular guides
                </h3>
                <ul className="space-y-2">
                  {popularGuides.map((guide) => (
                    <li key={guide.label}>
                      <Link
                        prefetch={false}
                        href={guide.href}
                        className="text-neutral-400 text-sm hover:text-white transition-colors"
                      >
                        {guide.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-white -tracking-[0.2px] text-base font-medium">
                  Legal
                </h3>
                <ul className="space-y-2">
                  {legalPages.map((page) => (
                    <li key={page.label}>
                      <Link
                        prefetch={false}
                        href={page.href}
                        className="text-neutral-400 text-sm hover:text-white transition-colors"
                      >
                        {page.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 sm:pt-10 pb-6 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-start sm:items-center border-t border-white/12">
          <p className="text-neutral-400">
            &copy; RepoAssistant 2026. All rights reserved.
          </p>
          <p className="text-neutral-400">
            Ship-or-refund. Fixed price. No retainers.
          </p>
        </div>
      </div>
    </footer>
  );
}
