import React from 'react';

export type KnobColor = 'white' | 'orange' | 'blue';
export type KnobSize = 'sm' | 'md' | 'lg';

export function Knob({
  label,
  value,
  color = 'white',
  size = 'md',
}: {
  label?: React.ReactNode;
  value: number; // 0..1 (Phase 1 UI placeholder)
  color?: KnobColor;
  size?: KnobSize;
}) {
  const sizeClass = size === 'sm' ? 'w-10 h-10' : size === 'lg' ? 'w-20 h-20' : 'w-14 h-14';
  const angle = clamp01(value) * 270 - 135;
  const knobColor =
    color === 'orange' ? 'stroke-orange-500' : color === 'blue' ? 'stroke-cyan-400' : 'stroke-zinc-200';

  return (
    <div className="flex flex-col items-center justify-center space-y-1 select-none touch-none">
      <div className={`relative ${sizeClass} bg-zinc-800 rounded-full shadow-lg border border-zinc-700`}>
        <svg viewBox="0 0 100 100" className="w-full h-full transform rotate-0">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#333"
            strokeWidth="8"
            strokeDasharray="75 25"
            transform="rotate(135 50 50)"
          />
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="10"
            className={`${knobColor} stroke-[8px]`}
            strokeLinecap="round"
            style={{ transform: `rotate(${angle}deg)`, transformOrigin: 'center' }}
          />
        </svg>
      </div>
      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter text-center leading-none">
        {label ?? ''}
      </span>
    </div>
  );
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

