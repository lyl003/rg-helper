import { WorkoutCatalogItem } from "@/lib/types";
import { formatMinutesRange } from "@/lib/routine";

interface WorkoutItemRowProps {
  item: WorkoutCatalogItem;
  completed: boolean;
  onToggle: (completed: boolean) => void;
  onRemove?: () => void;
}

export default function WorkoutItemRow({ item, completed, onToggle, onRemove }: WorkoutItemRowProps) {
  return (
    <div
      className={`flex items-start gap-2 rounded-xl p-3 transition-colors ${
        completed ? "bg-brand-teal/10" : "bg-card"
      }`}
    >
      <label className="flex flex-1 cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => onToggle(e.target.checked)}
          className="mt-1 h-5 w-5 shrink-0 accent-brand-teal"
        />
        <div className="flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className={`font-semibold ${completed ? "text-foreground/60 line-through" : ""}`}>{item.name}</p>
            <span className="shrink-0 text-xs text-foreground/40">{formatMinutesRange(item.estimatedMinutes)}</span>
          </div>
          <p className="text-sm text-foreground/60">{item.description}</p>
        </div>
      </label>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${item.name} from routine`}
          title="Remove from routine"
          className="shrink-0 rounded-full px-1.5 py-0.5 text-foreground/30 hover:bg-rose-500/10 hover:text-rose-500"
        >
          ✕
        </button>
      )}
    </div>
  );
}
