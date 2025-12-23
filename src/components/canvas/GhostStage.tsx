// src/components/canvas/GhostStage.tsx
'use client';

import dynamic from 'next/dynamic';

const GhostCanvas = dynamic(() => import('@/components/home/webgl/GhostCanvas'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 z-0 bg-[#050505]" />,
});

export default function GhostStage() {
  return <GhostCanvas />;
}
