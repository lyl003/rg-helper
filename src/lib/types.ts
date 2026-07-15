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

// --- Exercises ("My Routine") ---

export type WorkoutCategory = "warmup" | "flexibility" | "strength" | "skills";

export interface WorkoutCatalogItem {
  id: string;
  name: string;
  description: string;
  category: WorkoutCategory;
  /** Optional sub-heading to cluster related exercises within a category (e.g. "Leg Flexibility"). */
  subgroup?: string;
  /** [min, max] minutes this exercise typically takes. */
  estimatedMinutes: [number, number];
}

export interface RoutineTemplate {
  level: ExperienceLevel;
  label: string;
  /** Ids of catalog exercises included by default for this level's routine. */
  itemIds: string[];
}

export interface WorkoutItemState {
  itemId: string;
  /** Whether this exercise is part of the user's active (possibly customized) routine. */
  included: boolean;
  /** Whether it's been checked off in the current session. */
  completed: boolean;
  completedAt: string | null;
}

/**
 * Permanent per-day record of what was completed, keyed by local date
 * (YYYY-MM-DD). Unlike WorkoutItemState.completed (today's checklist,
 * cleared by "Start a new session"), this is never cleared — it's what
 * powers the calendar view.
 */
export interface WorkoutHistoryDay {
  date: string;
  completedItemIds: string[];
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
