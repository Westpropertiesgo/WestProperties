"use client";

import { useEffect, useRef, useState } from "react";

export default function FinalCTA() {
  const [infoOpen, setInfoOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setInfoOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <section className="relative overflow-hidden bg-ink py-20 text-ivory md:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <img
          src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2000&auto=format&fit=crop"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      <div className="container-x relative z-10 flex flex-col items-start">
        <span className="plaque mb-6 text-brass-light">Next Steps</span>
        <h2 className="max-w-2xl font-display text-[28px] font-light leading-[1.15] md:text-[34px]">
          Ready to buy or sell your next home?
        </h2>
        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ivory/65">
          Whether you&rsquo;re searching your first street or listing a home
          you&rsquo;ve loved for years, a local specialist is ready to help.
        </p>

        {/* Book a Consultation already lives in the header on every page, so
            this section only needs the lighter "how to reach us directly"
            option, not a second copy of the same CTA. */}
        <div ref={wrapperRef} className="relative mt-10">
          <button
            type="button"
            onClick={() => setInfoOpen((v) => !v)}
            aria-expanded={infoOpen}
            className="rounded-md border border-brass px-7 py-3 font-mono text-[11px] uppercase tracking-widest2 text-brass transition-all duration-300 hover:scale-[1.02] hover:bg-brass hover:text-ink"
          >
            Contact Us
          </button>

          {infoOpen && (
            <div className="animate-dropdown-in absolute left-0 top-full z-20 mt-3 w-64 border border-ivory/15 bg-ink p-5 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6)]">
              <p className="font-mono text-[10px] uppercase tracking-widest2 text-ivory/40">
                Reach Us Directly
              </p>
              <a
                href="mailto:info@westproperties.ca"
                className="mt-3 block text-[14px] text-ivory/85 hover:text-brass-light"
              >
                info@westproperties.ca
              </a>
              <a
                href="tel:+16474822470"
                className="mt-2 block text-[14px] text-ivory/85 hover:text-brass-light"
              >
                647-482-2470
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
