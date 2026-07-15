"use client";

import { useCallback, useSyncExternalStore } from "react";
import { dataStore } from "@/lib/data";
import { WORKOUT_CATALOG } from "@/lib/content/workoutCatalog";
import { todayKey } from "@/lib/date";
import { workoutHistoryStore, workoutStateStore } from "@/hooks/workoutStores";

export function useWorkout() {
  const itemState = useSyncExternalStore(
    workoutStateStore.subscribe,
    workoutStateStore.getSnapshot,
    () => null
  );
  const loading = itemState === null;

  const toggleIncluded = useCallback(async (itemId: string, included: boolean) => {
    await dataStore.saveWorkoutItemIncluded(itemId, included);
    workoutStateStore.setState((prev) => ({
      ...(prev ?? {}),
      [itemId]: {
        itemId,
        included,
        completed: prev?.[itemId]?.completed ?? false,
        completedAt: prev?.[itemId]?.completedAt ?? null,
      },
    }));
  }, []);

  const toggleCompleted = useCallback(async (itemId: string, completed: boolean) => {
    await dataStore.saveWorkoutItemCompleted(itemId, completed);
    workoutStateStore.setState((prev) => ({
      ...(prev ?? {}),
      [itemId]: {
        itemId,
        included: prev?.[itemId]?.included ?? true,
        completed,
        completedAt: completed ? new Date().toISOString() : null,
      },
    }));

    // Mirror the same history write localStorageStore performs, so the
    // calendar (a separate shared store) reflects it without a refetch.
    const key = todayKey();
    workoutHistoryStore.setState((prev) => {
      const history = { ...(prev ?? {}) };
      const idSet = new Set(history[key]?.completedItemIds ?? []);
      if (completed) idSet.add(itemId);
      else idSet.delete(itemId);
      if (idSet.size > 0) history[key] = { date: key, completedItemIds: Array.from(idSet) };
      else delete history[key];
      return history;
    });
  }, []);

  const resetSession = useCallback(async () => {
    await dataStore.resetWorkoutSession();
    workoutStateStore.setState((prev) =>
      Object.fromEntries(
        Object.entries(prev ?? {}).map(([id, state]) => [id, { ...state, completed: false, completedAt: null }])
      )
    );
  }, []);

  return {
    catalog: WORKOUT_CATALOG,
    itemState: itemState ?? {},
    toggleIncluded,
    toggleCompleted,
    resetSession,
    loading,
  };
}
