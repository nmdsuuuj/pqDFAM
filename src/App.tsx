import React, { useMemo } from 'react';

import { AppShell } from './components/layout/AppShell';
import { DFAMUnitProvider } from './units/dfam/DFAMUnitProvider';
import { createDFAMUnitStore } from './units/dfam/createDFAMUnitStore';

export default function App() {
  // Per-unit store instance (NOT global/singleton) — future dual-unit ready.
  const unitStore = useMemo(() => createDFAMUnitStore(), []);

  return (
    <DFAMUnitProvider store={unitStore}>
      <AppShell />
    </DFAMUnitProvider>
  );
}
