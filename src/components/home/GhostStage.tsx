'use client';

import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';

// Carregamento lazy + SSR-safe
const GhostCanvas = dynamic(
  () => import('@/components/canvas/webgl/GhostCanvas'),
  {
    ssr: false,
  }
);

type GhostStageProps = {
  className?: string;
};

export default function GhostStage({ className }: GhostStageProps = {}) {
  return <GhostCanvas className={cn(className)} />;
}
