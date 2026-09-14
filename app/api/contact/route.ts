import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

interface ContactLeadPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
  /** Optional — which page/listing/CTA the lead came from, for routing/context. */
  source?: string;
}

/**
 * Lead-capture endpoint for every "Book a Consultation" / "Contact Us" CTA
 * on the site. Currently a structured placeholder: it validates the
 * submission and returns success, but does not yet send an email or push
 * to a CRM.
 *
 * TODO (connect real backend): once a CRM/email provider is chosen, send
 * `lead` below to it here — e.g. POST to a HubSpot/Salesforce form
 * endpoint, or send via Resend/SendGrid to the brokerage inbox. The form
 * component (components/layout/ContactModal.tsx) already POSTs the full
 * shape this route expects, so no client-side changes should be needed
 * when that's wired up.
 */
export async function POST(req: NextRequest) {
  let lead: Partial<ContactLeadPayload>;
  try {
    lead = (await req.json()) as Partial<ContactLeadPayload>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, phone, message } = lead;
  if (!name?.trim() || !email?.trim() || !phone?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Full name, email, phone, and message are all required." },
      { status: 400 }
    );
  }

  // Placeholder: log server-side so submissions are visible during review,
  // in place of the real email/CRM call described above.
  console.log("[contact] New lead captured (not yet sent anywhere real):", {
    name,
    email,
    phone,
    message,
    source: lead.source ?? "unknown",
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
