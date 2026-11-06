"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type FormEvent,
} from "react";
import { XIcon } from "@phosphor-icons/react";
type Booking = {
  date: string;
  time: string;
  name: string;
  email: string;
};
type Props = {
  className?: string;
  children: ReactNode;
  autoOpen?: boolean;
  onOpen?: () => void;
  eventName?: string;
  onBook?: (booking: Booking) => void | Promise<void>;
};
/** Local booking dialog. Pass onBook to connect a booking service. */
export function CalPopupButton({
  className,
  children,
  autoOpen = false,
  onOpen,
  eventName,
  onBook,
}: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(autoOpen);
  useEffect(() => {
    if (open && !dialog.current?.open) dialog.current?.showModal();
    if (!open && dialog.current?.open) dialog.current.close();
    if (!open) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [open]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true);
    setMessage("");
    try {
      await onBook?.({
        date: String(form.get("date")),
        time: String(form.get("time")),
        name: String(form.get("name")),
        email: String(form.get("email")),
      });
      setMessage(
        onBook
          ? "Booking request submitted."
          : "Demo booking captured. No appointment was scheduled.",
      );
    } catch {
      setMessage("Could not book. Please try again.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <button
        type="button"
        className={className}
        data-umami-event={eventName}
        onClick={() => {
          onOpen?.();
          setMessage("");
          setOpen(true);
        }}
      >
        {children}
      </button>
      <dialog
        ref={dialog}
        className="ra-calendar-dialog"
        aria-labelledby="booking-title"
        onCancel={(event) => {
          event.preventDefault();
          setOpen(false);
        }}
      >
        <form onSubmit={submit} className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase text-neutral-500">
                30 minute call
              </p>
              <h2 id="booking-title" className="mt-2 text-2xl font-medium">
                Book a project call
              </h2>
            </div>
            <button
              type="button"
              aria-label="Close booking"
              className="rounded-lg p-2 hover:bg-neutral-100"
              onClick={() => setOpen(false)}
            >
              <XIcon size={20} />
            </button>
          </div>
          {!onBook && (
            <p className="mt-3 text-sm text-neutral-500">
              Local preview. No booking service is connected.
            </p>
          )}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium">
              Date
              <input
                required
                name="date"
                type="date"
                className="mt-2 block w-full rounded-lg border border-neutral-300 p-3"
              />
            </label>
            <label className="text-sm font-medium">
              Time
              <select
                required
                name="time"
                aria-label="Time"
                className="mt-2 block w-full rounded-lg border border-neutral-300 bg-white p-3"
              >
                <option value="">Select a time</option>
                <option>10:00</option>
                <option>14:00</option>
                <option>16:00</option>
              </select>
            </label>
            <label className="text-sm font-medium">
              Name
              <input
                required
                name="name"
                autoComplete="name"
                className="mt-2 block w-full rounded-lg border border-neutral-300 p-3"
              />
            </label>
            <label className="text-sm font-medium">
              Email
              <input
                required
                name="email"
                type="email"
                autoComplete="email"
                className="mt-2 block w-full rounded-lg border border-neutral-300 p-3"
              />
            </label>
          </div>
          {message && (
            <p role="status" className="mt-4 text-sm">
              {message}
            </p>
          )}
          <button
            disabled={busy}
            className="mt-6 w-full rounded-lg bg-neutral-900 px-5 py-3 text-white hover:bg-neutral-700 disabled:opacity-50"
          >
            {busy
              ? "Submitting…"
              : onBook
                ? "Request booking"
                : "Preview booking"}
          </button>
        </form>
      </dialog>
    </>
  );
}
