"use client";

import { ArrowDownIcon } from "@phosphor-icons/react";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
const clamp = (value: number) => Math.min(1, Math.max(0, value));
export function Approach() {
  const sectionRef = useRef<HTMLElement>(null);
  const [arrowShown, setArrowShown] = useState(false);
  const [arrowAngle, setArrowAngle] = useState(0);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (window.innerWidth < 768) return;
      const rect = section.getBoundingClientRect();
      const progress = clamp(-rect.top / (rect.height - window.innerHeight));
      const settle = clamp(progress * 1.8);
      setArrowShown(progress >= 0.05);
      setArrowAngle(45 * clamp((progress - 0.05) / 0.95));
      section.style.setProperty("--card-scale", `${0.9 + settle * 0.1}`);
      section.style.setProperty(
        "--spine-scale",
        `${clamp((progress - 0.12) * 2.3)}`,
      );
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
    <section
      ref={sectionRef}
      id="approach"
      aria-labelledby="approach-title"
      className="relative bg-[var(--mist)] py-24 md:h-[175svh] md:py-0 md:motion-reduce:h-auto md:motion-reduce:py-32"
      style={{ "--card-scale": "1", "--spine-scale": "0" } as CSSProperties}
    >
      <div className="md:sticky md:top-0 md:flex md:min-h-svh md:items-center md:motion-reduce:static md:motion-reduce:min-h-0">
        <div className="mx-auto w-[calc(100%-40px)] max-w-[1500px] md:w-[calc(100%-84px)]">
          <h2
            id="approach-title"
            className="max-w-[1100px] text-[clamp(2.7rem,10vw,6rem)] leading-[.98] tracking-[-0.075em] md:text-[clamp(3.2rem,5.2vw,6rem)]"
          >
            A workspace that outlives the GPU.
          </h2>
          <p className="mt-5 max-w-[680px] text-lg leading-relaxed text-[var(--muted)] md:text-xl">
            Keep your project in one place, and use GPU time only when your work
            needs it.
          </p>

          <div className="relative mt-6 grid overflow-hidden rounded-[28px] bg-mi-paper md:grid-cols-2 md:scale-[var(--card-scale)] md:rounded-[44px]">
            <div className="flex min-h-[310px] flex-col justify-between p-7 md:min-h-[300px] md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[.16em] text-[var(--muted)]">
                01 / Your project
              </p>
              <div>
                <p className="text-[clamp(2.2rem,10vw,5rem)] leading-none tracking-[-0.07em] md:text-[clamp(2.7rem,4vw,5rem)]">
                  Your work
                  <br />
                  stays here.
                </p>
                <p className="mt-5 max-w-[480px] text-base leading-relaxed text-[var(--muted)] md:text-lg">
                  Code, files, notebooks, and checkpoints remain with the
                  project between sessions.
                </p>
              </div>
            </div>
            <div className="relative flex min-h-[310px] flex-col justify-between bg-mi-ink p-7 text-mi-paper md:min-h-[300px] md:p-8">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 z-20 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-mi-wisteria-blue-300 text-mi-ink md:hidden"
              >
                <ArrowDownIcon className="size-6" />
              </span>
              <p className="text-sm font-semibold uppercase tracking-[.16em] text-mi-paper/65">
                02 / GPU session
              </p>
              <div>
                <p className="text-[clamp(2.2rem,10vw,5rem)] leading-none tracking-[-0.07em] md:text-[clamp(2.7rem,4vw,5rem)]">
                  The power
                  <br />
                  comes and goes.
                </p>
                <p className="mt-5 max-w-[480px] text-base leading-relaxed text-mi-paper/75 md:text-lg">
                  Start a GPU session for demanding work. Stop it when you are
                  done and return to the same project later.
                </p>
              </div>
            </div>
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-1/2 z-10 hidden w-1 origin-top -translate-x-1/2 scale-y-[var(--spine-scale)] bg-mi-wisteria-blue-300 md:block motion-reduce:!scale-y-100"
            />
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-1/2 z-20 hidden -translate-x-1/2 items-center md:flex"
            >
              <span
                className={`grid size-16 place-items-center rounded-full bg-mi-wisteria-blue-300 text-mi-ink transition-[transform,opacity] duration-500 ease-out motion-reduce:!scale-100 motion-reduce:!rotate-0 motion-reduce:!opacity-100 motion-reduce:transition-none ${arrowShown ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-45 opacity-0"}`}
              >
                <span
                  className="grid size-7 rotate-[var(--arrow-angle)] place-items-center motion-reduce:!rotate-45"
                  style={
                    { "--arrow-angle": `${arrowAngle}deg` } as CSSProperties
                  }
                >
                  <ArrowUpRightIcon className="size-7" />
                </span>
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
