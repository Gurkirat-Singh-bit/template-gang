import asset0 from "./assets/about-step-verify.webp";
import asset1 from "./assets/about-step-code.webp";
import asset2 from "./assets/about-step-gpu.webp";
import asset3 from "./assets/about-step-save.webp";
import Image from "next/image";
const steps = [
  {
    number: "1",
    title: "Verify student",
    description:
      "One short student ID check. The verification method still needs to be designed.",
    image: asset0.src,
  },
  {
    number: "2",
    title: "Write code",
    description: "Start with a browser notebook or workspace for your project.",
    image: asset1.src,
  },
  {
    number: "3",
    title: "Run on a GPU",
    description:
      "Use GPU time for demanding work. Supply, limits, and price are still open.",
    image: asset2.src,
  },
  {
    number: "4",
    title: "Save and return",
    description: "Keep code, files, and checkpoints for another session.",
    image: asset3.src,
  },
] as const;
export function AboutIdea() {
  return (
    <section
      id="idea"
      className="scroll-mt-24 bg-[var(--warm)] py-20 md:py-28"
      aria-labelledby="about-idea-title"
    >
      <div className="mi-container">
        <div className="mb-10 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between md:gap-12">
          <h2
            className="max-w-[850px] text-[clamp(2.8rem,5vw,5.5rem)] leading-[1.02] tracking-[-0.07em]"
            id="about-idea-title"
          >
            From student ID to saved work.
          </h2>
          <p className="max-w-[410px] text-lg leading-relaxed text-[var(--muted)]">
            A proposed path for students whose projects need more than their own
            laptop.
          </p>
        </div>

        <ol className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li key={step.number} className="min-w-0">
              <div className="flex aspect-[3/2] items-end justify-center">
                <Image
                  src={step.image}
                  alt=""
                  width={640}
                  height={427}
                  sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) 45vw, 23vw"
                  className="h-auto w-full"
                  unoptimized
                />
              </div>
              <div className="mt-6 border-t border-mi-ink/25 pt-5">
                <h3 className="flex items-baseline gap-3 text-xl font-medium tracking-[-0.045em] md:text-2xl">
                  <span className="text-mi-wisteria-blue-600">
                    {step.number}
                  </span>
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[340px] text-base leading-relaxed text-[var(--muted)]">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-14 border-t border-mi-ink/25 pt-7 text-sm leading-relaxed text-[var(--muted)]">
          This is the experience I want to build. Student verification and GPU
          access are not available yet.
        </p>
      </div>
    </section>
  );
}
