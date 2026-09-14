export interface Community {
  slug: string;
  name: string;
  city: "Mississauga" | "Oakville" | "Milton";
  postalPrefix: string;
  description: string;
  averagePrice: string;
  image: string;
  neighborhoods: string[];
}

export interface Property {
  id: string;
  address: string;
  city: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  status: "For Sale" | "New Listing" | "Sold" | "For Rent";
  listingType: "sale" | "rent";
  image: string;
  /** Real-world coordinates for the map — every listing must have these. */
  lat: number;
  lng: number;
}

export interface Testimonial {
  name: string;
  location: string;
  review: string;
  image: string;
}

/**
 * Placeholder shape for a future MLS / IDX data feed integration.
 * Real listing data should be mapped into the `Property` interface
 * above once a feed provider (e.g. AMP/RESO Web API) is connected.
 */
export interface MLSFeedConfig {
  provider: string | null;
  boardId: string | null;
  isConnected: boolean;
  lastSyncedAt: string | null;
}

export interface SearchSuggestion {
  label: string;
  type: "neighbourhood" | "query";
  city?: "Mississauga" | "Oakville" | "Milton";
}

export interface QuickFilter {
  label: string;
  slug: string;
}

export interface JournalArticle {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  publishedAt: string;
  image: string;
}

export interface MarketStat {
  city: "Mississauga" | "Oakville" | "Milton";
  averagePrice: string;
  trend: string;
  trendDirection: "up" | "down" | "flat";
}

export interface TrustBadge {
  label: string;
}

export interface LifestyleAreaMatch {
  name: string;
  city: "Mississauga" | "Oakville" | "Milton";
  matchScore: number;
  reason: string;
}

/** Collected once via the "Find My Match" quiz, reused across the site (persisted to localStorage). */
export interface UserPreferences {
  budgetMin: number;
  budgetMax: number;
  commuteImportance: "low" | "medium" | "high";
  schoolsImportance: "low" | "medium" | "high";
  lifestyle: "urban" | "suburban" | "quiet" | "waterfront";
  investmentGoal: "primary-residence" | "investment" | "both";
  hasPets: boolean;
  familySize: number;
  propertyType: "any" | "Detached" | "Townhouse" | "Condo";
}

export interface MatchFactor {
  label: string;
  weight: number;
  score: number; // 0-1, how well this listing satisfies this factor
  note: string;
}

export interface MatchResult {
  score: number; // 1-100
  factors: MatchFactor[];
  explanation: string;
  tier: "excellent" | "good" | "fair" | "weak";
}

export interface PropertySummary {
  bestFor: string;
  pros: string[];
  drawbacks: string[];
  investmentPotential: string;
  lifestyleFit: string;
  nearbyAmenities: string[];
  estimatedCommute: string;
  nextSteps: string[];
  generatedBy: "ai" | "local";
}
