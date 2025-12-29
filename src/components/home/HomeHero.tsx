'use client';

import { useRef, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import HeroPreloader from './HeroPreloader';
import HeroCopy from './HeroCopy';
import ManifestoThumb from './ManifestoThumb';
import GhostStage from './GhostStage';

import { useAntigravityStore } from '@/store/antigravity.store';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { TIMELINE } from '@/config/timeline';

/**
 * HomeHero Component
 * 
 * SCROLL TIMELINE (200vh):
 * - 0-15%: Hero Copy + Ghost fade out
 * - 5-35%: Video morphs from thumb → fullscreen
 * - 35-85%: Video stays fullscreen (~50% of scroll ≈ 2s at normal speed)
 * - 85-100%: Video exits (next section enters)
 * 
 * Z-INDEX STACKING ORDER:
 * - z-50: HeroPreloader (temporário, desaparece após carregamento)
 * - z-40: Header (SiteHeader/DesktopFluidHeader) — SEMPRE ACIMA
 * - z-30: ManifestoThumb (vídeo scroll-driven)
 * - z-20: GhostStage (WebGL ethereal effect)
 * - z-10: HeroCopy (texto editorial)
 * - z-0:  Background radial gradient
 * 
 * REDUCED MOTION:
 * - Desativa scroll morph (vídeo fica estático em thumb size)
 * - Desativa fade out do copy/ghost
 * - Mantém layout visual intacto
 */
export default function HomeHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { flags, narrativeState } = useAntigravityStore();
  const prefersReducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  });

  // 🎞️ TRANSFORMS DO VÍDEO (APENAS DESKTOP, disabled for reduced motion)
  // Scale: 0.3 (thumb) → 1 (fullscreen)
  const scaleVideo = useTransform(
    scrollYProgress,
    [TIMELINE.MANIFESTO.SCALE_START, TIMELINE.MANIFESTO.SCALE_END],
    prefersReducedMotion ? [0.3, 0.3] : [0.3, 1]
  );

  // Position Y: 50% (bottom) → 0% (center)
  const posYVideo = useTransform(
    scrollYProgress,
    [TIMELINE.MANIFESTO.SCALE_START, TIMELINE.MANIFESTO.SCALE_END],
    prefersReducedMotion ? ['50%', '50%'] : ['50%', '0%']
  );

  // Position X: 40% (right side) → 0% (center)
  const posXVideo = useTransform(
    scrollYProgress,
    [TIMELINE.MANIFESTO.SCALE_START, TIMELINE.MANIFESTO.SCALE_END],
    prefersReducedMotion ? ['40%', '40%'] : ['40%', '0%']
  );

  // Border Radius: 16px (rounded) → 0px (square)
  const borderRadius = useTransform(
    scrollYProgress,
    [TIMELINE.MANIFESTO.SCALE_START, TIMELINE.MANIFESTO.SCALE_END],
    prefersReducedMotion ? ['16px', '16px'] : ['16px', '0px']
  );

  // Text Opacity: 1 → 0 (fade out as video expands)
  const opacityText = useTransform(
    scrollYProgress,
    [TIMELINE.HERO.FADE_OUT_START, TIMELINE.HERO.FADE_OUT_END],
    prefersReducedMotion ? [1, 1] : [1, 0]
  );

  // Ghost Opacity: 1 → 0 (fade out with text)
  const opacityGhost = useTransform(
    scrollYProgress,
    [TIMELINE.HERO.FADE_OUT_START, TIMELINE.HERO.FADE_OUT_END],
    prefersReducedMotion ? [1, 1] : [1, 0]
  );

  /**
   * Skip to fullscreen state (desktop click action)
   * Scrolls to 80% of hero timeline where video is fully expanded
   */
  const handleSkipToFullscreen = useCallback(() => {
    if (ref.current) {
      const heroTop = ref.current.offsetTop;
      const heroHeight = ref.current.offsetHeight;
      // Target 40% of scroll (where video reaches fullscreen)
      const targetScroll = heroTop + (heroHeight * 0.4);

      window.scrollTo({
        top: targetScroll,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    }
  }, [prefersReducedMotion]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative h-[200vh] overflow-hidden bg-ghost-void"
      aria-label="Hero Section"
    >
      {/* STICKY CONTAINER - Keeps content visible during scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* BACKGROUND RADIAL (z-0) */}
        <div
          className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,#0b0d3a_0%,#06071f_60%)] pointer-events-none"
          aria-hidden="true"
        />

        {/* PRELOADER (z-50) */}
        <HeroPreloader />

        {/* 👻 WEBGL (z-20) — SEMPRE MANTER LAYOUT, MESMO SEM WEBGL */}
        <motion.div
          style={{ opacity: opacityGhost }}
          className="absolute inset-0 z-20 pointer-events-none"
        >
          <GhostStage enabled={flags.mountWebGL} />
        </motion.div>

        {/* TEXTO EDITORIAL (z-10) */}
        <motion.div
          style={{ opacity: opacityText }}
          className="absolute inset-0 z-10 flex items-center justify-center px-4 text-center pointer-events-auto"
        >
          <HeroCopy />
        </motion.div>

        {/* 🎞️ MANIFESTO THUMB (z-30) — APENAS DESKTOP */}
        {flags.enableManifestoScroll && (
          <motion.div
            style={{
              scale: scaleVideo,
              y: posYVideo,
              x: posXVideo,
              borderRadius
            }}
            className="absolute inset-0 z-30 hidden md:flex items-center justify-center overflow-hidden origin-bottom-right"
          >
            <div className="w-full h-full">
              <ManifestoThumb
                narrativeState={narrativeState}
                onSkipToFullscreen={handleSkipToFullscreen}
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
