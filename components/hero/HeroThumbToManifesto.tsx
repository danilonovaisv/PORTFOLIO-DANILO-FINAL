'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function HeroThumbToManifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 3.2]);
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', '-12vw']);
  const y = useTransform(scrollYProgress, [0, 1], ['0vh', '-18vh']);
  const radius = useTransform(scrollYProgress, [0, 1], ['16px', '0px']);

  const motionStyle = reduced
    ? {}
    : {
        scale,
        x,
        y,
        borderRadius: radius,
      };

  return (
    <div
      ref={ref}
      className="relative h-32 w-40 md:h-40 md:w-56 lg:h-44 lg:w-64"
    >
      <motion.video
        className="absolute inset-0 h-full w-full cursor-pointer object-cover shadow-lg"
        style={motionStyle}
        autoPlay
        muted
        loop
        playsInline
        src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4"
        aria-label="Vídeo Manifesto"
        onClick={() => {
          const manifesto = document.querySelector<HTMLElement>('#manifesto');
          manifesto?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
        }}
      />
    </div>
  );
}
