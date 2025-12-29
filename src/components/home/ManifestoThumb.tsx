'use client';

import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function ManifestoThumb({ muted = true }: { muted?: boolean }) {
  const reducedMotion = useReducedMotion();

  const src = useMemo(
    () =>
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4',
    []
  );

  return (
    <motion.video
      src={src}
      autoPlay
      muted={muted}
      loop
      playsInline
      className="w-full h-full object-cover cursor-pointer"
      whileHover={reducedMotion ? undefined : { scale: 1.05 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    />
  );
}
