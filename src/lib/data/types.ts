import {
  EarnedBadge,
  EquipmentOwnershipEntry,
  Profile,
  SkillProgressEntry,
  WorkoutHistoryDay,
  WorkoutItemState,
} from "@/lib/types";

/**
 * Every UI component talks to `dataStore` through this interface only —
 * never to localStorage or fetch directly. v2 can implement this same
 * interface against a real API/DB without any UI changes.
 */
export interface DataStore {
  getProfile(): Promise<Profile | null>;
  saveProfile(profile: Profile): Promise<void>;

  getEquipmentOwnership(): Promise<Record<string, EquipmentOwnershipEntry>>;
  saveEquipmentStatus(itemId: string, owned: boolean): Promise<void>;

  getWorkoutState(): Promise<Record<string, WorkoutItemState>>;
  saveWorkoutItemIncluded(itemId: string, included: boolean): Promise<void>;
  saveWorkoutItemCompleted(itemId: string, completed: boolean): Promise<void>;
  /** Clears today's checkmarks only — routine customization (included) is preserved. */
  resetWorkoutSession(): Promise<void>;
  /** Permanent per-day log of completions, for the calendar view. Never cleared by resetWorkoutSession. */
  getWorkoutHistory(): Promise<Record<string, WorkoutHistoryDay>>;

  getSkills(): Promise<Record<string, SkillProgressEntry>>;
  saveSkillLearned(skillId: string, learned: boolean): Promise<void>;

  getBadges(): Promise<EarnedBadge[]>;
}
