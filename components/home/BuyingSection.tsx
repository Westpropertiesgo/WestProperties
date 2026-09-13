import Link from "next/link";
import Eyebrow from "@/components/ui/Eyebrow";

const buyingPoints = [
  {
    title: "Search homes",
    copy: "Curated matches across Mississauga, Oakville, and Milton, filtered to what actually fits your criteria — not just what's newly listed.",
  },
  {
    title: "Schedule showings",
    copy: "Coordinated private showings that work around your schedule, including same-week access to new listings.",
  },
  {
    title: "Market expertise",
    copy: "Street-by-street pricing history so you know exactly what a home is worth before you make an offer.",
  },
  {
    title: "Negotiation support",
    copy: "An advocate at the table for every offer, condition, and closing detail — protecting your position start to finish.",
  },
];

export default function BuyingSection() {
  return (
    <section className="bg-ivory py-28 md:py-36" id="buy">
      <div className="container-x grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Eyebrow className="mb-5">For Buyers</Eyebrow>
          <h2 className="font-display text-[26px] font-light leading-tight text-ink md:text-[30px]">
            Buying a home made simple
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/60">
            From first search to closing day, West Properties manages the
            details so you can focus on the decision that matters.
          </p>
          <Link href="/buy" className="btn-primary mt-9 inline-flex">
            Start Your Search
          </Link>
        </div>

        <div className="grid gap-px overflow-hidden bg-stone-line sm:grid-cols-2">
          {buyingPoints.map((point) => (
            <div key={point.title} className="bg-ivory p-8">
              <span className="plaque mb-4" />
              <h3 className="font-display text-xl font-normal text-ink">
                {point.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ink/60">
                {point.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
