"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { navLinks, toolMenuLinks } from "@/lib/data";
import AuthModal from "@/components/layout/AuthModal";
import NavDrawer from "@/components/layout/NavDrawer";

function CaretIcon() {
  return (
    <svg viewBox="0 0 12 8" fill="none" className="h-[7px] w-[9px]">
      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-[17px] w-[17px]">
      <circle cx="10" cy="6.5" r="3.25" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3.5 17c1.2-3.2 4-4.5 6.5-4.5s5.3 1.3 6.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="flex h-11 w-11 flex-col items-center justify-center gap-[5px]">
      <span
        className={`h-px w-6 bg-current transition-transform duration-300 ${
          open ? "translate-y-[3px] rotate-45" : ""
        }`}
      />
      <span
        className={`h-px w-6 bg-current transition-transform duration-300 ${
          open ? "-translate-y-[3px] -rotate-45" : ""
        }`}
      />
    </span>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-signature ${
        scrolled ? "bg-ivory/95 shadow-[0_1px_0_0_rgba(20,33,43,0.08)] backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-8xl items-center justify-between px-6 md:h-24 md:px-10 lg:pl-8 lg:pr-6">
        <div className="flex items-center gap-2 md:gap-4">
          {/* Left-side hamburger — opens the hierarchical nav drawer, available on every breakpoint */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            className={`transition-colors duration-300 ${scrolled ? "text-ink" : "text-ivory"}`}
          >
            <HamburgerIcon open={false} />
          </button>

          <Link href="/" className="flex items-baseline gap-2 shrink-0" aria-label="West Properties — home">
            <span
              className={`font-logo text-2xl tracking-tight md:text-[28px] ${
                scrolled ? "text-ink" : "text-ivory"
              }`}
            >
              West
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest2 text-brass">
              Properties
            </span>
          </Link>
        </div>

        {/* Nav + CTA clustered together, shifted toward the right edge */}
        <div className="hidden items-center gap-8 lg:flex">
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-mono text-[12px] uppercase tracking-widest2 transition-colors duration-300 ${
                  scrolled ? "text-ink/70 hover:text-brass" : "text-ivory/85 hover:text-brass-light"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="relative" ref={toolsRef}>
              <button
                type="button"
                onClick={() => setToolsOpen((v) => !v)}
                aria-expanded={toolsOpen}
                className={`flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-widest2 transition-colors duration-300 ${
                  scrolled ? "text-ink/70 hover:text-brass" : "text-ivory/85 hover:text-brass-light"
                } ${toolsOpen ? (scrolled ? "text-brass" : "text-brass-light") : ""}`}
              >
                Tools
                <CaretIcon />
              </button>

              {toolsOpen && (
                <div className="absolute left-1/2 top-full mt-3 w-80 -translate-x-1/2 border border-stone-line bg-ivory shadow-[0_20px_50px_-10px_rgba(20,33,43,0.3)]">
                  <p className="border-b border-stone-line px-5 py-3 font-mono text-[10px] uppercase tracking-widest2 text-ink/40">
                    Tools &amp; Resources
                  </p>
                  <ul>
                    {toolMenuLinks.map((tool) => (
                      <li key={tool.href}>
                        <Link
                          href={tool.href}
                          onClick={() => setToolsOpen(false)}
                          className="flex flex-col gap-0.5 px-5 py-3 transition-colors hover:bg-stone"
                        >
                          <span className="text-[13px] text-ink">{tool.label}</span>
                          <span className="text-[11px] text-ink/45">{tool.description}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </nav>

          <button
            type="button"
            onClick={() => setAuthOpen(true)}
            aria-label="Log In or Sign Up"
            title="Log In / Sign Up"
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 ${
              scrolled
                ? "border-ink/25 text-ink/70 hover:border-brass hover:text-brass"
                : "border-ivory/35 text-ivory/85 hover:border-brass-light hover:text-brass-light"
            }`}
          >
            <UserIcon />
          </button>

          <Link
            href="/contact"
            className="rounded-md border border-brass px-7 py-3 font-mono text-[11px] uppercase tracking-widest2 text-brass transition-all duration-300 hover:scale-[1.02] hover:bg-brass hover:text-ink"
          >
            Book a Consultation
          </Link>
        </div>
      </div>

      <NavDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onRequireAuth={() => setAuthOpen(true)}
      />

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </header>
  );
}
