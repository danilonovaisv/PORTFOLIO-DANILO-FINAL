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
  const scaleVideo = useTransform(scrollYProgress, [TIMELINE.MANIFESTO.SCALE_START, TIMELINE.MANIFESTO.SCALE_END], [0.3, 1]);
  const posYVideo = useTransform(scrollYProgress, [TIMELINE.MANIFESTO.SCALE_START, TIMELINE.MANIFESTO.SCALE_END], ['50%', '0%']);
  const borderRadius = useTransform(scrollYProgress, [TIMELINE.MANIFESTO.SCALE_START, TIMELINE.MANIFESTO.SCALE_END], ['16px', '0px']);
  const opacityText = useTransform(scrollYProgress, [TIMELINE.HERO.FADE_OUT_START, TIMELINE.HERO.FADE_OUT_END], [1, 0]);

  // Using store state instead of recalculating locally if needed, but passing narrativeState to thumb is good.
  // const narrativeState = resolveScrollState(scrollYProgress.get()); // DEPRECATED: Using Store State

  return (
    <section
      ref={ref}
      className="relative h-[200vh] overflow-hidden bg-[#06071f]"
    >
      {/* PRELOADER */}
      <HeroPreloader />

      {/* 👻 WEBGL — APENAS SE PERMITIDO */}
      {flags.mountWebGL && (
        <div className="absolute inset-0 z-20">
          <GhostStage />
        </div>
      )}

      {/* TEXTO EDITORIAL — NUNCA ANIMA */}
      <motion.div
        style={{ opacity: opacityText }}
        className="absolute inset-0 z-10 flex items-center justify-center px-4 text-center"
      >
        <HeroCopy />
      </motion.div>

      {/* 🎞️ MANIFESTO — APENAS DESKTOP */}
      {flags.enableManifestoScroll && (
        <motion.div
          style={{
            scale: scaleVideo,
            y: posYVideo,
            borderRadius
          }}
          className="absolute bottom-10 right-10 z-30 hidden aspect-video w-[30vw] overflow-hidden rounded-2xl shadow-xl md:block"
        >
          <ManifestoThumb narrativeState={narrativeState} />
        </motion.div>
      )}
    </section>
  );
}