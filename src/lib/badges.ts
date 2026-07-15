import { BadgeDefinition, EarnedBadge, SkillCatalogItem, SkillCategory, SkillProgressEntry } from "@/lib/types";

interface BadgeContext {
  catalog: SkillCatalogItem[];
  progress: Record<string, SkillProgressEntry>;
}

function learnedIds(ctx: BadgeContext): Set<string> {
  return new Set(
    ctx.catalog
      .map((skill) => skill.id)
      .filter((id) => ctx.progress[id]?.learned)
  );
}

function idsInCategory(ctx: BadgeContext, category: SkillCategory): string[] {
  return ctx.catalog.filter((skill) => skill.category === category).map((skill) => skill.id);
}

function learnedCountInCategory(ctx: BadgeContext, category: SkillCategory): number {
  const learned = learnedIds(ctx);
  return idsInCategory(ctx, category).filter((id) => learned.has(id)).length;
}

function allInCategoryLearned(ctx: BadgeContext, category: SkillCategory): boolean {
  const ids = idsInCategory(ctx, category);
  if (ids.length === 0) return false;
  const learned = learnedIds(ctx);
  return ids.every((id) => learned.has(id));
}

const ALL_CATEGORIES: SkillCategory[] = [
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

const BADGE_RULES: Array<BadgeDefinition & { isEarned: (ctx: BadgeContext) => boolean }> = [
  {
    id: "first-skill",
    name: "First Steps",
    emoji: "⭐",
    description: "Learn your very first skill.",
    isEarned: (ctx) => learnedIds(ctx).size >= 1,
  },
  {
    id: "five-skills",
    name: "5 Skills Learned",
    emoji: "🌟",
    description: "Learn 5 skills total.",
    isEarned: (ctx) => learnedIds(ctx).size >= 5,
  },
  {
    id: "ten-skills",
    name: "10 Skills Learned",
    emoji: "💫",
    description: "Learn 10 skills total.",
    isEarned: (ctx) => learnedIds(ctx).size >= 10,
  },
  {
    id: "flexibility-star",
    name: "Flexibility Star",
    emoji: "🤸",
    description: "Learn every flexibility skill.",
    isEarned: (ctx) => allInCategoryLearned(ctx, "flexibility"),
  },
  {
    id: "first-hoop",
    name: "First Hoop Skill",
    emoji: "⭕",
    description: "Learn your first hoop skill.",
    isEarned: (ctx) => learnedCountInCategory(ctx, "apparatus-hoop") >= 1,
  },
  {
    id: "jump-star",
    name: "Jump Star",
    emoji: "🦋",
    description: "Learn every leap and jump skill.",
    isEarned: (ctx) => allInCategoryLearned(ctx, "leaps"),
  },
  {
    id: "steady-star",
    name: "Steady as a Star",
    emoji: "🧘",
    description: "Learn every balance skill.",
    isEarned: (ctx) => allInCategoryLearned(ctx, "balances"),
  },
  {
    id: "all-rounder",
    name: "All-Rounder",
    emoji: "🏅",
    description: "Learn at least one skill in every category.",
    isEarned: (ctx) => ALL_CATEGORIES.every((category) => learnedCountInCategory(ctx, category) >= 1),
  },
];

export function computeEarnedBadges(
  catalog: SkillCatalogItem[],
  progress: Record<string, SkillProgressEntry>
): EarnedBadge[] {
  const ctx: BadgeContext = { catalog, progress };
  return BADGE_RULES.map(({ isEarned, ...definition }) => ({
    ...definition,
    earned: isEarned(ctx),
  }));
}
