import { dataStore } from "@/lib/data";
import { WorkoutHistoryDay, WorkoutItemState } from "@/lib/types";
import { createSharedResource } from "@/hooks/createSharedResource";

// Shared module-level stores so useWorkout (writes) and useWorkoutHistory
// (reads, e.g. the calendar) stay in sync on the same page without a refetch.
export const workoutStateStore = createSharedResource<Record<string, WorkoutItemState> | null>(
  () => dataStore.getWorkoutState(),
  null
);

export const workoutHistoryStore = createSharedResource<Record<string, WorkoutHistoryDay> | null>(
  () => dataStore.getWorkoutHistory(),
  null
);
