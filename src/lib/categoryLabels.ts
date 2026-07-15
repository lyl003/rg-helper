import { SkillCategory, WorkoutCategory } from "@/lib/types";

export const SKILL_CATEGORY_LABELS: Record<SkillCategory, string> = {
  flexibility: "Flexibility",
  leaps: "Leaps & Jumps",
  balances: "Balances",
  pivots: "Pivots & Turns",
  "apparatus-rope": "Rope Skills",
  "apparatus-hoop": "Hoop Skills",
  "apparatus-ball": "Ball Skills",
  "apparatus-clubs": "Clubs Skills",
  "apparatus-ribbon": "Ribbon Skills",
};

export const SKILL_CATEGORY_ORDER: SkillCategory[] = [
  "flexibility",
  "leaps",
  "balances",
  "pivots",
  "apparatus-rope",
  "apparatus-hoop",
  "apparatus-ball",
  "apparatus-clubs",
  "apparatus-ribbon",
];

export const WORKOUT_CATEGORY_LABELS: Record<WorkoutCategory, string> = {
  warmup: "Warm Up",
  flexibility: "Flexibility",
  strength: "Strength",
  skills: "Skill Practice",
};

export const WORKOUT_CATEGORY_ORDER: WorkoutCategory[] = ["warmup", "flexibility", "strength", "skills"];
