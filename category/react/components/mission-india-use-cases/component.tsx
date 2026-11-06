"use client";

import { ArrowLeftIcon } from "@phosphor-icons/react";
import { ArrowRightIcon } from "@phosphor-icons/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
const slides = [
  {
    tag: "01 / MODEL TRAINING",
    title: "Train a model.",
    description:
      "Run experiments that outgrow a laptop, then keep the checkpoints for the next session.",
    ink: "text-mi-paper",
    background:
      "radial-gradient(circle at 84% 44%, transparent 0 165px, var(--color-wisteria-blue-300) 166px 181px, transparent 182px 255px, color-mix(in srgb, var(--color-wisteria-blue-300) 55%, transparent) 256px 266px, transparent 267px), var(--ink)",
  },
  {
    tag: "02 / NOTEBOOKS",
    title: "Try the idea.",
    description:
      "Open a browser notebook to test code, compare results, and use GPU time where it helps.",
    ink: "text-mi-ink",
    background:
      "radial-gradient(circle at 76% 82%, transparent 0 125px, color-mix(in srgb, var(--ink) 20%, transparent) 126px 128px, transparent 129px), var(--color-wisteria-blue-300)",
  },
  {
    tag: "03 / STUDENT PROJECTS",
    title: "Build a prototype.",
    description:
      "Work on vision, language, or creative tools without needing a GPU in your own machine.",
    ink: "text-mi-ink",
    background:
      "repeating-linear-gradient(130deg, color-mix(in srgb, var(--ink) 14%, transparent) 0 5px, transparent 5px 42px), var(--paper)",
  },
] as const;
const strips = Array.from({ length: 8 }, (_, index) => index);
export function UseCases() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const [manual, setManual] = useState(false);
  const [paused, setPaused] = useState(false);
  const activeRef = useRef(0);
  const busyRef = useRef(false);
  const pendingRef = useRef<number | null>(null);
  const goToRef = useRef<(next: number, dir: number) => void>(() => {});
  const finishRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartRef = useRef<{
    x: number;
    y: number;
  } | null>(null);
  const goTo = useCallback((next: number, dir: number) => {
    if (busyRef.current) {
      pendingRef.current = next;
      return;
    }
    if (next === activeRef.current) return;
    const current = activeRef.current;
    activeRef.current = next;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(next);
      return;
    }
    busyRef.current = true;
    setPrevious(current);
    setDirection(dir);
    setActive(next);
    finishRef.current = setTimeout(() => {
      setPrevious(null);
      busyRef.current = false;
      finishRef.current = null;
      const pending = pendingRef.current;
      pendingRef.current = null;
      if (pending !== null && pending !== activeRef.current)
        goToRef.current(pending, pending > activeRef.current ? 1 : -1);
    }, 1200);
  }, []);
  useEffect(() => {
    goToRef.current = goTo;
  }, [goTo]);
  useEffect(() => {
    if (
      manual ||
      paused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(min-width: 768px)").matches
    )
      return;
    const timer = setInterval(
      () => goTo((activeRef.current + 1) % slides.length, 1),
      5200,
    );
    return () => clearInterval(timer);
  }, [goTo, manual, paused]);
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
      if (window.innerWidth < 768) return;
      const rect = section.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / distance));
      const reveal = Math.min(1, progress * 5);
      section.style.setProperty("--case-y", `${64 * (1 - reveal)}px`);
      section.style.setProperty("--case-scale", `${0.94 + 0.06 * reveal}`);
      section.style.setProperty("--heading-y", `${30 * (1 - reveal)}px`);
      const next = Math.min(
        slides.length - 1,
        Math.floor(progress * slides.length),
      );
      if (next !== activeRef.current)
        goTo(next, next > activeRef.current ? 1 : -1);
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
  }, [goTo]);
  useEffect(
    () => () => {
      if (finishRef.current) clearTimeout(finishRef.current);
    },
    [],
  );
  const navigate = (next: number, dir: number) => {
    setManual(true);
    goTo(next, dir);
  };
  const slide = slides[active];
  return (
    <section
      ref={sectionRef}
      aria-labelledby="use-cases-title"
      className="relative bg-[var(--warm)] py-20 md:h-[230svh] md:py-0 md:motion-reduce:h-auto md:motion-reduce:py-32"
      style={
        {
          "--case-y": "0px",
          "--case-scale": "1",
          "--heading-y": "0px",
        } as CSSProperties
      }
    >
      <div className="md:sticky md:top-0 md:flex md:min-h-svh md:items-center md:motion-reduce:static md:motion-reduce:min-h-0">
        <div className="mx-auto w-[calc(100%-40px)] max-w-[1500px] md:w-[calc(100%-84px)]">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-5 md:translate-y-[var(--heading-y)]">
            <div>
              <h2
                id="use-cases-title"
                className="text-[clamp(2.7rem,5vw,5rem)] leading-[1.03] tracking-[-0.065em]"
              >
                Where a GPU helps.
              </h2>
            </div>
            <p className="max-w-[350px] text-sm leading-relaxed text-[var(--muted)]">
              These are examples of work we are designing for. The platform is
              still in development.
            </p>
          </div>

          <div
            aria-roledescription="carousel"
            aria-label="Student GPU use cases"
            className="relative h-[360px] touch-pan-y overflow-hidden rounded-[28px] bg-mi-ink sm:h-[410px] md:h-[min(65svh,600px)] md:min-h-[400px] md:translate-y-[var(--case-y)] md:scale-[var(--case-scale)] md:rounded-[44px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget))
                setPaused(false);
            }}
            onTouchStart={(event) => {
              touchStartRef.current = {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY,
              };
              setPaused(true);
            }}
            onTouchEnd={(event) => {
              setPaused(false);
              const start = touchStartRef.current;
              touchStartRef.current = null;
              if (!start) return;
              const deltaX = event.changedTouches[0].clientX - start.x;
              const deltaY = event.changedTouches[0].clientY - start.y;
              if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY))
                navigate(
                  (activeRef.current + (deltaX < 0 ? 1 : slides.length - 1)) %
                    slides.length,
                  deltaX < 0 ? 1 : -1,
                );
            }}
            onTouchCancel={() => {
              touchStartRef.current = null;
              setPaused(false);
            }}
          >
            {previous === null ? (
              <div
                className="absolute inset-0"
                style={{ background: slide.background }}
              />
            ) : (
              <>
                {[previous, active].map((slideIndex, layer) => (
                  <div
                    key={`${slideIndex}-${layer}`}
                    className="absolute inset-0 flex"
                    aria-hidden="true"
                  >
                    {strips.map((strip) => (
                      <div
                        key={strip}
                        className="h-full flex-1 overflow-hidden"
                      >
                        <div
                          className={`h-full ${layer === 0 ? (direction > 0 ? "animate-[usecase-out-up_700ms_cubic-bezier(0.65,0,0.35,1)_both]" : "animate-[usecase-out-down_700ms_cubic-bezier(0.65,0,0.35,1)_both]") : direction > 0 ? "animate-[usecase-in-up_700ms_cubic-bezier(0.65,0,0.35,1)_both]" : "animate-[usecase-in-down_700ms_cubic-bezier(0.65,0,0.35,1)_both]"}`}
                          style={{
                            width: "800%",
                            marginLeft: `-${strip * 100}%`,
                            background: slides[slideIndex].background,
                            animationDelay: `${strip * 55}ms`,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </>
            )}

            <div
              key={active}
              className={`pointer-events-none absolute inset-0 flex flex-col justify-start p-5 md:justify-between md:p-12 ${slide.ink} ${previous === null ? "" : "animate-[usecase-copy-in_550ms_ease-out_350ms_both]"}`}
            >
              <p className="w-fit rounded-full border border-current px-3 py-2 text-[11px] font-semibold leading-tight tracking-[.1em] md:px-4 md:text-xs md:tracking-[.16em]">
                {slide.tag}
              </p>
              <div className="mt-12 max-w-[1050px] md:mt-0">
                <h3 className="text-[clamp(2.5rem,10vw,8.5rem)] font-medium leading-[.98] tracking-[-0.08em] md:text-[clamp(3.5rem,8vw,8.5rem)] md:leading-[.94]">
                  {slide.title}
                </h3>
                <p className="mt-4 max-w-[610px] text-base leading-snug md:mt-6 md:text-2xl">
                  {slide.description}
                </p>
              </div>
            </div>

            <div className="absolute right-12 top-12 z-10 hidden gap-2 md:flex">
              <button
                type="button"
                aria-label="Previous use case"
                onClick={() =>
                  navigate(
                    (activeRef.current - 1 + slides.length) % slides.length,
                    -1,
                  )
                }
                className="grid size-11 place-items-center rounded-full bg-mi-ink text-mi-paper transition-colors hover:bg-mi-paper hover:text-mi-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
              >
                <ArrowLeftIcon className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Next use case"
                onClick={() =>
                  navigate((activeRef.current + 1) % slides.length, 1)
                }
                className="grid size-11 place-items-center rounded-full bg-mi-ink text-mi-paper transition-colors hover:bg-mi-paper hover:text-mi-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
              >
                <ArrowRightIcon className="size-5" aria-hidden="true" />
              </button>
            </div>
            <div className="absolute bottom-12 right-12 z-10 hidden gap-0 rounded-full bg-mi-ink p-1 md:flex">
              {slides.map((item, index) => (
                <button
                  key={item.tag}
                  type="button"
                  aria-label={`Show use case ${index + 1}: ${item.title}`}
                  aria-current={index === active ? "true" : undefined}
                  onClick={() =>
                    navigate(index, index > activeRef.current ? 1 : -1)
                  }
                  className="grid size-11 place-items-center rounded-full"
                >
                  <span
                    className={`h-2 rounded-full transition-all ${index === active ? "w-8 bg-mi-paper" : "w-3 bg-mi-paper/40 hover:bg-mi-paper/70"}`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between md:hidden">
            <button
              type="button"
              aria-label="Previous use case"
              onClick={() =>
                navigate(
                  (activeRef.current - 1 + slides.length) % slides.length,
                  -1,
                )
              }
              className="grid size-11 place-items-center rounded-full bg-mi-ink text-mi-paper"
            >
              <ArrowLeftIcon className="size-5" aria-hidden="true" />
            </button>
            <div className="flex rounded-full bg-mi-ink p-1">
              {slides.map((item, index) => (
                <button
                  key={item.tag}
                  type="button"
                  aria-label={`Show use case ${index + 1}: ${item.title}`}
                  aria-current={index === active ? "true" : undefined}
                  onClick={() =>
                    navigate(index, index > activeRef.current ? 1 : -1)
                  }
                  className="grid size-11 place-items-center rounded-full"
                >
                  <span
                    className={`h-2 rounded-full transition-all ${index === active ? "w-8 bg-mi-paper" : "w-3 bg-mi-paper/40"}`}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              aria-label="Next use case"
              onClick={() =>
                navigate((activeRef.current + 1) % slides.length, 1)
              }
              className="grid size-11 place-items-center rounded-full bg-mi-ink text-mi-paper"
            >
              <ArrowRightIcon className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
