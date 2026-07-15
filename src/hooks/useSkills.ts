"use client";

import { useCallback, useSyncExternalStore } from "react";
import { dataStore } from "@/lib/data";
import { SKILLS_CATALOG } from "@/lib/content/skillsCatalog";
import { SkillProgressEntry } from "@/lib/types";
import { createSharedResource } from "@/hooks/createSharedResource";

const skillsStore = createSharedResource<Record<string, SkillProgressEntry> | null>(
  () => dataStore.getSkills(),
  null
);

export function useSkills() {
  const progress = useSyncExternalStore(skillsStore.subscribe, skillsStore.getSnapshot, () => null);
  const loading = progress === null;

  const toggleLearned = useCallback(async (skillId: string, learned: boolean) => {
    await dataStore.saveSkillLearned(skillId, learned);
    skillsStore.setState((prev) => ({
      ...(prev ?? {}),
      [skillId]: {
        skillId,
        learned,
        learnedAt: learned ? new Date().toISOString() : null,
        photoDataUrl: prev?.[skillId]?.photoDataUrl,
      },
    }));
  }, []);

  const setSkillPhoto = useCallback(async (skillId: string, photoDataUrl: string | undefined) => {
    await dataStore.saveSkillPhoto(skillId, photoDataUrl);
    skillsStore.setState((prev) => ({
      ...(prev ?? {}),
      [skillId]: {
        skillId,
        learned: prev?.[skillId]?.learned ?? false,
        learnedAt: prev?.[skillId]?.learnedAt ?? null,
        photoDataUrl,
      },
    }));
  }, []);

  return { catalog: SKILLS_CATALOG, progress: progress ?? {}, toggleLearned, setSkillPhoto, loading };
}
