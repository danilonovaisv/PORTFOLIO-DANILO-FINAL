'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { BRAND } from '@/config/brand';

const desktopEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ManifestoThumb() {
  const reducedMotion = usePrefersReducedMotion();

  // Detecta o tamanho da viewport
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : undefined
  );

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = viewportWidth !== undefined ? viewportWidth < 1024 : false;
  const enableDesktopMotion = !reducedMotion && !isMobile;
  const enableMobileFade = !reducedMotion && isMobile;

  // Define as animações específicas
  const motionProps = enableDesktopMotion
    ? {
        initial: { opacity: 0, scale: 0.9, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        transition: {
          duration: 0.85,
          ease: desktopEase,
        },
        whileHover: { scale: 1.05 },
      }
    : enableMobileFade
      ? {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
        }
      : { initial: false };

  const motionKey = isMobile
    ? 'manifesto-thumb-mobile'
    : 'manifesto-thumb-desktop';

  const videoSrc = BRAND.video.manifesto;

  // MOBILE → vídeo full abaixo da Hero
  if (isMobile) {
    return (
      <motion.div
        key={motionKey}
        {...motionProps}
        className="relative w-full h-[70vh] bg-black overflow-hidden"
      >
        <video
          src={videoSrc}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          className="w-full h-full object-cover"
          aria-label="Manifesto video full"
        />
      </motion.div>
    );
  }

  // DESKTOP → thumb fixa no canto inferior direito
  return (
    <motion.div
      key={motionKey}
      {...motionProps}
      className="
        group fixed bottom-8 right-8 z-20
        aspect-9/14 w-[260px]
        overflow-hidden
        rounded-xl
        shadow-[0_30px_90px_rgba(0,0,0,0.45)]
        bg-black
        cursor-pointer
      "
    >
      <video
        src={videoSrc}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        className="
          h-full w-full object-cover
          transition-transform duration-700 ease-out-expo
          group-hover:scale-105
        "
        aria-label="Manifesto thumbnail"
      />

      {/* Gradiente superior sutil */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
    </motion.div>
  );
}
