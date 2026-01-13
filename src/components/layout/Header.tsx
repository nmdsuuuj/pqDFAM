import React from 'react';
import { Play, Square } from 'lucide-react';

import { useGlobalStore, type AppTab } from '../../state/globalStore';

const TABS: AppTab[] = ['MAIN', 'MATRIX', 'METRO', 'LIB'];

export function Header() {
  const activeTab = useGlobalStore((s) => s.activeTab);
  const setActiveTab = useGlobalStore((s) => s.setActiveTab);
  const bpm = useGlobalStore((s) => s.bpm);
  const isPlaying = useGlobalStore((s) => s.isPlaying);
  const play = useGlobalStore((s) => s.play);
  const stop = useGlobalStore((s) => s.stop);

  return (
    <header className="h-12 flex items-center justify-between px-4 bg-zinc-950 border-b border-zinc-800 shrink-0">
      <div className="flex items-center space-x-4">
        <div className="text-orange-500 font-black tracking-widest text-lg">DFAM PRO</div>
        <div className="flex space-x-2 bg-zinc-800 rounded p-1">
          <button
            className={`p-1 hover:text-green-400 ${isPlaying ? 'text-green-400' : ''}`}
            onClick={play}
            aria-label="Play"
            type="button"
          >
            <Play size={18} />
          </button>
          <button className="p-1 hover:text-red-400" onClick={stop} aria-label="Stop" type="button">
            <Square size={18} />
          </button>
        </div>
        <div className="text-xs font-mono bg-black px-2 py-1 rounded text-orange-400 border border-zinc-700">
          BPM {bpm.toFixed(1)}
        </div>
      </div>

      <div className="flex space-x-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            type="button"
            className={`px-3 py-1 text-xs font-bold rounded-t border-t-2 ${
              activeTab === tab
                ? 'bg-zinc-800 text-orange-400 border-orange-500'
                : 'bg-zinc-950 text-zinc-600 border-transparent hover:text-zinc-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </header>
  );
}

