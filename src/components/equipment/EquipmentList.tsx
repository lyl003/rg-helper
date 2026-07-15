"use client";

import PageHeader from "@/components/layout/PageHeader";
import EquipmentCard from "@/components/equipment/EquipmentCard";
import { useEquipment } from "@/hooks/useEquipment";
import { useProfile } from "@/hooks/useProfile";
import { EquipmentCategory } from "@/lib/types";
import { EQUIPMENT_LEVEL_LABELS, getEquipmentLevel } from "@/lib/equipmentLevel";

const SECTIONS: Array<{ category: EquipmentCategory; label: string }> = [
  { category: "attire", label: "Attire" },
  { category: "apparatus", label: "Hand Apparatus" },
  { category: "exercise", label: "Exercise Equipment" },
  { category: "other", label: "Other Gear" },
];

export default function EquipmentList() {
  const { catalog, ownership, toggleOwned, loading: equipmentLoading } = useEquipment();
  const { profile, loading: profileLoading } = useProfile();

  if (equipmentLoading || profileLoading) {
    return <p className="text-foreground/60">Loading equipment guide...</p>;
  }

  const ownedCount = catalog.filter((item) => ownership[item.id]?.owned).length;
  const level = getEquipmentLevel(profile);

  return (
    <>
      <PageHeader
        emoji="🎀"
        title="Equipment"
        subtitle={
          profile
            ? `${EQUIPMENT_LEVEL_LABELS[level]} guide for ${profile.name}. You own ${ownedCount} of ${catalog.length} items so far.`
            : `Showing the ${EQUIPMENT_LEVEL_LABELS.entry.toLowerCase()} guide. Fill out the Me tab for a guide matched to your level. You own ${ownedCount} of ${catalog.length} items so far.`
        }
      />

      {SECTIONS.map(({ category, label }, index) => {
        const items = catalog.filter((item) => item.category === category);
        if (items.length === 0) return null;
        return (
          <section key={category} className={index === 0 ? "" : "mt-8"}>
            <h2 className="mb-3 text-lg font-bold">{label}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {items.map((item) => (
                <EquipmentCard
                  key={item.id}
                  item={item}
                  ownership={ownership[item.id]}
                  profile={profile}
                  level={level}
                  onToggleOwned={(owned) => toggleOwned(item.id, owned)}
                />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
