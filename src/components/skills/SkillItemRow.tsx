import { SkillCatalogItem } from "@/lib/types";
import SkillPhotoButton from "@/components/skills/SkillPhotoButton";

interface SkillItemRowProps {
  skill: SkillCatalogItem;
  learned: boolean;
  photoDataUrl?: string;
  onToggle: (learned: boolean) => void;
  onPhotoChange: (photoDataUrl: string | undefined) => void;
}

export default function SkillItemRow({ skill, learned, photoDataUrl, onToggle, onPhotoChange }: SkillItemRowProps) {
  return (
    <div
      className={`flex items-start gap-3 rounded-xl p-3 transition-colors ${
        learned ? "bg-brand-pink/10" : "bg-card"
      }`}
    >
      <label className="flex flex-1 cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={learned}
          onChange={(e) => onToggle(e.target.checked)}
          className="mt-1 h-5 w-5 shrink-0 accent-brand-pink"
        />
        <div>
          <p className="font-semibold">
            {skill.name} {learned && <span className="text-brand-pink">✓ Learned</span>}
          </p>
          <p className="text-sm text-foreground/60">{skill.description}</p>
        </div>
      </label>
      <SkillPhotoButton photoDataUrl={photoDataUrl} skillName={skill.name} onChange={onPhotoChange} />
    </div>
  );
}
