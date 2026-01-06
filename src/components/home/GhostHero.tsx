'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamic import for the GhostCanvas to ensure it only runs on client
const GhostCanvas = dynamic(
  () => import('@/components/canvas/home/GhostCanvas'),
  {
    ssr: false,
  }
);

export default function GhostHero() {
  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      <GhostCanvas />
    </div>
  );
}
