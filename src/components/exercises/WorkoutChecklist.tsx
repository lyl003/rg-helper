"use client";

import PageHeader from "@/components/layout/PageHeader";
import RoutineSummary from "@/components/exercises/RoutineSummary";
import WorkoutSection from "@/components/exercises/WorkoutSection";
import ResetSessionButton from "@/components/exercises/ResetSessionButton";
import RoutineCalendar from "@/components/exercises/RoutineCalendar";
import { useWorkout } from "@/hooks/useWorkout";
import { useProfile } from "@/hooks/useProfile";
import { getRoutineForLevel } from "@/lib/content/routineTemplates";
import { formatMinutesRange, getRoutineLevel, isCompleted, isIncluded, sumEstimatedMinutes } from "@/lib/routine";
import { WORKOUT_CATEGORY_LABELS, WORKOUT_CATEGORY_ORDER } from "@/lib/categoryLabels";

export default function WorkoutChecklist() {
  const { catalog, itemState, toggleIncluded, toggleCompleted, resetSession, loading: workoutLoading } = useWorkout();
  const { profile, loading: profileLoading } = useProfile();

  if (workoutLoading || profileLoading) {
    return <p className="text-foreground/60">Loading your routine...</p>;
  }

  const level = getRoutineLevel(profile);
  const { template, isFallback } = getRoutineForLevel(level);

  const includedItems = catalog.filter((item) => isIncluded(item.id, itemState, template));
  const totalRange = sumEstimatedMinutes(includedItems);
  const doneCount = includedItems.filter((item) => isCompleted(item.id, itemState)).length;

  return (
    <>
      <PageHeader
        emoji="🏃"
        title="At-Home Workouts"
        subtitle="A routine you can do right at home, personalized to your level. Customize any section to make it yours."
      />

      <RoutineSummary
        level={level}
        isFallback={isFallback}
        totalMinutesLabel={formatMinutesRange(totalRange)}
        includedCount={includedItems.length}
        doneCount={doneCount}
      />

      <div className="mb-4 flex justify-end">
        <ResetSessionButton onReset={resetSession} />
      </div>

      {WORKOUT_CATEGORY_ORDER.map((category) => (
        <WorkoutSection
          key={category}
          label={WORKOUT_CATEGORY_LABELS[category]}
          items={catalog.filter((item) => item.category === category)}
          itemState={itemState}
          template={template}
          onToggleIncluded={toggleIncluded}
          onToggleCompleted={toggleCompleted}
        />
      ))}

      <RoutineCalendar />
    </>
  );
}
