"use client";

import Link from "next/link";
import { useEquipment } from "@/hooks/useEquipment";
import { useWorkout } from "@/hooks/useWorkout";
import { useSkills } from "@/hooks/useSkills";
import { useProfile } from "@/hooks/useProfile";
import { getRoutineForLevel } from "@/lib/content/routineTemplates";
import { getRoutineLevel, isCompleted, isIncluded } from "@/lib/routine";

export default function QuickStats() {
  const { catalog: equipmentCatalog, ownership, loading: equipmentLoading } = useEquipment();
  const { catalog: workoutCatalog, itemState, loading: workoutLoading } = useWorkout();
  const { catalog: skillsCatalog, progress, loading: skillsLoading } = useSkills();
  const { profile, loading: profileLoading } = useProfile();

  if (equipmentLoading || workoutLoading || skillsLoading || profileLoading) return null;

  const ownedCount = equipmentCatalog.filter((item) => ownership[item.id]?.owned).length;
  const learnedCount = skillsCatalog.filter((skill) => progress[skill.id]?.learned).length;

  const { template } = getRoutineForLevel(getRoutineLevel(profile));
  const includedWorkoutItems = workoutCatalog.filter((item) => isIncluded(item.id, itemState, template));
  const doneCount = includedWorkoutItems.filter((item) => isCompleted(item.id, itemState)).length;

  const stats = [
    { href: "/equipment", emoji: "🎀", label: "Equipment owned", value: `${ownedCount}/${equipmentCatalog.length}` },
    { href: "/exercises", emoji: "🏃", label: "Done today", value: `${doneCount}/${includedWorkoutItems.length}` },
    { href: "/skills", emoji: "🌟", label: "Skills learned", value: `${learnedCount}/${skillsCatalog.length}` },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat) => (
        <Link
          key={stat.href}
          href={stat.href}
          className="rounded-2xl bg-card p-4 text-center shadow-sm ring-1 ring-brand-purple/10 transition-transform hover:-translate-y-0.5"
        >
          <div className="text-2xl">{stat.emoji}</div>
          <div className="mt-1 text-lg font-extrabold">{stat.value}</div>
          <div className="text-xs text-foreground/60">{stat.label}</div>
        </Link>
      ))}
    </div>
  );
}
