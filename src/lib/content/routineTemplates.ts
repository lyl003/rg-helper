import { ExperienceLevel, RoutineTemplate } from "@/lib/types";

// Only Beginner and Pre-Team have curated routines for now. Level 3+
// routines are a planned follow-up (see getRoutineForLevel's fallback).
export const ROUTINE_TEMPLATES: Partial<Record<ExperienceLevel, RoutineTemplate>> = {
  beginner: {
    level: "beginner",
    label: "Beginner Routine",
    itemIds: [
      // Warm Up
      "neck-shoulder-rolls",
      "arm-circles",
      "leg-swings",
      "ankle-circles",
      // Flexibility
      "front-split",
      "middle-split",
      "pancake-stretch",
      "bridge-backbend",
      // Strength
      "plank-hold",
      "situps-core",
      // Skill Practice
      "balance-practice",
      "jump-practice",
    ],
  },
  "pre-team": {
    level: "pre-team",
    label: "Pre-Team Routine",
    itemIds: [
      // Warm Up
      "neck-shoulder-rolls",
      "arm-circles",
      "leg-swings",
      "ankle-circles",
      // Flexibility
      "front-split",
      "middle-split",
      "pancake-stretch",
      "bridge-backbend",
      "camel-stretch",
      "shoulder-stretch",
      "arabesque",
      // Strength
      "plank-hold",
      "situps-core",
      "leg-lifts",
      "squats",
      // Skill Practice
      "balance-practice",
      "jump-practice",
      "pivot-practice",
    ],
  },
};

const FALLBACK_LEVEL: ExperienceLevel = "pre-team";

export interface ResolvedRoutine {
  template: RoutineTemplate;
  /** True when this level has no curated routine yet and we fell back to the most advanced one that exists. */
  isFallback: boolean;
}

export function getRoutineForLevel(level: ExperienceLevel): ResolvedRoutine {
  const exact = ROUTINE_TEMPLATES[level];
  if (exact) return { template: exact, isFallback: false };
  return { template: ROUTINE_TEMPLATES[FALLBACK_LEVEL]!, isFallback: true };
}
