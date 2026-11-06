"use client";

import { useState, type FormEvent } from "react";
import { emailPattern } from "./support/lib/interest";
export function InterestForm({
  status,
  open = true,
  onSubmit,
}: {
  status?: string;
  open?: boolean;
  onSubmit?: (values: FormData) => void | Promise<void>;
}) {
  const [feedback, setFeedback] = useState("");
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    try {
      await onSubmit?.(values);
      setFeedback(
        onSubmit
          ? "Response submitted."
          : "Demo response captured. No data was sent.",
      );
    } catch {
      setFeedback("Could not submit. Please try again.");
    }
  }
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const emailInvalid =
    emailTouched && email.length > 0 && !emailPattern.test(email.trim());
  return (
    <form className="mi-interest-form" onSubmit={handleSubmit}>
      <h2>Join the interest list.</h2>
      <p className="mi-form-intro">
        Tell us who you are and how YuvaCompute could help you.
      </p>

      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        autoComplete="name"
        required
        maxLength={120}
        placeholder="Your full name"
      />

      <label htmlFor="email">Email address</label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        maxLength={254}
        placeholder="you@example.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        onBlur={() => setEmailTouched(true)}
        onInvalid={() => setEmailTouched(true)}
        aria-invalid={emailInvalid}
        aria-describedby={emailInvalid ? "email-error" : undefined}
      />
      {emailInvalid && (
        <p id="email-error" className="mi-field-error" role="alert">
          Enter a valid email address, such as you@example.com.
        </p>
      )}

      <fieldset className="mi-choice-options">
        <legend>Role</legend>
        <label>
          <input type="radio" name="role" value="student" required />
          <span>Student</span>
        </label>
        <label>
          <input type="radio" name="role" value="faculty" />
          <span>Faculty or researcher</span>
        </label>
        <label>
          <input type="radio" name="role" value="institution" />
          <span>Institution representative</span>
        </label>
        <label>
          <input type="radio" name="role" value="other" />
          <span>Other</span>
        </label>
      </fieldset>

      <label htmlFor="reason">How could YuvaCompute help you?</label>
      <textarea
        id="reason"
        name="reason"
        required
        rows={5}
        placeholder="Tell us what you need help doing."
        aria-describedby="reason-count"
        aria-invalid={wordCount > 500}
        onChange={(event) =>
          setWordCount(
            event.target.value.trim().split(/\s+/u).filter(Boolean).length,
          )
        }
      />
      <p
        id="reason-count"
        className={`mi-word-count${wordCount > 500 ? " mi-word-count-error" : ""}`}
        aria-live="polite"
      >
        {wordCount} words · 20 minimum, 500 maximum
        {wordCount > 500 ? ". Please shorten your answer." : ""}
      </p>

      <div className="mi-honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="mi-form-footnote mi-form-use-note">
        By submitting, you agree that YuvaCompute may store your name, email,
        role, and explanation to understand student needs. Joining does not
        reserve GPU access.
      </p>
      {status === "invalid" && (
        <p className="mi-form-error" role="alert">
          Please check the fields and try again.
        </p>
      )}
      {status === "unavailable" && (
        <p className="mi-form-error" role="alert">
          We could not save your response. Please try again later.
        </p>
      )}
      {status === "paused" && (
        <p className="mi-form-error" role="alert">
          The interest list is not accepting responses yet.
        </p>
      )}
      <button
        className="mi-button mi-button-dark mi-form-submit"
        type="submit"
        disabled={!open || wordCount < 20 || wordCount > 500 || emailInvalid}
      >
        {open ? "Join the interest list" : "Opening soon"}
      </button>
      {!open && (
        <p className="mi-form-footnote">
          Submissions will open when secure storage is connected.
        </p>
      )}
      {feedback && (
        <p className="mi-form-feedback" role="status">
          {feedback}
        </p>
      )}
    </form>
  );
}
