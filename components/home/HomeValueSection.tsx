import Eyebrow from "@/components/ui/Eyebrow";

export default function HomeValueSection() {
  return (
    <section className="bg-stone py-28 md:py-36" id="home-value">
      <div className="container-x">
        <div className="grid overflow-hidden border border-stone-line bg-ivory md:grid-cols-2">
          <div className="p-10 md:p-16">
            <Eyebrow className="mb-5">Instant Estimate</Eyebrow>
            <h2 className="font-display text-[26px] font-light leading-tight text-ink md:text-[30px]">
              What&rsquo;s your home worth?
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/60">
              Get a preliminary valuation based on recent comparable sales in
              your neighbourhood, followed by a detailed in-person assessment
              from a local specialist.
            </p>

            <ul className="mt-8 flex flex-col gap-3">
              {[
                "Comparable sales within 500m",
                "Neighbourhood price trend, 12 months",
                "Free, no-obligation follow-up call",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[14px] text-ink/70">
                  <span className="h-[5px] w-[5px] rotate-45 bg-brass" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-stone-line bg-ink p-10 text-ivory md:border-l md:border-t-0 md:p-16">
            <form className="flex flex-col gap-1">
              <input type="text" placeholder="Property address" className="field-light" required />
              <input type="text" placeholder="City" className="field-light" required />
              <div className="grid grid-cols-2 gap-6">
                <input type="text" placeholder="Bedrooms" className="field-light" />
                <input type="text" placeholder="Bathrooms" className="field-light" />
              </div>
              <input type="email" placeholder="Email address" className="field-light" required />
              <button type="submit" className="btn-brass mt-8 w-full">
                Get My Home Value
              </button>
            </form>
            <p className="mt-6 text-[11px] leading-relaxed text-ivory/40">
              Estimates are generated from historical sales data and are not
              a formal appraisal. Automated valuation model integration
              pending.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
