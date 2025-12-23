// src/components/home/ManifestoThumb.tsx
'use client';

import { useEffect, useRef } from 'react';
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

  const scale = useTransform(progress, [0, 0.12, 0.46], [1, 1, 2.4]);
  const translateX = useTransform(progress, [0, 0.12, 0.46], [0, 0, -120]);
  const translateY = useTransform(progress, [0, 0.12, 0.46], [0, 0, -90]);
  const borderRadius = useTransform(progress, [0, 0.46], [24, 6]);

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

    if (latest >= 0.46 && latest < 0.78 && !nextSectionEnteringRef.current) {
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

  return (
    <motion.div
      style={{ x: translateX, y: translateY, scale }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: EASING }}
      className="relative z-20 flex flex-col items-end"
    >
      <motion.div
        style={{ borderRadius }}
        className="relative mb-2 w-48 md:w-64 aspect-video overflow-hidden shadow-2xl border border-white/10 bg-black/60"
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
