"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { findMatchingListings, type MatchableProperty } from "@/lib/chatMatcher";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  listings?: MatchableProperty[];
}

const STARTER_PROMPTS = [
  "What's a good mortgage rate right now?",
  "Show me condos in Mississauga",
  "Is Oakville good for investment?",
  "How do I start selling my home?",
];

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8c-1.1 0-2.2-.2-3.1-.6L4 21l1.7-4.8C4.6 14.9 4 13.5 4 12z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-[18px] w-[18px]">
      <path d="M17.5 2.5L9 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M17.5 2.5L12 17.5L9 11L2.5 8L17.5 2.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-1">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/40 [animation-delay:-0.3s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/40 [animation-delay:-0.15s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/40" />
    </div>
  );
}

function ListingCard({ listing }: { listing: MatchableProperty }) {
  return (
    <div className="flex gap-3 border border-stone-line bg-ivory p-2">
      <img src={listing.image} alt={listing.address} className="h-14 w-14 shrink-0 rounded object-cover" />
      <div className="min-w-0">
        <p className="truncate text-[12px] font-medium text-ink">{listing.address}</p>
        <p className="text-[11px] text-ink/50">{listing.city}</p>
        <p className="font-mono text-[11px] text-brass-dark">{listing.price}</p>
      </div>
    </div>
  );
}

/** Simulated fallback used only if the API route has no key configured yet, so the widget is still demonstrable. */
function localFallbackReply(userText: string): string {
  const lower = userText.toLowerCase();
  if (/mortgage|rate|afford/.test(lower)) {
    return "I can help estimate that — try the Mortgage Calculator under Tools for exact numbers based on today's rates, down payment, and amortization. Want me to point you to it?";
  }
  if (/sell/.test(lower)) {
    return "Selling starts with a pricing strategy and professional marketing. Our Selling Strategy guide walks through it step by step, and I can connect you with an agent for a free home assessment.";
  }
  if (/invest/.test(lower)) {
    return "For investment purposes, condos in high-demand areas like City Centre Mississauga or waterfront units tend to hold value well. Want a few current listings that fit that profile?";
  }
  return "I'm running in local demo mode right now (no live AI connected yet), but I can still point you toward listings, calculators, and guides on the site — what are you looking for?";
}

export default function PropertyAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiUnavailable, setApiUnavailable] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content: trimmed };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      let replyText: string;
      if (res.status === 501) {
        setApiUnavailable(true);
        replyText = localFallbackReply(trimmed);
      } else if (!res.ok) {
        replyText = "Sorry, something went wrong reaching the assistant. Please try again in a moment.";
      } else {
        const data = await res.json();
        replyText = data.reply ?? "Sorry, I couldn't generate a response just now.";
      }

      const combinedContext = `${nextMessages.map((m) => m.content).join(" ")} ${replyText}`;
      const listings = findMatchingListings(combinedContext);

      setMessages((cur) => [
        ...cur,
        { id: crypto.randomUUID(), role: "assistant", content: replyText, listings: listings.length ? listings : undefined },
      ]);
    } catch {
      setMessages((cur) => [
        ...cur,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "I'm having trouble connecting right now. Please try again shortly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close property assistant" : "Open property assistant"}
        className={`fixed bottom-6 right-6 z-[130] flex h-14 w-14 items-center justify-center rounded-full bg-ink text-ivory shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-105 ${
          open ? "scale-90" : "scale-100"
        }`}
      >
        {open ? (
          <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
            <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        ) : (
          <ChatIcon />
        )}
      </button>

      {/* Chat panel */}
      <div
        className={`fixed bottom-24 right-6 z-[130] flex w-[92vw] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-stone-line bg-ivory shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] transition-all duration-300 ease-out ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
        style={{ height: "min(560px, 70vh)" }}
      >
        <div className="flex items-center justify-between border-b border-stone-line bg-ink px-5 py-4">
          <div>
            <p className="font-display text-[15px] font-medium text-ivory">West Properties Assistant</p>
            <p className="font-mono text-[10px] uppercase tracking-widest2 text-ivory/50">
              {apiUnavailable ? "Local demo mode" : "Ask me anything"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full text-ivory/60 transition-colors hover:text-brass-light"
          >
            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
              <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
          {messages.length === 0 && (
            <div>
              <p className="text-[13px] leading-relaxed text-ink/60">
                Hi! I&rsquo;m your West Properties assistant. Ask me about buying, selling, investing,
                mortgages, neighbourhoods, or specific listings.
              </p>
              <div className="mt-3 flex flex-col gap-2">
                {STARTER_PROMPTS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => sendMessage(p)}
                    className="rounded-full border border-stone-line px-3 py-2 text-left text-[12px] text-ink/70 transition-colors hover:border-brass hover:text-ink"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className="max-w-[85%]">
                <div
                  className={`rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-sm bg-ink text-ivory"
                      : "rounded-bl-sm border border-stone-line bg-white text-ink"
                  }`}
                >
                  {m.content}
                </div>
                {m.listings && (
                  <div className="mt-2 flex flex-col gap-2">
                    {m.listings.map((l) => (
                      <ListingCard key={l.id} listing={l} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-sm border border-stone-line bg-white px-3 py-2">
                <TypingDots />
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="flex items-center gap-2 border-t border-stone-line bg-ivory p-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about a home, area, or mortgage..."
            className="min-w-0 flex-1 rounded-full border border-stone-line bg-white px-4 py-2.5 text-[13px] text-ink placeholder:text-ink/40 focus:border-brass focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Send message"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brass text-ink transition-opacity disabled:opacity-40"
          >
            <SendIcon />
          </button>
        </form>

        {apiUnavailable && (
          <p className="border-t border-stone-line bg-stone px-4 py-2 text-center text-[10px] text-ink/50">
            Live AI not connected yet —{" "}
            <Link href="/contact" className="underline hover:text-ink">
              talk to a real agent
            </Link>{" "}
            anytime.
          </p>
        )}
      </div>
    </>
  );
}
