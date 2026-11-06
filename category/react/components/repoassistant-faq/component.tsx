"use client";

import { useState } from "react";
import { faqs } from "./support/src/lib/faqs";
export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section className="bg-white rounded-xl px-3 py-12 pb-8 lg:py-25">
      <div className="max-w-7xl mx-auto">
        <div className="flex-col flex lg:flex-row justify-between gap-10 xl:gap-16">
          {/* FAQ side */}
          <div className="xl:w-4/12">
            <div>
              <p className="flex font-mono gap-2 items-center uppercase text-neutral-900 mb-4">
                <span className="size-2 rounded-full bg-neutral-700" />
                FAQ
              </p>
              <h2 className="text-3xl -tracking-[2px] sm:text-4xl lg:text-5xl font-medium text-neutral-900 lg:leading-14">
                Questions before you hand over the repo.
              </h2>
            </div>
          </div>

          {/* Accordion side */}
          <div className="xl:w-6/12">
            <div className="divide-y divide-neutral-100">
              {faqs.map((faq, index) => (
                <div key={faq.question} className="bg-white">
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                    className="w-full flex items-center gap-4 py-5 text-left"
                  >
                    <span
                      className="shrink-0 size-7 rounded-lg flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor:
                          openIndex === index
                            ? "rgb(17, 24, 39)"
                            : "transparent",
                        color:
                          openIndex === index
                            ? "rgb(255, 255, 255)"
                            : "rgb(107, 114, 128)",
                      }}
                    >
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          transform:
                            openIndex === index ? "rotate(90deg)" : "none",
                        }}
                      >
                        <path
                          d="M6.30078 13.6523L11.5508 8.40234L6.30078 3.15234"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="font-medium text-xl text-neutral-900">
                      {faq.question}
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      height: openIndex === index ? "auto" : "0",
                      opacity: openIndex === index ? 1 : 0,
                    }}
                  >
                    <p className="pb-5 max-w-xl text-neutral-500 text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
