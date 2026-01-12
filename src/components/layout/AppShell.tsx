import React from 'react';

import { useGlobalStore } from '../../state/globalStore';
import { Header } from './Header';
import { MainTab } from '../tabs/main/MainTab';
import { PlaceholderTab } from '../tabs/PlaceholderTab';

export function AppShell() {
  const activeTab = useGlobalStore((s) => s.activeTab);

  return (
    <div className="w-full h-screen bg-zinc-900 text-zinc-200 overflow-hidden flex flex-col font-sans">
      <Header />

      <main className="flex-1 relative">
        {activeTab === 'MAIN' && <MainTab />}
        {activeTab === 'MATRIX' && <PlaceholderTab label="MATRIX" />}
        {activeTab === 'METRO' && <PlaceholderTab label="METRO" />}
        {activeTab === 'LIB' && <PlaceholderTab label="LIB" />}
      </main>
    </div>
  );
}

