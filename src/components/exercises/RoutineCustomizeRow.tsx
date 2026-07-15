import { WorkoutCatalogItem } from "@/lib/types";
import { formatMinutesRange } from "@/lib/routine";

interface RoutineCustomizeRowProps {
  item: WorkoutCatalogItem;
  included: boolean;
  onToggle: (included: boolean) => void;
}

export default function RoutineCustomizeRow({ item, included, onToggle }: RoutineCustomizeRowProps) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl p-2.5 hover:bg-brand-purple/10">
      <input
        type="checkbox"
        checked={included}
        onChange={(e) => onToggle(e.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-brand-purple"
      />
      <div className="flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-sm font-semibold">{item.name}</p>
          <span className="shrink-0 text-xs text-foreground/40">{formatMinutesRange(item.estimatedMinutes)}</span>
        </div>
        <p className="text-xs text-foreground/60">{item.description}</p>
      </div>
    </label>
  );
}
