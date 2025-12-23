// src/components/home/ManifestoSection.tsx
'use client';

import { motion, useReducedMotion, Variants } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { BRAND } from '@/config/brand';

const videoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function ManifestoSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroObserverRef = useRef<IntersectionObserver | null>(null);
  const audioObserverRef = useRef<IntersectionObserver | null>(null);
  const delayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [shouldShowVideo, setShouldShowVideo] = useState(false);

  useEffect(() => {
    const heroEl = document.getElementById('hero');
    if (!heroEl) {
      setShouldShowVideo(true);
      return;
    }

    heroObserverRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldShowVideo(false);
          if (delayTimerRef.current) {
            clearTimeout(delayTimerRef.current);
            delayTimerRef.current = null;
          }
        } else if (!entry.isIntersecting) {
          if (!delayTimerRef.current) {
            delayTimerRef.current = setTimeout(() => {
              setShouldShowVideo(true);
              delayTimerRef.current = null;
            }, 2000);
          }
        }
      },
      { threshold: [0, 0.1] }
    );

    heroObserverRef.current.observe(heroEl);

    return () => {
      if (heroObserverRef.current) {
        heroObserverRef.current.disconnect();
      }
      if (delayTimerRef.current) {
        clearTimeout(delayTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const videoEl = videoRef.current;
    if (!videoEl) return;

    audioObserverRef.current = new IntersectionObserver(
      ([entry]) => {
        if (!shouldShowVideo || !videoEl) return;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          if (videoEl.muted) {
            videoEl.muted = false;
          }
          videoEl.volume = 1;
          videoEl.play().catch(() => {
            videoEl.muted = true;
            videoEl.volume = 0;
          });
        } else {
          videoEl.muted = true;
          videoEl.volume = 0;
        }
      },
      { threshold: [0, 0.6, 0.8] }
    );

    audioObserverRef.current.observe(sectionRef.current);

    return () => {
      if (audioObserverRef.current) {
        audioObserverRef.current.disconnect();
      }
    };
  }, [shouldShowVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.loop = true;
    video.autoplay = true;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'metadata';
  }, []);

  if (!shouldShowVideo) {
    return (
      <section
        id="manifesto"
        ref={sectionRef}
        aria-label="Manifesto"
        className="w-full h-[50vh] bg-[#050505]"
      />
    );
  }

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      aria-label="Manifesto"
      className="w-full bg-[#050505] py-16 flex justify-center"
    >
      <motion.div
        className="w-full max-w-6xl"
        variants={videoVariants}
        initial="hidden"
        whileInView={reduceMotion ? undefined : 'visible'}
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="aspect-video w-full overflow-hidden">
          <video
            ref={videoRef}
            src={BRAND.video.manifesto}
            className="h-full w-full object-cover"
            playsInline
            muted
            loop
            autoPlay
            preload="metadata"
          />
        </div>
      </motion.div>
    </section>
  );
}
