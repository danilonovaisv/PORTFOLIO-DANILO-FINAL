'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { BRAND } from '@/config/brand';

export default function ManifestoThumb({ muted = true }: { muted?: boolean }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.video
      src={BRAND.video.manifesto}
      autoPlay
      muted={muted}
      loop
      playsInline
      className="w-full h-full object-cover cursor-pointer"
      aria-label="Manifesto video presentation"
      whileHover={reducedMotion ? undefined : { scale: 1.05 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    />
  );
}
