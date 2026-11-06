export type Platform = {
  slug: string;
  label: string;
  category: string;
  title: string;
  intro: string;
  stay: string[];
  move: string[];
  costNote: string;
  faqs: Array<[string, string]>;
  guideSlug?: string;
};
export const platforms: Record<string, Platform> = {
  vercel: {
    slug: "vercel",
    label: "Vercel",
    category: "Frontend platform hosting",
    title: "Vercel or your own server: the same app, a different owner.",
    intro:
      "Vercel is the fastest way to publish a frontend. It is also a per-seat, per-deployment cost with platform defaults that stay invisible until you scale. If your app now needs a database, background jobs, or a predictable bill, the move is smaller than it looks.",
    stay: [
      "You ship static or light serverless work and the bill stays predictable",
      "You want zero-ops previews and do not need a server runtime",
      "Your team is fine with platform file limits and managed functions",
    ],
    move: [
      "Pro seats, bandwidth, and compute overages grow faster than your traffic",
      "You need background jobs, a real database, or long-running processes",
      "You want one provider, one bill, and infrastructure your team can inspect",
    ],
    costNote:
      "Vercel Hobby caps compute hours and file size; Pro adds per-seat pricing and overage fees. A small VPS with the same app typically runs $5–20/month flat, no seat math.",
    faqs: [
      [
        "Is moving off Vercel hard?",
        "Not when the app is in a Git repository, which it almost always is. We inventory env vars, functions, domains, and preview behavior, then reproduce the parts the app actually uses on the new target before DNS moves.",
      ],
      [
        "Do I lose the Git push workflow?",
        "No. The repo stays the deployment trigger. We replace Vercel's pipeline with one we run, so `git push` still ships production.",
      ],
      [
        "What about previews?",
        "A hybrid works: keep Vercel for preview URLs while production runs on your infrastructure. We can document either setup.",
      ],
      [
        "What does RepoAssistant charge for the move?",
        "Fixed plans: Deploy $99, Fix & Deploy $149 (24h or refund), Full Setup $249. Hosting adds $10/month on a managed server.",
      ],
    ],
    guideSlug: "move-vercel-app-to-your-own-infrastructure",
  },
  netlify: {
    slug: "netlify",
    label: "Netlify",
    category: "Static and function hosting",
    title: "Netlify or your own server: stop renting the publish button.",
    intro:
      "Netlify's value is the build-and-publish loop. The hidden cost is build minutes, bandwidth, and function usage that reset and refill on a monthly meter. If your project outgrew the free tier, owning the server changes the math without changing the workflow.",
    stay: [
      "You deploy a static or light function site within the free meter",
      "Your team relies on forms, deploy previews, and split testing on Netlify",
      "Usage stays comfortably inside the plan you are on",
    ],
    move: [
      "Build minutes and bandwidth overages turn the meter into a subscription",
      "You need a database, cron-style jobs, or persistent processes",
      "You want to keep the deploy-on-push model without Netlify's limits",
    ],
    costNote:
      "Netlify Essentials is a flat price, but bandwidth, build minutes, and forms carry overage costs. A $5–10/month VPS removes the meter entirely and keeps the exact same Git push → deploy flow.",
    faqs: [
      [
        "Can I keep Netlify deploy previews after moving?",
        "Yes. Keep Netlify for preview builds, run production on your server, and point the production domain away from the platform.",
      ],
      [
        "What breaks in a static-site move?",
        "Almost nothing if it is static files plus a proxy. Form handling, redirects, and edge behavior have server-side equivalents we configure at the target.",
      ],
      [
        "How long does the move take?",
        "A standard static or function site move lands within the Fix & Deploy 24-hour window on paid plans.",
      ],
    ],
    guideSlug: "move-netlify-site-to-a-controlled-production-stack",
  },
  replit: {
    slug: "replit",
    label: "Replit",
    category: "In-browser dev and hosting",
    title: "Replit or your own server: move from playground to production.",
    intro:
      "Replit is where a lot of apps are born, but a Replit deploy is still a hosted playground: sleeps, throttles, and shares resources with everyone else's projects. Same code, real uptime, and a server you own changes what the app can be.",
    stay: [
      "You only need a demo or prototype reachable at a URL",
      "The app is not serving real users and can tolerate sleeping and throttling",
      "You are fine storing data on Replit's platform, limits included",
    ],
    move: [
      "Apps sleep, rate-limit, or get noisy-neighbor performance on shared hosts",
      "You need persistent data with backups instead of demo storage",
      "You want Git-based deploys you can roll back instead of click-deploys",
    ],
    costNote:
      "Replit hosting rides on your paid plan and shared capacity. A small VPS sized to the workload runs $5–15/month flat with persistent uptime, backups, and logs.",
    faqs: [
      [
        "My Replit app is small. Is self-hosting overkill?",
        "No. If it runs on Replit it can run on a $5–10 VPS. The real work is dependencies, config, and persistence, which is what we take over.",
      ],
      [
        "What happens to my Replit database?",
        "We move it to a managed or self-hosted database on your infrastructure with scheduled backups and a tested restore.",
      ],
      [
        "Can you do this without access to my Replit account?",
        "Yes. Give us the repo and the server and we build, test, and hand over. Repo access is all we need.",
      ],
    ],
    guideSlug: "deploy-replit-app-to-your-own-server",
  },
  railway: {
    slug: "railway",
    label: "Railway",
    category: "Usage-billed app platform",
    title: "Railway or your own server: kill the usage meter.",
    intro:
      "Railway is fast to deploy on and easy to love — until the monthly bill is a spreadsheet of RAM × hours × bandwidth. The app is already containerized and defined; moving it to a fixed-price server removes the meter and keeps the same deploy shape.",
    stay: [
      "Your usage fits the predictable minimum on the current plan",
      "You want zero server management and the convenience is worth the bill",
      "Redeploys through the platform are all your team needs",
    ],
    move: [
      "RAM, CPU, and bandwidth bills grow with every env and every deployment",
      "You want one fixed monthly number you can put in a budget",
      "You want full access to the machine, logs, and backups without platform markup",
    ],
    costNote:
      "Railway meters RAM, CPU, bandwidth, and volume. Two small services plus a database can outspend a $15–30 VPS that runs the same stack flat.",
    faqs: [
      [
        "My app is on Railway because I never want to touch a server.",
        "That is fair — and a managed VPS keeps that promise. Templates and managed services run the same Linux stack; you just stop paying per-usage premiums.",
      ],
      [
        "Does the move require changing my Dockerfile?",
        "Usually no. Railway apps are container images already. We run that same image on your server with a process manager, proxy, and backups.",
      ],
      [
        "What is the fastest way to do it?",
        "The Fix & Deploy plan ships the migration within 24 hours or refunds.",
      ],
    ],
  },
};
export type PlatformSlug = keyof typeof platforms;
