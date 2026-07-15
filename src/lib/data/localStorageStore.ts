import { computeEarnedBadges } from "@/lib/badges";
import { SKILLS_CATALOG } from "@/lib/content/skillsCatalog";
import {
  EarnedBadge,
  EquipmentOwnershipEntry,
  Profile,
  SkillProgressEntry,
  WorkoutHistoryDay,
  WorkoutItemState,
} from "@/lib/types";
import { STORAGE_KEYS } from "@/lib/data/keys";
import { DataStore } from "@/lib/data/types";
import { todayKey } from "@/lib/date";

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

  async getWorkoutState() {
    return safeGet<Record<string, WorkoutItemState>>(STORAGE_KEYS.workout, {});
  },

  async saveWorkoutItemIncluded(itemId, included) {
    const current = await this.getWorkoutState();
    current[itemId] = {
      itemId,
      included,
      completed: current[itemId]?.completed ?? false,
      completedAt: current[itemId]?.completedAt ?? null,
    };
    safeSet(STORAGE_KEYS.workout, current);
  },

  async saveWorkoutItemCompleted(itemId, completed) {
    const current = await this.getWorkoutState();
    current[itemId] = {
      itemId,
      included: current[itemId]?.included ?? true,
      completed,
      completedAt: completed ? new Date().toISOString() : null,
    };
    safeSet(STORAGE_KEYS.workout, current);

    // Mirror into the permanent history log so "Start a new session" never erases it.
    const key = todayKey();
    const history = await this.getWorkoutHistory();
    const idSet = new Set(history[key]?.completedItemIds ?? []);
    if (completed) idSet.add(itemId);
    else idSet.delete(itemId);

    if (idSet.size > 0) {
      history[key] = { date: key, completedItemIds: Array.from(idSet) };
    } else {
      delete history[key];
    }
    safeSet(STORAGE_KEYS.workoutHistory, history);
  },

  async resetWorkoutSession() {
    const current = await this.getWorkoutState();
    const cleared = Object.fromEntries(
      Object.entries(current).map(([id, state]) => [id, { ...state, completed: false, completedAt: null }])
    );
    safeSet(STORAGE_KEYS.workout, cleared);
  },

  async getWorkoutHistory() {
    return safeGet<Record<string, WorkoutHistoryDay>>(STORAGE_KEYS.workoutHistory, {});
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
      photoDataUrl: current[skillId]?.photoDataUrl,
    };
    safeSet(STORAGE_KEYS.skills, current);
  },

  async saveSkillPhoto(skillId, photoDataUrl) {
    const current = await this.getSkills();
    current[skillId] = {
      skillId,
      learned: current[skillId]?.learned ?? false,
      learnedAt: current[skillId]?.learnedAt ?? null,
      photoDataUrl,
    };
    safeSet(STORAGE_KEYS.skills, current);
  },

  async getBadges(): Promise<EarnedBadge[]> {
    const progress = await this.getSkills();
    return computeEarnedBadges(SKILLS_CATALOG, progress);
  },
};
