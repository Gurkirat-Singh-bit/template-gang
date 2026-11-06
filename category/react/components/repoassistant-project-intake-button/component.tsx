"use client";

import { FormEvent, useState, useEffect, useRef } from "react";
import {
  ArrowLeftIcon as ArrowLeft,
  ArrowRightIcon as ArrowRight,
  CircleNotchIcon as Loader2,
  XIcon as X,
} from "@phosphor-icons/react";
export type Tier = "starter" | "fix-deploy" | "full-setup";
export type Intake = {
  name: string;
  email: string;
  repo: string;
  domain: string;
  details: string;
};
const plans: Array<{
  id: Tier;
  label: string;
  price: string;
}> = [
  { id: "starter", label: "Deploy", price: "$99" },
  { id: "fix-deploy", label: "Get unstuck", price: "$149" },
  { id: "full-setup", label: "Full setup", price: "$249" },
];
type Props = {
  children: React.ReactNode;
  className?: string;
  initialTier?: Tier;
  onOpen?: () => void;
  eventName?: string;
  onSubmit?: (
    tier: Tier,
    intake: Intake,
  ) => string | null | Promise<string | null>;
};
export function ProjectIntakeButton({
  children,
  className,
  initialTier = "starter",
  onOpen,
  eventName,
  onSubmit,
}: Props) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog?.open) dialog?.showModal();
    if (!open && dialog?.open) dialog.close();
    if (!open) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [open]);
  const [step, setStep] = useState(1);
  const [tier, setTier] = useState<Tier>(initialTier);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [details, setDetails] = useState("");
  function close() {
    if (!loading) {
      setOpen(false);
      setStep(1);
      setError("");
    }
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const err = await onSubmit?.(tier, {
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        repo: String(form.get("repo") ?? ""),
        domain: String(form.get("domain") ?? ""),
        details,
      });
      if (err) setError(err);
      else setStep(3);
    } catch {
      setError("Could not submit. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  const dialog = (
    <dialog
      ref={dialogRef}
      aria-labelledby="project-intake-title"
      className="ra-intake-dialog"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
    >
      <form onSubmit={submit} className="w-full bg-white p-6 sm:p-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase text-neutral-500">
              {step === 3 ? "Complete" : `Step ${step} of 2`}
            </p>
            <h2
              id="project-intake-title"
              className="mt-2 text-2xl font-medium text-neutral-900"
            >
              {step === 3
                ? "Request captured"
                : step === 1
                  ? "What do you need shipped?"
                  : "Where can we reach you?"}
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close project form"
            className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
          >
            <X className="size-5" />
          </button>
        </div>
        {step === 3 ? (
          <div className="mt-6">
            <p role="status" className="text-sm text-neutral-600">
              {onSubmit
                ? "Your request was submitted."
                : "Demo request captured. No payment was started."}
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-5 rounded-lg bg-neutral-900 px-4 py-2 text-white"
            >
              Done
            </button>
          </div>
        ) : step === 1 ? (
          <>
            <p className="mt-3 text-sm leading-relaxed text-neutral-500">
              Pick the outcome, then give us the project basics. Payment opens
              only after this short form.
            </p>
            <div className="mt-6 grid gap-2 sm:grid-cols-3">
              {plans.map((plan) => (
                <button
                  type="button"
                  key={plan.id}
                  onClick={() => setTier(plan.id)}
                  className={`rounded-lg border p-3 text-left text-sm ${tier === plan.id ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-500"}`}
                >
                  <span className="block font-medium">{plan.label}</span>
                  <span className="text-xs opacity-70">{plan.price}</span>
                </button>
              ))}
            </div>
            <label className="mt-5 block text-sm font-medium text-neutral-900">
              What is blocked or what should go live?
              <textarea
                required
                value={details}
                onChange={(event) => setDetails(event.target.value)}
                rows={4}
                maxLength={450}
                placeholder="App, stack, deadline, and what you have tried."
                className="mt-2 w-full resize-y rounded-lg border border-neutral-300 px-3 py-2.5 font-normal outline-none focus:border-neutral-900"
              />
            </label>
            <button
              type="button"
              disabled={!details.trim()}
              onClick={() => setStep(2)}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 px-5 py-3 font-mono text-sm uppercase text-white hover:bg-neutral-700 disabled:opacity-50"
            >
              Continue <ArrowRight className="size-4" />
            </button>
          </>
        ) : (
          <>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium text-neutral-900">
                Name
                <input
                  required
                  name="name"
                  autoComplete="name"
                  className="mt-2 w-full rounded-lg border border-neutral-300 px-3 py-2.5 font-normal outline-none focus:border-neutral-900"
                />
              </label>
              <label className="text-sm font-medium text-neutral-900">
                Email
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="mt-2 w-full rounded-lg border border-neutral-300 px-3 py-2.5 font-normal outline-none focus:border-neutral-900"
                />
              </label>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium text-neutral-900">
                Repo or builder URL{" "}
                <span className="font-normal text-neutral-500">optional</span>
                <input
                  name="repo"
                  className="mt-2 w-full rounded-lg border border-neutral-300 px-3 py-2.5 font-normal outline-none focus:border-neutral-900"
                />
              </label>
              <label className="text-sm font-medium text-neutral-900">
                Domain{" "}
                <span className="font-normal text-neutral-500">optional</span>
                <input
                  name="domain"
                  className="mt-2 w-full rounded-lg border border-neutral-300 px-3 py-2.5 font-normal outline-none focus:border-neutral-900"
                />
              </label>
            </div>
            {error ? (
              <p role="alert" className="mt-4 text-sm font-medium text-red-700">
                {error}
              </p>
            ) : null}
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-4 py-3 font-mono text-sm uppercase text-neutral-700 hover:bg-neutral-100"
              >
                <ArrowLeft className="size-4" /> Back
              </button>
              <button
                disabled={loading}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-neutral-900 px-5 py-3 font-mono text-sm uppercase text-white hover:bg-neutral-700 disabled:opacity-70"
              >
                {loading ? <Loader2 className="size-4 animate-spin" /> : null}{" "}
                {onSubmit ? "Continue to payment" : "Preview submission"}
              </button>
            </div>
          </>
        )}
      </form>
    </dialog>
  );
  return (
    <>
      {
        <button
          type="button"
          data-umami-event={eventName}
          onClick={() => {
            onOpen?.();
            setOpen(true);
          }}
          className={className}
        >
          {children}
        </button>
      }
      {dialog}
    </>
  );
}
