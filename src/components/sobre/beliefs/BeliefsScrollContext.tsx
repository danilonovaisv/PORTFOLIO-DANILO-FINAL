'use client';

import { createContext, useContext } from 'react';
import type { BeliefsScrollContextValue } from '@/types/beliefs';

const BeliefsScrollContext = createContext<BeliefsScrollContextValue | null>(
  null
);

export function BeliefsScrollProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: BeliefsScrollContextValue;
}) {
  return (
    <BeliefsScrollContext.Provider value={value}>
      {children}
    </BeliefsScrollContext.Provider>
  );
}

export function useBeliefsScrollContext() {
  const context = useContext(BeliefsScrollContext);
  if (!context) {
    throw new Error(
      'useBeliefsScrollContext must be used within a BeliefsScrollProvider'
    );
  }

  return context;
}
