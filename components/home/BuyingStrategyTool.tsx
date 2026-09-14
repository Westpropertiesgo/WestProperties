"use client";

import { useState } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import { useContactModal } from "@/components/layout/ContactModalContext";

const stages = [
  {
    key: "budget",
    label: "Budget Planning",
    headline: "Know your real number before you shop",
    copy: "Your comfortable budget usually isn't your maximum approval. It's shaped by down payment source, closing costs, and how much cash flow flexibility you want to keep.",
    checklist: [
      "Confirm your down payment amount and source",
      "Estimate closing costs at 1.5–4% of price",
      "Set a monthly payment ceiling, not just an approval ceiling",
    ],
  },
  {
    key: "mortgage",
    label: "Mortgage Readiness",
    headline: "Get your financing lined up early",
    copy: "A pre-approval tells sellers you're a serious buyer and tells you what price range to actually search within, before you fall for a home outside your range.",
    checklist: [
      "Get pre-approved with a lender or broker",
      "Gather income, employment, and asset documentation",
      "Understand your rate hold and its expiry date",
    ],
  },
  {
    key: "timeline",
    label: "Timeline Planning",
    headline: "Work backward from your ideal move date",
    copy: "Financing, showings, offer conditions, and closing all take time. A realistic timeline keeps you from rushing a decision or losing a home to a faster buyer.",
    checklist: [
      "Set a target move-in window",
      "Plan 4–8 weeks for active searching and offers",
      "Confirm standard closing periods (30–90 days) with your lawyer",
    ],
  },
  {
    key: "market",
    label: "Market Conditions",
    headline: "Understand the market you're buying into",
    copy: "Days-on-market, offer competition, and price trends differ block to block. Knowing current conditions shapes whether you negotiate hard or move quickly.",
    checklist: [
      "Review recent comparable sales, not asking prices",
      "Ask about multiple-offer likelihood on your shortlist",
      "Discuss conditions (financing, inspection) with your agent",
    ],
  },
];

export default function BuyingStrategyTool() {
  const [activeKey, setActiveKey] = useState(stages[0].key);
  const active = stages.find((s) => s.key === activeKey) ?? stages[0];
  const { openContactModal } = useContactModal();

  return (
    <section className="bg-ivory py-28 md:py-36" id="buying-strategy">
      <div className="container-x">
        <div className="max-w-xl">
          <Eyebrow className="mb-5">Advisory Tool</Eyebrow>
          <h2 className="font-display text-[26px] font-light leading-tight text-ink md:text-[30px]">
            Your home buying strategy
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-ink/60">
            A guided walkthrough of the four decisions that shape a
            confident purchase. Not a mortgage calculator, but a framework
            our agents use with every buyer.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
          <div className="flex flex-col gap-1">
            {stages.map((stage, i) => (
              <button
                key={stage.key}
                type="button"
                onClick={() => setActiveKey(stage.key)}
                className={`flex items-center justify-between border-l-2 px-6 py-5 text-left transition-colors duration-300 ${
                  activeKey === stage.key
                    ? "border-brass bg-stone"
                    : "border-stone-line hover:border-ink/30"
                }`}
              >
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest2 text-ink/40">
                    Stage 0{i + 1}
                  </span>
                  <span className="mt-1 block font-display text-lg font-normal text-ink">
                    {stage.label}
                  </span>
                </span>
                <span className={`font-mono text-lg ${activeKey === stage.key ? "text-brass" : "text-ink/20"}`}>
                  &rarr;
                </span>
              </button>
            ))}
          </div>

          <div className="border border-stone-line bg-stone p-10 md:p-14">
            <span className="plaque">{active.label}</span>
            <h3 className="mt-4 font-display text-[22px] font-light leading-tight text-ink">
              {active.headline}
            </h3>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink/65">
              {active.copy}
            </p>

            <ul className="mt-8 flex flex-col gap-3">
              {active.checklist.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[14px] text-ink/70">
                  <span className="mt-1.5 h-[5px] w-[5px] shrink-0 rotate-45 bg-brass" />
                  {item}
                </li>
              ))}
            </ul>

            <button type="button" onClick={() => openContactModal()} className="btn-primary mt-10 inline-flex">
              Talk to an Advisor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
