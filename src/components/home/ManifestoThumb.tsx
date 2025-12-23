// src/components/home/ManifestoThumb.tsx
'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { BRAND } from '@/config/brand';

export default function ManifestoThumb() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClick = () => {
    document.querySelector('#manifesto')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <motion.div
      className="z-20 mt-8 w-full max-w-md aspect-video rounded-xl overflow-hidden cursor-pointer relative"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      aria-label="Assista ao vídeo manifesto"
    >
      <video
        ref={videoRef}
        src={BRAND.video.manifesto}
        muted
        loop
        autoPlay // autoplay no thumbnail também, para consistência visual
        playsInline
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}
