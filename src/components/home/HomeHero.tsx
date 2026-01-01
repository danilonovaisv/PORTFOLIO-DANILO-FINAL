'use client';

import * as React from 'react';
import { useRef, useEffect, useState, useCallback } from 'react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Preloader } from '@/components/Preloader';
import { HeroCopy } from './HeroCopy';
import { GhostStage } from './GhostStage';

const CONFIG = {
  preloadMs: 800,
  videoSrc:
    'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4',
  bgColor: '#050511',
} as const;

type VideoState = 'thumbnail' | 'transition' | 'fullscreenHold' | 'released';

function usePrefersReducedMotion() {
  const [pref, setPref] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      const apply = () => setPref(!!mq.matches);
      apply();
      try {
        mq.addEventListener('change', apply);
        return () => mq.removeEventListener('change', apply);
      } catch {
        mq.addListener?.(apply);
        return () => mq.removeListener?.(apply);
      }
    }
  }, []);
  return pref;
}

export default function HomeHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoState, setVideoState] = useState<VideoState>('thumbnail');

  const prefersReducedMotion = usePrefersReducedMotion();

  // Scroll progress da seção do hero
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Mapeia o progresso para ranges úteis
  const progress = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [0, 0.5, 0.9, 1]
  );
  const thumbScale = useTransform(progress, [0, 0.2, 0.35], [1, 1.12, 1.25]);
  const thumbRadius = useTransform(progress, [0, 0.25, 0.4], [16, 12, 0]);
  const thumbOpacity = useTransform(progress, [0, 0.15], [1, 0.15]);

  // Dispara os estados por limiar de scroll
  useEffect(() => {
    if (prefersReducedMotion) return;
    const unsub = progress.on('change', (v) => {
      if (v > 0.18 && videoState === 'thumbnail') setVideoState('transition');
      if (v > 0.32 && videoState === 'transition')
        setVideoState('fullscreenHold');
      if (v > 0.5 && videoState === 'fullscreenHold') setVideoState('released');
    });
    return () => unsub();
  }, [progress, prefersReducedMotion, videoState]);

  // Hold em fullscreen trava o scroll por 2s
  useEffect(() => {
    if (videoState === 'fullscreenHold') {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const t = setTimeout(() => setVideoState('released'), 2000);
      return () => {
        document.body.style.overflow = prev;
        clearTimeout(t);
      };
    }
  }, [videoState]);

  // Auto-mute quando sai da viewport
  const [isInView, setIsInView] = useState(true);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setIsInView(e.isIntersecting),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!isInView && !isMuted) {
      if (videoRef.current) {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  }, [isInView, isMuted]);

  const handlePreloaderDone = useCallback(() => setIsLoading(false), []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen md:h-[200vh] overflow-hidden bg-[#050511]"
      aria-label="Hero section"
    >
      {/* Preloader */}
      <AnimatePresence>
        {isLoading && (
          <Preloader
            durationMs={CONFIG.preloadMs}
            onComplete={handlePreloaderDone}
            label="Summoning spirits"
          />
        )}
      </AnimatePresence>

      {/* WebGL (desliga com reduced-motion) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <GhostStage reducedMotion={prefersReducedMotion} />
      </div>

      {/* Texto editorial */}
      <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
        <motion.div
          initial={
            prefersReducedMotion
              ? false
              : { opacity: 0, y: 20, filter: 'blur(6px)' }
          }
          animate={
            prefersReducedMotion
              ? {}
              : { opacity: 1, y: 0, filter: 'blur(0px)' }
          }
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
        >
          <HeroCopy />
        </motion.div>
      </div>

      {/* Área sticky para a morph do vídeo (desktop) */}
      {!prefersReducedMotion && (
        <div className="sticky top-0 h-screen w-full z-30 pointer-events-none">
          {/* Thumb -> fullscreen */}
          {videoState !== 'released' && (
            <motion.div
              className="absolute bottom-8 right-8 md:block hidden pointer-events-auto"
              style={{ scale: thumbScale, opacity: thumbOpacity }}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="w-[320px] h-[180px] overflow-hidden border border-white/10 backdrop-blur bg-white/5 shadow-xl"
                style={{ borderRadius: thumbRadius }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  setVideoState((s) => (s === 'thumbnail' ? 'transition' : s))
                }
              >
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    src={CONFIG.videoSrc}
                    autoPlay
                    muted={isMuted}
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    aria-label="Portfolio showreel video"
                  />
                  <motion.div
                    className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none"
                    animate={{ opacity: videoState === 'thumbnail' ? 0.7 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Camada fullscreen durante a transição/hold */}
          <AnimatePresence>
            {(videoState === 'transition' ||
              videoState === 'fullscreenHold') && (
              <motion.div
                key="fs"
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="absolute inset-0"
                  initial={{ borderRadius: 12, scale: 0.98 }}
                  animate={{ borderRadius: 0, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <video
                    src={CONFIG.videoSrc}
                    autoPlay
                    muted={isMuted}
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    aria-label="Portfolio showreel fullscreen"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
