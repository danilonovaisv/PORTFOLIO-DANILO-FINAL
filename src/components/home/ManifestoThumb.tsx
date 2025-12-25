'use client';

import { motion } from 'framer-motion';
import { BRAND } from '@/config/brand';

export default function ManifestoThumb() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full aspect-video md:h-[400px] mt-8 md:mt-0 rounded-lg overflow-hidden shadow-2xl"
    >
      <video
        src={BRAND.video.manifesto}
        muted
        loop
        playsInline
        autoPlay
        className="w-full h-full object-cover"
        aria-label="Manifesto thumbnail"
      />
      
      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent pointer-events-none" />
    </motion.div>
  );
}
