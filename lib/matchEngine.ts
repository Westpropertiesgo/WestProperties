import type { MatchFactor, MatchResult, Property, UserPreferences } from "@/lib/types";
import { getCityProfile } from "@/lib/cityProfiles";

export function parsePrice(price: string): number {
  const digits = price.replace(/[^0-9.]/g, "");
  return Number(digits) || 0;
}

/**
 * Weighted scoring across the 8 preference dimensions requested:
 * budget, commute, schools, lifestyle, investment goals, pets, family
 * size, and property type. Each factor contributes a 0-1 sub-score,
 * multiplied by its weight (weights sum to 1), then scaled to 1-100.
 *
 * This is intentionally a deterministic algorithm rather than an LLM
 * call — a numeric score needs to be fast, consistent, and explainable
 * for the same inputs every time, which a rules-based recommender does
 * far better than asking a language model to "guess" a number.
 */
export function calculateMatchScore(property: Property, prefs: UserPreferences): MatchResult {
  const price = parsePrice(property.price);
  const cityProfile = getCityProfile(property.city);
  const factors: MatchFactor[] = [];

  // 1. Budget fit — 25%
  {
    let score: number;
    let note: string;
    if (price === 0) {
      score = 0.5;
      note = "Price not available for exact comparison.";
    } else if (price >= prefs.budgetMin && price <= prefs.budgetMax) {
      score = 1;
      note = "Comfortably within your budget.";
    } else if (price < prefs.budgetMin) {
      score = 0.75;
      note = "Below your budget, extra room to negotiate or upgrade.";
    } else {
      const overBy = (price - prefs.budgetMax) / prefs.budgetMax;
      score = Math.max(0, 1 - overBy * 2);
      note = overBy > 0.15 ? "Well above your stated budget." : "Slightly above your budget.";
    }
    factors.push({ label: "Budget", weight: 0.25, score, note });
  }

  // 2. Property type — 15%
  {
    const match = prefs.propertyType === "any" || property.type === prefs.propertyType;
    factors.push({
      label: "Property Type",
      weight: 0.15,
      score: match ? 1 : 0.35,
      note: match ? `Matches your preferred property type (${property.type}).` : `You wanted ${prefs.propertyType}, this is a ${property.type}.`,
    });
  }

  // 3. Family size fit (via bedroom count) — 15%
  {
    const idealBeds = Math.max(1, Math.ceil(prefs.familySize / 2) + (prefs.familySize > 2 ? 1 : 0));
    const diff = property.beds - idealBeds;
    let score: number;
    let note: string;
    if (diff >= 0 && diff <= 1) {
      score = 1;
      note = `${property.beds} bedrooms comfortably fits a household of ${prefs.familySize}.`;
    } else if (diff < 0) {
      score = Math.max(0.2, 1 + diff * 0.35);
      note = `Only ${property.beds} bedrooms may feel tight for ${prefs.familySize} people.`;
    } else {
      score = Math.max(0.5, 1 - diff * 0.15);
      note = `More space than strictly needed, room to grow.`;
    }
    factors.push({ label: "Family Size Fit", weight: 0.15, score, note });
  }

  // 4. Lifestyle fit — 15%
  {
    const match = cityProfile.lifestyleTags.includes(prefs.lifestyle);
    const isWaterfrontListing = /waterfront|marina|harbour/i.test(property.city + " " + property.address);
    const bonus = prefs.lifestyle === "waterfront" && isWaterfrontListing ? 0.15 : 0;
    const score = Math.min(1, (match ? 0.85 : 0.4) + bonus);
    factors.push({
      label: "Lifestyle Fit",
      weight: 0.15,
      score,
      note: match
        ? `${property.city.split(",")[0]} suits a ${prefs.lifestyle} lifestyle well.`
        : `${property.city.split(",")[0]} leans different from your preferred ${prefs.lifestyle} setting.`,
    });
  }

  // 5. Schools — 10%
  {
    const weightMap = { low: 0.05, medium: 0.5, high: 1 };
    const qualityMap = { average: 0.5, good: 0.75, excellent: 1 };
    const importance = weightMap[prefs.schoolsImportance];
    const quality = qualityMap[cityProfile.schoolQuality];
    const score = prefs.schoolsImportance === "low" ? 0.8 : importance * quality + (1 - importance) * 0.7;
    factors.push({
      label: "Schools",
      weight: 0.1,
      score,
      note: `${property.city.split(",")[0]} school quality rated ${cityProfile.schoolQuality}.`,
    });
  }

  // 6. Commute — 10%
  {
    const minutes = cityProfile.commuteMinutesToToronto;
    let base = minutes <= 15 ? 1 : minutes <= 35 ? 0.8 : minutes <= 45 ? 0.6 : 0.4;
    if (prefs.commuteImportance === "low") base = Math.max(base, 0.75);
    factors.push({
      label: "Commute",
      weight: 0.1,
      score: base,
      note: `About ${minutes} min to downtown Toronto by car.`,
    });
  }

  // 7. Pets — 5%
  {
    let score = 0.8;
    let note = "No specific pet restrictions on file.";
    if (prefs.hasPets) {
      if (property.type === "Condo") {
        score = 0.55;
        note = "Condos sometimes carry pet size/breed restrictions, confirm with the building.";
      } else {
        score = 1;
        note = "A yard and more space is a plus for pet owners.";
      }
    }
    factors.push({ label: "Pet Friendliness", weight: 0.05, score, note });
  }

  // 8. Investment goals — 5%
  {
    let score = 0.7;
    let note = "Reasonable fit either as a home or a hold.";
    if (prefs.investmentGoal === "investment") {
      score = cityProfile.growthOutlook === "strong" ? 0.9 : 0.65;
      note = cityProfile.growthOutlook === "strong"
        ? `${property.city.split(",")[0]} has a strong growth outlook for appreciation/rental demand.`
        : `${property.city.split(",")[0]} has a steady, slower-growth outlook.`;
    } else if (prefs.investmentGoal === "primary-residence") {
      score = cityProfile.familyFriendly === "high" ? 0.9 : 0.7;
      note = `${property.city.split(",")[0]} is a ${cityProfile.familyFriendly}-rated area for long-term living.`;
    }
    factors.push({ label: "Investment Goals", weight: 0.05, score, note });
  }

  const rawScore = factors.reduce((sum, f) => sum + f.score * f.weight, 0);
  const score = Math.round(Math.min(1, Math.max(0, rawScore)) * 100);

  const tier: MatchResult["tier"] = score >= 85 ? "excellent" : score >= 65 ? "good" : score >= 45 ? "fair" : "weak";

  const sortedFactors = [...factors].sort((a, b) => b.score * b.weight - a.score * a.weight);
  const strongest = sortedFactors.slice(0, 2);
  const weakest = [...factors].sort((a, b) => a.score - b.score)[0];

  let explanation = strongest.map((f) => f.note).join(" ");
  if (weakest.score < 0.6) {
    explanation += ` One thing to weigh: ${weakest.note.charAt(0).toLowerCase()}${weakest.note.slice(1)}`;
  }

  return { score, factors, explanation, tier };
}

export function matchTierColor(tier: MatchResult["tier"]) {
  switch (tier) {
    case "excellent":
      return { bg: "bg-emerald-600", text: "text-emerald-700", label: "Excellent Match" };
    case "good":
      return { bg: "bg-brass", text: "text-brass-dark", label: "Good Match" };
    case "fair":
      return { bg: "bg-amber-500", text: "text-amber-700", label: "Fair Match" };
    default:
      return { bg: "bg-ink/40", text: "text-ink/50", label: "Weak Match" };
  }
}

export const defaultPreferences: UserPreferences = {
  budgetMin: 500_000,
  budgetMax: 1_500_000,
  commuteImportance: "medium",
  schoolsImportance: "medium",
  lifestyle: "suburban",
  investmentGoal: "primary-residence",
  hasPets: false,
  familySize: 2,
  propertyType: "any",
};
