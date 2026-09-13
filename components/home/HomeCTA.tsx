import Link from "next/link";

export default function HomeCTA() {
  return (
    <section className="border-t border-stone-line bg-stone py-20 md:py-28">
      <div className="container-x flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="plaque mb-4">Next Steps</span>
          <h2 className="max-w-xl font-display text-[26px] font-medium leading-[1.2] text-ink md:text-[30px]">
            Ready to buy or sell your next home?
          </h2>
          <p className="mt-3 max-w-md text-[14px] leading-relaxed text-ink/60">
            A local specialist is ready to help, whether you&rsquo;re
            searching your first street or listing a home you&rsquo;ve loved
            for years.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-4">
          <Link
            href="/contact"
            className="rounded-md border border-brass bg-brass px-7 py-3 font-mono text-[11px] uppercase tracking-widest2 text-ink transition-all duration-300 hover:scale-[1.02] hover:bg-transparent hover:text-brass"
          >
            Book a Consultation
          </Link>
          <Link
            href="/contact"
            className="rounded-md border border-ink/20 px-7 py-3 font-mono text-[11px] uppercase tracking-widest2 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-ivory"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
