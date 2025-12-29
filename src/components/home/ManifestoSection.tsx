'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BRAND } from '@/config/brand';

export default function ManifestoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <motion.section
      id="manifesto"
      ref={ref}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="block md:hidden w-full bg-ghost-void aspect-video"
      aria-label="Vídeo manifesto do portfólio"
    >
      <video
        src={BRAND.video.manifesto}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
        aria-label="Manifesto Video"
      />
    </motion.section>
  );
}
