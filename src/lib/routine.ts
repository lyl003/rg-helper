import { Profile, RoutineTemplate, WorkoutCatalogItem, WorkoutItemState } from "@/lib/types";

export function getRoutineLevel(profile: Profile | null) {
  return profile?.experienceLevel ?? "beginner";
}

/** An exercise is "included" if the user has an explicit override, else falls back to the level's default. */
export function isIncluded(
  itemId: string,
  itemState: Record<string, WorkoutItemState>,
  template: RoutineTemplate
): boolean {
  return itemState[itemId]?.included ?? template.itemIds.includes(itemId);
}

export function isCompleted(itemId: string, itemState: Record<string, WorkoutItemState>): boolean {
  return itemState[itemId]?.completed ?? false;
}

export function sumEstimatedMinutes(items: WorkoutCatalogItem[]): [number, number] {
  return items.reduce<[number, number]>(
    ([minAcc, maxAcc], item) => [minAcc + item.estimatedMinutes[0], maxAcc + item.estimatedMinutes[1]],
    [0, 0]
  );
}

export function formatMinutesRange([min, max]: [number, number]): string {
  return min === max ? `${min} min` : `${min}-${max} min`;
}
