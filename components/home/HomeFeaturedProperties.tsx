import Link from "next/link";
import { homepageFeatured } from "@/lib/data";

function HeartIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-[18px] w-[18px]">
      <path
        d="M10 17s-6.5-4.03-6.5-8.5A3.5 3.5 0 0 1 10 5.5 3.5 3.5 0 0 1 16.5 8.5C16.5 12.97 10 17 10 17z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HomeFeaturedProperties() {
  return (
    <section className="bg-stone pb-20 pt-6 md:pb-28 md:pt-8" id="listings">
      <div className="container-x">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-[26px] font-medium text-ink md:text-[30px]">
              Featured Properties
            </h2>
          </div>
          <Link
            href="/buy"
            className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest2 text-brass-dark transition-colors hover:text-brass"
          >
            View All Listings
            <span aria-hidden="true">&rsaquo;</span>
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {homepageFeatured.map((property) => (
            <article
              key={property.id}
              className="group overflow-hidden rounded-lg bg-ivory shadow-[0_8px_30px_-12px_rgba(20,33,43,0.18)] transition-shadow duration-300 hover:shadow-[0_16px_40px_-14px_rgba(20,33,43,0.28)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={property.image}
                  alt={`${property.tag} at ${property.address}, ${property.city}`}
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-signature group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded bg-ink/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest2 text-ivory">
                  {property.tag}
                </span>
                <button
                  type="button"
                  aria-label="Save listing"
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-ink/40 text-ivory transition-colors hover:text-brass-light"
                >
                  <HeartIcon />
                </button>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[14px] font-medium text-ink">{property.address}</p>
                  <p className="shrink-0 text-[14px] font-semibold text-ink">{property.price}</p>
                </div>
                <p className="mt-0.5 text-[12px] text-ink/50">{property.city}</p>
                <p className="mt-1 text-[12px] text-ink/50">
                  {[property.beds, property.baths, property.sqft].filter(Boolean).join(" \u00b7 ")}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
