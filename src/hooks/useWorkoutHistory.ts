"use client";

import { useSyncExternalStore } from "react";
import { workoutHistoryStore } from "@/hooks/workoutStores";

export function useWorkoutHistory() {
  const history = useSyncExternalStore(
    workoutHistoryStore.subscribe,
    workoutHistoryStore.getSnapshot,
    () => null
  );

  return { history: history ?? {}, loading: history === null };
}
