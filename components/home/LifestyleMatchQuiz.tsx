"use client";

import { useState } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import { lifestyleAreaMatches } from "@/lib/data";

type Lifestyle = keyof typeof lifestyleAreaMatches;

interface Answers {
  budget: string | null;
  familySize: string | null;
  lifestyle: Lifestyle | null;
  commute: string | null;
  schools: string | null;
}

const budgetOptions = ["Under $1M", "$1M – $2M", "$2M – $3M", "$3M+"];
const familyOptions = ["Single / couple", "Small family (1–2 kids)", "Large family (3+ kids)", "Multi-generational"];
const lifestyleOptions: { key: Lifestyle; label: string }[] = [
  { key: "urban", label: "Urban" },
  { key: "suburban", label: "Suburban" },
  { key: "quiet", label: "Quiet" },
  { key: "waterfront", label: "Waterfront" },
];
const importanceOptions = ["Low", "Medium", "High"];

const steps = ["budget", "familySize", "lifestyle", "commute", "schools"] as const;

function ChipGroup({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`font-mono text-[12px] uppercase tracking-widest2 px-5 py-3 border transition-colors duration-300 ${
            value === opt
              ? "border-brass bg-brass text-ink"
              : "border-ink/20 text-ink/70 hover:border-brass hover:text-ink"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default function LifestyleMatchQuiz() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    budget: null,
    familySize: null,
    lifestyle: null,
    commute: null,
    schools: null,
  });
  const [email, setEmail] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  const currentKey = steps[stepIndex];
  const isQuizComplete = stepIndex >= steps.length;
  const canAdvance = currentKey ? Boolean(answers[currentKey]) : true;

  const matches = answers.lifestyle ? lifestyleAreaMatches[answers.lifestyle] : [];

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  return (
    <section className="bg-stone py-28 md:py-36" id="lifestyle-match">
      <div className="container-x">
        <div className="max-w-xl">
          <Eyebrow className="mb-5">Lead-In Tool</Eyebrow>
          <h2 className="font-display text-[26px] font-light leading-tight text-ink md:text-[30px]">
            Find your ideal lifestyle match
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-ink/60">
            Answer five short questions and we&rsquo;ll surface the
            neighbourhoods across Mississauga, Oakville, and Milton most
            likely to fit how you actually want to live.
          </p>
        </div>

        <div className="mt-14 grid overflow-hidden border border-stone-line bg-ivory lg:grid-cols-[1fr_1px_1fr]">
          <div className="p-8 md:p-12">
            {!isQuizComplete && (
              <>
                <div className="mb-8 flex items-center gap-2">
                  {steps.map((_, i) => (
                    <span
                      key={i}
                      className={`h-[3px] flex-1 ${i <= stepIndex ? "bg-brass" : "bg-stone-line"}`}
                    />
                  ))}
                </div>

                <p className="font-mono text-[11px] uppercase tracking-widest2 text-brass">
                  Question {stepIndex + 1} of {steps.length}
                </p>

                {currentKey === "budget" && (
                  <>
                    <h3 className="mt-3 font-display text-2xl font-light text-ink">
                      What&rsquo;s your budget range?
                    </h3>
                    <div className="mt-6">
                      <ChipGroup options={budgetOptions} value={answers.budget} onChange={(v) => set("budget", v)} />
                    </div>
                  </>
                )}

                {currentKey === "familySize" && (
                  <>
                    <h3 className="mt-3 font-display text-2xl font-light text-ink">
                      What does your household look like?
                    </h3>
                    <div className="mt-6">
                      <ChipGroup options={familyOptions} value={answers.familySize} onChange={(v) => set("familySize", v)} />
                    </div>
                  </>
                )}

                {currentKey === "lifestyle" && (
                  <>
                    <h3 className="mt-3 font-display text-2xl font-light text-ink">
                      Which setting appeals to you most?
                    </h3>
                    <div className="mt-6">
                      <ChipGroup
                        options={lifestyleOptions.map((o) => o.label)}
                        value={
                          lifestyleOptions.find((o) => o.key === answers.lifestyle)?.label ?? null
                        }
                        onChange={(v) => {
                          const match = lifestyleOptions.find((o) => o.label === v);
                          if (match) set("lifestyle", match.key);
                        }}
                      />
                    </div>
                  </>
                )}

                {currentKey === "commute" && (
                  <>
                    <h3 className="mt-3 font-display text-2xl font-light text-ink">
                      How important is a short commute?
                    </h3>
                    <div className="mt-6">
                      <ChipGroup options={importanceOptions} value={answers.commute} onChange={(v) => set("commute", v)} />
                    </div>
                  </>
                )}

                {currentKey === "schools" && (
                  <>
                    <h3 className="mt-3 font-display text-2xl font-light text-ink">
                      How important is school quality?
                    </h3>
                    <div className="mt-6">
                      <ChipGroup options={importanceOptions} value={answers.schools} onChange={(v) => set("schools", v)} />
                    </div>
                  </>
                )}

                <div className="mt-10 flex items-center justify-between">
                  <button
                    type="button"
                    disabled={stepIndex === 0}
                    onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
                    className="font-mono text-[11px] uppercase tracking-widest2 text-ink/40 transition-colors hover:text-ink disabled:opacity-0"
                  >
                    &larr; Back
                  </button>
                  <button
                    type="button"
                    disabled={!canAdvance}
                    onClick={() => setStepIndex((i) => i + 1)}
                    className="btn-primary disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    {stepIndex === steps.length - 1 ? "See My Matches" : "Next"}
                  </button>
                </div>
              </>
            )}

            {isQuizComplete && !unlocked && (
              <div>
                <p className="plaque">Results Ready</p>
                <h3 className="mt-4 font-display text-2xl font-light text-ink">
                  Your lifestyle matches are ready
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink/60">
                  Enter your email to unlock your top three neighbourhood
                  matches and match scores.
                </p>
                <form
                  className="mt-8 flex flex-col gap-4 sm:flex-row"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (email) setUnlocked(true);
                  }}
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="field flex-1"
                  />
                  <button type="submit" className="btn-brass shrink-0">
                    Unlock My Matches
                  </button>
                </form>
              </div>
            )}

            {isQuizComplete && unlocked && (
              <div>
                <p className="plaque">Matched</p>
                <h3 className="mt-4 font-display text-2xl font-light text-ink">
                  Your top neighbourhood matches
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setStepIndex(0);
                    setUnlocked(false);
                    setAnswers({ budget: null, familySize: null, lifestyle: null, commute: null, schools: null });
                  }}
                  className="mt-2 font-mono text-[11px] uppercase tracking-widest2 text-ink/40 hover:text-ink"
                >
                  Retake the quiz
                </button>
              </div>
            )}
          </div>

          <div className="hidden bg-stone-line lg:block" />

          <div className="border-t border-stone-line p-8 md:p-12 lg:border-t-0">
            {!unlocked ? (
              <div className="flex h-full flex-col items-start justify-center gap-4 text-ink/40">
                <span className="font-display text-5xl font-light text-ink/15">?</span>
                <p className="max-w-xs text-[13px] leading-relaxed">
                  Your matched neighbourhoods will appear here once you
                  complete the quiz and unlock your results.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {matches.map((m, i) => (
                  <div key={m.name} className="border-t border-stone-line pt-5 first:border-t-0 first:pt-0">
                    <div className="flex items-center justify-between">
                      <p className="font-display text-xl font-normal text-ink">
                        {i + 1}. {m.name}
                      </p>
                      <span className="font-mono text-[12px] text-brass">{m.matchScore}% match</span>
                    </div>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-widest2 text-ink/45">
                      {m.city}
                    </p>
                    <p className="mt-2 text-[13px] leading-relaxed text-ink/60">{m.reason}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
