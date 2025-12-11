'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function ManifestoSection() {
  const reduced = usePrefersReducedMotion();

  const containerProps = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: {
          duration: 0.7,
          ease: [0.25, 0.8, 0.25, 1] as [number, number, number, number],
        },
      };

  return (
    <motion.section
      id="manifesto"
      className="relative bg-black py-16"
      {...containerProps}
    >
      <div className="mx-auto max-w-5xl px-4">
        <div className="relative overflow-hidden rounded-3xl">
          <motion.video
            className="h-[320px] w-full object-cover sm:h-[420px] md:h-[520px]"
            autoPlay
            muted
            loop
            playsInline
            src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4"
            aria-label="Manifesto em vídeo"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        </div>
      </div>
    </motion.section>
  );
}
