"use client";

import BadgeCard from "@/components/badges/BadgeCard";
import { useBadges } from "@/hooks/useBadges";

export default function BadgeShelf() {
  const { badges, loading } = useBadges();

  if (loading) return null;

  const earnedCount = badges.filter((b) => b.earned).length;

  return (
    <section className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-brand-purple/10">
      <h2 className="mb-3 flex items-baseline justify-between text-lg font-bold">
        Badges
        <span className="text-sm font-normal text-foreground/50">
          {earnedCount} / {badges.length} earned
        </span>
      </h2>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {badges.map((badge) => (
          <BadgeCard key={badge.id} badge={badge} />
        ))}
      </div>
    </section>
  );
}
