'use client';

import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { BRAND } from '@/config/brand';

export default function ManifestoThumb() {
  const reducedMotion = usePrefersReducedMotion();

  // Premium editorial entrance animation
  const containerVariants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      scale: 0.98 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1], // Custom easing for editorial feel
        delay: 0.2
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      transition={reducedMotion ? { duration: 0 } : undefined}
      viewport={{ once: true, margin: "-100px" }}
      className="relative w-full aspect-video md:h-[400px] rounded-lg overflow-hidden shadow-2xl"
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
    </motion.div>
  );
}
