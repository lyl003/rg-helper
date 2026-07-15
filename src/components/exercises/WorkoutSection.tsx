"use client";

import { useState } from "react";
import { RoutineTemplate, WorkoutCatalogItem, WorkoutItemState } from "@/lib/types";
import WorkoutItemRow from "@/components/exercises/WorkoutItemRow";
import RoutineCustomizeRow from "@/components/exercises/RoutineCustomizeRow";
import { formatMinutesRange, isCompleted, isIncluded, sumEstimatedMinutes } from "@/lib/routine";

interface WorkoutSectionProps {
  label: string;
  items: WorkoutCatalogItem[];
  itemState: Record<string, WorkoutItemState>;
  template: RoutineTemplate;
  onToggleIncluded: (itemId: string, included: boolean) => void;
  onToggleCompleted: (itemId: string, completed: boolean) => void;
}

function groupBySubgroup(items: WorkoutCatalogItem[]) {
  const groups: Array<{ subgroup: string | null; items: WorkoutCatalogItem[] }> = [];
  for (const item of items) {
    const key = item.subgroup ?? null;
    let group = groups.find((g) => g.subgroup === key);
    if (!group) {
      group = { subgroup: key, items: [] };
      groups.push(group);
    }
    group.items.push(item);
  }
  return groups;
}

export default function WorkoutSection({
  label,
  items,
  itemState,
  template,
  onToggleIncluded,
  onToggleCompleted,
}: WorkoutSectionProps) {
  const [customizing, setCustomizing] = useState(false);

  const includedItems = items.filter((item) => isIncluded(item.id, itemState, template));
  const subtotal = sumEstimatedMinutes(includedItems);
  const doneCount = includedItems.filter((item) => isCompleted(item.id, itemState)).length;

  return (
    <section className="mb-6">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-lg font-bold">{label}</h2>
        <span className="text-sm text-foreground/50">
          {includedItems.length > 0
            ? `${doneCount}/${includedItems.length} · ${formatMinutesRange(subtotal)}`
            : "None selected"}
        </span>
      </div>

      {includedItems.length === 0 ? (
        <p className="mb-2 rounded-xl bg-card p-3 text-sm text-foreground/50">
          No exercises selected for this section yet — customize below to add some.
        </p>
      ) : (
        groupBySubgroup(includedItems).map((group) => (
          <div key={group.subgroup ?? "_"} className="mb-3 last:mb-0">
            {group.subgroup && (
              <h3 className="mb-1.5 text-xs font-bold uppercase tracking-wide text-foreground/40">
                {group.subgroup}
              </h3>
            )}
            <div className="space-y-2">
              {group.items.map((item) => (
                <WorkoutItemRow
                  key={item.id}
                  item={item}
                  completed={isCompleted(item.id, itemState)}
                  onToggle={(completed) => onToggleCompleted(item.id, completed)}
                  onRemove={() => onToggleIncluded(item.id, false)}
                />
              ))}
            </div>
          </div>
        ))
      )}

      <button
        onClick={() => setCustomizing((c) => !c)}
        className="mt-2 text-sm font-semibold text-brand-purple hover:underline"
      >
        {customizing ? "Done customizing" : "+ Customize this section"}
      </button>

      {customizing && (
        <div className="mt-2 rounded-xl bg-brand-purple/5 p-2">
          {groupBySubgroup(items).map((group) => (
            <div key={group.subgroup ?? "_"} className="mb-2 last:mb-0">
              {group.subgroup && (
                <h3 className="mb-1 px-2.5 text-xs font-bold uppercase tracking-wide text-foreground/40">
                  {group.subgroup}
                </h3>
              )}
              <div className="space-y-1">
                {group.items.map((item) => (
                  <RoutineCustomizeRow
                    key={item.id}
                    item={item}
                    included={isIncluded(item.id, itemState, template)}
                    onToggle={(included) => onToggleIncluded(item.id, included)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
