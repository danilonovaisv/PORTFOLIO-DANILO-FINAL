'use client';

import React, { useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import type { Group } from 'three';
import { GHOST_EASE } from '@/config/motion';

import { useGhostReveal } from '@/hooks/useGhostReveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { HOME_CONTENT } from '@/config/content';
import { Container } from '@/components/layout/Container';

import styles from './HeroCopy.module.css';

// noinspection JSDeprecatedSymbols
/**
 * Animation: Page Load Entry
 */
const textContainerAnimation: Variants = {
  initial: {
    opacity: 0,
    scale: 0.92,
    y: 60,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    scale: [0.92, 1.02, 1],
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: GHOST_EASE,
      staggerChildren: 0.15,
    },
  },
};

const itemAnimation: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
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

  // Estrutura de conteúdo idêntica para ambas as camadas para garantir alinhamento perfeito
  const renderTextContent = (isMask: boolean) => (
    <Container className={isMask ? styles.maskText : styles.baseText}>
      <div className="flex flex-col items-center">
        {/* Tag decorativa */}
        <span
          className={`block mb-3 lg:mb-4 tracking-[0.25em] uppercase font-bold text-accent text-micro ${isMask ? '' : styles.tag}`}
        >
          {HOME_CONTENT.hero.tag}
        </span>

        {/* Headline - Desktop (2 linhas) */}
        <h1
          className={`hidden lg:block mb-20 font-display ${styles.heroTitle}`}
        >
          {HOME_CONTENT.hero.title[0].split(' ').slice(0, 2).join(' ')} <br />
          {HOME_CONTENT.hero.title[0].split(' ').slice(2).join(' ')}
        </h1>

        {/* Headline - Mobile & Tablet (3 linhas) */}
        <h1 className={`lg:hidden mb-12 font-display ${styles.heroTitle}`}>
          {HOME_CONTENT.hero.title[0].split(' ').slice(0, 2).join(' ')} <br />
          {HOME_CONTENT.hero.title[0].split(' ').slice(2, 4).join(' ')} <br />
          {HOME_CONTENT.hero.title[0].split(' ').slice(4).join(' ')}
        </h1>

        {/* Subheading */}
        <h2
          className={`font-h2 type-h2 mt-6 lg:mt-9 text-textSecondary ${isMask ? '' : 'opacity-80'} ${styles.heroSubtitle}`}
        >
          {HOME_CONTENT.hero.subtitle}
        </h2>
      </div>
    </Container>
  );

  return (
    <motion.div
      {...motionProps}
      className={`relative flex flex-col items-center justify-center text-center w-full pointer-events-auto ${styles.root}`}
    >
      {/* Camada 1: Texto Base (Low Opacity) */}
      <motion.div
        variants={itemAnimation}
        className="w-full flex flex-col items-center"
      >
        {renderTextContent(false)}
        <div className={styles.ctaSpacer}></div>
      </motion.div>

      {/* Camada 2: Texto Revelado (Masked / Bright / Glow) */}
      {!prefersReducedMotion && (
        <div className={styles.maskLayer} aria-hidden="true">
          <div className="w-full flex flex-col items-center text-center">
            <motion.div variants={itemAnimation}>
              {renderTextContent(true)}
              <div className={styles.ctaSpacer}></div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Brilho Global (Aura do Ghost) */}
      <div
        ref={revealRef}
        className={`${styles.ghostAura} ${isLoaded ? styles.isLoaded : ''}`}
      />
    </motion.div>
  );
}
