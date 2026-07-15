import { computeEarnedBadges } from "@/lib/badges";
import { SKILLS_CATALOG } from "@/lib/content/skillsCatalog";
import {
  EarnedBadge,
  EquipmentOwnershipEntry,
  Profile,
  SkillProgressEntry,
  WorkoutCompletionEntry,
} from "@/lib/types";
import { STORAGE_KEYS } from "@/lib/data/keys";
import { DataStore } from "@/lib/data/types";

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage unavailable (private mode, quota, etc.) — fail silently for v1.
  }
}

export const localStorageStore: DataStore = {
  async getProfile() {
    return safeGet<Profile | null>(STORAGE_KEYS.profile, null);
  },

  async saveProfile(profile) {
    safeSet(STORAGE_KEYS.profile, profile);
  },

  async getEquipmentOwnership() {
    return safeGet<Record<string, EquipmentOwnershipEntry>>(STORAGE_KEYS.equipment, {});
  },

  async saveEquipmentStatus(itemId, owned) {
    const current = await this.getEquipmentOwnership();
    current[itemId] = { itemId, owned, updatedAt: new Date().toISOString() };
    safeSet(STORAGE_KEYS.equipment, current);
  },

  async getWorkoutCompletion() {
    return safeGet<Record<string, WorkoutCompletionEntry>>(STORAGE_KEYS.workout, {});
  },

  async saveWorkoutCompletion(itemId, completed) {
    const current = await this.getWorkoutCompletion();
    current[itemId] = {
      itemId,
      completed,
      completedAt: completed ? new Date().toISOString() : null,
    };
    safeSet(STORAGE_KEYS.workout, current);
  },

  async resetWorkoutSession() {
    safeSet(STORAGE_KEYS.workout, {});
  },

  async getSkills() {
    return safeGet<Record<string, SkillProgressEntry>>(STORAGE_KEYS.skills, {});
  },

  async saveSkillLearned(skillId, learned) {
    const current = await this.getSkills();
    current[skillId] = {
      skillId,
      learned,
      learnedAt: learned ? new Date().toISOString() : null,
    };
    safeSet(STORAGE_KEYS.skills, current);
  },

  async getBadges(): Promise<EarnedBadge[]> {
    const progress = await this.getSkills();
    return computeEarnedBadges(SKILLS_CATALOG, progress);
  },
};
