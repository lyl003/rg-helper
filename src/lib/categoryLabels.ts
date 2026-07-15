import { SkillCategory } from "@/lib/types";

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
