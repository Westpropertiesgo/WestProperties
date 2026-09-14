import { NextRequest, NextResponse } from "next/server";
import type { Property } from "@/lib/types";
import { getCityProfile } from "@/lib/cityProfiles";

export const runtime = "nodejs";

/**
 * Generates a richer, natural-language version of the property summary
 * using Claude, grounded in the same real property/city data as the
 * local fallback in lib/propertySummary.ts. Requires ANTHROPIC_API_KEY
 * (see .env.example) — without it, the property page uses the local
 * generator instead, so the feature is fully demonstrable either way.
 */
export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "No ANTHROPIC_API_KEY configured yet." }, { status: 501 });
  }

  try {
    const { property } = (await req.json()) as { property: Property };
    if (!property) {
      return NextResponse.json({ error: "Missing property." }, { status: 400 });
    }

    const cityProfile = getCityProfile(property.city);

    const prompt = `Generate a structured AI summary for this real estate listing. Respond ONLY with valid JSON matching this exact shape, no markdown, no commentary:
{
  "bestFor": string,
  "pros": string[3],
  "drawbacks": string[2-3],
  "investmentPotential": string,
  "lifestyleFit": string,
  "nearbyAmenities": string[3-4],
  "estimatedCommute": string,
  "nextSteps": string[3-4]
}

Listing: ${JSON.stringify(property)}
City profile (commute minutes to Toronto, school quality, growth outlook, real amenities): ${JSON.stringify(cityProfile)}

Ground every claim in the data given. Do not invent amenities or statistics not implied by this data. Keep each string concise (under 25 words).`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 700,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ error: `LLM API error: ${errText}` }, { status: 502 });
    }

    const data = await response.json();
    const text: string = data.content?.[0]?.text ?? "{}";
    const cleaned = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return NextResponse.json({ summary: { ...parsed, generatedBy: "ai" } });
  } catch (err) {
    return NextResponse.json({ error: "Unexpected server error generating the summary." }, { status: 500 });
  }
}
