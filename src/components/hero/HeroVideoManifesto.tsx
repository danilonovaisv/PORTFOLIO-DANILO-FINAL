'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function HeroVideoManifesto() {
  const ref = useRef<HTMLDivElement | null>(null);

  // margin negativa: anima antes de aparecer 100%
  const inView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' });

  return (
    <div className="container-custom pb-14">
      <motion.div
        ref={ref}
        style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0, y: 140, rotateX: 16, scale: 0.98 }}
        animate={inView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
        className="video-thumb"
      >
        {/* Troque pelo seu asset real: /public/videos/manifesto.mp4 */}
        <video
          src="/videos/manifesto.mp4"
          muted
          autoPlay
          loop
          playsInline
          className="w-full rounded-2xl shadow-2xl"
        />
      </motion.div>
    </div>
  );
}
