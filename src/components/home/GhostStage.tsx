'use client';

import * as React from 'react';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import styles from './GhostStage.module.css';

interface GhostStageProps {
  reducedMotion?: boolean;
}

// Import dinâmico evita SSR do canvas
const GhostCanvas = dynamic(
  () => import('@/components/canvas/home/GhostCanvas').then((m) => m.default),
  { ssr: false }
);

/**
 * Static fallback para reduced-motion ou erro WebGL
 * Simula atmosfera Ghost com gradientes CSS
 */
function StaticGhostFallback() {
  return (
    <div
      className={`h-full w-full relative overflow-hidden ${styles.fallbackContainer}`}
      role="img"
      aria-label="Atmospheric ghost background"
    >
      {/* Base radial gradient */}
      <div className={`absolute inset-0 ${styles.fallbackBase}`} />

      {/* Central glow (simula o Ghost) */}
      <div className={`absolute inset-0 ${styles.fallbackGlow}`} />

      {/* Accent flare */}
      <div className={`absolute inset-0 ${styles.fallbackFlare}`} />

      {/* Vignette */}
      <div className={`absolute inset-0 ${styles.fallbackVignette}`} />
    </div>
  );
}

export function GhostStage({ reducedMotion }: GhostStageProps) {
  if (reducedMotion) {
    return <StaticGhostFallback />;
  }

  return (
    <ErrorBoundary fallback={<StaticGhostFallback />}>
      <Suspense fallback={<StaticGhostFallback />}>
        <GhostCanvas />
      </Suspense>
    </ErrorBoundary>
  );
}

export default GhostStage;
