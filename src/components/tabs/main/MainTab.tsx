import React from 'react';

import { Knob } from '../../ui/Knob';
import { useDFAMUnitStore } from '../../../units/dfam/DFAMUnitProvider';

export function MainTab() {
  const activePattern = useDFAMUnitStore((s) => s.sequencer.activePattern);
  const setActivePattern = useDFAMUnitStore((s) => s.setActivePattern);

  const synth = useDFAMUnitStore((s) => s.synth);
  const seq = useDFAMUnitStore((s) => s.sequencer);

  const pattern = activePattern === 'A' ? seq.patternA : seq.patternB;

  return (
    <div className="absolute inset-0 grid grid-cols-12 gap-0">
      {/* LEFT: SYNTH */}
      <div className="col-span-5 bg-zinc-900 border-r border-zinc-800 p-2 grid grid-rows-3 gap-1">
        {/* Row 1 VCO */}
        <div className="bg-zinc-800/30 rounded p-2 flex justify-around items-center border border-zinc-800 relative">
          <div className="text-[10px] -rotate-90 text-zinc-500 absolute left-1 font-bold">VCO</div>
          <Knob label="Freq 1" value={synth.vco1Freq} />
          <Knob label="Wave" value={synth.vco1Wave} size="sm" />
          <div className="w-px h-10 bg-zinc-700 mx-1" />
          <Knob label="Freq 2" value={synth.vco2Freq} />
          <Knob label="Wave" value={synth.vco2Wave} size="sm" />
          <div className="w-px h-10 bg-zinc-700 mx-1" />
          <Knob label="Noise" value={synth.noise} />
        </div>

        {/* Row 2 VCF */}
        <div className="bg-zinc-800/30 rounded p-2 flex justify-around items-center border border-zinc-800 relative">
          <div className="text-[10px] -rotate-90 text-zinc-500 absolute left-1 font-bold">VCF</div>
          <Knob label="Cutoff" value={synth.vcfCutoff} size="lg" color="orange" />
          <Knob label="Res" value={synth.vcfRes} />
          <Knob label="VCF Mod" value={synth.vcfMod} size="sm" />
          <Knob label="Noise" value={0} size="sm" />
        </div>

        {/* Row 3 ENV */}
        <div className="bg-zinc-800/30 rounded p-2 flex justify-around items-center border border-zinc-800 relative">
          <div className="text-[10px] -rotate-90 text-zinc-500 absolute left-1 font-bold">ENV</div>
          <Knob label="VCA D" value={synth.vcaDecay} />
          <Knob label="VCF D" value={synth.vcfDecay} />
          <Knob label="VCO D" value={synth.vcoDecay} />
          <div className="flex flex-col space-y-2 ml-2">
            <button className="text-[8px] bg-zinc-700 px-1 rounded text-zinc-300" type="button">
              RND
            </button>
            <button className="text-[8px] bg-zinc-700 px-1 rounded text-zinc-300" type="button">
              CLR
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT: SEQUENCER */}
      <div className="col-span-7 bg-zinc-900 p-2 flex flex-col space-y-2">
        {/* Controls */}
        <div className="h-16 flex items-center justify-between bg-zinc-800/50 rounded px-2 border border-zinc-700 shrink-0">
          <div className="flex items-center space-x-2 bg-zinc-950 p-1 rounded-lg border border-zinc-600">
            <button
              onClick={() => setActivePattern('A')}
              type="button"
              className={`px-3 py-1 text-[10px] font-bold rounded ${
                activePattern === 'A' ? 'bg-orange-600 text-white' : 'text-zinc-500'
              }`}
            >
              A
            </button>
            <button
              onClick={() => setActivePattern('B')}
              type="button"
              className={`px-3 py-1 text-[10px] font-bold rounded ${
                activePattern === 'B' ? 'bg-cyan-600 text-white' : 'text-zinc-500'
              }`}
            >
              B
            </button>
          </div>

          <div className="flex space-x-2 border-l border-zinc-700 pl-2">
            <Knob label="Cyc A" value={(seq.cycleA - 1) / 7} size="sm" color="orange" />
            <Knob label="Cyc B" value={(seq.cycleB - 1) / 7} size="sm" color="blue" />
          </div>

          <div className="flex space-x-2 border-l border-zinc-700 pl-2 bg-black/20 rounded pr-1">
            <Knob label="Groove" value={seq.modifiers.groove} size="sm" />
            <Knob label="Depth" value={seq.modifiers.depth} size="sm" />
          </div>
        </div>

        {/* Steps */}
        <div className="flex-1 grid grid-cols-8 gap-1 min-h-0">
          {Array.from({ length: 8 }, (_, i) => i).map((stepIndex) => (
            <div
              key={stepIndex}
              className="flex flex-col items-center justify-between bg-zinc-950/50 rounded border border-zinc-800 py-1"
            >
              <div
                className={`w-1.5 h-1.5 rounded-full mb-1 ${
                  stepIndex === 0 ? 'bg-orange-500 shadow-[0_0_5px_orange]' : 'bg-zinc-800'
                }`}
              />
              <Knob
                label=""
                value={pattern.pitch[stepIndex] ?? 0.5}
                size="sm"
                color={activePattern === 'A' ? 'orange' : 'blue'}
              />
              <div className="h-px w-full bg-zinc-800 my-1" />
              <Knob label={stepIndex + 1} value={pattern.velocity[stepIndex] ?? 0.5} size="sm" />
            </div>
          ))}
        </div>

        {/* Modifiers */}
        <div className="h-12 flex items-center space-x-2 bg-zinc-800/30 rounded px-2 shrink-0">
          <div className="text-[9px] text-zinc-500 font-bold w-8 leading-tight">MODS</div>
          <Knob label="Swap" value={seq.modifiers.swap} size="sm" />
          <Knob label="Break" value={seq.modifiers.breaker} size="sm" />
        </div>
      </div>
    </div>
  );
}

