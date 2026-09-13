"use client";

import { useState } from "react";
import type { UserPreferences } from "@/lib/types";
import { defaultPreferences } from "@/lib/matchEngine";

function ChipGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-widest2 transition-colors ${
            value === opt.value ? "border-brass bg-brass text-ink" : "border-stone-line text-ink/60 hover:border-ink/30"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default function PreferencesForm({
  initial,
  onSubmit,
}: {
  initial?: UserPreferences | null;
  onSubmit: (prefs: UserPreferences) => void;
}) {
  const [prefs, setPrefs] = useState<UserPreferences>(initial ?? defaultPreferences);

  const update = <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) =>
    setPrefs((p) => ({ ...p, [key]: value }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(prefs);
      }}
      className="flex flex-col gap-8"
    >
      <div>
        <span className="font-mono text-[10px] uppercase tracking-widest2 text-ink/50">Budget Range</span>
        <div className="mt-3 grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-[11px] text-ink/45">Min</span>
            <input
              type="number"
              value={prefs.budgetMin}
              onChange={(e) => update("budgetMin", Number(e.target.value))}
              className="border-0 border-b border-stone-line bg-transparent py-1.5 font-mono text-[14px] text-ink focus:border-brass focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[11px] text-ink/45">Max</span>
            <input
              type="number"
              value={prefs.budgetMax}
              onChange={(e) => update("budgetMax", Number(e.target.value))}
              className="border-0 border-b border-stone-line bg-transparent py-1.5 font-mono text-[14px] text-ink focus:border-brass focus:outline-none"
            />
          </label>
        </div>
      </div>

      <div>
        <span className="font-mono text-[10px] uppercase tracking-widest2 text-ink/50">Property Type</span>
        <div className="mt-3">
          <ChipGroup
            value={prefs.propertyType}
            onChange={(v) => update("propertyType", v)}
            options={[
              { value: "any", label: "Any" },
              { value: "Detached", label: "Detached" },
              { value: "Townhouse", label: "Townhouse" },
              { value: "Condo", label: "Condo" },
            ]}
          />
        </div>
      </div>

      <div>
        <span className="font-mono text-[10px] uppercase tracking-widest2 text-ink/50">Lifestyle Preference</span>
        <div className="mt-3">
          <ChipGroup
            value={prefs.lifestyle}
            onChange={(v) => update("lifestyle", v)}
            options={[
              { value: "urban", label: "Urban" },
              { value: "suburban", label: "Suburban" },
              { value: "quiet", label: "Quiet" },
              { value: "waterfront", label: "Waterfront" },
            ]}
          />
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest2 text-ink/50">Household Size</span>
          <input
            type="number"
            min={1}
            max={10}
            value={prefs.familySize}
            onChange={(e) => update("familySize", Number(e.target.value))}
            className="mt-3 w-full border-0 border-b border-stone-line bg-transparent py-1.5 font-mono text-[14px] text-ink focus:border-brass focus:outline-none"
          />
        </div>
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest2 text-ink/50">Have Pets?</span>
          <div className="mt-3">
            <ChipGroup
              value={prefs.hasPets ? "yes" : "no"}
              onChange={(v) => update("hasPets", v === "yes")}
              options={[
                { value: "no", label: "No" },
                { value: "yes", label: "Yes" },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest2 text-ink/50">Commute Importance</span>
          <div className="mt-3">
            <ChipGroup
              value={prefs.commuteImportance}
              onChange={(v) => update("commuteImportance", v)}
              options={[
                { value: "low", label: "Low" },
                { value: "medium", label: "Medium" },
                { value: "high", label: "High" },
              ]}
            />
          </div>
        </div>
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest2 text-ink/50">Schools Importance</span>
          <div className="mt-3">
            <ChipGroup
              value={prefs.schoolsImportance}
              onChange={(v) => update("schoolsImportance", v)}
              options={[
                { value: "low", label: "Low" },
                { value: "medium", label: "Medium" },
                { value: "high", label: "High" },
              ]}
            />
          </div>
        </div>
      </div>

      <div>
        <span className="font-mono text-[10px] uppercase tracking-widest2 text-ink/50">Primary Goal</span>
        <div className="mt-3">
          <ChipGroup
            value={prefs.investmentGoal}
            onChange={(v) => update("investmentGoal", v)}
            options={[
              { value: "primary-residence", label: "Primary Residence" },
              { value: "investment", label: "Investment" },
              { value: "both", label: "Both" },
            ]}
          />
        </div>
      </div>

      <button type="submit" className="btn-primary self-start">
        Find My Matches
      </button>
    </form>
  );
}
