"use client";

import { useCallback, useSyncExternalStore } from "react";
import { dataStore } from "@/lib/data";
import { ClassJournalEntry } from "@/lib/types";
import { createSharedResource } from "@/hooks/createSharedResource";

const classEntriesStore = createSharedResource<Record<string, ClassJournalEntry> | null>(
  () => dataStore.getClassEntries(),
  null
);

export function useClassJournal() {
  const entries = useSyncExternalStore(
    classEntriesStore.subscribe,
    classEntriesStore.getSnapshot,
    () => null
  );
  const loading = entries === null;

  const saveEntry = useCallback(async (entry: ClassJournalEntry) => {
    await dataStore.saveClassEntry(entry);
    classEntriesStore.setState((prev) => ({ ...(prev ?? {}), [entry.id]: entry }));
  }, []);

  const deleteEntry = useCallback(async (id: string) => {
    await dataStore.deleteClassEntry(id);
    classEntriesStore.setState((prev) => {
      const next = { ...(prev ?? {}) };
      delete next[id];
      return next;
    });
  }, []);

  return { entries: entries ?? {}, saveEntry, deleteEntry, loading };
}
