"use client";
import asset0 from "./assets/step-1.svg";
import asset1 from "./assets/step-2.svg";
import asset2 from "./assets/step-3.svg";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
const steps = [
  {
    number: "01",
    title: "Share the repo and the blocker",
    description:
      "Tell us what needs to go live, where it is failing, and the infrastructure you already have.",
    icon: asset0.src,
  },
  {
    number: "02",
    title: "We build the release path",
    description:
      "We set up the target, secure the configuration, and resolve the issue stopping the deployment.",
    icon: asset1.src,
  },
  {
    number: "03",
    title: "You get the keys and the runbook",
    description:
      "After a production smoke test, we hand over access and document how to deploy, recover, and roll back.",
    icon: asset2.src,
  },
];
export function SetupFlow() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const vh = window.innerHeight;
      const scrolled = -rect.top;
      const total = sectionHeight - vh;
      if (scrolled <= 0) {
        setActiveStep(0);
      } else if (scrolled >= total) {
        setActiveStep(steps.length - 1);
      } else {
        setActiveStep(
          Math.min(
            steps.length - 1,
            Math.floor((scrolled / total) * steps.length),
          ),
        );
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <section
      ref={sectionRef}
      className="bg-white rounded-xl px-3 py-12 lg:py-25"
      style={{ height: "250vh" }}
    >
      <div className="max-w-7xl mx-auto h-full">
        <div className="flex-col flex lg:flex-row justify-between gap-14 lg:gap-16 xl:gap-23.5">
          {/* Left side - sticky text */}
          <div className="lg:w-1/2">
            <div className="sticky top-20">
              <p className="flex font-mono gap-2 items-center uppercase text-neutral-900 mb-4">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.9019 15.1007L2.66562 17.337M6.64006 16.8388L5.77104 17.7078M3.16199 13.3624L2.29297 14.2314M13.4208 6.58181L11.653 8.34958M9.88112 16.5444L3.45785 10.1211C2.73444 9.3977 3.13895 8.15905 4.14988 8.00203L7.12389 7.54009C7.38599 7.49938 7.62835 7.37635 7.81591 7.18879L10.6893 4.31537C10.8747 4.13004 11.1136 4.00765 11.3722 3.96551L15.2305 3.33702C16.0732 3.19974 16.8025 3.929 16.6652 4.77173L16.0367 8.62998C15.9946 8.88866 15.8722 9.12756 15.6869 9.31289L12.8134 12.1863C12.6259 12.3739 12.5028 12.6162 12.4621 12.8783L12.0002 15.8523C11.8432 16.8633 10.6045 17.2678 9.88112 16.5444Z"
                    stroke="#404040"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                How it works
              </p>
              <h2 className="text-3xl -tracking-[2px] sm:text-4xl lg:text-5xl font-medium text-neutral-900 lg:leading-14 mb-4">
                A straightforward path from repo to production.
              </h2>
              <p className="text-lg text-neutral-500 mb-8 sm:mb-11 font-normal max-w-lg">
                No generic transformation project. We focus on the app, the
                infrastructure it needs, and the handover your team needs to run
                it.
              </p>
              <Link
                prefetch={false}
                href="/contacts"
                className="py-3 px-5 inline-flex text-white font-mono text-sm uppercase gap-2 items-center rounded-lg bg-black hover:bg-neutral-700 transition-colors duration-300"
              >
                Start with a free audit
                <span className="relative overflow-hidden inline-flex w-5 h-5">
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.3581 4.46332C15.2893 4.41722 15.2113 4.38389 15.1273 4.36675L15.1156 4.36557C15.0812 4.3593 15.0464 4.35582 15.0115 4.35512L14.9968 4.35364L7.50083 4.35156C7.14186 4.35144 6.85049 4.64175 6.85021 5.00053C6.85008 5.35922 7.14069 5.6504 7.49945 5.65087L13.4311 5.65267L4.54155 14.5422C4.28781 14.7961 4.28843 15.2075 4.54224 15.4613C4.79605 15.7151 5.20749 15.7158 5.46134 15.462L14.3465 6.57691L14.3482 12.4967C14.3484 12.8556 14.6405 13.1465 14.9996 13.1464C15.3584 13.146 15.6489 12.8548 15.6488 12.4961L15.6467 5.0544C15.6605 4.87194 15.5976 4.68478 15.4582 4.54536C15.427 4.51418 15.3935 4.48684 15.3581 4.46332Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </span>
              </Link>

              {/* Step indicator */}
              <div className="mt-10 flex gap-3">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i <= activeStep
                        ? "bg-neutral-900 w-10"
                        : "bg-neutral-200 w-5"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right side - stacking step cards */}
          <div className="lg:w-1/2">
            <div className="flex flex-col" style={{ paddingBottom: "80px" }}>
              {steps.map((step, index) => {
                const isActive = index === activeStep;
                return (
                  <div
                    key={step.number}
                    className="sticky w-full"
                    style={{
                      top: `${80 + index * 40}px`,
                      zIndex: index + 1,
                      paddingTop: index === 0 ? 0 : "40px",
                    }}
                  >
                    <div
                      className={`p-6 rounded-2xl transition-all duration-300 ${
                        isActive
                          ? "bg-neutral-50 shadow-[0px_6px_18.6px_0px_rgba(208,208,208,0.45)]"
                          : "bg-neutral-50/80"
                      }`}
                    >
                      <div className="flex gap-6 items-center mb-4">
                        <div className="size-11.5 shrink-0 bg-white flex shadow-[0px_6px_18.6px_0px_rgba(208,208,208,0.45)] items-center justify-center rounded-full border border-neutral-100">
                          <span
                            className={`font-mono text-sm font-medium ${isActive ? "text-neutral-900" : "text-neutral-400"}`}
                          >
                            {step.number}
                          </span>
                        </div>
                        <Image
                          alt={step.title}
                          className="size-11.5"
                          src={step.icon}
                          width={46}
                          height={46}
                        />
                      </div>
                      <h3 className="text-xl font-medium text-neutral-900 mb-1 -tracking-[0.2px]">
                        {step.title}
                      </h3>
                      <p className="text-neutral-500 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
