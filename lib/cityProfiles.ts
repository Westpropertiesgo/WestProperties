/**
 * Lightweight, hand-curated city/neighbourhood metadata used to power the
 * match engine and AI property summaries without needing an external data
 * source. Commute times are rough estimates to downtown Toronto by car in
 * average traffic — real integration would call a maps/directions API.
 */
export interface CityProfile {
  commuteMinutesToToronto: number;
  schoolQuality: "average" | "good" | "excellent";
  lifestyleTags: Array<"urban" | "suburban" | "quiet" | "waterfront">;
  familyFriendly: "low" | "medium" | "high";
  growthOutlook: "steady" | "strong";
  amenities: string[];
}

export const cityProfiles: Record<string, CityProfile> = {
  Mississauga: {
    commuteMinutesToToronto: 35,
    schoolQuality: "good",
    lifestyleTags: ["urban", "waterfront", "suburban"],
    familyFriendly: "medium",
    growthOutlook: "strong",
    amenities: ["Square One Shopping Centre", "Port Credit Marina", "GO Transit", "Sheridan College"],
  },
  Oakville: {
    commuteMinutesToToronto: 40,
    schoolQuality: "excellent",
    lifestyleTags: ["quiet", "waterfront", "suburban"],
    familyFriendly: "high",
    growthOutlook: "steady",
    amenities: ["Oakville Harbour", "Downtown Oakville shops", "Glen Abbey Golf Club", "GO Transit"],
  },
  Milton: {
    commuteMinutesToToronto: 50,
    schoolQuality: "good",
    lifestyleTags: ["suburban", "quiet"],
    familyFriendly: "high",
    growthOutlook: "strong",
    amenities: ["Rattlesnake Point Conservation", "Milton District Hospital", "GO Transit", "Sherwood Community Centre"],
  },
  Toronto: {
    commuteMinutesToToronto: 10,
    schoolQuality: "average",
    lifestyleTags: ["urban", "waterfront"],
    familyFriendly: "low",
    growthOutlook: "strong",
    amenities: ["TTC subway access", "CN Tower & waterfront", "Financial District", "Union Station"],
  },
};

export function getCityProfile(cityLabel: string): CityProfile {
  const key = Object.keys(cityProfiles).find((c) => cityLabel.toLowerCase().includes(c.toLowerCase()));
  return key ? cityProfiles[key] : cityProfiles.Mississauga;
}
