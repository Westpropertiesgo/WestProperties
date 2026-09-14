import type { MapListing } from "@/lib/mockListings";

/** Preset quick-select price bands, plus support for a custom min/max below them. */
export interface PriceRangePreset {
  label: string;
  min: number;
  max: number;
}

export const PRICE_RANGE_PRESETS: PriceRangePreset[] = [
  { label: "Any Price", min: 0, max: Infinity },
  { label: "$500K – $750K", min: 500_000, max: 750_000 },
  { label: "$750K – $1M", min: 750_000, max: 1_000_000 },
  { label: "$1M – $1.5M", min: 1_000_000, max: 1_500_000 },
  { label: "$1.5M – $2M", min: 1_500_000, max: 2_000_000 },
  { label: "$2M+", min: 2_000_000, max: Infinity },
];

export function formatPriceShort(price: number, isRental: boolean): string {
  if (price === 0) return "—";
  let short: string;
  if (price >= 1_000_000) {
    const millions = price / 1_000_000;
    short = `$${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(2).replace(/0$/, "")}M`;
  } else {
    short = `$${Math.round(price / 1000)}K`;
  }
  return isRental ? `${short}/mo` : short;
}

export function formatPriceFull(price: number, isRental: boolean): string {
  const formatted = price.toLocaleString("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });
  return isRental ? `${formatted}/mo` : formatted;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export function isWithinBounds(listing: MapListing, bounds: MapBounds): boolean {
  return (
    listing.latitude <= bounds.north &&
    listing.latitude >= bounds.south &&
    listing.longitude <= bounds.east &&
    listing.longitude >= bounds.west
  );
}

/**
 * Fetches listings within the given map bounds. Today this just filters
 * whichever array is passed in (mock or real) — swap the body for a real
 * API call (e.g. `fetch('/api/listings?bounds=...')`) once a live feed is
 * connected. Calling code never needs to change.
 */
export async function fetchListingsInBounds(all: MapListing[], bounds: MapBounds): Promise<MapListing[]> {
  return all.filter((l) => isWithinBounds(l, bounds));
}

export interface ListingFilters {
  priceMin: number;
  priceMax: number;
  propertyType: "any" | MapListing["propertyType"];
  beds: number; // 0 = any
  baths: number; // 0 = any
  listingMode: "sale" | "rent";
  city: "any" | MapListing["city"];
}

export const defaultListingFilters: ListingFilters = {
  priceMin: 0,
  priceMax: Infinity,
  propertyType: "any",
  beds: 0,
  baths: 0,
  listingMode: "sale",
  city: "any",
};

export function applyListingFilters(all: MapListing[], filters: ListingFilters): MapListing[] {
  return all.filter((l) => {
    if (filters.listingMode === "sale" && l.isRental) return false;
    if (filters.listingMode === "rent" && !l.isRental) return false;
    if (l.price < filters.priceMin || l.price > filters.priceMax) return false;
    if (filters.propertyType !== "any" && l.propertyType !== filters.propertyType) return false;
    if (filters.beds > 0 && l.bedrooms < filters.beds) return false;
    if (filters.baths > 0 && l.bathrooms < filters.baths) return false;
    if (filters.city !== "any" && l.city !== filters.city) return false;
    return true;
  });
}

/**
 * Very small illustrative average-price banding, used only to demonstrate
 * where a future market heatmap layer would plug in (see PropertyMap's
 * optional heatmap toggle). Not a real market-data computation.
 */
export function averagePriceForCity(listings: MapListing[], city: MapListing["city"]): number {
  const inCity = listings.filter((l) => l.city === city && !l.isRental);
  if (inCity.length === 0) return 0;
  return inCity.reduce((sum, l) => sum + l.price, 0) / inCity.length;
}
