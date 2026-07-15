"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { ExperienceLevel, Profile } from "@/lib/types";
import { EXPERIENCE_LEVEL_OPTIONS } from "@/lib/experienceLevels";
import { resizeImageFile } from "@/lib/image";

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
  const [photoDataUrl, setPhotoDataUrl] = useState(initialProfile?.photoDataUrl);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePhotoChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = ""; // allow re-selecting the same file later
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setPhotoError("Please choose an image file.");
      return;
    }

    try {
      const dataUrl = await resizeImageFile(file);
      setPhotoDataUrl(dataUrl);
      setPhotoError(null);
    } catch {
      setPhotoError("Couldn't load that photo — please try a different image.");
    }
  };

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
      photoDataUrl,
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
      <div className="mb-5 flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element -- small local data-URL avatar, no benefit from next/image optimization */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          aria-label={photoDataUrl ? "Change profile photo" : "Add a profile photo"}
          className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-brand-purple/20 bg-brand-purple/10"
        >
          {photoDataUrl ? (
            <img src={photoDataUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-2xl font-bold text-brand-purple">
              {name.trim().charAt(0).toUpperCase() || "🙂"}
            </span>
          )}
          <span className="absolute inset-x-0 bottom-0 bg-black/40 py-0.5 text-center text-[10px] font-semibold text-white">
            Edit
          </span>
        </button>

        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-sm font-semibold text-brand-purple hover:underline"
            >
              {photoDataUrl ? "Change photo" : "Add a photo"}
            </button>
            {photoDataUrl && (
              <button
                type="button"
                onClick={() => setPhotoDataUrl(undefined)}
                className="text-sm text-foreground/50 hover:underline"
              >
                Remove
              </button>
            )}
          </div>
          {photoError && <p className="mt-1 text-xs font-medium text-rose-600">{photoError}</p>}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </div>
      </div>

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
