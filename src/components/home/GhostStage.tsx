'use client';

import dynamic from 'next/dynamic';

const GhostCanvas = dynamic(() => import('./webgl/GhostCanvas'), {
  ssr: false,
});

export default function GhostStage() {
  return (
    <div className="absolute inset-0 z-30 pointer-events-none">
      <GhostCanvas />
    </div>
  );
}
