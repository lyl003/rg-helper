import { WorkoutCatalogItem } from "@/lib/types";

interface WorkoutItemRowProps {
  item: WorkoutCatalogItem;
  completed: boolean;
  onToggle: (completed: boolean) => void;
}

export default function WorkoutItemRow({ item, completed, onToggle }: WorkoutItemRowProps) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-xl p-3 transition-colors ${
        completed ? "bg-brand-teal/10" : "bg-card"
      }`}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => onToggle(e.target.checked)}
        className="mt-1 h-5 w-5 shrink-0 accent-brand-teal"
      />
      <div>
        <p className={`font-semibold ${completed ? "text-foreground/60 line-through" : ""}`}>{item.name}</p>
        <p className="text-sm text-foreground/60">{item.description}</p>
      </div>
    </label>
  );
}
