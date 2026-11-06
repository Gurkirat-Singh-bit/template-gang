"use client";
import asset0 from "./assets/hero-textile-overlap.webp";
import asset1 from "./assets/hero-textile-fan.webp";
import asset2 from "./assets/hero-textile-collage.webp";

import Image from "next/image";
import { useEffect, useState } from "react";
const textileImages = [asset0.src, asset1.src, asset2.src];
type SlideState = {
  current: number;
  previous: number | null;
  ready: boolean;
};
export function ReferenceImage() {
  const [slide, setSlide] = useState<SlideState>({
    current: 0,
    previous: null,
    ready: true,
  });
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => {
      setSlide((current) =>
        current.ready
          ? {
              current: (current.current + 1) % textileImages.length,
              previous: current.current,
              ready: false,
            }
          : current,
      );
    }, 5000);
    return () => window.clearInterval(interval);
  }, []);
  useEffect(() => {
    if (slide.previous === null || !slide.ready) return;
    const timeout = window.setTimeout(() => {
      setSlide((current) => ({ ...current, previous: null }));
    }, 1000);
    return () => window.clearTimeout(timeout);
  }, [slide.previous, slide.ready]);
  const sizes = "(max-width: 767px) calc(100vw - 24px), calc(100vw - 48px)";
  const revealSlide = () => {
    const loadedSlide = slide.current;
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setSlide((current) =>
          current.current === loadedSlide && !current.ready
            ? { ...current, ready: true }
            : current,
        );
      });
    });
  };
  return (
    <figure className="mi-hero-photo relative w-full overflow-hidden rounded-[28px] sm:rounded-[36px] lg:rounded-[44px]">
      {slide.previous !== null && (
        <picture key={`previous-${slide.previous}`}>
          <Image
            unoptimized
            src={textileImages[slide.previous]}
            alt=""
            fill
            sizes={sizes}
            className="mi-hero-slide mi-is-active object-cover object-center"
          />
        </picture>
      )}
      <picture key={`current-${slide.current}`}>
        <Image
          unoptimized
          src={textileImages[slide.current]}
          alt=""
          fill
          loading="eager"
          fetchPriority={
            slide.current === 0 && slide.previous === null ? "high" : undefined
          }
          sizes={sizes}
          onLoad={revealSlide}
          className={`mi-hero-slide object-cover object-center${slide.previous === null || slide.ready ? " mi-is-active" : ""}`}
        />
      </picture>
    </figure>
  );
}
