'use client';

import * as React from 'react';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

interface GhostStageProps {
  reducedMotion?: boolean;
}

// Import dinâmico evita SSR do canvas
const GhostCanvas = dynamic(
  () => import('@/components/canvas/home/GhostCanvas').then((m) => m.default),
  { ssr: false }
);

export function GhostStage({ reducedMotion }: GhostStageProps) {
  const fallback = (
    <div className="h-full w-full bg-[radial-gradient(circle,#0b0d3a,#06071f)]" />
  );

  if (reducedMotion) return fallback;

  return (
    <ErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback}>
        <GhostCanvas />
      </Suspense>
    </ErrorBoundary>
  );
}

export default GhostStage;
