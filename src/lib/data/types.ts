import {
  EarnedBadge,
  EquipmentOwnershipEntry,
  Profile,
  SkillProgressEntry,
  WorkoutCompletionEntry,
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

  getWorkoutCompletion(): Promise<Record<string, WorkoutCompletionEntry>>;
  saveWorkoutCompletion(itemId: string, completed: boolean): Promise<void>;
  resetWorkoutSession(): Promise<void>;

  getSkills(): Promise<Record<string, SkillProgressEntry>>;
  saveSkillLearned(skillId: string, learned: boolean): Promise<void>;

  getBadges(): Promise<EarnedBadge[]>;
}
