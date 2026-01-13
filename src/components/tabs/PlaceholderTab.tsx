import React from 'react';

export function PlaceholderTab({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center h-full text-zinc-500">
      {label} TAB - Coming Soon...
    </div>
  );
}

