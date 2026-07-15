"use client";

import PageHeader from "@/components/layout/PageHeader";
import WorkoutItemRow from "@/components/exercises/WorkoutItemRow";
import ResetSessionButton from "@/components/exercises/ResetSessionButton";
import { useWorkout } from "@/hooks/useWorkout";

export default function WorkoutChecklist() {
  const { catalog, completion, toggleCompleted, resetSession, loading } = useWorkout();

  if (loading) {
    return <p className="text-foreground/60">Loading today&apos;s workout...</p>;
  }

  const warmups = catalog.filter((item) => item.category === "warmup");
  const stretches = catalog.filter((item) => item.category === "stretch");
  const doneCount = catalog.filter((item) => completion[item.id]?.completed).length;

  return (
    <>
      <PageHeader
        emoji="🏃"
        title="Today's Workout"
        subtitle={`Check off each activity as you go. ${doneCount} of ${catalog.length} done today.`}
      />

      <div className="mb-4 flex justify-end">
        <ResetSessionButton onReset={resetSession} />
      </div>

      <section>
        <h2 className="mb-3 text-lg font-bold">Warm-Up</h2>
        <div className="space-y-2">
          {warmups.map((item) => (
            <WorkoutItemRow
              key={item.id}
              item={item}
              completed={completion[item.id]?.completed ?? false}
              onToggle={(completed) => toggleCompleted(item.id, completed)}
            />
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-lg font-bold">Stretch</h2>
        <div className="space-y-2">
          {stretches.map((item) => (
            <WorkoutItemRow
              key={item.id}
              item={item}
              completed={completion[item.id]?.completed ?? false}
              onToggle={(completed) => toggleCompleted(item.id, completed)}
            />
          ))}
        </div>
      </section>
    </>
  );
}
