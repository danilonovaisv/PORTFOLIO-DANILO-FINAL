'use client';

import { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  cubicBezier,
} from 'framer-motion';
import * as THREE from 'three';
import { Preloader } from '@/components/ui/Preloader';
import { HeroCopy } from './HeroCopy';
import { GhostStage } from './GhostStage';
import { ManifestoThumb, type ManifestoThumbHandle } from './ManifestoThumb';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const CONFIG = {
  preloadMs: 2000,
  easing: cubicBezier(0.22, 1, 0.36, 1),
  entrance: {
    initial: { opacity: 0, scale: 0.92, y: 60, filter: 'blur(10px)' },
    animate: { opacity: 1, scale: [1.02, 1], y: 0, filter: 'blur(0px)' },
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      delay: 0.5,
    },
  },
};

export default function HomeHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const manifestoRef = useRef<ManifestoThumbHandle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // NOTE: isMobile logic is also used for enable3D
  const isMobile = useMediaQuery('(max-width: 768px)');
  const prefersReducedMotion = useMediaQuery(
    '(prefers-reduced-motion: reduce)'
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  // LÓGICA DE ATIVAÇÃO DO 3D (Tentativa)
  const shouldRender3D = useMemo(() => {
    if (!mounted) return false;
    return !isMobile && !prefersReducedMotion;
  }, [mounted, isMobile, prefersReducedMotion]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const videoScale = useTransform(scrollYProgress, [0.3, 0.6], [1, 3.5], {
    ease: CONFIG.easing,
  });
  const borderRadius = useTransform(scrollYProgress, [0.3, 0.55], [16, 0]);
  const copyOpacity = useTransform(scrollYProgress, [0.2, 0.4], [1, 0]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (prefersReducedMotion || isMobile) return;
    const inHoldPhase = latest > 0.6 && latest < 0.95;
    manifestoRef.current?.setMuted(!inHoldPhase);
  });

  const handlePreloaderDone = useCallback(() => setIsLoading(false), []);
  const ghostRef = useRef<THREE.Group | null>(null);

  const handleThumbClick = useCallback(() => {
    if (sectionRef.current) {
      const sectionHeight = sectionRef.current.offsetHeight;
      const targetScroll = sectionRef.current.offsetTop + sectionHeight * 0.65;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-dvh md:h-[250vh] bg-[#020204] overflow-hidden"
      aria-label="Home hero section"
    >
      <div className="sticky top-0 h-dvh w-full overflow-hidden">
        <AnimatePresence>
          {isLoading && (
            <Preloader
              durationMs={CONFIG.preloadMs}
              onComplete={handlePreloaderDone}
              label="Summoning spirits"
            />
          )}
        </AnimatePresence>

        {/* CAMADA WEBGL - Fundo */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ filter: 'blur(20px)', opacity: 0 }}
          animate={{
            filter: isLoading ? 'blur(20px)' : 'blur(0px)',
            opacity: 1,
          }}
          transition={{ duration: 2.0, ease: 'linear' }}
        >
          <GhostStage
            reducedMotion={!shouldRender3D}
            active={!isLoading && shouldRender3D}
            ghostRef={ghostRef}
          />
        </motion.div>

        {/* CAMADA DE TEXTO - Frente */}
        <motion.div
          style={{ opacity: copyOpacity }}
          className="absolute inset-0 z-10 pointer-events-none"
        >
          <div className="w-full h-full pointer-events-auto">
            {/* Passamos o ghostRef para sincronizar o efeito de revelação 2D */}
            <HeroCopy
              startEntrance={!isLoading}
              enable3D={shouldRender3D}
              ghostRef={ghostRef}
            />
          </div>
        </motion.div>

        {/* Floating Video - Desktop Only */}
        {!prefersReducedMotion && !isMobile && (
          <motion.div
            className="absolute bottom-8 right-8 md:right-12 z-30 pointer-events-auto origin-bottom-right"
            style={{
              scale: videoScale,
              borderRadius: borderRadius,
              width: '30vw',
              maxWidth: '600px',
              minWidth: '320px',
              aspectRatio: '16/9',
            }}
            initial={CONFIG.entrance.initial}
            animate={CONFIG.entrance.animate}
            transition={CONFIG.entrance.transition}
          >
            <ManifestoThumb ref={manifestoRef} onClick={handleThumbClick} />
          </motion.div>
        )}
      </div>

      <div className="hidden md:block h-screen w-full pointer-events-none" />
    </section>
  );
}
