"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { quickFilters, searchSuggestions } from "@/lib/data";

const placeholderPhrases = [
  "Search a city, neighbourhood, or address",
  "Search top-rated schools nearby",
  "Search homes near GO Stations",
];

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-[18px] w-[18px] shrink-0 text-brass">
      <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 16L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SlidersIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-[16px] w-[16px]">
      <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="7" cy="5" r="1.6" fill="currentColor" />
      <circle cx="13" cy="10" r="1.6" fill="currentColor" />
      <circle cx="9" cy="15" r="1.6" fill="currentColor" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-[16px] w-[16px]">
      <path
        d="M10 18s6-5.2 6-9.8A6 6 0 1 0 4 8.2C4 12.8 10 18 10 18z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="8.2" r="2.1" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [phraseVisible, setPhraseVisible] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  // Rotate the placeholder phrase every few seconds with a quick scroll/fade swap
  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseVisible(false);
      setTimeout(() => {
        setPhraseIndex((i) => (i + 1) % placeholderPhrases.length);
        setPhraseVisible(true);
      }, 250);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const suggestions = useMemo(() => {
    if (!query.trim()) return searchSuggestions;
    const q = query.toLowerCase();
    return searchSuggestions.filter((s) => s.label.toLowerCase().includes(q));
  }, [query]);

  const showSuggestions = isFocused && suggestions.length > 0;
  const showAnimatedPlaceholder = !query && !isFocused;

  return (
    <div className="w-full">
      {/* Search — light, near-white pill for visibility against the hero photo */}
      <div className="relative">
        <form
          className="flex items-center gap-2 rounded-full border border-ivory bg-ivory/95 px-3 py-2.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] backdrop-blur-md sm:px-4 sm:py-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <SearchIcon />
          <div className="relative min-w-0 flex-1">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 120)}
              className="w-full bg-transparent font-body text-[15px] text-ink focus:outline-none"
            />
            {showAnimatedPlaceholder && (
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center font-body text-[15px] text-ink/40 transition-all duration-300 ease-out ${
                  phraseVisible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                }`}
              >
                {/* Nested block span (not the flex row itself) so text-overflow
                    ellipsis actually applies when a phrase is wider than a
                    narrow phone screen, instead of getting hard-clipped. */}
                <span className="min-w-0 truncate">{placeholderPhrases[phraseIndex]}</span>
              </span>
            )}
          </div>

          <div className="hidden h-6 w-px shrink-0 bg-ink/15 sm:block" />

          <button
            type="button"
            onClick={() => {
              setFiltersOpen((v) => !v);
              setMapOpen(false);
            }}
            className={`hidden shrink-0 items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-widest2 transition-colors sm:flex ${
              filtersOpen ? "bg-ink/10 text-ink" : "text-ink/60 hover:bg-ink/10 hover:text-ink"
            }`}
          >
            <SlidersIcon />
            Filters
          </button>

          <button
            type="button"
            onClick={() => {
              setMapOpen((v) => !v);
              setFiltersOpen(false);
            }}
            className={`hidden shrink-0 items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-widest2 transition-colors sm:flex ${
              mapOpen ? "bg-ink/10 text-ink" : "text-ink/60 hover:bg-ink/10 hover:text-ink"
            }`}
          >
            <MapPinIcon />
            Map
          </button>

          <button type="submit" className="btn-brass shrink-0 rounded-full px-6 py-2.5 sm:px-8">
            Search
          </button>
        </form>

        {showSuggestions && (
          <ul className="suggestions-scroll animate-dropdown-in absolute left-4 right-4 top-full z-20 mt-2 max-h-72 overflow-y-auto rounded-2xl border border-stone-line bg-ivory shadow-[0_20px_40px_-10px_rgba(0,0,0,0.25)] sm:left-14 sm:right-40">
            {suggestions.map((s) => (
              <li key={s.label}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setQuery(s.label);
                    setIsFocused(false);
                  }}
                  className="flex w-full items-center justify-between px-5 py-3 text-left text-[14px] text-ink transition-colors duration-150 first:rounded-t-2xl last:rounded-b-2xl hover:bg-ink/[0.07]"
                >
                  <span className="font-display font-medium">{s.label}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest2 text-ink/40">
                    {s.city ?? "Search"}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {filtersOpen && (
        <div className="mt-3 grid gap-5 rounded-2xl border border-stone-line bg-ivory p-6 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.25)] sm:grid-cols-3">
          <label className="flex flex-col gap-1 text-left">
            <span className="font-mono text-[10px] uppercase tracking-widest2 text-ink/50">Property Type</span>
            <select className="mt-1 border-0 border-b border-stone-line bg-transparent py-1.5 text-[14px] text-ink focus:outline-none">
              <option>Any type</option>
              <option>Detached</option>
              <option>Townhouse</option>
              <option>Condo</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 text-left">
            <span className="font-mono text-[10px] uppercase tracking-widest2 text-ink/50">Price Range</span>
            <select className="mt-1 border-0 border-b border-stone-line bg-transparent py-1.5 text-[14px] text-ink focus:outline-none">
              <option>Any price</option>
              <option>$500K &ndash; $1M</option>
              <option>$1M &ndash; $2M</option>
              <option>$2M &ndash; $3M</option>
              <option>$3M+</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 text-left">
            <span className="font-mono text-[10px] uppercase tracking-widest2 text-ink/50">Bedrooms</span>
            <select className="mt-1 border-0 border-b border-stone-line bg-transparent py-1.5 text-[14px] text-ink focus:outline-none">
              <option>Any</option>
              <option>1+</option>
              <option>2+</option>
              <option>3+</option>
              <option>4+</option>
            </select>
          </label>
        </div>
      )}

      {mapOpen && (
        <div className="mt-3 overflow-hidden rounded-2xl border border-stone-line bg-ivory shadow-[0_20px_40px_-10px_rgba(0,0,0,0.25)]">
          <div className="flex items-center justify-between border-b border-stone-line px-5 py-3">
            <span className="font-mono text-[11px] uppercase tracking-widest2 text-ink/50">
              Mississauga &middot; Oakville &middot; Milton
            </span>
            <a
              href="https://www.google.com/maps/search/Mississauga+Oakville+Milton+Ontario"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[11px] uppercase tracking-widest2 text-brass-dark hover:text-brass"
            >
              Open in Maps &rarr;
            </a>
          </div>
          <iframe
            title="Map of Mississauga, Oakville, and Milton service area"
            src="https://www.google.com/maps?q=Mississauga,+Oakville,+Milton,+ON&output=embed"
            className="h-72 w-full border-0 sm:h-80"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}

      {/* Quick action chips */}
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        {quickFilters.map((filter) => (
          <button
            key={filter.slug}
            type="button"
            onClick={() => setActiveFilter((cur) => (cur === filter.slug ? null : filter.slug))}
            className={`font-mono text-[11px] uppercase tracking-widest2 px-4 py-2 rounded-full border transition-colors duration-300 ${
              activeFilter === filter.slug
                ? "border-brass bg-brass text-ink"
                : "border-ivory/30 text-ivory/85 hover:border-brass-light hover:text-brass-light"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
