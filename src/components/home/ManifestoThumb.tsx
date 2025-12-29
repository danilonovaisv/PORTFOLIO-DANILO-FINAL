'use client';

import { motion } from 'framer-motion';
import { BRAND } from '@/config/brand';

export default function ManifestoThumb() {
  return (
    <motion.video
      src={BRAND.video.manifesto}
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    />
  );
}
