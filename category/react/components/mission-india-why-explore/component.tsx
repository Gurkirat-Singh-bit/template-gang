"use client";

import { Fragment, useEffect, useRef, useState } from "react";
const words =
  "Students have ideas worth testing. Hardware should not decide how far those ideas can go.".split(
    " ",
  );
const emphasizedWords = new Set([2, 5, 12]);
const markedWords = new Set([3, 4, 7, 8]);
export function WhyExplore() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [highlightedWords, setHighlightedWords] = useState(0);
  useEffect(() => {
    const section = sectionRef.current;
    if (
      !section ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (window.innerWidth < 768) {
        setHighlightedWords(words.length);
        return;
      }
      const rect = section.getBoundingClientRect();
      const scrollDistance = rect.height - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / scrollDistance));
      setHighlightedWords(Math.ceil(progress * words.length));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div
      ref={sectionRef}
      className="relative bg-mi-ink text-mi-paper md:h-[200svh] motion-reduce:h-auto"
    >
      <div className="relative flex items-center py-20 md:sticky md:top-0 md:min-h-svh motion-reduce:relative motion-reduce:min-h-0">
        <div className="mx-auto w-[calc(100%-40px)] max-w-[1500px] md:w-[calc(100%-84px)]">
          <h2
            id="problem-title"
            className="max-w-[1350px] text-[clamp(2.25rem,9vw,6.5rem)] font-normal leading-[1.08] tracking-[-0.065em] md:text-[clamp(2.7rem,6vw,6.5rem)]"
          >
            {words.map((word, index) => (
              <Fragment key={index}>
                <span
                  className={`motion-reduce:text-mi-paper! ${markedWords.has(index) ? (index < highlightedWords ? "text-mi-paper underline decoration-mi-wisteria-blue-300 decoration-[.07em] underline-offset-[.12em]" : "text-mi-paper/30") : index === highlightedWords - 1 || (index < highlightedWords && emphasizedWords.has(index)) ? "text-mi-wisteria-blue-300" : index < highlightedWords ? "text-mi-paper" : "text-mi-paper/30"}`}
                >
                  {word}
                </span>{" "}
              </Fragment>
            ))}
          </h2>
        </div>
      </div>
    </div>
  );
}
