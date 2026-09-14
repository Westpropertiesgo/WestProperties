"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { mockListings } from "@/lib/mockListings";
import {
  applyListingFilters,
  defaultListingFilters,
  fetchListingsInBounds,
  type ListingFilters,
  type MapBounds,
} from "@/lib/mapUtils";
import PropertyFiltersBar from "@/components/map/PropertyFilters";
import PropertyListingCard from "@/components/map/PropertyListingCard";
import PropertyPreviewCard from "@/components/map/PropertyPreviewCard";
import PriceLegend from "@/components/map/PriceLegend";

// Mapbox GL touches window/document at import time, so the map must be
// client-only and never evaluated during SSR.
const PropertyMap = dynamic(() => import("@/components/map/PropertyMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-ink">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-brass border-t-transparent" />
    </div>
  ),
});

type MobileView = "list" | "map";

export default function PropertyMapExplorer() {
  // TODO(real data): swap `mockListings` for a real listings source once an
  // MLS/API feed is connected — see the header comment in lib/mockListings.ts.
  const allListings = mockListings;

  const [filters, setFilters] = useState<ListingFilters>(defaultListingFilters);
  const [areaFilteredIds, setAreaFilteredIds] = useState<string[] | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<MobileView>("map");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    let result = applyListingFilters(allListings, filters);
    if (areaFilteredIds) result = result.filter((l) => areaFilteredIds.includes(l.id));
    return result;
  }, [allListings, filters, areaFilteredIds]);

  const selectedListing = filtered.find((l) => l.id === selectedId) ?? null;

  async function handleSearchThisArea(bounds: MapBounds) {
    setLoading(true);
    try {
      const inBounds = await fetchListingsInBounds(applyListingFilters(allListings, filters), bounds);
      setAreaFilteredIds(inBounds.map((l) => l.id));
    } finally {
      setLoading(false);
    }
  }

  function handleFiltersChange(next: ListingFilters) {
    setFilters(next);
    setAreaFilteredIds(null); // a new filter selection supersedes the last area search
  }

  function resetAll() {
    setFilters(defaultListingFilters);
    setAreaFilteredIds(null);
  }

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col md:h-[calc(100vh-96px)]">
      {/* ---- Desktop split-screen ---- */}
      <div className="hidden h-full lg:flex">
        <div className="flex w-[420px] shrink-0 flex-col border-r border-stone-line bg-ivory">
          <div className="flex items-center justify-between border-b border-stone-line px-6 pt-5">
            <p className="font-display text-[16px] font-medium text-ink">Property Map Search</p>
            <span className="rounded bg-stone px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest2 text-ink/45">Demo data</span>
          </div>
          <div className="border-b border-stone-line p-6">
            <PropertyFiltersBar filters={filters} onChange={handleFiltersChange} resultCount={filtered.length} />
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {loading && (
              <div className="flex justify-center py-8">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-brass border-t-transparent" />
              </div>
            )}
            {!loading && filtered.length === 0 && (
              <div className="flex flex-col items-center gap-2 py-16 text-center text-ink/40">
                <p className="text-[14px]">No properties match these filters.</p>
                <button type="button" onClick={resetAll} className="font-mono text-[11px] uppercase tracking-widest2 text-brass-dark hover:text-brass">
                  Reset filters
                </button>
              </div>
            )}
            {!loading &&
              filtered.map((listing) => (
                <PropertyListingCard
                  key={listing.id}
                  listing={listing}
                  isSelected={listing.id === selectedId}
                  isHovered={listing.id === hoveredId}
                  onHover={setHoveredId}
                  onSelect={setSelectedId}
                />
              ))}
          </div>
        </div>

        <div className="relative flex-1">
          <PropertyMap
            listings={filtered}
            selectedId={selectedId}
            hoveredId={hoveredId}
            showHeatmap={showHeatmap}
            onSelect={setSelectedId}
            onHover={setHoveredId}
            onSearchThisArea={handleSearchThisArea}
          />
          <HeatmapToggle showHeatmap={showHeatmap} onToggle={() => setShowHeatmap((v) => !v)} />
          {showHeatmap && <PriceLegend />}
          {selectedListing && <PropertyPreviewCard listing={selectedListing} onClose={() => setSelectedId(null)} />}
        </div>
      </div>

      {/* ---- Mobile: dedicated map/list experience ---- */}
      <div className="flex h-full flex-col lg:hidden">
        <div className="flex items-center justify-between gap-3 border-b border-stone-line bg-ivory px-4 py-3">
          <div className="flex items-center gap-1 border border-stone-line p-1">
            {(["map", "list"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setMobileView(v)}
                className={`px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest2 transition-colors ${
                  mobileView === v ? "bg-ink text-ivory" : "text-ink/50"
                }`}
              >
                {v === "map" ? "Map" : "List"}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-1.5 border border-stone-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest2 text-ink/70"
          >
            Filters
            <svg viewBox="0 0 20 20" fill="none" className="h-3 w-3">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
          <p className="font-mono text-[10px] uppercase tracking-widest2 text-ink/40">{filtered.length} found</p>
        </div>

        <div className="relative flex-1">
          {mobileView === "map" ? (
            <>
              <PropertyMap
                listings={filtered}
                selectedId={selectedId}
                hoveredId={hoveredId}
                showHeatmap={showHeatmap}
                onSelect={setSelectedId}
                onHover={setHoveredId}
                onSearchThisArea={handleSearchThisArea}
              />
              <HeatmapToggle showHeatmap={showHeatmap} onToggle={() => setShowHeatmap((v) => !v)} />
              {showHeatmap && <PriceLegend />}
              {selectedListing && <PropertyPreviewCard listing={selectedListing} onClose={() => setSelectedId(null)} />}
            </>
          ) : (
            <div className="h-full space-y-3 overflow-y-auto p-4">
              {filtered.length === 0 && (
                <div className="flex flex-col items-center gap-2 py-16 text-center text-ink/40">
                  <p className="text-[14px]">No properties match these filters.</p>
                </div>
              )}
              {filtered.map((listing) => (
                <PropertyListingCard
                  key={listing.id}
                  listing={listing}
                  isSelected={listing.id === selectedId}
                  isHovered={listing.id === hoveredId}
                  onHover={setHoveredId}
                  onSelect={(id) => {
                    setSelectedId(id);
                    setMobileView("map");
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-[140] flex items-end" role="dialog" aria-modal="true">
            <div className="absolute inset-0 bg-ink/60" onClick={() => setMobileFiltersOpen(false)} />
            <div className="relative max-h-[85vh] w-full overflow-y-auto rounded-t-2xl bg-ivory p-6">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-display text-[18px] font-medium text-ink">Filters</p>
                <button type="button" onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters">
                  <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5 text-ink/50">
                    <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <PropertyFiltersBar filters={filters} onChange={handleFiltersChange} resultCount={filtered.length} />
              <button type="button" onClick={() => setMobileFiltersOpen(false)} className="btn-primary mt-6 w-full whitespace-normal">
                Show {filtered.length} Properties
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function HeatmapToggle({ showHeatmap, onToggle }: { showHeatmap: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`absolute right-5 top-5 z-10 rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-widest2 backdrop-blur transition-colors ${
        showHeatmap ? "border-brass bg-brass text-ink" : "border-ivory/20 bg-ink/80 text-ivory/70 hover:border-brass-light"
      }`}
    >
      Price Heatmap
    </button>
  );
}
