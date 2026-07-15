"use client";

import PageHeader from "@/components/layout/PageHeader";
import SkillCategorySection from "@/components/skills/SkillCategorySection";
import BadgeShelf from "@/components/badges/BadgeShelf";
import { useSkills } from "@/hooks/useSkills";
import { SKILL_CATEGORY_ORDER } from "@/lib/categoryLabels";

export default function SkillsLibrary() {
  const { catalog, progress, toggleLearned, setSkillPhoto, loading } = useSkills();

  if (loading) {
    return <p className="text-foreground/60">Loading skills library...</p>;
  }

  const learnedCount = catalog.filter((s) => progress[s.id]?.learned).length;

  return (
    <>
      <PageHeader
        emoji="🌟"
        title="Skills Library"
        subtitle={`Mark off skills as you learn them. ${learnedCount} of ${catalog.length} learned so far — keep going!`}
      />

      <div className="mb-6">
        <BadgeShelf />
      </div>

      {SKILL_CATEGORY_ORDER.map((category) => {
        const skills = catalog.filter((s) => s.category === category);
        if (skills.length === 0) return null;
        return (
          <SkillCategorySection
            key={category}
            category={category}
            skills={skills}
            progress={progress}
            onToggleLearned={toggleLearned}
            onPhotoChange={setSkillPhoto}
          />
        );
      })}
    </>
  );
}
