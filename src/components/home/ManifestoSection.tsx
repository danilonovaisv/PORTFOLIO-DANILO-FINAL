'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ASSETS } from '@/lib/constants';

export default function ManifestoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      id="manifesto"
      ref={ref}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="block md:hidden w-full bg-[#06071f] aspect-video flex items-center justify-center"
    >
      <video
        src={ASSETS.videoManifesto}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    </motion.section>
  );
}