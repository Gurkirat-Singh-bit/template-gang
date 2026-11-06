export type Builder = {
  slug: string;
  label: string;
  eyebrow: string;
  title: string;
  intro: string;
  before: string[];
  after: string[];
  friction: Array<[string, string]>;
  steps: Array<{
    title: string;
    body: string;
  }>;
  faqs: Array<[string, string]>;
  guideSlug?: string;
};
export const builders: Record<string, Builder> = {
  lovable: {
    slug: "lovable",
    label: "Lovable",
    eyebrow: "Deploy from Lovable",
    title: "Deploy a Lovable app to your own server.",
    intro:
      "Lovable builds fast. Production should not depend on platform publishing. We move a Lovable project onto infrastructure your team controls, keep the GitHub sync, and let you keep building in Lovable while the app runs somewhere you own.",
    before: [
      "Platform-published app",
      "Shared hosting limits",
      "Lovable-hosted data and demos",
      "No release process after code changes",
    ],
    after: [
      "Your own server and domain",
      "Git push to production pipeline",
      "Database, backups, and secrets you control",
      "Same Lovable workflow, real production",
    ],
    friction: [
      [
        "GitHub sync has to come first",
        "Without a connected repository there is nothing to ship. Connecting the Lovable project to GitHub is the first production step, before any server is touched.",
      ],
      [
        "Platform dependencies leak in",
        "The preview is a landing page view. API routes, jobs, environment variables, Supabase links, storage buckets, and webhooks are all part of the real app and all easy to miss.",
      ],
      [
        "Preview is not production",
        "What works in the Lovable preview can fail on a plain server without the right build config, runtime versions, and secrets. We reproduce the stack, not just the page.",
      ],
    ],
    steps: [
      {
        title: "Connect GitHub and lock the repo",
        body: "Confirm the GitHub connection and repository ownership before anything else. The repo becomes the durable codebase and the source for deployment.",
      },
      {
        title: "Inventory integrations",
        body: "List every environment variable, database, storage bucket, auth provider, webhook, and email configuration. This is where most Lovable launches break.",
      },
      {
        title: "Provision the production target",
        body: "Choose the smallest credible target: a managed container service or a VM sized to the workload, with a real managed or self-hosted database and backups.",
      },
      {
        title: "Build the release pipeline",
        body: "Deploy from the default branch with a build, a health check, the right domain, and a rollback path if a release is unhealthy.",
      },
      {
        title: "Cut over with a recovery plan",
        body: "Test the new URL before DNS cutover, confirm database and background jobs, then switch the domain and keep the previous path until the new flow is verified.",
      },
    ],
    faqs: [
      [
        "Can I keep working in Lovable after the move?",
        "Yes. Lovable documents GitHub sync, so Lovable stays the editor and your repository remains the deployment source. Production just runs on infrastructure you control.",
      ],
      [
        "Is self-hosting more expensive?",
        "Usually the opposite at scale. Platform seat pricing and per-deployment fees compound; a server you own has a flat cost you can predict.",
      ],
      [
        "What do you need from me to start?",
        "Read-only access to the Lovable project or its GitHub repo, credentials for your cloud account or server, and domain access. That is enough for us to map the stack.",
      ],
      [
        "What does RepoAssistant handle exactly?",
        "We review the code and dependencies, fix deployment blockers, set up target infrastructure and pipeline, test the release, and hand over access and documentation.",
      ],
    ],
    guideSlug: "deploy-lovable-app-on-your-infrastructure",
  },
  bolt: {
    slug: "bolt",
    label: "Bolt.new",
    eyebrow: "Deploy from Bolt.new",
    title: "Deploy a Bolt.new app to your own server.",
    intro:
      "Bolt.new can generate an app in minutes. Getting that app running in production takes a real release pipeline. We take your Bolt project to a server you own, with Git-based deploys and a clear way back if a release goes wrong.",
    before: [
      "A sandbox or snapshot",
      "No release history",
      "Demo data and undeclared dependencies",
      "Unknown steps to production",
    ],
    after: [
      "Production server you own",
      "Git push, deploy, health check",
      "Secrets, database, and backups set",
      "Rollback and handover documentation",
    ],
    friction: [
      [
        "Exports are snapshots",
        "A Bolt export captures code, not the conversation, history, or full configuration. A repository your team owns becomes the source of truth and the deployment trigger.",
      ],
      [
        "Invisible dependencies",
        "SDKs, environment variables, rate limits, storage, and generated files may be referenced but never defined. We map every one before touching a server.",
      ],
      [
        "Demo defaults leak into prod",
        "Bolt demos run on defaults. Real production needs real secrets, a real database, and an access model that is not anyone-with-the-URL.",
      ],
    ],
    steps: [
      {
        title: "Move the app into an owned repo",
        body: "Push the project to GitHub, either via the project sync or a clean commit. The repository is what ships, not the sandbox.",
      },
      {
        title: "Reproduce the stack",
        body: "Record dependencies, environment variables, storage, and auth. Verify the app builds and runs locally with a clean checkout before provisioning anything.",
      },
      {
        title: "Choose and provision the target",
        body: "Pick the smallest credible target between a VPS and a managed container service, and stand up the database, backups, and secrets.",
      },
      {
        title: "Wire the pipeline",
        body: "Lint, build, deploy, smoke test, and rollback hooked to pushes on the production branch.",
      },
      {
        title: "Point the domain and hand over",
        body: "Switch DNS, verify HTTPS and health checks, then hand over access with a written runbook for the team's next release.",
      },
    ],
    faqs: [
      [
        "Can I keep using Bolt.new after moving?",
        "Yes. Keep the GitHub project sync so your owned repository stays current while you keep prompting and iterating in Bolt.",
      ],
      [
        "Do I need Docker?",
        "Not necessarily. We pick the least complex target that fits the workload, whether that is a plain VPS process or a containerized deploy.",
      ],
      [
        "How fast can it be live?",
        "On the Fix & Deploy plan we ship a working production deployment within 24 hours or refund.",
      ],
    ],
    guideSlug: "deploy-bolt-app-with-a-real-release-pipeline",
  },
  v0: {
    slug: "v0",
    label: "v0",
    eyebrow: "Deploy from v0",
    title: "Deploy a v0 app to your own server.",
    intro:
      "v0 turns prompts into UI and full-stack apps. The repository is the real artifact, not the sandbox preview. We take that repo off v0 and onto a server you control, with a Git release workflow your team can actually run.",
    before: [
      "Sandbox previews",
      "Repo not production-ready",
      "Framework assumptions",
      "No shipping path",
    ],
    after: [
      "Self-hosted production stack",
      "Auth, storage, and database configured",
      "Repeatable build from your repo",
      "Documented deploy and rollback",
    ],
    friction: [
      [
        "The repo is the deliverable",
        "The preview is a snapshot; the GitHub repo is what ships. Production needs that repo to be clean and to build in an isolated environment, not just locally.",
      ],
      [
        "Next.js defaults are not a runtime",
        "A v0 project expects environment variables, a database, an origin, and a Node.js process. On your server all of that is yours to provision correctly.",
      ],
      [
        "Sandbox identity, real access",
        "Demo auth and seeded data must be replaced with your real auth provider, storage, and admin model before launch.",
      ],
    ],
    steps: [
      {
        title: "Export and prune",
        body: "Push the project to a repo you own and remove demo code, seeded data, and placeholder config that should not ship.",
      },
      {
        title: "Configure the runtime",
        body: "Pin the Node version, build command, environment variables, and expected origin so the build is reproducible.",
      },
      {
        title: "Provision server and database",
        body: "Stand up a VPS or managed container service with a managed or self-hosted database, backups, and secrets.",
      },
      {
        title: "Build the Git pipeline",
        body: "Deploy from the production branch with a health check, smoke test, and rollback path.",
      },
      {
        title: "Cut over and hand over",
        body: "Point DNS, verify HTTPS, then document access, deploy steps, and recovery for your team.",
      },
    ],
    faqs: [
      [
        "Can I keep building in v0 after launch?",
        "Yes. Treat v0 as the front-end workshop and the repo as production. Changes flow to production through the pipeline, not through the sandbox.",
      ],
      [
        "Is this only for Next.js apps?",
        "v0 most often produces Next.js projects, but the same move applies to any other stack v0 exports. We adapt the steps to your framework.",
      ],
      [
        "What does it cost before the server?",
        "The plans are fixed: Deploy $99, Fix & Deploy $149 (24h or refund), Full Setup $249. Hosting adds $10/month if you want a managed server.",
      ],
    ],
    guideSlug: "deploy-v0-app-to-your-own-server",
  },
  replit: {
    slug: "replit",
    label: "Replit",
    eyebrow: "Deploy from Replit",
    title: "Deploy a Replit app to your own server.",
    intro:
      "Replit is a great way to start an app. A platform deploy is not the same as owning production. We move your Replit app to your own VPS or cloud server and set up persistent uptime, real backups, and logs.",
    before: [
      "Replit hosting limits",
      "Sleeping, throttled, or demo processes",
      "No backups or retention",
      "Unknown scaling behavior",
    ],
    after: [
      "Your own VPS or cloud server",
      "Persistent process with real uptime",
      "Database backup and restore",
      "Deploys, logs, and monitoring documented",
    ],
    friction: [
      [
        "Uptime and resources",
        "Free-tier Replit apps sleep and rate-limit, and autoscale hosts can be noisy neighbors. A production server of your own runs your process persistently with allocated resources.",
      ],
      [
        "Persistent data",
        "In-memory states and dev databases reset, vanish, or sit on shared infrastructure. Production needs a proper database with backups and a restore plan.",
      ],
      [
        "Click-deploys have no history",
        "Replit's deploy flow does not give you Git history, a rollback path, or an audit trail. We put the repo behind a real release pipeline.",
      ],
    ],
    steps: [
      {
        title: "Sync the repo to GitHub",
        body: "Connect or create the repository so the current state is durable, then make the repo the deployment source.",
      },
      {
        title: "Extract configuration safely",
        body: "Pull environment variables and any values stored in the project out of the code and into proper secrets.",
      },
      {
        title: "Provision a sized VPS",
        body: "Choose a VM sized to the workload, install the runtime, and stand up a database with backups.",
      },
      {
        title: "Run and monitor",
        body: "Run the process under a process manager or container, add a health check, logs, and a deploy path from Git.",
      },
      {
        title: "Domain, HTTPS, handover",
        body: "Point the domain, enable HTTPS, then document how the team deploys and restores.",
      },
    ],
    faqs: [
      [
        "Is a Replit app too simple to self-host?",
        "No. Any app that runs in Replit can run on a small VPS. The work is in the deps, config, and persistence, which is exactly what we take over.",
      ],
      [
        "What about the database?",
        "We move it to a managed or self-hosted database on your infrastructure with scheduled backups and a tested restore.",
      ],
      [
        "Can you handle it remotely?",
        "Yes. Give us repo access and the server, and we build, test, and hand over without needing to be on your machine.",
      ],
    ],
    guideSlug: "deploy-replit-app-to-your-own-server",
  },
  cursor: {
    slug: "cursor",
    label: "Cursor",
    eyebrow: "Deploy from Cursor",
    title: "Deploy a Cursor-built app to production.",
    intro:
      "Cursor produces a lot of code, fast, in whatever repo you point it at. Shipping that code means turning it into a server, a pipeline, and a release process. That is the exact job we take over.",
    before: [
      "A local repo that used to build",
      "Incomplete or conflicting changes",
      "No CI, no staging",
      "Deadline pressure and no plan",
    ],
    after: [
      "A build that works on a server",
      "CI, preview, and production environments",
      "Smoke tests and rollback",
      "A clear path to ship every push",
    ],
    friction: [
      [
        "Agent code is unowned code",
        "Cursor edits spread across many files. Someone has to own integration: the build, the runtime, the dependencies, and the breaking changes. Until then, nothing ships.",
      ],
      [
        "It works on my machine",
        "Local builds are not clean builds. We make the build reproducible in an isolated environment so a fresh server produces the same running app.",
      ],
      [
        "No deployment target",
        "A solid repo is still a folder until it has a server, environment, database, and deployment pipeline. That last mile is the whole game.",
      ],
    ],
    steps: [
      {
        title: "Triage the repo",
        body: "Verify it builds, list dependencies and environment variables, and identify the breaking or half-finished changes an agent left behind.",
      },
      {
        title: "Make a clean build",
        body: "Get a reproducible build in an isolated environment with pinned versions and correct secrets.",
      },
      {
        title: "Provision target and data",
        body: "Stand up the server, database, and storage, and move configuration into secure environment variables.",
      },
      {
        title: "Set up CI",
        body: "Lint, test, build, deploy, and smoke-check on every push, with a rollback path.",
      },
      {
        title: "Launch and hand over",
        body: "Point DNS, verify HTTPS and monitoring, then document deploy, rollback, and recovery for the team.",
      },
    ],
    faqs: [
      [
        "My app was written by an AI agent. Can you really ship it?",
        "That is our specialty. Agent-generated code ships every day on our watch, because we take ownership of the build, the config, and the release path.",
      ],
      [
        "Do you need me to clean up the repo first?",
        "No. Give us the repo as-is. We fix what needs fixing and tell you exactly what changed and what to stop changing.",
      ],
      [
        "What if it does not build anywhere?",
        "Then we diagnose and repair the build first on the Fix & Deploy plan, ship within 24 hours, or refund.",
      ],
    ],
  },
  claude: {
    slug: "claude",
    label: "Claude Code",
    eyebrow: "Deploy from Claude Code",
    title: "Deploy an app built with Claude Code to production.",
    intro:
      "Claude Code builds custom apps by editing the repo and running commands, and it is easy to confuse that terminal with production. We take the finished work and run it on infrastructure you own, with a release and recovery process that makes it dependable.",
    before: [
      "A terminal-built app",
      "No kept tests or staging",
      "Assumed configuration",
      "No production runbook",
    ],
    after: [
      "Production server you control",
      "A tested release path, not ad-hoc commands",
      "Real secrets and database backing",
      "A runbook your team can follow",
    ],
    friction: [
      [
        "Ad-hoc correctness",
        "CLI-driven builds succeed once, then fail after restart. Ports, config, and environment variables that work on the first run must survive reboot and redeploy.",
      ],
      [
        "Everything is localhost",
        "Paths, ports, and defaults that are fine locally become 403s and crashes on a server. We translate the app to a real runtime.",
      ],
      [
        "No ownership boundary",
        "Without a named repo owner and a deploy process, any change can quietly break production. We put a pipeline and a rollback between code and live.",
      ],
    ],
    steps: [
      {
        title: "Review the repo and the working command",
        body: "Find the command that made it run locally, then check what it assumed: versions, paths, ports, and side effects.",
      },
      {
        title: "Extract configuration",
        body: "Move everything that differs between environments into environment variables and secrets, not committed code.",
      },
      {
        title: "Provision server and database",
        body: "Stand up a server and database sized to the app, with backups and a defined owner.",
      },
      {
        title: "Automate build, deploy, check, rollback",
        body: "Turn the one-off command into a repeatable pipeline with a health check and a rollback path.",
      },
      {
        title: "Monitor and document",
        body: "Add monitoring and logs, then write the runbook so the team can deploy and recover without the original session.",
      },
    ],
    faqs: [
      [
        "The app was built interactively. Will it survive a redeploy?",
        "Yes, if it is handled the right way: environment as code, secrets separated, and a repeatable build. That is what we build so nothing depends on memory.",
      ],
      [
        "Is this only for CLI-built apps?",
        "No. Claude Code produces the same repositories any team ships. We handle Next.js, Python, Go, Node, and whatever stack your repo uses.",
      ],
      [
        "How do you take over securely?",
        "Scoped read access to the repo and the server is enough. We deploy with least-privilege credentials and hand those over at the end.",
      ],
    ],
  },
};
export type BuilderSlug = keyof typeof builders;
