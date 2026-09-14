import { NextRequest, NextResponse } from "next/server";
import { communities, homepageFeatured, marketStats, properties, rentalProperties } from "@/lib/data";

export const runtime = "nodejs";

/**
 * West Properties AI Assistant — API route
 * ------------------------------------------------------------------
 * This route is fully wired to call a real LLM (Anthropic's Claude).
 * It is NOT functional out of the box because it requires your own
 * API key — that's intentional. Never ship an API key in client-side
 * code (which is why the standalone HTML preview of this site runs a
 * local, rule-based version of the assistant instead of calling this
 * route: a static HTML file has no server to keep a key secret on).
 *
 * To activate this for real:
 *   1. Get an API key from https://console.anthropic.com
 *   2. Create a `.env.local` file in the project root with:
 *        ANTHROPIC_API_KEY=sk-ant-...
 *   3. Restart `npm run dev` — the assistant will start responding
 *      with real, live model output immediately, no other code
 *      changes needed.
 */

const SYSTEM_PROMPT = `You are the West Properties AI Property Assistant, embedded on the West Properties real estate website (serving Mississauga, Oakville, and Milton, Ontario, with listings also shown in Toronto).

Your job: help visitors with natural-language questions about buying, selling, investing, mortgages, neighbourhoods, and specific listings — in a warm, concise, knowledgeable tone. Keep replies short (2-4 sentences unless the question needs more).

You have access to West Properties' current listings and market data below. When a user's question relates to specific listings (by city, price range, property type, or bedroom count), reference real examples from this data by address. Don't invent listings that aren't in this data.

Current for-sale listings:
${JSON.stringify([...properties, ...homepageFeatured].map((p) => ({ address: p.address, city: p.city, price: p.price, type: "type" in p ? p.type : undefined, beds: p.beds, baths: p.baths })))}

Current rental listings:
${JSON.stringify(rentalProperties.map((p) => ({ address: p.address, city: p.city, price: p.price, beds: p.beds, baths: p.baths })))}

Communities served:
${JSON.stringify(communities.map((c) => ({ name: c.name, city: c.city, averagePrice: c.averagePrice, neighbourhoods: c.neighborhoods })))}

Market snapshot:
${JSON.stringify(marketStats)}

Rules:
- Never invent a listing, price, or statistic not present in the data above.
- For anything requiring a licensed professional's judgment (exact mortgage approval, legal advice, binding valuations), say so plainly and suggest booking a consultation with a West Properties agent.
- If asked something entirely unrelated to real estate, politely redirect back to how you can help with their home search.
- Do not mention that you are Claude or made by Anthropic; you are the "West Properties Assistant."`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "No ANTHROPIC_API_KEY configured on the server yet. Add one to .env.local to activate live AI responses — see the comment at the top of app/api/chat/route.ts.",
      },
      { status: 501 }
    );
  }

  try {
    const { messages } = (await req.json()) as {
      messages: { role: "user" | "assistant"; content: string }[];
    };

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Missing messages." }, { status: 400 });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ error: `LLM API error: ${errText}` }, { status: 502 });
    }

    const data = await response.json();
    const reply: string = data.content?.[0]?.text ?? "Sorry, I couldn't generate a response just now.";

    return NextResponse.json({ reply });
  } catch (err) {
    return NextResponse.json({ error: "Unexpected server error handling the chat request." }, { status: 500 });
  }
}
