import { createStore } from 'zustand/vanilla';

import type { DFAMUnitState, PatternId } from './dfamUnitTypes';

export type DFAMUnitActions = {
  setActivePattern: (pattern: PatternId) => void;
  setSynthParam: (key: keyof DFAMUnitState['synth'], value: number) => void;
  setCycleA: (cycle: number) => void;
  setCycleB: (cycle: number) => void;
  setModifier: (key: keyof DFAMUnitState['sequencer']['modifiers'], value: number) => void;
  setStep: (pattern: PatternId, row: 'pitch' | 'velocity', stepIndex: number, value: number) => void;
};

export type DFAMUnitStore = ReturnType<typeof createDFAMUnitStore>;

export function createDFAMUnitInitialState(): DFAMUnitState {
  const steps = 8;
  const mk = () => Array.from({ length: steps }, () => 0.5);

  return {
    synth: {
      vco1Freq: 0.5,
      vco1Wave: 0.2,
      vco2Freq: 0.75,
      vco2Wave: 0.8,
      noise: 0.3,
      vcfCutoff: 0.45,
      vcfRes: 0.6,
      vcfMod: 0.2,
      vcaDecay: 0.5,
      vcfDecay: 0.3,
      vcoDecay: 0.1,
    },
    sequencer: {
      activePattern: 'A',
      cycleA: 3,
      cycleB: 1,
      patternA: { pitch: mk(), velocity: mk() },
      patternB: { pitch: mk(), velocity: mk() },
      modifiers: {
        groove: 0.4,
        depth: 0.2,
        swap: 0.0,
        breaker: 0.0,
      },
    },
  };
}

/**
 * Per-unit store factory (NOT a singleton).
 * Future dual-unit: create one store per DFAM unit and mount them in parallel.
 */
export function createDFAMUnitStore(initial?: Partial<DFAMUnitState>) {
  const base = createDFAMUnitInitialState();
  const startingState: DFAMUnitState = {
    ...base,
    ...initial,
    synth: { ...base.synth, ...(initial?.synth ?? {}) },
    sequencer: {
      ...base.sequencer,
      ...(initial?.sequencer ?? {}),
      modifiers: { ...base.sequencer.modifiers, ...(initial?.sequencer?.modifiers ?? {}) },
      patternA: { ...base.sequencer.patternA, ...(initial?.sequencer?.patternA ?? {}) },
      patternB: { ...base.sequencer.patternB, ...(initial?.sequencer?.patternB ?? {}) },
    },
  };

  return createStore<DFAMUnitState & DFAMUnitActions>()((set, get) => ({
    ...startingState,
    setActivePattern: (activePattern) => set((s) => ({ ...s, sequencer: { ...s.sequencer, activePattern } })),
    setSynthParam: (key, value) =>
      set((s) => ({ ...s, synth: { ...s.synth, [key]: clamp01(value) } })),
    setCycleA: (cycleA) =>
      set((s) => ({ ...s, sequencer: { ...s.sequencer, cycleA: clampInt(cycleA, 1, 8) } })),
    setCycleB: (cycleB) =>
      set((s) => ({ ...s, sequencer: { ...s.sequencer, cycleB: clampInt(cycleB, 1, 8) } })),
    setModifier: (key, value) =>
      set((s) => ({
        ...s,
        sequencer: { ...s.sequencer, modifiers: { ...s.sequencer.modifiers, [key]: clamp01(value) } },
      })),
    setStep: (pattern, row, stepIndex, value) => {
      const idx = clampInt(stepIndex, 0, 7);
      const v = clamp01(value);
      const state = get();
      const key = pattern === 'A' ? 'patternA' : 'patternB';
      const oldPattern = state.sequencer[key];
      const nextRow = [...oldPattern[row]];
      nextRow[idx] = v;
      set((s) => ({
        ...s,
        sequencer: {
          ...s.sequencer,
          [key]: { ...s.sequencer[key], [row]: nextRow },
        },
      }));
    },
  }));
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}
function clampInt(n: number, min: number, max: number) {
  const v = Math.round(n);
  return Math.min(max, Math.max(min, v));
}

