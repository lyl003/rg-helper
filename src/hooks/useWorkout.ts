"use client";

import { useCallback, useSyncExternalStore } from "react";
import { dataStore } from "@/lib/data";
import { WORKOUT_CATALOG } from "@/lib/content/workoutCatalog";
import { WorkoutCompletionEntry } from "@/lib/types";
import { createSharedResource } from "@/hooks/createSharedResource";

const workoutStore = createSharedResource<Record<string, WorkoutCompletionEntry> | null>(
  () => dataStore.getWorkoutCompletion(),
  null
);

export function useWorkout() {
  const completion = useSyncExternalStore(
    workoutStore.subscribe,
    workoutStore.getSnapshot,
    () => null
  );
  const loading = completion === null;

  const toggleCompleted = useCallback(async (itemId: string, completed: boolean) => {
    await dataStore.saveWorkoutCompletion(itemId, completed);
    workoutStore.setState((prev) => ({
      ...(prev ?? {}),
      [itemId]: { itemId, completed, completedAt: completed ? new Date().toISOString() : null },
    }));
  }, []);

  const resetSession = useCallback(async () => {
    await dataStore.resetWorkoutSession();
    workoutStore.setState(() => ({}));
  }, []);

  return { catalog: WORKOUT_CATALOG, completion: completion ?? {}, toggleCompleted, resetSession, loading };
}
