"use client";

import { useContactModal } from "@/components/layout/ContactModalContext";

export default function FinalCTA() {
  const { openContactModal } = useContactModal();

  return (
    <section className="relative overflow-hidden bg-ink py-28 text-ivory md:py-40">
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

        <div className="mt-10 flex flex-wrap gap-4">
          <button type="button" onClick={() => openContactModal()} className="btn-brass">
            Book a Consultation
          </button>
          <button type="button" onClick={() => openContactModal()} className="btn-outline-light">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}
