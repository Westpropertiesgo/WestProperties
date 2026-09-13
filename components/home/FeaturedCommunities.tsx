import Link from "next/link";
import Eyebrow from "@/components/ui/Eyebrow";
import { communities } from "@/lib/data";

export default function FeaturedCommunities() {
  return (
    <section className="bg-ivory py-28 md:py-36" id="communities">
      <div className="container-x">
        <div className="flex flex-col gap-6 border-b border-stone-line pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow className="mb-5">Where We Work</Eyebrow>
            <h2 className="max-w-xl font-display text-[26px] font-light leading-tight text-ink md:text-[30px]">
              Three communities, three distinct markets
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-ink/60">
            Every listing is priced against the block, not the city average.
            Explore the neighbourhoods that make up each market below.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden bg-stone-line md:grid-cols-3">
          {communities.map((community, index) => (
            <Link
              key={community.slug}
              href={`/communities/${community.slug}`}
              className="group relative flex min-h-[560px] flex-col justify-end overflow-hidden bg-ink"
            >
              <img
                src={community.image}
                alt={`${community.name}, Ontario streetscape`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-signature group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent transition-opacity duration-500 group-hover:from-ink/95" />

              <span className="absolute right-6 top-6 font-mono text-[11px] uppercase tracking-widest2 text-ivory/70">
                0{index + 1} &nbsp;/&nbsp; {community.postalPrefix}
              </span>

              <div className="relative z-10 flex flex-col gap-4 p-8">
                <h3 className="font-display text-[32px] font-light text-ivory">
                  {community.name}
                </h3>
                <p className="text-[14px] leading-relaxed text-ivory/75">
                  {community.description}
                </p>

                <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1">
                  {community.neighborhoods.map((n) => (
                    <span
                      key={n}
                      className="font-mono text-[10px] uppercase tracking-widest2 text-brass-light"
                    >
                      {n}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-ivory/20 pt-5">
                  <span className="font-mono text-[13px] text-ivory">
                    {community.averagePrice}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-widest2 text-ivory/80 transition-colors group-hover:text-brass-light">
                    Explore Community &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
