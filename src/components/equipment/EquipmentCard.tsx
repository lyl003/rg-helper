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
  return (
    <div className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-brand-purple/10">
      <EquipmentIllustration itemId={item.id} />

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-bold">
            <span>{item.emoji}</span>
            {item.name}
          </h3>
          <p className="mt-1 text-sm text-foreground/70">{item.description}</p>
        </div>
      </div>

      <p className="mt-3 text-xs text-foreground/50">
        <span className="font-semibold text-foreground/70">Material: </span>
        {item.material}
      </p>
      {item.funFact && (
        <p className="mt-1 text-xs text-foreground/50">
          <span className="font-semibold text-foreground/70">Fun fact: </span>
          {item.funFact}
        </p>
      )}

      {item.apparatusType && (
        <div className="mt-4">
          <SizingBox apparatusType={item.apparatusType} profile={profile} />
        </div>
      )}

      <div className="mt-4">
        <PurchaseGuidance guidanceByLevel={item.guidanceByLevel} level={level} />
      </div>

      <div className="mt-4">
        <OwnershipCheckbox owned={ownership?.owned ?? false} onToggle={onToggleOwned} />
      </div>
    </div>
  );
}
