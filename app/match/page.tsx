"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PreferencesForm from "@/components/match/PreferencesForm";
import MatchScoreBadge from "@/components/match/MatchScoreBadge";
import { useMatchPreferences } from "@/components/match/MatchContext";
import { calculateMatchScore } from "@/lib/matchEngine";
import { properties, rentalProperties } from "@/lib/data";

export default function MatchPage() {
  const { preferences, setPreferences, clearPreferences, hasSetPreferences } = useMatchPreferences();

  const allListings = [...properties, ...rentalProperties];
  const results = preferences
    ? allListings
        .map((property) => ({ property, result: calculateMatchScore(property, preferences) }))
        .sort((a, b) => b.result.score - a.result.score)
    : [];

  return (
    <>
      <Header alwaysSolid />
      <main className="pt-20 md:pt-24">
        <section className="bg-ivory py-16 md:py-20">
          <div className="container-x">
            <span className="plaque">AI Matching Engine</span>
            <h1 className="mt-4 font-display text-[28px] font-medium text-ink md:text-[34px]">
              Find Your Ideal Property Match
            </h1>
            <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-ink/60">
              Answer a few questions and every listing gets a Match Score from 1–100, with a plain-language
              explanation of why it does or doesn&rsquo;t fit what you&rsquo;re looking for.
            </p>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
              <div className="border border-stone-line bg-stone p-6 md:p-8">
                {hasSetPreferences && (
                  <button
                    type="button"
                    onClick={clearPreferences}
                    className="mb-6 font-mono text-[11px] uppercase tracking-widest2 text-ink/40 hover:text-ink"
                  >
                    &larr; Reset preferences
                  </button>
                )}
                <PreferencesForm initial={preferences} onSubmit={setPreferences} />
              </div>

              <div>
                {!hasSetPreferences && (
                  <div className="flex h-full flex-col items-start justify-center gap-3 border border-dashed border-stone-line p-10 text-ink/40">
                    <span className="font-display text-4xl font-light text-ink/15">?</span>
                    <p className="max-w-xs text-[13px] leading-relaxed">
                      Fill out the form to see every current listing scored against what matters to you.
                    </p>
                  </div>
                )}

                {hasSetPreferences && (
                  <div className="flex flex-col gap-6">
                    <p className="font-mono text-[11px] uppercase tracking-widest2 text-ink/45">
                      {results.length} listings scored, best match first
                    </p>
                    {results.map(({ property, result }) => (
                      <Link
                        key={property.id}
                        href={`/listings/${property.id}`}
                        className="group flex gap-4 border border-stone-line bg-ivory p-4 transition-shadow hover:shadow-[0_16px_40px_-14px_rgba(20,33,43,0.28)]"
                      >
                        <img
                          src={property.image}
                          alt={property.address}
                          className="h-24 w-24 shrink-0 rounded object-cover"
                        />
                        <div className="flex min-w-0 flex-1 flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-3">
                              <p className="text-[14px] font-medium text-ink">{property.address}</p>
                              <MatchScoreBadge result={result} compact />
                            </div>
                            <p className="text-[12px] text-ink/50">
                              {property.city} &middot; {property.price}
                            </p>
                          </div>
                          <p className="mt-2 text-[12px] leading-relaxed text-ink/60">{result.explanation}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
