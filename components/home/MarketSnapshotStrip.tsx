import { marketStats } from "@/lib/data";

function TrendArrow({ direction }: { direction: "up" | "down" | "flat" }) {
  if (direction === "up") return <span className="text-brass">&uarr;</span>;
  if (direction === "down") return <span className="text-ink/40">&darr;</span>;
  return <span className="text-ink/40">&rarr;</span>;
}

export default function MarketSnapshotStrip() {
  return (
    <section className="border-y border-stone-line bg-ivory py-10">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <span className="plaque shrink-0">GTA Market Snapshot</span>
          <div className="grid flex-1 grid-cols-1 gap-8 sm:grid-cols-3">
            {marketStats.map((stat) => (
              <div key={stat.city} className="flex items-baseline justify-between border-t border-stone-line pt-4 sm:border-t-0 sm:pt-0">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-widest2 text-ink/45">
                    {stat.city}
                  </p>
                  <p className="mt-1 font-display text-2xl font-light text-ink">
                    {stat.averagePrice}
                  </p>
                </div>
                <p className="font-mono text-[12px] text-ink/60">
                  <TrendArrow direction={stat.trendDirection} /> {stat.trend}
                </p>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-6 text-[11px] leading-relaxed text-ink/40">
          Figures shown are illustrative placeholders pending a live market-data feed.
        </p>
      </div>
    </section>
  );
}
