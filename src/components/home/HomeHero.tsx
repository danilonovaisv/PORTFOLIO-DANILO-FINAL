'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import HeroPreloader from './HeroPreloader';
import HeroCopy from './HeroCopy';
import ManifestoThumb from './ManifestoThumb';
import GhostStage from './GhostStage';

import { useExperienceStore } from '@/store/experience.store';
import { resolveScrollState } from '@/antigravity';

export default function HomeHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { flags } = useExperienceStore();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  });

  // 🎞️ TRANSFORMS DO VÍDEO (APENAS DESKTOP)
  const scaleVideo = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const posYVideo = useTransform(scrollYProgress, [0, 1], ['50%', '0%']);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ['16px', '0px']);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const narrativeState = resolveScrollState(scrollYProgress.get());

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