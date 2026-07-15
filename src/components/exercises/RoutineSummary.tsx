import { ExperienceLevel } from "@/lib/types";
import { EXPERIENCE_LEVEL_SHORT_LABELS } from "@/lib/experienceLevels";

interface RoutineSummaryProps {
  level: ExperienceLevel;
  isFallback: boolean;
  totalMinutesLabel: string;
  includedCount: number;
  doneCount: number;
}

export default function RoutineSummary({
  level,
  isFallback,
  totalMinutesLabel,
  includedCount,
  doneCount,
}: RoutineSummaryProps) {
  return (
    <div className="mb-6 rounded-2xl bg-gradient-to-br from-brand-pink/15 via-brand-purple/15 to-brand-teal/15 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-brand-purple">{EXPERIENCE_LEVEL_SHORT_LABELS[level]} Routine</p>
          <p className="text-2xl font-extrabold">{totalMinutesLabel}</p>
        </div>
        <div className="text-right text-sm text-foreground/60">
          <p>
            {doneCount} of {includedCount} done today
          </p>
        </div>
      </div>
      {isFallback && (
        <p className="mt-3 text-xs italic text-foreground/50">
          Level 3+ routines are coming soon — showing the Pre-Team routine for now.
        </p>
      )}
    </div>
  );
}
