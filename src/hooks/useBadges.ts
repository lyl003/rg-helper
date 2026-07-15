"use client";

import { useMemo } from "react";
import { computeEarnedBadges } from "@/lib/badges";
import { useSkills } from "@/hooks/useSkills";

export function useBadges() {
  const { catalog, progress, loading } = useSkills();
  const badges = useMemo(() => computeEarnedBadges(catalog, progress), [catalog, progress]);
  return { badges, loading };
}
