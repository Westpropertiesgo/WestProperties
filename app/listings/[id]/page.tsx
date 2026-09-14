"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MatchScoreBadge from "@/components/match/MatchScoreBadge";
import { useMatchPreferences } from "@/components/match/MatchContext";
import { calculateMatchScore } from "@/lib/matchEngine";
import { generateLocalSummary } from "@/lib/propertySummary";
import { properties, rentalProperties } from "@/lib/data";
import { mockListings } from "@/lib/mockListings";
import { formatPriceFull } from "@/lib/mapUtils";
import type { PropertySummary } from "@/lib/types";
import { useContactModal } from "@/components/layout/ContactModalContext";

function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-stone-line pt-6">
      <p className="font-mono text-[10px] uppercase tracking-widest2 text-brass-dark">{title}</p>
      <div className="mt-2 text-[14px] leading-relaxed text-ink/75">{children}</div>
    </div>
  );
}

export default function ListingDetailPage() {
  const params = useParams<{ id: string }>();
  const { preferences } = useMatchPreferences();
  const { openContactModal } = useContactModal();

  const property = [...properties, ...rentalProperties].find((p) => p.id === params.id);

  const [summary, setSummary] = useState<PropertySummary | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(true);

  useEffect(() => {
    if (!property) return;
    let cancelled = false;

    async function loadSummary() {
      try {
        const res = await fetch("/api/property-summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ property }),
        });
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) setSummary(data.summary);
          return;
        }
      } catch {
        // fall through to local
      }
      if (!cancelled) setSummary(generateLocalSummary(property!));
    }

    setLoadingSummary(true);
    loadSummary().finally(() => !cancelled && setLoadingSummary(false));

    return () => {
      cancelled = true;
    };
  }, [property]);

  if (!property) {
    // Not one of the site's main listings — check the map's mock dataset
    // (see lib/mockListings.ts) before giving up. These are demo listings
    // for the Property Map Search feature, kept in their own simpler shape,
    // so they get a lighter info view rather than the full AI summary below.
    const mockListing = mockListings.find((l) => l.id === params.id);
    if (mockListing) {
      return (
        <>
          <Header alwaysSolid />
          <main className="pt-20 md:pt-24">
            <section className="bg-ivory py-12 md:py-16">
              <div className="container-x grid gap-10 lg:grid-cols-[1.2fr_1fr]">
                <img src={mockListing.image} alt={mockListing.address} className="aspect-[4/3] w-full rounded-lg object-cover" />
                <div>
                  <span className="plaque">{mockListing.status}</span>
                  <h1 className="mt-3 font-display text-[26px] font-medium text-ink md:text-[32px]">{mockListing.address}</h1>
                  <p className="mt-1 text-[14px] text-ink/55">
                    {mockListing.neighborhood}, {mockListing.city}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[13px] uppercase tracking-widest2 text-ink/60">
                    <span>{mockListing.bedrooms} Bed</span>
                    <span>&middot;</span>
                    <span>{mockListing.bathrooms} Bath</span>
                    <span>&middot;</span>
                    <span>{mockListing.sqft.toLocaleString()} Sqft</span>
                    <span>&middot;</span>
                    <span>{mockListing.propertyType}</span>
                  </div>
                  <p className="mt-4 font-display text-[28px] font-medium text-ink">
                    {formatPriceFull(mockListing.price, mockListing.isRental)}
                  </p>
                  <p className="mt-6 text-[13px] leading-relaxed text-ink/50">
                    This is placeholder demo data from the Property Map Search feature, not one of West
                    Properties&rsquo; full listings, so it doesn&rsquo;t yet have an AI summary or match score.
                  </p>
                  <button
                    type="button"
                    onClick={() => openContactModal(mockListing.address)}
                    className="btn-primary mt-6 inline-flex"
                  >
                    Book a Consultation
                  </button>
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </>
      );
    }

    return (
      <>
        <Header alwaysSolid />
        <main className="flex min-h-[50vh] flex-col items-center justify-center gap-4 pt-20 text-center md:pt-24">
          <p className="font-display text-2xl font-medium text-ink">Listing not found</p>
          <Link href="/buy" className="btn-outline">
            Back to Listings
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const matchResult = preferences ? calculateMatchScore(property, preferences) : null;

  return (
    <>
      <Header alwaysSolid />
      <main className="pt-20 md:pt-24">
        <section className="bg-ivory py-12 md:py-16">
          <div className="container-x grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <img src={property.image} alt={property.address} className="aspect-[4/3] w-full rounded-lg object-cover" />
              <div className="mt-6">
                <span className="plaque">{property.status}</span>
                <h1 className="mt-3 font-display text-[26px] font-medium text-ink md:text-[32px]">{property.address}</h1>
                <p className="mt-1 text-[14px] text-ink/55">{property.city}</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[13px] uppercase tracking-widest2 text-ink/60">
                  <span>{property.beds} Bed</span>
                  <span>&middot;</span>
                  <span>{property.baths} Bath</span>
                  <span>&middot;</span>
                  <span>{property.sqft.toLocaleString()} Sqft</span>
                  <span>&middot;</span>
                  <span>{property.type}</span>
                </div>
                <p className="mt-4 font-display text-[28px] font-medium text-ink">{property.price}</p>
              </div>

              {matchResult ? (
                <div className="mt-8 border border-stone-line bg-stone p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-widest2 text-ink/45">Your Match Score</span>
                    <Link href="/match" className="font-mono text-[10px] uppercase tracking-widest2 text-brass-dark hover:text-brass">
                      Edit preferences
                    </Link>
                  </div>
                  <div className="mt-3">
                    <MatchScoreBadge result={matchResult} />
                  </div>
                  <p className="mt-4 text-[13px] leading-relaxed text-ink/70">{matchResult.explanation}</p>
                  <ul className="mt-4 flex flex-col gap-1.5">
                    {matchResult.factors.map((f) => (
                      <li key={f.label} className="flex items-center justify-between text-[12px]">
                        <span className="text-ink/55">{f.label}</span>
                        <span className="font-mono text-ink/70">{Math.round(f.score * 100)}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="mt-8 border border-dashed border-stone-line p-6 text-center">
                  <p className="text-[13px] text-ink/60">
                    Want a personalized Match Score for this property?
                  </p>
                  <Link href="/match" className="btn-outline mt-3 inline-flex">
                    Find My Match
                  </Link>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-widest2 text-ink/45">AI Property Summary</p>
                {summary && (
                  <span className="font-mono text-[9px] uppercase tracking-widest2 text-ink/30">
                    {summary.generatedBy === "ai" ? "Generated by AI" : "Local estimate"}
                  </span>
                )}
              </div>

              {loadingSummary && (
                <div className="mt-4 flex flex-col gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-4 w-full animate-pulse bg-stone" />
                  ))}
                </div>
              )}

              {summary && !loadingSummary && (
                <div className="mt-4 flex flex-col gap-6">
                  <SectionBlock title="Who This Is Best For">{summary.bestFor}</SectionBlock>
                  <SectionBlock title="Pros">
                    <ul className="flex flex-col gap-1.5">
                      {summary.pros.map((p) => (
                        <li key={p} className="flex gap-2">
                          <span className="mt-1.5 h-[5px] w-[5px] shrink-0 rotate-45 bg-brass" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </SectionBlock>
                  <SectionBlock title="Potential Drawbacks">
                    <ul className="flex flex-col gap-1.5">
                      {summary.drawbacks.map((d) => (
                        <li key={d} className="flex gap-2">
                          <span className="mt-1.5 h-[5px] w-[5px] shrink-0 rotate-45 bg-ink/30" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </SectionBlock>
                  <SectionBlock title="Investment Potential">{summary.investmentPotential}</SectionBlock>
                  <SectionBlock title="Lifestyle Fit">{summary.lifestyleFit}</SectionBlock>
                  <SectionBlock title="Nearby Amenities">
                    <div className="flex flex-wrap gap-2">
                      {summary.nearbyAmenities.map((a) => (
                        <span key={a} className="rounded-full border border-stone-line px-3 py-1 text-[12px] text-ink/65">
                          {a}
                        </span>
                      ))}
                    </div>
                  </SectionBlock>
                  <SectionBlock title="Estimated Commute">{summary.estimatedCommute}</SectionBlock>
                  <SectionBlock title="Suggested Next Steps">
                    <ol className="flex flex-col gap-1.5">
                      {summary.nextSteps.map((s, i) => (
                        <li key={s} className="flex gap-2">
                          <span className="font-mono text-ink/40">{i + 1}.</span>
                          {s}
                        </li>
                      ))}
                    </ol>
                  </SectionBlock>

                  <button
                    type="button"
                    onClick={() => openContactModal(property.address)}
                    className="btn-primary mt-2 self-start"
                  >
                    Book a Consultation
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
