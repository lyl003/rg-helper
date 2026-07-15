import { SkillCatalogItem, SkillCategory, SkillProgressEntry } from "@/lib/types";
import { SKILL_CATEGORY_LABELS } from "@/lib/categoryLabels";
import SkillItemRow from "@/components/skills/SkillItemRow";

interface SkillCategorySectionProps {
  category: SkillCategory;
  skills: SkillCatalogItem[];
  progress: Record<string, SkillProgressEntry>;
  onToggleLearned: (skillId: string, learned: boolean) => void;
  onPhotoChange: (skillId: string, photoDataUrl: string | undefined) => void;
}

export default function SkillCategorySection({
  category,
  skills,
  progress,
  onToggleLearned,
  onPhotoChange,
}: SkillCategorySectionProps) {
  const learnedCount = skills.filter((s) => progress[s.id]?.learned).length;

  return (
    <section className="mb-6">
      <h2 className="mb-3 flex items-baseline justify-between text-lg font-bold">
        {SKILL_CATEGORY_LABELS[category]}
        <span className="text-sm font-normal text-foreground/50">
          {learnedCount} / {skills.length}
        </span>
      </h2>
      <div className="space-y-2">
        {skills.map((skill) => (
          <SkillItemRow
            key={skill.id}
            skill={skill}
            learned={progress[skill.id]?.learned ?? false}
            photoDataUrl={progress[skill.id]?.photoDataUrl}
            onToggle={(learned) => onToggleLearned(skill.id, learned)}
            onPhotoChange={(photoDataUrl) => onPhotoChange(skill.id, photoDataUrl)}
          />
        ))}
      </div>
    </section>
  );
}
