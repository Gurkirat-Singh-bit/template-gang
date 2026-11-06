"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
export function SiteHeader() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const nextY = window.scrollY;
      if (nextY < 32) {
        setHidden(false);
        lastY = nextY;
      } else if (Math.abs(nextY - lastY) > 6) {
        setHidden(nextY > lastY && nextY > 180);
        lastY = nextY;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <a className="mi-skip-link" href="#main">
        Skip to content
      </a>
      <header
        className={`mi-site-header${hidden ? " mi-site-header-hidden" : ""}`}
      >
        <div className="mi-site-header-inner">
          <Link
            prefetch={false}
            className="mi-wordmark"
            href="/"
            aria-label="YuvaCompute home"
          >
            yuva<span>compute</span>
          </Link>
          <nav className="mi-desktop-nav" aria-label="Main navigation">
            <Link prefetch={false} href="/about#idea">
              <span>The idea</span>
            </Link>
            <Link prefetch={false} href="/about">
              <span>About</span>
            </Link>
            <Link prefetch={false} href="/research-progress">
              <span>Research</span>
            </Link>
            <Link prefetch={false} href="/updates">
              <span>Updates</span>
            </Link>
          </nav>
          <Link
            prefetch={false}
            className="mi-button mi-button-dark mi-header-action"
            href="/beta#form"
          >
            <span className="sm:hidden">Join list</span>
            <span className="hidden sm:inline">Join interest list</span>
          </Link>
        </div>
        <nav className="mi-mobile-nav" aria-label="Mobile navigation">
          <Link prefetch={false} href="/about#idea">
            <span>The idea</span>
          </Link>
          <Link prefetch={false} href="/about">
            <span>About</span>
          </Link>
          <Link prefetch={false} href="/research-progress">
            <span>Research</span>
          </Link>
          <Link prefetch={false} href="/updates">
            <span>Updates</span>
          </Link>
        </nav>
      </header>
    </>
  );
}
