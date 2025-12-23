// src/components/home/ManifestoThumb.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion';
import { BRAND } from '@/config/brand';
import { useScrollContext } from '@/contexts/ScrollContext';

const EASING = [0.22, 1, 0.36, 1];

export default function ManifestoThumb() {
  const { scrollYProgress } = useScrollContext();
  const fallbackProgress = useMotionValue(0);
  const progress = scrollYProgress ?? fallbackProgress;

  const videoRef = useRef<HTMLVideoElement>(null);
  const nextSectionEnteringRef = useRef(false);
  const isFullScreenRef = useRef(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const scale = useTransform(progress, [0, 0.12, 0.46], [1, 1, 1]);
  const translateX = useTransform(progress, [0, 0.12, 0.46], [0, -10, 0]);
  const translateY = useTransform(progress, [0, 0.12, 0.46], [0, 0, -30]);
  const borderRadius = useTransform(progress, [0, 0.46], [24, 0]);
  const width = useTransform(
    progress,
    [0, 0.12, 0.46],
    ['192px', '192px', '100vw']
  );
  const height = useTransform(
    progress,
    [0, 0.12, 0.46],
    ['120px', '120px', '100vh']
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const section = document.getElementById('manifesto');
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        nextSectionEnteringRef.current = entry.intersectionRatio >= 0.2;
      },
      { threshold: [0.2] }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.volume = 0;
  }, []);

  useMotionValueEvent(progress, 'change', (latest) => {
    const video = videoRef.current;
    if (!video) return;

    const shouldMute =
      latest < 0.46 ||
      latest >= 0.78 ||
      nextSectionEnteringRef.current ||
      !videoRef.current;
    if (shouldMute) {
      video.muted = true;
      video.volume = 0;
      return;
    }

    const shouldBeFull =
      latest >= 0.46 && latest < 0.78 && !nextSectionEnteringRef.current;
    if (isFullScreenRef.current !== shouldBeFull) {
      isFullScreenRef.current = shouldBeFull;
      setIsFullScreen(shouldBeFull);
    }

    if (shouldBeFull) {
      if (video.muted) {
        video.muted = false;
        video.volume = 1;
      }

      const attemptPlay = video.play();
      if (attemptPlay && typeof attemptPlay.then === 'function') {
        attemptPlay.catch((error) => {
          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.debug('Manifesto autoplay blocked', error);
          }
          video.muted = true;
          video.volume = 0;
        });
      }
    }
  });

  const containerPositionStyle: React.CSSProperties = isFullScreen
    ? { position: 'fixed', inset: 0, padding: 0 }
    : { position: 'absolute', bottom: 40, right: 24 };

  return (
    <motion.div
      style={{ ...containerPositionStyle, x: translateX, y: translateY } as any}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1.2,
        ease: EASING as [number, number, number, number],
      }}
      className="relative z-20 flex flex-col items-end"
    >
      <motion.div
        style={{
          width,
          height,
          scale,
          borderRadius,
          transformOrigin: 'bottom right',
        }}
        className="relative mb-2 overflow-hidden shadow-2xl border border-white/10 bg-black/60"
      >
        <video
          ref={videoRef}
          src={BRAND.video.manifesto}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
        />
      </motion.div>
    </motion.div>
  );
}
