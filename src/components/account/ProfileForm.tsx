"use client";

import { FormEvent, useState } from "react";
import { ExperienceLevel, Profile } from "@/lib/types";
import { EXPERIENCE_LEVEL_OPTIONS } from "@/lib/experienceLevels";

interface ProfileFormProps {
  initialProfile: Profile | null;
  onSave: (profile: Profile) => Promise<void>;
  onCancel?: () => void;
}

const EXPERIENCE_GROUPS = Array.from(new Set(EXPERIENCE_LEVEL_OPTIONS.map((opt) => opt.group)));

export default function ProfileForm({ initialProfile, onSave, onCancel }: ProfileFormProps) {
  const [name, setName] = useState(initialProfile?.name ?? "");
  const [age, setAge] = useState(initialProfile?.age?.toString() ?? "");
  const [heightCm, setHeightCm] = useState(initialProfile?.heightCm?.toString() ?? "");
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(
    initialProfile?.experienceLevel ?? "beginner"
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const ageNum = Number(age);
    const heightNum = Number(heightCm);

    if (!name.trim()) {
      setError("Please enter a name.");
      return;
    }
    if (!Number.isFinite(ageNum) || ageNum <= 0 || ageNum > 100) {
      setError("Please enter a valid age.");
      return;
    }
    if (!Number.isFinite(heightNum) || heightNum <= 0 || heightNum > 250) {
      setError("Please enter a valid height in centimeters.");
      return;
    }

    setError(null);
    setSaving(true);
    const now = new Date().toISOString();
    await onSave({
      name: name.trim(),
      age: ageNum,
      heightCm: heightNum,
      experienceLevel,
      createdAt: initialProfile?.createdAt ?? now,
      updatedAt: now,
    });
    setSaving(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-brand-purple/10 sm:p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 sm:col-span-2">
          <span className="text-sm font-semibold">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="What should we call you?"
            className="rounded-xl border border-brand-purple/20 bg-background px-3 py-2 outline-none focus:border-brand-purple"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-semibold">Age</span>
          <input
            type="number"
            inputMode="numeric"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Years"
            className="rounded-xl border border-brand-purple/20 bg-background px-3 py-2 outline-none focus:border-brand-purple"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-semibold">Height (cm)</span>
          <input
            type="number"
            inputMode="numeric"
            value={heightCm}
            onChange={(e) => setHeightCm(e.target.value)}
            placeholder="e.g. 135"
            className="rounded-xl border border-brand-purple/20 bg-background px-3 py-2 outline-none focus:border-brand-purple"
          />
        </label>

        <label className="flex flex-col gap-1 sm:col-span-2">
          <span className="text-sm font-semibold">Experience level</span>
          <select
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel)}
            className="rounded-xl border border-brand-purple/20 bg-background px-3 py-2 outline-none focus:border-brand-purple"
          >
            {EXPERIENCE_GROUPS.map((group) => (
              <optgroup key={group} label={group}>
                {EXPERIENCE_LEVEL_OPTIONS.filter((opt) => opt.group === group).map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
      </div>

      {error && <p className="mt-3 text-sm font-medium text-rose-600">{error}</p>}

      <div className="mt-5 flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-brand-purple px-5 py-2 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save profile"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full px-5 py-2 font-semibold text-foreground/70 hover:bg-brand-purple/10"
          >
            Cancel
          </button>
        )}
      </div>

      <p className="mt-4 text-xs text-foreground/50">
        This info stays on this device for now — no account or login needed yet. It&apos;s used to
        personalize equipment sizing on the Equipment tab.
      </p>
    </form>
  );
}
