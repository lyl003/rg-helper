"use client";

import { useMemo, useState } from "react";
import { useWorkoutHistory } from "@/hooks/useWorkoutHistory";
import { WORKOUT_CATALOG } from "@/lib/content/workoutCatalog";
import { toDateKey, todayKey } from "@/lib/date";

const WEEKDAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

function getMonthGrid(year: number, month: number): Array<Date | null>[] {
  const startWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: Array<Date | null> = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: Array<Date | null>[] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export default function RoutineCalendar() {
  const { history, loading } = useWorkoutHistory();
  const [viewDate, setViewDate] = useState(() => new Date());
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const weeks = useMemo(() => getMonthGrid(year, month), [year, month]);
  const monthLabel = viewDate.toLocaleDateString(undefined, { month: "long", year: "numeric" });

  if (loading) return null;

  const selectedDay = selectedDateKey ? history[selectedDateKey] : undefined;
  const selectedItems = selectedDay
    ? WORKOUT_CATALOG.filter((item) => selectedDay.completedItemIds.includes(item.id))
    : [];

  return (
    <section className="mb-6 rounded-2xl bg-card p-5 shadow-sm ring-1 ring-brand-purple/10">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold">Workout Calendar</h2>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setViewDate(new Date(year, month - 1, 1))}
            aria-label="Previous month"
            className="rounded-full px-2 py-1 text-sm text-foreground/60 hover:bg-brand-purple/10"
          >
            ←
          </button>
          <span className="w-32 text-center text-sm font-semibold">{monthLabel}</span>
          <button
            onClick={() => setViewDate(new Date(year, month + 1, 1))}
            aria-label="Next month"
            className="rounded-full px-2 py-1 text-sm text-foreground/60 hover:bg-brand-purple/10"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs text-foreground/40">
        {WEEKDAY_LABELS.map((label, i) => (
          <div key={i} className="py-1">
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weeks.flatMap((week, wi) =>
          week.map((date, di) => {
            if (!date) return <div key={`${wi}-${di}`} />;
            const key = toDateKey(date);
            const count = history[key]?.completedItemIds.length ?? 0;
            const isToday = key === todayKey();
            const isSelected = key === selectedDateKey;
            return (
              <button
                key={key}
                onClick={() => setSelectedDateKey(isSelected ? null : key)}
                className={`flex aspect-square flex-col items-center justify-center rounded-lg text-xs transition-colors ${
                  isSelected
                    ? "bg-brand-purple text-white"
                    : count > 0
                      ? "bg-brand-teal/20 hover:bg-brand-teal/30"
                      : "hover:bg-brand-purple/5"
                } ${isToday && !isSelected ? "ring-2 ring-brand-purple/40" : ""}`}
              >
                <span className="font-semibold">{date.getDate()}</span>
                {count > 0 && <span className="text-[10px]">{count} 💪</span>}
              </button>
            );
          })
        )}
      </div>

      {selectedDateKey && (
        <div className="mt-4 rounded-xl bg-brand-purple/5 p-3">
          <p className="mb-2 text-sm font-semibold">
            {new Date(`${selectedDateKey}T00:00:00`).toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
          {selectedItems.length > 0 ? (
            <ul className="space-y-1 text-sm text-foreground/70">
              {selectedItems.map((item) => (
                <li key={item.id}>✅ {item.name}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-foreground/50">No exercises logged this day.</p>
          )}
        </div>
      )}
    </section>
  );
}
