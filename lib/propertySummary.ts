import type { Property, PropertySummary } from "@/lib/types";
import { getCityProfile } from "@/lib/cityProfiles";
import { parsePrice } from "@/lib/matchEngine";

/**
 * Generates a full structured summary locally, with no LLM required.
 * This is the fallback used when no API key is configured (see
 * app/api/property-summary/route.ts for the LLM-backed version) — and
 * it's also just genuinely useful on its own, since it's instant and
 * grounded entirely in real property/city data rather than anything
 * a model could hallucinate.
 */
export function generateLocalSummary(property: Property): PropertySummary {
  const price = parsePrice(property.price);
  const city = property.city.split(",")[0];
  const profile = getCityProfile(property.city);
  const pricePerSqft = property.sqft > 0 ? Math.round(price / property.sqft) : null;

  const bestFor =
    property.type === "Condo"
      ? `First-time buyers, young professionals, or investors looking for a low-maintenance property in ${city}.`
      : property.beds >= 4
      ? `Growing families who want space to spread out in a ${profile.familyFriendly}-rated family community.`
      : `Couples or small families looking for a solid long-term home in ${city}.`;

  const pros: string[] = [
    `${property.beds} bed / ${property.baths} bath layout with ${property.sqft.toLocaleString()} sqft of living space`,
    profile.schoolQuality !== "average" ? `${profile.schoolQuality[0].toUpperCase()}${profile.schoolQuality.slice(1)}-rated schools nearby` : `Reasonable access to local schools`,
    profile.growthOutlook === "strong" ? `${city} has a strong growth outlook for long-term value` : `${city} offers steady, stable value over time`,
  ];
  if (property.status === "New Listing") pros.push("Just listed, early access before it sees wide competition");

  const drawbacks: string[] = [];
  if (property.type === "Condo") drawbacks.push("Condo fees apply, and pet or rental restrictions are worth confirming with the building");
  if (profile.commuteMinutesToToronto > 40) drawbacks.push(`Commute to downtown Toronto runs on the longer side (~${profile.commuteMinutesToToronto} min by car)`);
  if (pricePerSqft && pricePerSqft > 900) drawbacks.push("Price per square foot is on the higher end for the area");
  if (drawbacks.length === 0) drawbacks.push("No significant drawbacks identified from the listing data, worth an in-person visit to confirm condition");

  const investmentPotential =
    profile.growthOutlook === "strong"
      ? `${city} has shown strong demand and appreciation trends, making this a reasonable hold for long-term investors, particularly ${property.type === "Condo" ? "given rental demand from commuters" : "as a family-home resale market"}.`
      : `${city} tends to appreciate steadily rather than sharply: a solid, lower-risk hold rather than a fast-flip opportunity.`;

  const lifestyleFit = `Best suited to a ${profile.lifestyleTags.join("/")}-leaning lifestyle. ${
    profile.familyFriendly === "high"
      ? "Strong fit for family living, with parks, schools, and community amenities close by."
      : "Fits well for buyers who prioritize walkability and access to city amenities."
  }`;

  const nearbyAmenities = profile.amenities;

  const estimatedCommute = `Approximately ${profile.commuteMinutesToToronto} minutes to downtown Toronto by car in typical traffic (less via GO Transit at peak times where available).`;

  const nextSteps = [
    "Book a private showing to see the space and finishes in person",
    "Run this address through the Mortgage Calculator with your actual rate and down payment",
    price >= 1_000_000 ? "Confirm your 20% minimum down payment plan, required by law at this price point" : "Check if CMHC insurance applies based on your down payment",
    "Ask a West Properties agent for recent comparable sales on this street",
  ];

  return {
    bestFor,
    pros,
    drawbacks,
    investmentPotential,
    lifestyleFit,
    nearbyAmenities,
    estimatedCommute,
    nextSteps,
    generatedBy: "local",
  };
}
