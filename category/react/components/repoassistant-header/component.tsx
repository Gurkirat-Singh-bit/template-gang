"use client";
import asset0 from "./assets/logo-black.png";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ListIcon as Menu, XIcon as X } from "@phosphor-icons/react";
import { CalPopupButton } from "./support/src/components/CalPopupButton";
const navLinks = [
  { href: "/#capabilities", label: "Pricing" },
  { href: "/guides", label: "Guides" },
  { href: "/tools", label: "Tools" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contacts", label: "Contact" },
];
function Wordmark() {
  return (
    <span className="inline-flex items-center gap-2">
      <Image
        src={asset0.src}
        alt="RepoAssistant logo"
        width={44}
        height={40}
        className="h-10 w-auto"
      />
      <span className="font-mono text-lg font-bold tracking-tight text-neutral-900">
        RepoAssistant
      </span>
    </span>
  );
}
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={`relative left-0 w-full z-50 transition-all duration-300 ${scrolled ? "top-0 bg-white/80 backdrop-blur-md shadow-sm" : "top-0"}`}
    >
      <div className="max-w-7xl mx-auto px-7 xl:px-0">
        <div className="flex items-center justify-between">
          <Link prefetch={false} href="/" className="shrink-0">
            <Wordmark />
          </Link>

          <nav
            className={`hidden lg:flex flex-1 max-w-fit rounded-xl p-1 h-15 items-center transition-all duration-300 ${scrolled ? "bg-transparent" : "bg-white"}`}
          >
            <ul className="flex flex-wrap justify-center items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    prefetch={false}
                    href={link.href}
                    className="py-2.5 px-5 font-mono uppercase text-base transition-colors rounded-lg hover:text-neutral-900 hover:bg-neutral-50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <CalPopupButton
                  eventName="cta-header-book"
                  className="text-white ml-2 py-2.5 px-6 h-12 font-mono uppercase text-base rounded-lg bg-neutral-900 transition-colors duration-300 hover:bg-neutral-700 inline-flex items-center"
                >
                  Book a meeting
                </CalPopupButton>
              </li>
            </ul>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 cursor-pointer text-neutral-900 focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="repoassistant-mobile-menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <div
            id="repoassistant-mobile-menu"
            className="lg:hidden mt-4 pb-4 bg-white rounded-xl p-4 shadow-lg"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  prefetch={false}
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 px-4 font-mono uppercase text-base transition-colors rounded-lg hover:text-neutral-900 hover:bg-neutral-50"
                >
                  {link.label}
                </Link>
              ))}
              <CalPopupButton
                eventName="cta-header-book-mobile"

                className="text-white py-2.5 px-5 font-mono uppercase text-base rounded-lg bg-neutral-900 transition-colors duration-300 hover:bg-neutral-700 text-center mt-2"
              >
                Book a meeting
              </CalPopupButton>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
