import { matchTierColor } from "@/lib/matchEngine";
import type { MatchResult } from "@/lib/types";

export default function MatchScoreBadge({ result, compact }: { result: MatchResult; compact?: boolean }) {
  const colors = matchTierColor(result.tier);

  if (compact) {
    return (
      <span className={`flex items-center gap-1.5 rounded-full ${colors.bg} px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest2 text-white`}>
        {result.score}% Match
      </span>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className={`flex h-12 w-12 items-center justify-center rounded-full ${colors.bg} font-display text-[15px] font-medium text-white`}>
        {result.score}
      </div>
      <div>
        <p className={`font-mono text-[11px] uppercase tracking-widest2 ${colors.text}`}>{colors.label}</p>
        <p className="text-[12px] text-ink/50">out of 100</p>
      </div>
    </div>
  );
}
