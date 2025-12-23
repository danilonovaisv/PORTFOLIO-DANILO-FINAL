// src/components/home/GhostStage.tsx
'use client';

import dynamic from 'next/dynamic';
import { MotionValue } from 'framer-motion';

const GhostCanvas = dynamic(() => import('./webgl/GhostCanvas'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 z-0 bg-[#050505]" />,
});

export default function GhostStage() {
  return <GhostCanvas />;
}
