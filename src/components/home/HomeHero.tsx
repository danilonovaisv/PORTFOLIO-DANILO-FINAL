'use client';

import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import GhostStage from './GhostStage';
import HeroCopy from './HeroCopy';
import ManifestoThumb from './ManifestoThumb';

interface HomeHeroProps {
  children?: React.ReactNode;
  style?: {
    opacity: MotionValue<number>;
    scale: MotionValue<number>;
    y: MotionValue<number>;
  };
}

export default function HomeHero({ children, style }: HomeHeroProps) {
  // Nota: ManifestoThumb pode vir via children ou import direto se a arquitetura permitir.
  // Mantendo suporte a children caso Home passe o video thumb.

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-ghost-bg"
    >
      {/* 1. Ghost Background (z-0) */}
      <div className="absolute inset-0 z-0">
        <GhostStage />
      </div>

      {/* 2. Overlay Gradient (z-10) */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center, transparent 0%, #06071f 80%)',
          opacity: 0.8,
        }}
      />

      {/* 2. Content (z-20) */}
      <motion.div
        style={style}
        className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 md:px-12 pointer-events-none"
      >
        <div className="w-full max-w-6xl flex flex-col items-center justify-center">
          <div className="pointer-events-auto">
            <HeroCopy />
          </div>
        </div>
      </motion.div>

      {/* 3. Manifesto Thumb (z-30) */}
      {/* 
          Desktop: Rendered directly to allow Fullscreen Expansion via HomeIntro transforms.
          It must be 'absolute inset-0' so the transforms (scale, x, y) work from the center.
          The 'pointer-events-none' on the wrapper allows clicks to pass through to Hero text 
          when video is small/cornered (unless video itself has pointer-events-auto).
      */}
      <div className="hidden md:block absolute inset-0 z-30 pointer-events-none">
        {children || <ManifestoThumb />}
      </div>

      {/* Mobile Thumb - Visible only on mobile, below text */}
      <div className="md:hidden absolute bottom-24 left-1/2 -translate-x-1/2 z-30 w-[200px] h-[120px] pointer-events-auto">
        {children || <ManifestoThumb />}
      </div>
    </section>
  );
}
