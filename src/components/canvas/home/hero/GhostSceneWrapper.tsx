'use client';

import dynamic from 'next/dynamic';

const GhostCanvas = dynamic(
  () => import('@/components/canvas/home/hero/GhostCanvas'),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 w-full h-full bg-transparent" />
    ),
  }
);

export default function GhostSceneWrapper() {
  return <GhostCanvas />;
}
