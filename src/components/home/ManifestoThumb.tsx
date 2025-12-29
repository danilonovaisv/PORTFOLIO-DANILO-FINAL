'use client';

import { motion } from 'framer-motion';

export default function ManifestoThumb() {
  return (
    <motion.video
      src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4 "
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
