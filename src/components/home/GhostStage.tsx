'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { useReducedMotion } from 'framer-motion';

const GhostCanvas = dynamic(
  () => import('@/components/home/webgl/GhostCanvas'),
  { ssr: false }
);

export default function GhostStage() {
  const reducedMotion = useReducedMotion();
  return <GhostCanvas reducedMotion={!!reducedMotion} />;
}
