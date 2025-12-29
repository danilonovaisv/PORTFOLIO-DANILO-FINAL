'use client';

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { BRAND } from '@/config/brand';

export default function ManifestoSection() {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <motion.section
      id="manifesto"
      ref={ref}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : undefined}
      transition={{
        duration: reducedMotion ? 0.25 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="block md:hidden w-full bg-ghost-void aspect-video overflow-hidden"
      aria-label="Manifesto (vídeo)"
    >
      <video
        src={BRAND.video.manifesto}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    </motion.section>
  );
}
