export type Faq = {
  question: string;
  answer: string;
};
export const faqs: Faq[] = [
  {
    question: "What exactly do you deploy?",
    answer:
      "A working repository to a live URL on infrastructure you control. That can include HTTPS, secrets, database wiring, backups, a smoke test, and a handover guide. We work with Next.js, FastAPI, Vite, and apps built with Lovable, Bolt, Base44, v0, Replit, and Cursor.",
  },
  {
    question: "What is the refund policy?",
    answer:
      "Fix & Deploy is ship-or-refund: if we miss its SLA or cannot ship the app within the agreed scope, you receive a full refund. Every project has a fixed price—no hourly billing or retainers.",
  },
  {
    question: "Do I keep ownership of everything?",
    answer:
      "Yes. The repo, server, credentials, and domain stay with you after launch. Zero lock-in. We hand over all SSH keys, database access, and a runbook so you or your team can keep shipping without us.",
  },
  {
    question: "Which AI builders do you support?",
    answer:
      "Lovable, Bolt.new, Base44, v0, Replit, Cursor, and Claude Code. We assess the exported code and its dependencies, then resolve the deployment blockers that apply to your project.",
  },
  {
    question: "How fast is it?",
    answer:
      "Fix & Deploy has a 24-hour SLA. Starter and Full Setup are typically ready within 24–48 hours once we have the repository and the access needed to complete the work.",
  },
  {
    question: "Do you offer ongoing hosting?",
    answer:
      "Optional. Bring your own server, or use our managed VPS at $10/mo. We keep it patched, backed up, and alive. Cancel anytime.",
  },
];
