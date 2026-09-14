"use client";

import { useState } from "react";
import Link from "next/link";
import Eyebrow from "@/components/ui/Eyebrow";
import MatchScoreBadge from "@/components/match/MatchScoreBadge";
import { useMatchPreferences } from "@/components/match/MatchContext";
import { calculateMatchScore } from "@/lib/matchEngine";
import { properties, rentalProperties } from "@/lib/data";

interface FeaturedPropertiesProps {
  /** Cap the number of cards shown — used for the homepage's small preview. */
  limit?: number;
  /** Hide the For Sale / For Rent toggle for a simpler preview. */
  showToggle?: boolean;
}

export default function FeaturedProperties({ limit, showToggle = true }: FeaturedPropertiesProps) {
  const [tab, setTab] = useState<"sale" | "rent">("sale");
  const { preferences } = useMatchPreferences();
  const allListings = tab === "sale" ? properties : rentalProperties;
  const listings = limit ? allListings.slice(0, limit) : allListings;

  return (
    <section className="bg-stone py-28 md:py-36" id="listings">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow className="mb-5">Current Inventory</Eyebrow>
            <h2 className="max-w-xl font-display text-[26px] font-light leading-tight text-ink md:text-[30px]">
              Featured listings
            </h2>
          </div>

          {showToggle && (
            <div className="flex items-center gap-1 self-start border border-stone-line bg-ivory p-1">
              <button
                type="button"
                onClick={() => setTab("sale")}
                className={`px-5 py-2 font-mono text-[11px] uppercase tracking-widest2 transition-colors ${
                  tab === "sale" ? "bg-ink text-ivory" : "text-ink/50 hover:text-ink"
                }`}
              >
                For Sale
              </button>
              <button
                type="button"
                onClick={() => setTab("rent")}
                className={`px-5 py-2 font-mono text-[11px] uppercase tracking-widest2 transition-colors ${
                  tab === "rent" ? "bg-ink text-ivory" : "text-ink/50 hover:text-ink"
                }`}
              >
                For Rent
              </button>
            </div>
          )}
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((property) => (
            <article key={property.id} className="group bg-ivory">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={property.image}
                  alt={`${property.type} at ${property.address}, ${property.city}`}
                  className="h-full w-full object-cover transition-transform duration-[1000ms] ease-signature group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 bg-ink px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest2 text-ivory">
                  {property.status}
                </span>
                <span className="absolute bottom-4 right-4 bg-ivory px-3 py-1.5 font-mono text-[13px] text-ink">
                  {property.price}
                </span>
                {preferences && (
                  <span className="absolute right-4 top-4">
                    <MatchScoreBadge result={calculateMatchScore(property, preferences)} compact />
                  </span>
                )}
              </div>

              <div className="border border-t-0 border-stone-line p-6">
                <p className="font-mono text-[10px] uppercase tracking-widest2 text-brass">
                  {property.city}
                </p>
                <h3 className="mt-2 font-display text-xl font-normal text-ink">
                  {property.address}
                </h3>

                <div className="mt-4 flex items-center gap-4 font-mono text-[12px] uppercase tracking-widest2 text-ink/55">
                  <span>{property.beds} Bed</span>
                  <span>&middot;</span>
                  <span>{property.baths} Bath</span>
                  <span>&middot;</span>
                  <span>{property.sqft.toLocaleString()} Sqft</span>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-stone-line pt-5">
                  <span className="font-mono text-[11px] uppercase tracking-widest2 text-ink/50">
                    {property.type}
                  </span>
                  <Link
                    href={`/listings/${property.id}`}
                    className="font-mono text-[11px] uppercase tracking-widest2 text-ink transition-colors hover:text-brass"
                  >
                    View Details &rarr;
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/buy" className="btn-outline">
            View All {tab === "sale" ? "Listings" : "Rentals"}
          </Link>
        </div>

        {!limit && (
          <p className="mt-10 max-w-2xl text-[12px] leading-relaxed text-ink/45">
            Listing data shown is illustrative. Live inventory will populate
            this section once an MLS&reg;/IDX feed is connected. See the
            integration note in the footer.
          </p>
        )}
      </div>
    </section>
  );
}
