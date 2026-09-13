import Eyebrow from "@/components/ui/Eyebrow";

export default function AboutSection() {
  return (
    <section className="bg-ivory py-28 md:py-36" id="about">
      <div className="container-x grid gap-16 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[4/5] overflow-hidden bg-stone lg:order-2">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1400&auto=format&fit=crop"
            alt="The West Properties team meeting with clients"
            className="h-full w-full object-cover"
          />
          <span className="absolute bottom-6 left-6 bg-ivory px-4 py-2 font-mono text-[11px] uppercase tracking-widest2 text-ink">
            Est. Mississauga, ON
          </span>
        </div>

        <div className="lg:order-1">
          <Eyebrow className="mb-5">About Us</Eyebrow>
          <h2 className="font-display text-[26px] font-light leading-tight text-ink md:text-[30px]">
            Real estate, focused on three communities we know intimately
          </h2>
          <p className="mt-7 max-w-lg text-[15px] leading-relaxed text-ink/65">
            West Properties was founded on a simple premise: a brokerage that
            covers fewer markets can know each of them better. Our agents
            live and work across Mississauga, Oakville, and Milton, and spend
            their time understanding the streets, school catchments, and
            zoning nuances that move a price up or down.
          </p>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-ink/65">
            Our mission is to give every buyer and seller in these three
            communities the same calibre of guidance typically reserved for
            the region&rsquo;s largest transactions — clear communication,
            rigorous pricing, and negotiation handled by someone who has
            already closed on your street.
          </p>
        </div>
      </div>
    </section>
  );
}
