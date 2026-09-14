import { PRICE_RANGE_PRESETS, type ListingFilters } from "@/lib/mapUtils";

function fmtShort(n: number) {
  if (n === Infinity) return "";
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
  return `$${Math.round(n / 1000)}K`;
}

export default function PropertyFiltersBar({
  filters,
  onChange,
  resultCount,
}: {
  filters: ListingFilters;
  onChange: (next: ListingFilters) => void;
  resultCount: number;
}) {
  const activePreset = PRICE_RANGE_PRESETS.find((p) => p.min === filters.priceMin && p.max === filters.priceMax);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-1 self-start border border-stone-line bg-ivory p-1">
        {(["sale", "rent"] as const).map((lt) => (
          <button
            key={lt}
            type="button"
            onClick={() => onChange({ ...filters, listingMode: lt })}
            className={`px-5 py-2 font-mono text-[11px] uppercase tracking-widest2 transition-colors ${
              filters.listingMode === lt ? "bg-ink text-ivory" : "text-ink/50 hover:text-ink"
            }`}
          >
            {lt === "sale" ? "For Sale" : "For Rent"}
          </button>
        ))}
      </div>

      <div>
        <span className="font-mono text-[10px] uppercase tracking-widest2 text-ink/50">Price Range</span>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {PRICE_RANGE_PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => onChange({ ...filters, priceMin: preset.min, priceMax: preset.max })}
              className={`rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest2 transition-colors ${
                activePreset?.label === preset.label ? "border-brass bg-brass text-ink" : "border-stone-line text-ink/55 hover:border-ink/30"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1">
            <span className="text-[10px] text-ink/40">Custom Min</span>
            <input
              type="number"
              step={25_000}
              value={filters.priceMin || ""}
              placeholder="No min"
              onChange={(e) => onChange({ ...filters, priceMin: Number(e.target.value) || 0 })}
              className="border-0 border-b border-stone-line bg-transparent py-1 font-mono text-[13px] text-ink focus:border-brass focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[10px] text-ink/40">Custom Max</span>
            <input
              type="number"
              step={25_000}
              value={filters.priceMax === Infinity ? "" : filters.priceMax}
              placeholder="No max"
              onChange={(e) => onChange({ ...filters, priceMax: e.target.value ? Number(e.target.value) : Infinity })}
              className="border-0 border-b border-stone-line bg-transparent py-1 font-mono text-[13px] text-ink focus:border-brass focus:outline-none"
            />
          </label>
        </div>
        {(filters.priceMin > 0 || filters.priceMax < Infinity) && (
          <p className="mt-1.5 font-mono text-[10px] text-ink/40">
            Showing {fmtShort(filters.priceMin) || "$0"} &ndash; {fmtShort(filters.priceMax) || "Any"}
          </p>
        )}
      </div>

      <div>
        <span className="font-mono text-[10px] uppercase tracking-widest2 text-ink/50">City</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {(["any", "Oakville", "Mississauga", "Milton", "Brampton"] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => onChange({ ...filters, city: c })}
              className={`rounded-full border px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-widest2 transition-colors ${
                filters.city === c ? "border-brass bg-brass text-ink" : "border-stone-line text-ink/55 hover:border-ink/30"
              }`}
            >
              {c === "any" ? "All Cities" : c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="font-mono text-[10px] uppercase tracking-widest2 text-ink/50">Property Type</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {(["any", "Detached", "Semi-Detached", "Townhouse", "Condo"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onChange({ ...filters, propertyType: t })}
              className={`rounded-full border px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-widest2 transition-colors ${
                filters.propertyType === t ? "border-brass bg-brass text-ink" : "border-stone-line text-ink/55 hover:border-ink/30"
              }`}
            >
              {t === "any" ? "Any" : t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest2 text-ink/50">Min Beds</span>
          <div className="mt-2 flex gap-1.5">
            {[0, 1, 2, 3, 4].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => onChange({ ...filters, beds: n })}
                className={`h-8 w-8 rounded-full border font-mono text-[11px] transition-colors ${
                  filters.beds === n ? "border-brass bg-brass text-ink" : "border-stone-line text-ink/55 hover:border-ink/30"
                }`}
              >
                {n === 0 ? "Any" : `${n}+`}
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest2 text-ink/50">Min Baths</span>
          <div className="mt-2 flex gap-1.5">
            {[0, 1, 2, 3, 4].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => onChange({ ...filters, baths: n })}
                className={`h-8 w-8 rounded-full border font-mono text-[11px] transition-colors ${
                  filters.baths === n ? "border-brass bg-brass text-ink" : "border-stone-line text-ink/55 hover:border-ink/30"
                }`}
              >
                {n === 0 ? "Any" : `${n}+`}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="font-mono text-[11px] uppercase tracking-widest2 text-ink/40">{resultCount} properties found</p>
    </div>
  );
}
