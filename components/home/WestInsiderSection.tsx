"use client";

import { useState } from "react";

const benefits = [
  "Off-market listings before they reach MLS®",
  "Price-drop alerts on homes matching your criteria",
  "Early access to new listings, ahead of the public",
  "Quarterly market insights for your neighbourhood",
];

export default function WestInsiderSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="relative overflow-hidden bg-ink py-28 text-ivory md:py-36">
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
        <img
          src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2000&auto=format&fit=crop"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      <div className="container-x relative z-10 grid gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="plaque text-brass-light">By Invitation</span>
          <h2 className="mt-5 font-display text-[26px] font-light leading-tight md:text-[30px]">
            West Insider Access
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ivory/65">
            A private list for buyers and sellers who want to see homes
            before the rest of the market does. No spam, no daily emails —
            only what's relevant to Mississauga, Oakville, and Milton.
          </p>

          <ul className="mt-9 flex flex-col gap-4">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 border-t border-ivory/15 pt-4 text-[14px] text-ivory/75">
                <span className="mt-1.5 h-[5px] w-[5px] shrink-0 rotate-45 bg-brass" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-ivory/15 bg-ivory/[0.04] p-10 backdrop-blur-sm md:p-12">
          {!submitted ? (
            <>
              <h3 className="font-display text-2xl font-light text-ivory">
                Request insider access
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ivory/55">
                Membership is free and limited to buyers and sellers active
                in our three core markets.
              </p>
              <form
                className="mt-8 flex flex-col gap-1"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) setSubmitted(true);
                }}
              >
                <input type="text" placeholder="Full name" className="field-light" required />
                <input
                  type="email"
                  placeholder="Email address"
                  className="field-light"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <select className="field-light" defaultValue="Mississauga">
                  <option>Mississauga</option>
                  <option>Oakville</option>
                  <option>Milton</option>
                  <option>Not sure yet</option>
                </select>
                <button type="submit" className="btn-brass mt-8 w-full whitespace-normal">
                  Request Access
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-start gap-4">
              <span className="plaque text-brass-light">Request Received</span>
              <h3 className="font-display text-2xl font-light text-ivory">
                You&rsquo;re on the list
              </h3>
              <p className="text-[14px] leading-relaxed text-ivory/65">
                A West Properties advisor will confirm your access shortly.
                Watch your inbox for the first round of off-market listings.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
