import { localStorageStore } from "@/lib/data/localStorageStore";
import { DataStore } from "@/lib/data/types";

// v1: local-only, faked account, persisted to localStorage.
// v2: swap this one line for a real API-backed implementation of DataStore.
export const dataStore: DataStore = localStorageStore;
