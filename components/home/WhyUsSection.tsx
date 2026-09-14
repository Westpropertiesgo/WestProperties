import Eyebrow from "@/components/ui/Eyebrow";
import { trustBadges } from "@/lib/data";

const reasons = [
  {
    title: "Local expertise",
    copy: "We work exclusively in Mississauga, Oakville, and Milton, not the entire GTA spread thin.",
  },
  {
    title: "Personalized service",
    copy: "A single point of contact through your entire transaction, not a rotating call centre.",
  },
  {
    title: "Market knowledge",
    copy: "Ongoing tracking of absorption rates, days-on-market, and price-per-square-foot by street.",
  },
  {
    title: "Trusted guidance",
    copy: "Straightforward advice on price, timing, and offers, even when it isn't what you want to hear.",
  },
  {
    title: "Professional marketing",
    copy: "Every listing presented with the photography and positioning of a much larger brokerage.",
  },
  {
    title: "Client-first approach",
    copy: "No pressure to rush a decision that will shape the next decade of your life.",
  },
];

export default function WhyUsSection() {
  return (
    <section className="bg-ivory py-28 md:py-36">
      <div className="container-x">
        <div className="max-w-xl">
          <Eyebrow className="mb-5">Why West Properties</Eyebrow>
          <h2 className="font-display text-[26px] font-light leading-tight text-ink md:text-[30px]">
            A brokerage built around three communities, not thirty
          </h2>
        </div>

        <div className="mt-9 flex flex-wrap gap-3">
          {trustBadges.map((badge) => (
            <span
              key={badge.label}
              className="flex items-center gap-2 border border-stone-line px-4 py-2 font-mono text-[11px] uppercase tracking-widest2 text-ink/65"
            >
              <span className="h-[5px] w-[5px] rotate-45 bg-brass" />
              {badge.label}
            </span>
          ))}
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <div key={reason.title} className="border-t border-stone-line pt-6">
              <span className="font-mono text-[11px] text-brass">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-xl font-normal text-ink">
                {reason.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ink/60">
                {reason.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
