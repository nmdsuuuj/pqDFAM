import React, { useState } from 'react';
import { Play, Square, Settings } from 'lucide-react';

// 簡易コンポーネント: ノブ
const Knob = ({ label, value, color = 'white', size = 'md' }: any) => {
  const sizeClass = size === 'sm' ? 'w-10 h-10' : size === 'lg' ? 'w-20 h-20' : 'w-14 h-14';
  const angle = (value / 100) * 270 - 135;
  const knobColor = color === 'orange' ? 'stroke-orange-500' : color === 'blue' ? 'stroke-cyan-400' : 'stroke-zinc-200';
  
  return (
    <div className="flex flex-col items-center justify-center space-y-1 select-none touch-none">
      <div className={`relative ${sizeClass} bg-zinc-800 rounded-full shadow-lg border border-zinc-700`}>
        <svg viewBox="0 0 100 100" className="w-full h-full transform rotate-0">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#333" strokeWidth="8" strokeDasharray="75 25" transform="rotate(135 50 50)" />
          <line x1="50" y1="50" x2="50" y2="10" className={`${knobColor} stroke-[8px]`} strokeLinecap="round" style={{ transform: `rotate(${angle}deg)`, transformOrigin: 'center' }} />
        </svg>
      </div>
      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter text-center leading-none">{label}</span>
    </div>
  );
};

function App() {
  const [activeTab, setActiveTab] = useState<'MAIN' | 'MATRIX' | 'METRO' | 'LIB'>('MAIN');
  const [activePattern, setActivePattern] = useState<'A' | 'B'>('A');

  return (
    <div className="w-full h-screen bg-zinc-900 text-zinc-200 overflow-hidden flex flex-col font-sans">
      {/* HEADER */}
      <header className="h-12 flex items-center justify-between px-4 bg-zinc-950 border-b border-zinc-800 shrink-0">
        <div className="flex items-center space-x-4">
          <div className="text-orange-500 font-black tracking-widest text-lg">DFAM PRO</div>
          <div className="flex space-x-2 bg-zinc-800 rounded p-1">
            <button className="p-1 hover:text-green-400"><Play size={18} /></button>
            <button className="p-1 hover:text-red-400"><Square size={18} /></button>
          </div>
          <div className="text-xs font-mono bg-black px-2 py-1 rounded text-orange-400 border border-zinc-700">BPM 120.0</div>
        </div>
        <div className="flex space-x-1">
          {['MAIN', 'MATRIX', 'METRO', 'LIB'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-3 py-1 text-xs font-bold rounded-t border-t-2 ${activeTab === tab ? 'bg-zinc-800 text-orange-400 border-orange-500' : 'bg-zinc-950 text-zinc-600 border-transparent hover:text-zinc-400'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 relative">
        {activeTab === 'MAIN' && (
          <div className="absolute inset-0 grid grid-cols-12 gap-0">
            {/* LEFT: SYNTH */}
            <div className="col-span-5 bg-zinc-900 border-r border-zinc-800 p-2 grid grid-rows-3 gap-1">
              {/* Row 1 VCO */}
              <div className="bg-zinc-800/30 rounded p-2 flex justify-around items-center border border-zinc-800 relative">
                 <div className="text-[10px] -rotate-90 text-zinc-500 absolute left-1 font-bold">VCO</div>
                 <Knob label="Freq 1" value={50} />
                 <Knob label="Wave" value={20} size="sm" />
                 <div className="w-px h-10 bg-zinc-700 mx-1"></div>
                 <Knob label="Freq 2" value={75} />
                 <Knob label="Wave" value={80} size="sm" />
                 <div className="w-px h-10 bg-zinc-700 mx-1"></div>
                 <Knob label="Noise" value={30} />
              </div>
              {/* Row 2 VCF */}
              <div className="bg-zinc-800/30 rounded p-2 flex justify-around items-center border border-zinc-800 relative">
                 <div className="text-[10px] -rotate-90 text-zinc-500 absolute left-1 font-bold">VCF</div>
                 <Knob label="Cutoff" value={45} size="lg" color="orange" />
                 <Knob label="Res" value={60} />
                 <Knob label="VCF Mod" value={20} size="sm" />
                 <Knob label="Noise" value={0} size="sm" />
              </div>
              {/* Row 3 ENV */}
              <div className="bg-zinc-800/30 rounded p-2 flex justify-around items-center border border-zinc-800 relative">
                 <div className="text-[10px] -rotate-90 text-zinc-500 absolute left-1 font-bold">ENV</div>
                 <Knob label="VCA D" value={50} />
                 <Knob label="VCF D" value={30} />
                 <Knob label="VCO D" value={10} />
                 <div className="flex flex-col space-y-2 ml-2">
                    <button className="text-[8px] bg-zinc-700 px-1 rounded text-zinc-300">RND</button>
                    <button className="text-[8px] bg-zinc-700 px-1 rounded text-zinc-300">CLR</button>
                 </div>
              </div>
            </div>

            {/* RIGHT: SEQUENCER */}
            <div className="col-span-7 bg-zinc-900 p-2 flex flex-col space-y-2">
              {/* Controls */}
              <div className="h-16 flex items-center justify-between bg-zinc-800/50 rounded px-2 border border-zinc-700 shrink-0">
                <div className="flex items-center space-x-2 bg-zinc-950 p-1 rounded-lg border border-zinc-600">
                   <button onClick={() => setActivePattern('A')} className={`px-3 py-1 text-[10px] font-bold rounded ${activePattern === 'A' ? 'bg-orange-600 text-white' : 'text-zinc-500'}`}>A</button>
                   <button onClick={() => setActivePattern('B')} className={`px-3 py-1 text-[10px] font-bold rounded ${activePattern === 'B' ? 'bg-cyan-600 text-white' : 'text-zinc-500'}`}>B</button>
                </div>
                <div className="flex space-x-2 border-l border-zinc-700 pl-2">
                  <Knob label="Cyc A" value={30} size="sm" color="orange" />
                  <Knob label="Cyc B" value={10} size="sm" color="blue" />
                </div>
                <div className="flex space-x-2 border-l border-zinc-700 pl-2 bg-black/20 rounded pr-1">
                   <Knob label="Groove" value={40} size="sm" />
                   <Knob label="Depth" value={20} size="sm" />
                </div>
              </div>

              {/* Steps */}
              <div className="flex-1 grid grid-cols-8 gap-1 min-h-0">
                {[1,2,3,4,5,6,7,8].map((step) => (
                  <div key={step} className="flex flex-col items-center justify-between bg-zinc-950/50 rounded border border-zinc-800 py-1">
                    <div className={`w-1.5 h-1.5 rounded-full mb-1 ${step === 1 ? 'bg-orange-500 shadow-[0_0_5px_orange]' : 'bg-zinc-800'}`}></div>
                    <Knob label="" value={Math.random() * 100} size="sm" color={activePattern === 'A' ? 'orange' : 'blue'} />
                    <div className="h-px w-full bg-zinc-800 my-1"></div>
                    <Knob label={step} value={Math.random() * 100} size="sm" />
                  </div>
                ))}
              </div>

              {/* Modifiers */}
              <div className="h-12 flex items-center space-x-2 bg-zinc-800/30 rounded px-2 shrink-0">
                 <div className="text-[9px] text-zinc-500 font-bold w-8 leading-tight">MODS</div>
                 <Knob label="Swap" value={0} size="sm" />
                 <Knob label="Break" value={0} size="sm" />
              </div>
            </div>
          </div>
        )}
        
        {activeTab !== 'MAIN' && (
          <div className="flex items-center justify-center h-full text-zinc-500">
            {activeTab} TAB - Coming Soon...
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
