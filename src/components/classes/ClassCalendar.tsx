"use client";

import { useMemo, useState } from "react";
import { ClassJournalEntry } from "@/lib/types";
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

interface ClassCalendarProps {
  entries: Record<string, ClassJournalEntry>;
  selectedDateKey: string | null;
  onSelectDate: (dateKey: string | null) => void;
}

export default function ClassCalendar({ entries, selectedDateKey, onSelectDate }: ClassCalendarProps) {
  const [viewDate, setViewDate] = useState(() => new Date());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const weeks = useMemo(() => getMonthGrid(year, month), [year, month]);
  const monthLabel = viewDate.toLocaleDateString(undefined, { month: "long", year: "numeric" });

  const countByDate = useMemo(() => {
    const counts: Record<string, number> = {};
    Object.values(entries).forEach((entry) => {
      counts[entry.date] = (counts[entry.date] ?? 0) + 1;
    });
    return counts;
  }, [entries]);

  return (
    <section className="mb-6 rounded-2xl bg-card p-5 shadow-sm ring-1 ring-brand-purple/10">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold">Class Calendar</h2>
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
            const count = countByDate[key] ?? 0;
            const isToday = key === todayKey();
            const isSelected = key === selectedDateKey;
            return (
              <button
                key={key}
                onClick={() => onSelectDate(isSelected ? null : key)}
                className={`flex aspect-square flex-col items-center justify-center rounded-lg text-xs transition-colors ${
                  isSelected
                    ? "bg-brand-purple text-white"
                    : count > 0
                      ? "bg-brand-pink/20 hover:bg-brand-pink/30"
                      : "hover:bg-brand-purple/5"
                } ${isToday && !isSelected ? "ring-2 ring-brand-purple/40" : ""}`}
              >
                <span className="font-semibold">{date.getDate()}</span>
                {count > 0 && <span className="text-[10px]">📔 {count}</span>}
              </button>
            );
          })
        )}
      </div>
    </section>
  );
}
