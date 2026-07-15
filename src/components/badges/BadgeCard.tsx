import { EarnedBadge } from "@/lib/types";

interface BadgeCardProps {
  badge: EarnedBadge;
}

export default function BadgeCard({ badge }: BadgeCardProps) {
  return (
    <div
      className={`flex flex-col items-center gap-1 rounded-2xl p-4 text-center transition-opacity ${
        badge.earned ? "bg-brand-purple/10" : "bg-card opacity-40"
      }`}
      title={badge.description}
    >
      <span className="text-3xl">{badge.emoji}</span>
      <span className="text-xs font-bold">{badge.name}</span>
      {!badge.earned && <span className="text-[10px] text-foreground/50">Locked</span>}
    </div>
  );
}
