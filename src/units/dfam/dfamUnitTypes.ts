export type PatternId = 'A' | 'B';

export type DFAMSequencerPattern = {
  pitch: number[]; // 8 steps, 0..1 (UI placeholder)
  velocity: number[]; // 8 steps, 0..1 (UI placeholder)
};

export type DFAMUnitState = {
  // UI Phase-1 placeholder values; later these map to audio engine params.
  synth: {
    vco1Freq: number; // 0..1
    vco1Wave: number; // 0..1
    vco2Freq: number; // 0..1
    vco2Wave: number; // 0..1
    noise: number; // 0..1
    vcfCutoff: number; // 0..1
    vcfRes: number; // 0..1
    vcfMod: number; // 0..1
    vcaDecay: number; // 0..1
    vcfDecay: number; // 0..1
    vcoDecay: number; // 0..1
  };
  sequencer: {
    activePattern: PatternId;
    cycleA: number; // 1..8
    cycleB: number; // 1..8
    patternA: DFAMSequencerPattern;
    patternB: DFAMSequencerPattern;
    modifiers: {
      groove: number; // 0..1
      depth: number; // 0..1
      swap: number; // 0..1 (placeholder)
      breaker: number; // 0..1 (placeholder)
    };
  };
};

