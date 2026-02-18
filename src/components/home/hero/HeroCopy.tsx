'use client';

import React, { useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import type { Group } from 'three';
import { GHOST_EASE, MOTION_TOKENS } from '@/config/motion';
import { useGhostReveal } from '@/hooks/useGhostReveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { HOME_CONTENT } from '@/config/content';
import { Container } from '@/components/layout/Container';

// --- STYLES & CONFIG ---

// Mask Styles (Converted from CSS Module)
// We use inline styles for the mask because it relies on dynamic CSS variables (--ghost-x, --ghost-y)
const maskLayerStyle: React.CSSProperties = {
  maskImage: `radial-gradient(
    circle var(--ghost-radius, 420px) at var(--ghost-x, 50vw) var(--ghost-y, 50vh),
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.85) 25%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 0.15) 75%,
    rgba(0, 0, 0, 0) 100%
  )`,
  WebkitMaskImage: `radial-gradient(
    circle var(--ghost-radius, 420px) at var(--ghost-x, 50vw) var(--ghost-y, 50vh),
    rgb(1, 1, 16) 0%,
    rgba(0, 0, 0, 0.85) 25%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 0.15) 75%,
    rgba(0, 0, 0, 0) 100%
  )`,
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
};

// Text Glow (Converted from CSS Module)
const textGlowStyle: React.CSSProperties = {
  textShadow: `
    0 0 8px rgba(255, 255, 255, 0.9),
    0 0 20px rgba(255, 255, 255, 0.7),
    0 0 40px rgba(79, 230, 255, 0.5),
    0 0 80px rgba(0, 72, 255, 0.4)
  `,
};

/**
 * Animation: Page Load Entry
 */
const textContainerAnimation: Variants = {
  initial: {
    opacity: 0,
    y: MOTION_TOKENS.offset.standard,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: GHOST_EASE,
      staggerChildren: MOTION_TOKENS.stagger.normal,
    },
  },
};

const itemAnimation: Variants = {
  initial: { opacity: 0, y: MOTION_TOKENS.offset.standard },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_TOKENS.duration.normal,
      ease: GHOST_EASE,
    },
  },
};

export default function HeroCopy({
  ghostRef,
  isLoaded = true,
}: {
  ghostRef?: React.RefObject<Group | null>;
  isLoaded?: boolean;
}) {
  const revealRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Sincroniza a posição do overlay 2D com o Ghost 3D
  useGhostReveal(ghostRef, revealRef, isLoaded && !prefersReducedMotion);

  const motionProps = prefersReducedMotion
    ? {}
    : {
      initial: 'initial' as const,
      animate: 'animate' as const,
      variants: textContainerAnimation,
    };

  const renderTextContent = (isMask: boolean) => (
    <Container className={isMask ? 'text-white' : 'text-white/85'}>
      <div className="flex flex-col items-center">
        {/* Headline - Desktop (2 linhas) */}
        <div
          aria-hidden="true"
          className="hidden lg:block mb-20 font-display font-black leading-[0.9] tracking-[-0.07em]
                     text-[clamp(3rem,12vw,10rem)] md:text-[clamp(4.5rem,15vw,10rem)]
                     pl-[env(safe-area-inset-left,0)] pr-[env(safe-area-inset-right,0)]"
          style={isMask ? textGlowStyle : {}}
        >
          {HOME_CONTENT.hero.titleDesktop.map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < HOME_CONTENT.hero.titleDesktop.length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>

        {/* Headline - Mobile & Tablet (Visual Only) */}
        <div
          aria-hidden="true"
          className="lg:hidden mb-12 font-display font-black leading-[0.95] tracking-[-0.04em]
                     text-[clamp(3rem,12vw,10rem)]
                     pl-[env(safe-area-inset-left,0)] pr-[env(safe-area-inset-right,0)]"
          style={isMask ? textGlowStyle : {}}
        >
          {HOME_CONTENT.hero.titleMobile.map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < HOME_CONTENT.hero.titleMobile.length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>

        {/* Subheading */}
        <p
          className={`font-h2 type-h2 mt-6 lg:mt-9 text-textSecondary max-w-[90vw] md:max-w-none mx-auto
                     text-[clamp(0.875rem,4vw,2rem)] md:text-[clamp(1.125rem,3vw,2.5rem)]
                     leading-snug md:leading-tight tracking-wide md:tracking-wider
                     ${isMask ? '' : 'opacity-80'}`}
        >
          {HOME_CONTENT.hero.subtitle}
        </p>
      </div>
    </Container>
  );

  return (
    <motion.div
      {...motionProps}
      className="relative flex flex-col items-center justify-center text-center w-full pointer-events-auto"
    >
      <h1 className="sr-only">
        {HOME_CONTENT.hero.title.join(' ')} {HOME_CONTENT.hero.subtitle}
      </h1>

      {/* Camada 1: Texto Base (Low Opacity) */}
      <motion.div
        variants={itemAnimation}
        className="w-full flex flex-col items-center"
      >
        {renderTextContent(false)}
        <div className="h-[56px] pt-6 md:h-[48px] md:pt-8" /> {/* Spacer */}
      </motion.div>

      {/* Camada 2: Texto Revelado (Masked / Bright / Glow) */}
      {!prefersReducedMotion && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden"
          style={maskLayerStyle}
          aria-hidden="true"
        >
          <div className="w-full flex flex-col items-center text-center">
            <motion.div variants={itemAnimation}>
              {renderTextContent(true)}
              <div className="h-[56px] pt-6 md:h-[48px] md:pt-8" />
            </motion.div>
          </div>
        </div>
      )}

      {/* Brilho Global (Aura do Ghost) */}
      <div
        ref={revealRef}
        className={`fixed top-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-primary/20 blur-[120px] pointer-events-none mix-blend-screen z-10 
                    transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </motion.div>
  );
}
