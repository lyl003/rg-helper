"use client";

import { FormEvent, useState } from "react";
import { ClassJournalEntry } from "@/lib/types";
import { SKILLS_CATALOG } from "@/lib/content/skillsCatalog";
import { WORKOUT_CATALOG } from "@/lib/content/workoutCatalog";
import {
  SKILL_CATEGORY_LABELS,
  SKILL_CATEGORY_ORDER,
  WORKOUT_CATEGORY_LABELS,
  WORKOUT_CATEGORY_ORDER,
} from "@/lib/categoryLabels";
import CategorizedCheckboxPicker from "@/components/classes/CategorizedCheckboxPicker";
import { todayKey } from "@/lib/date";

interface ClassEntryFormProps {
  initialEntry?: ClassJournalEntry;
  onSave: (entry: ClassJournalEntry) => Promise<void>;
  onCancel: () => void;
}

function toggleId(set: Set<string>, id: string): Set<string> {
  const next = new Set(set);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
}

export default function ClassEntryForm({ initialEntry, onSave, onCancel }: ClassEntryFormProps) {
  const [date, setDate] = useState(initialEntry?.date ?? todayKey());
  const [className, setClassName] = useState(initialEntry?.className ?? "");
  const [notes, setNotes] = useState(initialEntry?.notes ?? "");
  const [skillIds, setSkillIds] = useState<Set<string>>(new Set(initialEntry?.skillIds ?? []));
  const [exerciseIds, setExerciseIds] = useState<Set<string>>(new Set(initialEntry?.exerciseIds ?? []));
  const [skillsOpen, setSkillsOpen] = useState(false);
  const [exercisesOpen, setExercisesOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!date) {
      setError("Please pick a date.");
      return;
    }
    setError(null);
    setSaving(true);
    const now = new Date().toISOString();
    await onSave({
      id: initialEntry?.id ?? crypto.randomUUID(),
      date,
      className: className.trim() || undefined,
      notes: notes.trim(),
      skillIds: Array.from(skillIds),
      exerciseIds: Array.from(exerciseIds),
      createdAt: initialEntry?.createdAt ?? now,
      updatedAt: now,
    });
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-brand-purple/10 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-semibold">Date</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-xl border border-brand-purple/20 bg-background px-3 py-2 outline-none focus:border-brand-purple"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-semibold">Class / coach (optional)</span>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="e.g. Tuesday class with Coach Ana"
            className="rounded-xl border border-brand-purple/20 bg-background px-3 py-2 outline-none focus:border-brand-purple"
          />
        </label>
      </div>

      <label className="mt-4 flex flex-col gap-1">
        <span className="text-sm font-semibold">Notes</span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder="What did you work on today? How did it go?"
          className="rounded-xl border border-brand-purple/20 bg-background px-3 py-2 outline-none focus:border-brand-purple"
        />
      </label>

      <div className="mt-4">
        <button
          type="button"
          onClick={() => setSkillsOpen((o) => !o)}
          className="text-sm font-semibold text-brand-purple hover:underline"
        >
          {skillsOpen ? "Hide" : "+ Add"} skills worked on {skillIds.size > 0 && `(${skillIds.size})`}
        </button>
        {skillsOpen && (
          <div className="mt-2 max-h-64 overflow-y-auto rounded-xl bg-brand-pink/5 p-2">
            <CategorizedCheckboxPicker
              items={SKILLS_CATALOG}
              categoryLabels={SKILL_CATEGORY_LABELS}
              categoryOrder={SKILL_CATEGORY_ORDER}
              selectedIds={skillIds}
              onToggle={(id) => setSkillIds((prev) => toggleId(prev, id))}
            />
          </div>
        )}
      </div>

      <div className="mt-4">
        <button
          type="button"
          onClick={() => setExercisesOpen((o) => !o)}
          className="text-sm font-semibold text-brand-purple hover:underline"
        >
          {exercisesOpen ? "Hide" : "+ Add"} exercises done {exerciseIds.size > 0 && `(${exerciseIds.size})`}
        </button>
        {exercisesOpen && (
          <div className="mt-2 max-h-64 overflow-y-auto rounded-xl bg-brand-teal/5 p-2">
            <CategorizedCheckboxPicker
              items={WORKOUT_CATALOG}
              categoryLabels={WORKOUT_CATEGORY_LABELS}
              categoryOrder={WORKOUT_CATEGORY_ORDER}
              selectedIds={exerciseIds}
              onToggle={(id) => setExerciseIds((prev) => toggleId(prev, id))}
            />
          </div>
        )}
      </div>

      {error && <p className="mt-3 text-sm font-medium text-rose-600">{error}</p>}

      <div className="mt-5 flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-brand-purple px-5 py-2 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "Saving..." : initialEntry ? "Save changes" : "Add class entry"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full px-5 py-2 font-semibold text-foreground/70 hover:bg-brand-purple/10"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
