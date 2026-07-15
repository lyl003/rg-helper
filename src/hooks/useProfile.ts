"use client";

import { useCallback, useSyncExternalStore } from "react";
import { dataStore } from "@/lib/data";
import { Profile } from "@/lib/types";
import { createSharedResource } from "@/hooks/createSharedResource";

const profileStore = createSharedResource<Profile | null | undefined>(
  () => dataStore.getProfile(),
  undefined
);

export function useProfile() {
  const profile = useSyncExternalStore(
    profileStore.subscribe,
    profileStore.getSnapshot,
    () => undefined
  );
  const loading = profile === undefined;

  const saveProfile = useCallback(async (next: Profile) => {
    await dataStore.saveProfile(next);
    profileStore.setState(() => next);
  }, []);

  return { profile: profile ?? null, saveProfile, loading };
}
