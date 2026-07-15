import { ClassJournalEntry } from "@/lib/types";
import { SKILLS_CATALOG } from "@/lib/content/skillsCatalog";
import { WORKOUT_CATALOG } from "@/lib/content/workoutCatalog";

interface ClassEntryCardProps {
  entry: ClassJournalEntry;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ClassEntryCard({ entry, onEdit, onDelete }: ClassEntryCardProps) {
  const skillNames = entry.skillIds
    .map((id) => SKILLS_CATALOG.find((skill) => skill.id === id)?.name)
    .filter((name): name is string => Boolean(name));
  const exerciseNames = entry.exerciseIds
    .map((id) => WORKOUT_CATALOG.find((item) => item.id === id)?.name)
    .filter((name): name is string => Boolean(name));

  return (
    <div className="rounded-xl bg-brand-purple/5 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {entry.className && <p className="font-semibold">{entry.className}</p>}
          {entry.notes && <p className="mt-1 whitespace-pre-wrap text-sm text-foreground/70">{entry.notes}</p>}
          {!entry.className && !entry.notes && <p className="text-sm italic text-foreground/40">No notes added.</p>}
        </div>
        <div className="flex shrink-0 gap-3 text-xs">
          <button type="button" onClick={onEdit} className="font-semibold text-brand-purple hover:underline">
            Edit
          </button>
          <button type="button" onClick={onDelete} className="font-semibold text-rose-600 hover:underline">
            Delete
          </button>
        </div>
      </div>

      {skillNames.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {skillNames.map((name) => (
            <span key={name} className="rounded-full bg-brand-pink/15 px-2 py-0.5 text-xs font-medium text-brand-pink">
              🌟 {name}
            </span>
          ))}
        </div>
      )}

      {exerciseNames.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-1">
          {exerciseNames.map((name) => (
            <span key={name} className="rounded-full bg-brand-teal/15 px-2 py-0.5 text-xs font-medium text-brand-teal">
              🏃 {name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
