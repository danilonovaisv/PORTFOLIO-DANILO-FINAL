'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import HeroPreloader from './HeroPreloader';
import HeroCopy from './HeroCopy';
import ManifestoThumb from './ManifestoThumb';
import GhostStage from './GhostStage';

import { useAntigravityStore } from '@/store/antigravity.store';
import { TIMELINE } from '@/config/timeline';

export default function HomeHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { flags, narrativeState } = useAntigravityStore();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  });

  // 🎞️ TRANSFORMS DO VÍDEO (APENAS DESKTOP)
  // Scale: 0.3 (thumb) → 1 (fullscreen)
  const scaleVideo = useTransform(
    scrollYProgress,
    [TIMELINE.MANIFESTO.SCALE_START, TIMELINE.MANIFESTO.SCALE_END],
    [0.3, 1]
  );

  // Position Y: 50% (bottom) → 0% (center)
  const posYVideo = useTransform(
    scrollYProgress,
    [TIMELINE.MANIFESTO.SCALE_START, TIMELINE.MANIFESTO.SCALE_END],
    ['50%', '0%']
  );

  // Position X: 40% (right side) → 0% (center)
  const posXVideo = useTransform(
    scrollYProgress,
    [TIMELINE.MANIFESTO.SCALE_START, TIMELINE.MANIFESTO.SCALE_END],
    ['40%', '0%']
  );

  // Border Radius: 16px (rounded) → 0px (square)
  const borderRadius = useTransform(
    scrollYProgress,
    [TIMELINE.MANIFESTO.SCALE_START, TIMELINE.MANIFESTO.SCALE_END],
    ['16px', '0px']
  );

  // Text Opacity: 1 → 0 (fade out as video expands)
  const opacityText = useTransform(
    scrollYProgress,
    [TIMELINE.HERO.FADE_OUT_START, TIMELINE.HERO.FADE_OUT_END],
    [1, 0]
  );

  // Ghost Opacity: 1 → 0 (fade out with text)
  const opacityGhost = useTransform(
    scrollYProgress,
    [TIMELINE.HERO.FADE_OUT_START, TIMELINE.HERO.FADE_OUT_END],
    [1, 0]
  );

  return (
    <section
      id="hero"
      ref={ref}
      className="relative h-[250vh] overflow-hidden bg-ghost-void"
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

        {/* 👻 WEBGL (z-20) — APENAS SE PERMITIDO */}
        {flags.mountWebGL && (
          <motion.div
            style={{ opacity: opacityGhost }}
            className="absolute inset-0 z-20 pointer-events-none"
          >
            <GhostStage />
          </motion.div>
        )}

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
            className="absolute inset-0 z-30 hidden md:flex items-center justify-center overflow-hidden"
          >
            <div className="w-full h-full">
              <ManifestoThumb narrativeState={narrativeState} />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}