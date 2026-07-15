"use client";

import { useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import ClassEntryForm from "@/components/classes/ClassEntryForm";
import ClassCalendar from "@/components/classes/ClassCalendar";
import ClassEntryCard from "@/components/classes/ClassEntryCard";
import { useClassJournal } from "@/hooks/useClassJournal";
import { ClassJournalEntry } from "@/lib/types";
import { todayKey } from "@/lib/date";

export default function ClassesView() {
  const { entries, saveEntry, deleteEntry, loading } = useClassJournal();
  const [formOpen, setFormOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<ClassJournalEntry | undefined>(undefined);
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(todayKey());

  if (loading) {
    return <p className="text-foreground/60">Loading your class journal...</p>;
  }

  const entryList = Object.values(entries).sort((a, b) => b.date.localeCompare(a.date));
  const selectedEntries = selectedDateKey ? entryList.filter((entry) => entry.date === selectedDateKey) : [];

  const handleSave = async (entry: ClassJournalEntry) => {
    await saveEntry(entry);
    setFormOpen(false);
    setEditingEntry(undefined);
    setSelectedDateKey(entry.date);
  };

  return (
    <>
      <PageHeader
        emoji="📔"
        title="My Classes"
        subtitle="A journal for your RG classes — log what you worked on each time."
      />

      {!formOpen ? (
        <button
          type="button"
          onClick={() => {
            setEditingEntry(undefined);
            setFormOpen(true);
          }}
          className="mb-6 w-full rounded-2xl bg-brand-purple px-5 py-3 text-center font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
        >
          + Add a new class entry
        </button>
      ) : (
        <div className="mb-6">
          <ClassEntryForm
            initialEntry={editingEntry}
            onSave={handleSave}
            onCancel={() => {
              setFormOpen(false);
              setEditingEntry(undefined);
            }}
          />
        </div>
      )}

      <ClassCalendar entries={entries} selectedDateKey={selectedDateKey} onSelectDate={setSelectedDateKey} />

      {selectedDateKey && (
        <section>
          <h2 className="mb-3 text-lg font-bold">
            {new Date(`${selectedDateKey}T00:00:00`).toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </h2>
          {selectedEntries.length > 0 ? (
            <div className="space-y-3">
              {selectedEntries.map((entry) => (
                <ClassEntryCard
                  key={entry.id}
                  entry={entry}
                  onEdit={() => {
                    setEditingEntry(entry);
                    setFormOpen(true);
                  }}
                  onDelete={() => deleteEntry(entry.id)}
                />
              ))}
            </div>
          ) : (
            <p className="rounded-xl bg-card p-4 text-sm text-foreground/50">No class logged this day yet.</p>
          )}
        </section>
      )}
    </>
  );
}
