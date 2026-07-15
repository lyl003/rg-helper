import { EquipmentLevel } from "@/lib/types";
import { EQUIPMENT_LEVEL_LABELS } from "@/lib/equipmentLevel";

interface PurchaseGuidanceProps {
  guidanceByLevel: Partial<Record<EquipmentLevel, string>>;
  level: EquipmentLevel;
}

export default function PurchaseGuidance({ guidanceByLevel, level }: PurchaseGuidanceProps) {
  const text = guidanceByLevel[level] ?? guidanceByLevel.entry;
  const isFallback = level !== "entry" && !guidanceByLevel[level];

  return (
    <div className="rounded-xl bg-brand-purple/5 p-3">
      <p className="text-sm font-semibold">
        🛍️ Buying tips <span className="font-normal text-foreground/50">· {EQUIPMENT_LEVEL_LABELS[level]}</span>
      </p>
      <p className="mt-1 text-xs text-foreground/70">{text}</p>
      {isFallback && (
        <p className="mt-1 text-xs italic text-foreground/40">
          Competition-level guidance is coming soon — showing entry-level guidance for now.
        </p>
      )}
    </div>
  );
}
