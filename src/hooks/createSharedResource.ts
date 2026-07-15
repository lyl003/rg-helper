"use client";

/**
 * Multiple components on the same page (e.g. SkillsLibrary + BadgeShelf)
 * each call the same resource hook. Plain useState+useEffect per call site
 * means writes made through one instance never reach the others' rendered
 * snapshot until a full remount. This wraps a resource in a module-level
 * store so every hook instance reads/writes the same in-memory snapshot,
 * kept in sync with `dataStore` (still the only thing that persists data).
 */
export function createSharedResource<T>(loader: () => Promise<T>, initial: T) {
  let state: T = initial;
  let loadStarted = false;
  const listeners = new Set<() => void>();

  function notify() {
    listeners.forEach((listener) => listener());
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    if (!loadStarted) {
      loadStarted = true;
      loader().then((data) => {
        state = data;
        notify();
      });
    }
    return () => listeners.delete(listener);
  }

  function getSnapshot() {
    return state;
  }

  function setState(updater: (prev: T) => T) {
    state = updater(state);
    notify();
  }

  return { subscribe, getSnapshot, setState };
}
