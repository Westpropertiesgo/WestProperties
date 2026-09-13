import { homepageFeatured, properties, rentalProperties } from "@/lib/data";

export interface MatchableProperty {
  id: string;
  address: string;
  city: string;
  price: string;
  beds: string | number;
  baths: string | number;
  type?: string;
  image: string;
}

function normalize(list: unknown[]): MatchableProperty[] {
  return list.map((p) => {
    const item = p as Record<string, unknown>;
    return {
      id: String(item.id),
      address: String(item.address),
      city: String(item.city),
      price: String(item.price),
      beds: item.beds as string | number,
      baths: item.baths as string | number,
      type: item.type as string | undefined,
      image: String(item.image),
    };
  });
}

const allListings: MatchableProperty[] = [
  ...normalize(properties),
  ...normalize(homepageFeatured),
  ...normalize(rentalProperties),
];

/**
 * Very lightweight keyword matcher — scans recent conversation text for
 * city names, property types, and rent/buy intent, and surfaces up to 3
 * real listings that match. This is intentionally simple (no fuzzy
 * matching, no price-range parsing) since it's meant to give the chat
 * assistant something concrete to point at, not replace the real search.
 */
export function findMatchingListings(text: string, max = 3): MatchableProperty[] {
  const lower = text.toLowerCase();
  const cities = ["mississauga", "oakville", "milton", "toronto"];
  const types = ["condo", "detached", "townhouse"];
  const wantsRental = /\brent|rental|lease\b/.test(lower);

  const matchedCity = cities.find((c) => lower.includes(c));
  const matchedType = types.find((t) => lower.includes(t));

  const pool = wantsRental ? normalize(rentalProperties) : allListings;

  const scored = pool
    .map((listing) => {
      let score = 0;
      if (matchedCity && listing.city.toLowerCase().includes(matchedCity)) score += 2;
      if (matchedType && listing.type?.toLowerCase().includes(matchedType)) score += 1;
      return { listing, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  // Deduplicate by address in case a listing appears in multiple source arrays
  const seen = new Set<string>();
  const result: MatchableProperty[] = [];
  for (const { listing } of scored) {
    if (seen.has(listing.address)) continue;
    seen.add(listing.address);
    result.push(listing);
    if (result.length >= max) break;
  }
  return result;
}
