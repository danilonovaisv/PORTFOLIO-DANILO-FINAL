'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import { BRAND } from '@/config/brand';

/**
 * ManifestoSection - Mobile-Only Fullscreen Video
 *
 * Aparece logo após a Hero como seção independente em mobile.
 * - Fullscreen com aspect-video
 * - Tap para toggle mute/unmute
 * - Animação sutil de entrada (apenas opacity/translateY)
 * - Sem overlays extras
 */
export default function ManifestoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  /**
   * Toggle mute/unmute on tap
   */
  const handleTap = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  }, []);

  return (
    <motion.section
      id="manifesto-mobile"
      ref={sectionRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="block md:hidden w-full bg-ghost-void aspect-video overflow-hidden"
      aria-label="Vídeo manifesto do portfólio"
      onClick={handleTap}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleTap();
        }
      }}
    >
      <video
        ref={videoRef}
        src={BRAND.video.manifesto}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="w-full h-full object-cover"
        aria-label={
          isMuted
            ? 'Manifesto Video (muted) - tap to unmute'
            : 'Manifesto Video (unmuted) - tap to mute'
        }
      />
    </motion.section>
  );
}
