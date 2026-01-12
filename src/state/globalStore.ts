import { create } from 'zustand';

export type AppTab = 'MAIN' | 'MATRIX' | 'METRO' | 'LIB';

type GlobalState = {
  bpm: number;
  isPlaying: boolean;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  setBpm: (bpm: number) => void;
  play: () => void;
  stop: () => void;
};

/**
 * Global state (shared across units).
 * Future dual-unit plan: keep unit-local state out of this store.
 */
export const useGlobalStore = create<GlobalState>((set) => ({
  bpm: 120.0,
  isPlaying: false,
  activeTab: 'MAIN',
  setActiveTab: (activeTab) => set({ activeTab }),
  setBpm: (bpm) => set({ bpm }),
  play: () => set({ isPlaying: true }),
  stop: () => set({ isPlaying: false }),
}));

