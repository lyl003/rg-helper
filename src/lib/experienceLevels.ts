import { ExperienceLevel } from "@/lib/types";

// Mirrors the USA Gymnastics Rhythmic pathway: pre-competitive (beginner/pre-team),
// the Development Program (levels 3-8), and the Elite Program (levels 9-10, elite —
// which competes under FIG rules).
export const EXPERIENCE_LEVEL_OPTIONS: Array<{
  value: ExperienceLevel;
  label: string;
  shortLabel: string;
  group: string;
}> = [
  { value: "beginner", label: "Beginner — just started, recreational", shortLabel: "Beginner", group: "Getting Started" },
  { value: "pre-team", label: "Pre-Team — building skills toward a team", shortLabel: "Pre-Team", group: "Getting Started" },
  { value: "level-3", label: "Level 3 — beginner competitive", shortLabel: "Level 3", group: "USAG Development Program" },
  { value: "level-4", label: "Level 4 — states & regionals", shortLabel: "Level 4", group: "USAG Development Program" },
  { value: "level-5", label: "Level 5 — intermediate", shortLabel: "Level 5", group: "USAG Development Program" },
  { value: "level-6", label: "Level 6 — advanced intermediate", shortLabel: "Level 6", group: "USAG Development Program" },
  { value: "level-7", label: "Level 7 — advanced", shortLabel: "Level 7", group: "USAG Development Program" },
  { value: "level-8", label: "Level 8 — high-level junior/senior", shortLabel: "Level 8", group: "USAG Development Program" },
  { value: "level-9", label: "Level 9 — pre-elite", shortLabel: "Level 9", group: "USAG Elite Program" },
  { value: "level-10", label: "Level 10 — highest USAG level before elite", shortLabel: "Level 10", group: "USAG Elite Program" },
  { value: "elite", label: "Elite — national & international (FIG rules)", shortLabel: "Elite", group: "USAG Elite Program" },
];

export const EXPERIENCE_LEVEL_LABELS: Record<ExperienceLevel, string> = Object.fromEntries(
  EXPERIENCE_LEVEL_OPTIONS.map((opt) => [opt.value, opt.label])
) as Record<ExperienceLevel, string>;

export const EXPERIENCE_LEVEL_SHORT_LABELS: Record<ExperienceLevel, string> = Object.fromEntries(
  EXPERIENCE_LEVEL_OPTIONS.map((opt) => [opt.value, opt.shortLabel])
) as Record<ExperienceLevel, string>;
