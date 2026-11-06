"use client";

import { CaretRightIcon } from "@phosphor-icons/react";
import { useState } from "react";
type FaqItem = {
  question: string;
  answer: string;
};
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div className="flex flex-col gap-3">
      {items.map(({ question, answer }, index) => {
        const open = openIndex === index;
        const answerId = `faq-answer-${index}`;
        return (
          <div key={question} className="rounded-[10px] bg-[var(--mist)]">
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={answerId}
                onClick={() =>
                  setOpenIndex((current) => (current === index ? null : index))
                }
                className="flex w-full items-center gap-4 px-6 py-6 text-left text-lg font-medium leading-snug tracking-[-0.025em] text-mi-ink md:px-8 md:py-7 md:text-xl"
              >
                <span
                  aria-hidden="true"
                  className={`grid size-9 shrink-0 place-items-center rounded-xl transition-colors duration-300 ${open ? "bg-mi-ink text-mi-paper" : "text-[var(--muted)]"}`}
                >
                  <CaretRightIcon
                    weight="bold"
                    className={`size-6 transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-90" : ""}`}
                  />
                </span>
                {question}
              </button>
            </h3>
            <div
              id={answerId}
              role="region"
              aria-label={question}
              aria-hidden={!open}
              className={`grid transition-[grid-template-rows,opacity] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="max-w-[640px] px-6 pb-7 pt-1 text-base leading-relaxed text-[var(--muted)] md:px-8 md:text-lg">
                  {answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
