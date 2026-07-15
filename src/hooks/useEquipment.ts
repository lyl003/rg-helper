"use client";

import { useCallback, useSyncExternalStore } from "react";
import { dataStore } from "@/lib/data";
import { EQUIPMENT_CATALOG } from "@/lib/content/equipmentCatalog";
import { EquipmentOwnershipEntry } from "@/lib/types";
import { createSharedResource } from "@/hooks/createSharedResource";

const equipmentStore = createSharedResource<Record<string, EquipmentOwnershipEntry> | null>(
  () => dataStore.getEquipmentOwnership(),
  null
);

export function useEquipment() {
  const ownership = useSyncExternalStore(
    equipmentStore.subscribe,
    equipmentStore.getSnapshot,
    () => null
  );
  const loading = ownership === null;

  const toggleOwned = useCallback(async (itemId: string, owned: boolean) => {
    await dataStore.saveEquipmentStatus(itemId, owned);
    equipmentStore.setState((prev) => ({
      ...(prev ?? {}),
      [itemId]: { itemId, owned, updatedAt: new Date().toISOString() },
    }));
  }, []);

  return { catalog: EQUIPMENT_CATALOG, ownership: ownership ?? {}, toggleOwned, loading };
}
