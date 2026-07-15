// --- Profile ---

export type ExperienceLevel =
  | "beginner"
  | "pre-team"
  | "level-3"
  | "level-4"
  | "level-5"
  | "level-6"
  | "level-7"
  | "level-8"
  | "level-9"
  | "level-10"
  | "elite";

export interface Profile {
  name: string;
  age: number;
  heightCm: number;
  experienceLevel: ExperienceLevel;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

// --- Equipment ---

export type EquipmentCategory = "attire" | "apparatus" | "exercise" | "other";
export type ApparatusType = "rope" | "hoop" | "ball" | "clubs" | "ribbon";

export interface EquipmentCatalogItem {
  id: string;
  category: EquipmentCategory;
  apparatusType?: ApparatusType;
  name: string;
  emoji: string;
  description: string;
  material: string;
  funFact?: string;
  guidanceByLevel: Partial<Record<EquipmentLevel, string>>;
}

// "entry" = recreational/practice-grade gear guidance (available now).
// "competition" = FIG-certified competition gear guidance (added later);
// falls back to "entry" content until it's written.
export type EquipmentLevel = "entry" | "competition";

export interface EquipmentOwnershipEntry {
  itemId: string;
  owned: boolean;
  updatedAt: string;
}

// --- Exercises ("Today's Workout") ---

export type WorkoutCategory = "warmup" | "stretch";

export interface WorkoutCatalogItem {
  id: string;
  name: string;
  description: string;
  category: WorkoutCategory;
}

export interface WorkoutCompletionEntry {
  itemId: string;
  completed: boolean;
  completedAt: string | null;
}

// --- Skills Library ---

export type SkillCategory =
  | "flexibility"
  | "leaps"
  | "balances"
  | "pivots"
  | "apparatus-rope"
  | "apparatus-hoop"
  | "apparatus-ball"
  | "apparatus-clubs"
  | "apparatus-ribbon";

export interface SkillCatalogItem {
  id: string;
  category: SkillCategory;
  name: string;
  description: string;
}

export interface SkillProgressEntry {
  skillId: string;
  learned: boolean;
  learnedAt: string | null;
}

// --- Badges (always derived, never persisted) ---

export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  emoji: string;
}

export interface EarnedBadge extends BadgeDefinition {
  earned: boolean;
  progressLabel?: string;
}
