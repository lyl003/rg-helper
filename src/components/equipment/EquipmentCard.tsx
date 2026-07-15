"use client";

import { useState } from "react";
import { EquipmentCatalogItem, EquipmentLevel, EquipmentOwnershipEntry, Profile } from "@/lib/types";
import EquipmentIllustration from "@/components/equipment/EquipmentIllustration";
import SizingBox from "@/components/equipment/SizingBox";
import OwnershipCheckbox from "@/components/equipment/OwnershipCheckbox";
import PurchaseGuidance from "@/components/equipment/PurchaseGuidance";

interface EquipmentCardProps {
  item: EquipmentCatalogItem;
  ownership: EquipmentOwnershipEntry | undefined;
  profile: Profile | null;
  level: EquipmentLevel;
  onToggleOwned: (owned: boolean) => void;
}

export default function EquipmentCard({ item, ownership, profile, level, onToggleOwned }: EquipmentCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-2xl bg-card shadow-sm ring-1 ring-brand-purple/10">
      <div className="flex items-center gap-3 p-4">
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          className="flex flex-1 items-center gap-3 text-left"
        >
          <EquipmentIllustration itemId={item.id} compact />
          <span className="min-w-0 flex-1 truncate font-bold">
            {item.emoji} {item.name}
          </span>
          <span className="shrink-0 whitespace-nowrap text-xs font-semibold text-brand-purple">
            {expanded ? "Hide details" : "Show details"} {expanded ? "▲" : "▼"}
          </span>
        </button>
      </div>

      <div className="px-4 pb-4">
        <OwnershipCheckbox owned={ownership?.owned ?? false} onToggle={onToggleOwned} />
      </div>

      {expanded && (
        <div className="space-y-4 border-t border-brand-purple/10 px-4 pb-4 pt-4">
          <p className="text-sm text-foreground/70">{item.description}</p>

          <p className="text-xs text-foreground/50">
            <span className="font-semibold text-foreground/70">Material: </span>
            {item.material}
          </p>

          {item.apparatusType && <SizingBox apparatusType={item.apparatusType} profile={profile} />}

          <PurchaseGuidance guidanceByLevel={item.guidanceByLevel} level={level} />
        </div>
      )}
    </div>
  );
}
