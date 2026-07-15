import { EquipmentLevel, ExperienceLevel, Profile } from "@/lib/types";

// Beginner/pre-team/early Development Program levels typically train on
// affordable practice-grade gear; Level 5+ gymnasts are usually working
// toward meets that require FIG-certified competition apparatus.
const COMPETITION_TRACK: ExperienceLevel[] = [
  "level-5",
  "level-6",
  "level-7",
  "level-8",
  "level-9",
  "level-10",
  "elite",
];

export function getEquipmentLevel(profile: Profile | null): EquipmentLevel {
  if (!profile) return "entry";
  return COMPETITION_TRACK.includes(profile.experienceLevel) ? "competition" : "entry";
}

export const EQUIPMENT_LEVEL_LABELS: Record<EquipmentLevel, string> = {
  entry: "Entry-Level",
  competition: "Competition-Level",
};
