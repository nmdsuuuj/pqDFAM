import React, { createContext, useContext } from 'react';
import { useStore } from 'zustand';
import type { StoreApi } from 'zustand/vanilla';

import type { DFAMUnitActions } from './createDFAMUnitStore';
import type { DFAMUnitState } from './dfamUnitTypes';

export type DFAMUnitStoreApi = StoreApi<DFAMUnitState & DFAMUnitActions>;

const DFAMUnitStoreContext = createContext<DFAMUnitStoreApi | null>(null);

export function DFAMUnitProvider({
  store,
  children,
}: {
  store: DFAMUnitStoreApi;
  children: React.ReactNode;
}) {
  return <DFAMUnitStoreContext.Provider value={store}>{children}</DFAMUnitStoreContext.Provider>;
}

/**
 * Hook bound to the nearest DFAMUnitProvider.
 * This is what makes the unit state "cloneable" (one provider per unit instance).
 */
export function useDFAMUnitStore<T>(selector: (state: DFAMUnitState & DFAMUnitActions) => T): T {
  const store = useContext(DFAMUnitStoreContext);
  if (!store) {
    throw new Error('useDFAMUnitStore must be used within DFAMUnitProvider');
  }
  return useStore(store, selector);
}

