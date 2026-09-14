"use client";

import { useMemo, useState } from "react";

function fmt(n: number) {
  return n.toLocaleString("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });
}

function monthlyPaymentFor(principal: number, ratePct: number, years: number) {
  const monthlyRate = ratePct / 100 / 12;
  const n = years * 12;
  if (monthlyRate === 0) return principal / n;
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
}

function ontarioLandTransferTax(price: number) {
  const brackets: [number, number][] = [
    [55000, 0.005],
    [250000, 0.01],
    [400000, 0.015],
    [2000000, 0.02],
    [Infinity, 0.025],
  ];
  let tax = 0;
  let lower = 0;
  for (const [upper, rate] of brackets) {
    if (price <= lower) break;
    const taxable = Math.min(price, upper) - lower;
    tax += taxable * rate;
    lower = upper;
  }
  return tax;
}

/** Standard CMHC premium rate table, applied to the loan amount when the down payment is under 20%. */
function cmhcPremiumRate(downPct: number) {
  if (downPct >= 20) return 0;
  const ltv = 100 - downPct;
  if (ltv <= 65) return 0.006;
  if (ltv <= 75) return 0.017;
  if (ltv <= 80) return 0.024;
  if (ltv <= 85) return 0.028;
  if (ltv <= 90) return 0.031;
  return 0.04;
}

/** Simulates a bi-weekly payoff to find real interest savings vs. standard monthly payments. */
function simulatePeriodicPayoff(principal: number, annualRatePct: number, paymentPerPeriod: number, periodsPerYear: number, maxPeriods: number) {
  const periodRate = annualRatePct / 100 / periodsPerYear;
  let balance = principal;
  let totalInterest = 0;
  let periods = 0;
  while (balance > 0.5 && periods < maxPeriods) {
    const interest = balance * periodRate;
    let principalPaid = paymentPerPeriod - interest;
    if (principalPaid <= 0) return { periods: maxPeriods, totalInterest: NaN, payoffYears: NaN };
    if (principalPaid > balance) principalPaid = balance;
    balance -= principalPaid;
    totalInterest += interest;
    periods++;
  }
  return { periods, totalInterest, payoffYears: periods / periodsPerYear };
}

function Slider({
  label,
  value,
  display,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  value: number;
  display: string;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="font-mono text-[10px] uppercase tracking-widest2 text-ink/50">{label}</label>
        <span className="font-mono text-[13px] text-ink">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-brass"
      />
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  prefix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  prefix?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-widest2 text-ink/50">{label}</span>
      <div className="flex items-center gap-1 border-b border-stone-line pb-1.5 focus-within:border-brass">
        {prefix && <span className="font-mono text-[13px] text-ink/40">{prefix}</span>}
        <input
          type="text"
          inputMode="numeric"
          value={value.toLocaleString("en-CA")}
          onChange={(e) => {
            const raw = Number(e.target.value.replace(/[^0-9.]/g, ""));
            if (!Number.isNaN(raw)) onChange(Math.min(max, Math.max(min, raw)));
          }}
          className="w-full bg-transparent font-mono text-[14px] text-ink focus:outline-none"
        />
      </div>
    </label>
  );
}

const frequencies = [
  { key: "monthly", label: "Monthly", periodsPerYear: 12 },
  { key: "biweekly", label: "Bi-Weekly", periodsPerYear: 26 },
  { key: "accelerated", label: "Accelerated Bi-Weekly", periodsPerYear: 26 },
] as const;

function MortgageTab() {
  const [price, setPrice] = useState(1_000_000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(4.9);
  const [years, setYears] = useState(25);
  const [frequency, setFrequency] = useState<(typeof frequencies)[number]["key"]>("monthly");
  const [propertyTax, setPropertyTax] = useState(6000);
  const [insurance, setInsurance] = useState(120);
  const [includeCosts, setIncludeCosts] = useState(false);

  // Homes at $1M+ legally require at least 20% down in Canada
  const effectiveDownPct = price >= 1_000_000 ? Math.max(downPct, 20) : downPct;

  const result = useMemo(() => {
    const down = price * (effectiveDownPct / 100);
    const basePrincipal = Math.max(price - down, 0);
    const premiumRate = cmhcPremiumRate(effectiveDownPct);
    const cmhcPremium = basePrincipal * premiumRate;
    const principal = basePrincipal + cmhcPremium;

    const monthlyPayment = monthlyPaymentFor(principal, rate, years);
    const totalInterestMonthly = Math.max(monthlyPayment * years * 12 - principal, 0);

    // Accelerated bi-weekly = half the monthly payment, paid 26x/year (one extra monthly payment annually)
    const acceleratedPayment = monthlyPayment / 2;
    const accelerated = simulatePeriodicPayoff(principal, rate, acceleratedPayment, 26, 26 * years + 260);

    const stressTestRate = Math.max(rate + 2, 5.25);
    const stressTestPayment = monthlyPaymentFor(principal, stressTestRate, years);

    const monthlyTaxIns = propertyTax / 12 + insurance;
    const totalMonthlyCost = monthlyPayment + (includeCosts ? monthlyTaxIns : 0);

    let periodPayment = monthlyPayment;
    if (frequency === "biweekly") periodPayment = (monthlyPayment * 12) / 26;
    if (frequency === "accelerated") periodPayment = acceleratedPayment;

    return {
      down,
      principal,
      basePrincipal,
      cmhcPremium,
      monthlyPayment,
      totalInterestMonthly,
      accelerated,
      interestSavings: Number.isFinite(accelerated.totalInterest) ? totalInterestMonthly - accelerated.totalInterest : 0,
      yearsSaved: Number.isFinite(accelerated.payoffYears) ? years - accelerated.payoffYears : 0,
      stressTestRate,
      stressTestPayment,
      monthlyTaxIns,
      totalMonthlyCost,
      periodPayment,
    };
  }, [price, effectiveDownPct, rate, years, frequency, propertyTax, insurance, includeCosts]);

  return (
    <div className="grid gap-0 lg:grid-cols-[1.15fr_1fr]">
      <div className="p-8 md:p-10">
        <div className="flex flex-col gap-7">
          <Slider label="Home Price" value={price} display={fmt(price)} onChange={setPrice} min={300000} max={5000000} step={10000} />
          <div>
            <Slider
              label="Down Payment"
              value={effectiveDownPct}
              display={`${effectiveDownPct}% \u00b7 ${fmt(price * (effectiveDownPct / 100))}`}
              onChange={setDownPct}
              min={5}
              max={50}
              step={1}
            />
            {price >= 1_000_000 && downPct < 20 && (
              <p className="mt-2 text-[11px] leading-relaxed text-brass-dark">
                Homes $1M and over require at least 20% down in Canada, adjusted automatically.
              </p>
            )}
            {result.cmhcPremium > 0 && (
              <p className="mt-2 text-[11px] leading-relaxed text-ink/45">
                CMHC insurance premium of {fmt(result.cmhcPremium)} added to your loan (down payment under 20%).
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Slider label="Rate" value={rate} display={`${rate.toFixed(2)}%`} onChange={setRate} min={2} max={8} step={0.05} />
            <Slider label="Amortization" value={years} display={`${years} yrs`} onChange={setYears} min={10} max={30} step={5} />
          </div>

          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest2 text-ink/50">Payment Frequency</span>
            <div className="mt-2 grid grid-cols-3 gap-1 border border-stone-line p-1">
              {frequencies.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFrequency(f.key)}
                  className={`px-2 py-2 font-mono text-[10px] uppercase tracking-widest2 transition-colors ${
                    frequency === f.key ? "bg-ink text-ivory" : "text-ink/50 hover:text-ink"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-stone-line pt-6">
            <label className="flex items-center gap-3 text-[13px] text-ink/70">
              <input
                type="checkbox"
                checked={includeCosts}
                onChange={(e) => setIncludeCosts(e.target.checked)}
                className="h-4 w-4 accent-brass"
              />
              Include property tax &amp; home insurance
            </label>
            {includeCosts && (
              <div className="mt-4 grid grid-cols-2 gap-6">
                <NumberField label="Annual Property Tax" value={propertyTax} onChange={setPropertyTax} min={0} max={60000} prefix="$" />
                <NumberField label="Monthly Insurance" value={insurance} onChange={setInsurance} min={0} max={2000} prefix="$" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center border-t border-stone-line bg-stone p-8 md:border-l md:border-t-0 md:p-10">
        <p className="font-mono text-[10px] uppercase tracking-widest2 text-ink/45">
          {includeCosts ? "Total Monthly Housing Cost" : `Payment (${frequencies.find((f) => f.key === frequency)?.label})`}
        </p>
        <p className="mt-2 font-display text-[32px] font-light leading-none text-ink">
          {fmt(includeCosts ? result.totalMonthlyCost : result.periodPayment)}
        </p>
        <p className="mt-1 text-[12px] text-ink/50">
          {includeCosts ? "Principal, interest, tax & insurance" : "Principal & interest only"}
        </p>

        <div className="mt-6 flex flex-col gap-2 border-t border-stone-line pt-5 text-[13px] text-ink/70">
          <div className="flex items-center justify-between">
            <span>Loan amount</span>
            <span className="font-mono text-ink">{fmt(result.principal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Total interest ({years} yrs)</span>
            <span className="font-mono text-ink">{fmt(result.totalInterestMonthly)}</span>
          </div>
          {includeCosts && (
            <div className="flex items-center justify-between">
              <span>Tax &amp; insurance / mo.</span>
              <span className="font-mono text-ink">{fmt(result.monthlyTaxIns)}</span>
            </div>
          )}
        </div>

        {frequency === "accelerated" && result.yearsSaved > 0 && (
          <div className="mt-5 border-t border-stone-line pt-5">
            <p className="font-mono text-[10px] uppercase tracking-widest2 text-brass-dark">Accelerated Bi-Weekly Savings</p>
            <p className="mt-2 text-[13px] leading-relaxed text-ink/70">
              Pay off <span className="font-medium text-ink">{result.yearsSaved.toFixed(1)} years sooner</span> and save{" "}
              <span className="font-medium text-ink">{fmt(result.interestSavings)}</span> in interest.
            </p>
          </div>
        )}

        <div className="mt-5 border-t border-stone-line pt-5">
          <p className="font-mono text-[10px] uppercase tracking-widest2 text-ink/45">Mortgage Stress Test</p>
          <p className="mt-2 text-[13px] leading-relaxed text-ink/70">
            Lenders qualify you at {result.stressTestRate.toFixed(2)}%, roughly{" "}
            <span className="font-medium text-ink">{fmt(result.stressTestPayment)}/mo.</span>
          </p>
        </div>

        <p className="mt-6 text-[11px] leading-relaxed text-ink/40">
          Estimate only, based on publicly available CMHC premium rates and federal stress-test rules. Confirm exact figures with a licensed mortgage professional.
        </p>
      </div>
    </div>
  );
}

function AffordabilityTab() {
  const [income, setIncome] = useState(150000);
  const [debts, setDebts] = useState(500);
  const [downPayment, setDownPayment] = useState(150000);

  const { maxPrice, maxMonthlyHousing, stressTestRate } = useMemo(() => {
    const assumedRate = 5.25;
    const stressTestRate = Math.max(assumedRate + 2, 5.25);
    const assumedYears = 25;
    const grossMonthly = income / 12;
    const maxMonthlyHousing = grossMonthly * 0.32 - debts;
    const monthlyRate = stressTestRate / 100 / 12;
    const n = assumedYears * 12;
    const maxPrincipal =
      maxMonthlyHousing > 0
        ? (maxMonthlyHousing * (Math.pow(1 + monthlyRate, n) - 1)) / (monthlyRate * Math.pow(1 + monthlyRate, n))
        : 0;
    const maxPrice = Math.max(maxPrincipal + downPayment, 0);
    return { maxPrice, maxMonthlyHousing: Math.max(maxMonthlyHousing, 0), stressTestRate };
  }, [income, debts, downPayment]);

  return (
    <div className="grid gap-0 lg:grid-cols-[1.1fr_1fr]">
      <div className="p-8 md:p-10">
        <div className="flex flex-col gap-7">
          <Slider label="Annual Household Income" value={income} display={fmt(income)} onChange={setIncome} min={50000} max={500000} step={5000} />
          <Slider label="Monthly Debt Payments" value={debts} display={fmt(debts)} onChange={setDebts} min={0} max={5000} step={50} />
          <Slider label="Available Down Payment" value={downPayment} display={fmt(downPayment)} onChange={setDownPayment} min={0} max={1500000} step={10000} />
        </div>
      </div>
      <div className="flex flex-col justify-center border-t border-stone-line bg-stone p-8 md:border-l md:border-t-0 md:p-10">
        <p className="font-mono text-[10px] uppercase tracking-widest2 text-ink/45">Estimated Max Home Price</p>
        <p className="mt-2 font-display text-[32px] font-light leading-none text-ink">{fmt(maxPrice)}</p>
        <p className="mt-1 text-[12px] text-ink/50">Based on a 32% gross debt service ratio</p>
        <div className="mt-6 flex flex-col gap-2 border-t border-stone-line pt-5 text-[13px] text-ink/70">
          <div className="flex items-center justify-between"><span>Max monthly housing cost</span><span className="font-mono text-ink">{fmt(maxMonthlyHousing)}</span></div>
          <div className="flex items-center justify-between"><span>Qualifying (stress test) rate</span><span className="font-mono text-ink">{stressTestRate.toFixed(2)}%</span></div>
        </div>
        <p className="mt-6 text-[11px] leading-relaxed text-ink/40">Simplified estimate. A lender's underwriting will use your full financial picture.</p>
      </div>
    </div>
  );
}

function LandTransferTaxTab() {
  const [price, setPrice] = useState(1_000_000);
  const [firstTimeBuyer, setFirstTimeBuyer] = useState(false);

  const { tax, netTax, rebate } = useMemo(() => {
    const tax = ontarioLandTransferTax(price);
    const rebate = firstTimeBuyer ? Math.min(4000, tax) : 0;
    return { tax, netTax: Math.max(tax - rebate, 0), rebate };
  }, [price, firstTimeBuyer]);

  return (
    <div className="grid gap-0 lg:grid-cols-[1.1fr_1fr]">
      <div className="p-8 md:p-10">
        <div className="flex flex-col gap-7">
          <Slider label="Home Price" value={price} display={fmt(price)} onChange={setPrice} min={300000} max={5000000} step={10000} />
          <label className="flex items-center gap-3 text-[13px] text-ink/70">
            <input
              type="checkbox"
              checked={firstTimeBuyer}
              onChange={(e) => setFirstTimeBuyer(e.target.checked)}
              className="h-4 w-4 accent-brass"
            />
            I am a first-time home buyer
          </label>
        </div>
      </div>
      <div className="flex flex-col justify-center border-t border-stone-line bg-stone p-8 md:border-l md:border-t-0 md:p-10">
        <p className="font-mono text-[10px] uppercase tracking-widest2 text-ink/45">Ontario Land Transfer Tax</p>
        <p className="mt-2 font-display text-[32px] font-light leading-none text-ink">{fmt(netTax)}</p>
        <p className="mt-1 text-[12px] text-ink/50">Provincial tax owed at closing</p>
        <div className="mt-6 flex flex-col gap-2 border-t border-stone-line pt-5 text-[13px] text-ink/70">
          <div className="flex items-center justify-between"><span>Tax before rebate</span><span className="font-mono text-ink">{fmt(tax)}</span></div>
          <div className="flex items-center justify-between"><span>First-time buyer rebate</span><span className="font-mono text-ink">-{fmt(rebate)}</span></div>
        </div>
        <p className="mt-6 text-[11px] leading-relaxed text-ink/40">Ontario provincial tax only. Toronto properties carry an additional municipal land transfer tax.</p>
      </div>
    </div>
  );
}

const tabs = [
  { key: "mortgage", label: "Mortgage Payment" },
  { key: "affordability", label: "Affordability" },
  { key: "ltt", label: "Land Transfer Tax" },
] as const;

export default function CalculatorSuite() {
  const [active, setActive] = useState<(typeof tabs)[number]["key"]>("mortgage");

  return (
    <div className="border border-stone-line bg-ivory">
      <div className="flex flex-wrap border-b border-stone-line">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActive(tab.key)}
            className={`flex-1 px-5 py-4 font-mono text-[11px] uppercase tracking-widest2 transition-colors duration-300 ${
              active === tab.key ? "bg-stone text-ink" : "text-ink/45 hover:text-ink"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {active === "mortgage" && <MortgageTab />}
      {active === "affordability" && <AffordabilityTab />}
      {active === "ltt" && <LandTransferTaxTab />}
    </div>
  );
}
