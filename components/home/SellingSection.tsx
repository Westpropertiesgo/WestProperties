import Eyebrow from "@/components/ui/Eyebrow";

const sellingPoints = [
  {
    title: "Professional marketing",
    copy: "Photography, floor plans, and copywriting built for how buyers actually shop online today.",
  },
  {
    title: "Pricing strategy",
    copy: "Data-backed pricing calibrated to current absorption rates in your specific neighbourhood.",
  },
  {
    title: "Local expertise",
    copy: "Deep, current knowledge of Mississauga, Oakville, and Milton buyer behaviour.",
  },
  {
    title: "Maximum exposure",
    copy: "Your listing placed in front of qualified buyers across MLS&reg;, syndication partners, and our own buyer network.",
  },
];

export default function SellingSection() {
  return (
    <section className="bg-ink py-28 text-ivory md:py-36" id="sell">
      <div className="container-x grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Eyebrow light className="mb-5">
            For Sellers
          </Eyebrow>
          <h2 className="font-display text-[26px] font-light leading-tight md:text-[30px]">
            Sell your home with confidence
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ivory/65">
            A precise pricing strategy and a marketing plan built to reach the
            buyers most likely to pay for what makes your home different.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {sellingPoints.map((point) => (
              <div key={point.title} className="border-t border-ivory/15 pt-6">
                <h3 className="font-display text-lg font-normal text-ivory">
                  {point.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ivory/60">
                  {point.copy}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-ivory p-8 text-ink md:p-10">
          <h3 className="font-display text-2xl font-light text-ink">
            Request a free home assessment
          </h3>
          <p className="mt-2 text-[13px] leading-relaxed text-ink/55">
            Tell us about your property and a local agent will follow up
            within one business day.
          </p>

          <form className="mt-8 flex flex-col gap-1">
            <input type="text" placeholder="Full name" className="field" required />
            <input type="email" placeholder="Email address" className="field" required />
            <input type="tel" placeholder="Phone number" className="field" required />
            <input type="text" placeholder="Property address" className="field" required />
            <button type="submit" className="btn-primary mt-7 w-full whitespace-normal">
              Submit Property Details
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
