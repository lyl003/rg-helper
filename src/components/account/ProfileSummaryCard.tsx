import { Profile } from "@/lib/types";
import { EXPERIENCE_LEVEL_SHORT_LABELS } from "@/lib/experienceLevels";

interface ProfileSummaryCardProps {
  profile: Profile;
  onEdit: () => void;
}

export default function ProfileSummaryCard({ profile, onEdit }: ProfileSummaryCardProps) {
  return (
    <div className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-brand-purple/10 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-brand-purple">Signed in as</p>
          <h2 className="text-2xl font-extrabold">{profile.name} 🌟</h2>
        </div>
        <button
          onClick={onEdit}
          className="shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold text-brand-purple hover:bg-brand-purple/10"
        >
          Edit
        </button>
      </div>
      <dl className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-xl bg-brand-purple/5 p-3">
          <dt className="text-xs text-foreground/60">Age</dt>
          <dd className="text-lg font-bold">{profile.age}</dd>
        </div>
        <div className="rounded-xl bg-brand-pink/5 p-3">
          <dt className="text-xs text-foreground/60">Height</dt>
          <dd className="text-lg font-bold">{profile.heightCm}cm</dd>
        </div>
        <div className="rounded-xl bg-brand-teal/5 p-3">
          <dt className="text-xs text-foreground/60">Level</dt>
          <dd className="text-sm font-bold">{EXPERIENCE_LEVEL_SHORT_LABELS[profile.experienceLevel]}</dd>
        </div>
      </dl>
    </div>
  );
}
