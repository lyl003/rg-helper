"use client";

import Link from "next/link";
import { useEquipment } from "@/hooks/useEquipment";
import { useWorkout } from "@/hooks/useWorkout";
import { useSkills } from "@/hooks/useSkills";

export default function QuickStats() {
  const { catalog: equipmentCatalog, ownership, loading: equipmentLoading } = useEquipment();
  const { catalog: workoutCatalog, completion, loading: workoutLoading } = useWorkout();
  const { catalog: skillsCatalog, progress, loading: skillsLoading } = useSkills();

  if (equipmentLoading || workoutLoading || skillsLoading) return null;

  const ownedCount = equipmentCatalog.filter((item) => ownership[item.id]?.owned).length;
  const doneCount = workoutCatalog.filter((item) => completion[item.id]?.completed).length;
  const learnedCount = skillsCatalog.filter((skill) => progress[skill.id]?.learned).length;

  const stats = [
    { href: "/equipment", emoji: "🎀", label: "Equipment owned", value: `${ownedCount}/${equipmentCatalog.length}` },
    { href: "/exercises", emoji: "🧘", label: "Done today", value: `${doneCount}/${workoutCatalog.length}` },
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
