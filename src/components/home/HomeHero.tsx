// src/components/home/HomeHero.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useTransform, useMotionValue } from 'framer-motion';

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { ASSETS } from '@/lib/constants';

// Componentes
import HeroCopy from './HeroCopy';

import HeroPreloader from './HeroPreloader';
import GhostStage from './GhostStage'; // Certifica-te que este ficheiro existe ou comenta a linha

export default function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Estado para garantir renderização apenas no cliente (evita hydration mismatch)
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const reducedMotion = usePrefersReducedMotion();
  const [showPreloader, setShowPreloader] = useState(true);

  // Scroll Animation Hooks - with conditional initialization to avoid hydration issues
  const [scrollYProgress, setScrollYProgress] = useState<any>(null);

  useEffect(() => {
    // Only initialize useScroll on the client side after mount
    if (typeof window !== 'undefined' && heroRef.current && !scrollYProgress) {
      // Dynamically import useScroll to ensure it's only used client-side
      import('framer-motion').then(({ useScroll }) => {
        const { scrollYProgress: progress } = useScroll({
          target: heroRef,
          offset: ['start start', 'end start'],
        });
        setScrollYProgress(progress);
      });
    }
  }, [scrollYProgress]);

  // Initialize motion values with useMotionValue as fallbacks
  const videoScale = scrollYProgress
    ? useTransform(scrollYProgress, [0, 0.3], [0.4, 1])
    : useMotionValue(0.4);
  const videoY = scrollYProgress
    ? useTransform(scrollYProgress, [0, 0.3], ['20%', '0%'])
    : useMotionValue('20%');
  const videoRadius = scrollYProgress
    ? useTransform(scrollYProgress, [0, 0.3], [24, 0])
    : useMotionValue(24);
  // Opacidade do texto enquanto fazemos scroll
  const contentOpacity = scrollYProgress
    ? useTransform(scrollYProgress, [0, 0.15], [1, 0])
    : useMotionValue(1);

  // 1. Check de montagem e mobile
  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 2. Preloader Logic
  useEffect(() => {
    if (reducedMotion) {
      setShowPreloader(false);
      return;
    }
    const timer = window.setTimeout(() => setShowPreloader(false), 2000); // 2s para ver a animação
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  // Se não estiver montado, retorna nulo ou um esqueleto simples para evitar flash
  if (!isMounted) return <div className="bg-[#06071f] h-screen w-full" />;

  return (
    <>
      <HeroPreloader isVisible={showPreloader} />

      {/* --- DESKTOP HERO (Scrollytelling) --- */}
      {!isMobile && (
        <section
          ref={heroRef}
          className="relative w-full bg-[#06071f] h-[350vh]" // Altura para o scroll
        >
          <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
            {/* 0. BACKGROUND & GHOST */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <GhostStage enabled={!reducedMotion} />
              <div className="absolute inset-0 bg-gradient-to-b from-[#06071f] via-[#0a0b2e] to-black/40" />
            </div>

            {/* 1. TEXT CONTENT (Desaparece ao fazer scroll) */}
            <motion.div
              style={{ opacity: contentOpacity }}
              className="relative z-20 flex w-full max-w-6xl flex-col items-center px-6 text-center"
            >
              <HeroCopy />
            </motion.div>

            {/* 2. VIDEO ANIMATION (Cresce ao fazer scroll) */}
            <motion.div
              style={{
                scale: videoScale,
                y: videoY,
                borderRadius: videoRadius,
              }}
              className="absolute z-10 w-full h-full flex items-center justify-center overflow-hidden bg-black shadow-2xl origin-center"
            >
              <div className="relative w-full h-full">
                {/* Overlay escuro sobre o vídeo para o texto ser legível no início */}
                <motion.div
                  style={{ opacity: contentOpacity }}
                  className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent z-10"
                />
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  src={ASSETS.videoManifesto}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* --- MOBILE HERO (Static) --- */}
      {isMobile && (
        <section className="relative w-full bg-[#06071f]">
          <div className="h-screen w-full overflow-hidden flex items-center justify-center">
            <div className="relative z-20 flex w-full max-w-6xl flex-col items-center px-6 text-center">
              <HeroCopy />
            </div>
            <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center">
              <div className="relative aspect-video w-full max-w-6xl mx-6 rounded-xl overflow-hidden shadow-2xl">
                <video
                  className="w-full h-full object-cover"
                  src={ASSETS.videoManifesto}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
