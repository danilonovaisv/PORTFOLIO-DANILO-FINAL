'use client';

import React, { useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import type { Group } from 'three';
import { GHOST_EASE, MOTION_TOKENS } from '@/config/motion';

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

  // Estrutura de conteúdo idêntica para ambas as camadas para garantir alinhamento perfeito
  const renderTextContent = (isMask: boolean) => (
    <Container className={isMask ? styles.maskText : styles.baseText}>
      <div className="flex flex-col items-center">
        {/* Tag decorativa */}

        {/* Headline - Desktop (2 linhas) */}
        {/* Headline - Desktop (2 linhas) */}
        {/* Headline - Desktop (Visual Only) */}
        <div
          aria-hidden="true"
          className={`hidden lg:block mb-20 font-display ${styles.heroTitle}`}
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
          className={`lg:hidden mb-12 font-display ${styles.heroTitle}`}
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
          className={`font-h2 type-h2 mt-6 lg:mt-9 text-textSecondary ${isMask ? '' : 'opacity-80'} ${styles.heroSubtitle}`}
        >
          {HOME_CONTENT.hero.subtitle}
        </p>
      </div>
    </Container>
  );

  return (
    <motion.div
      {...motionProps}
      className={`relative flex flex-col items-center justify-center text-center w-full pointer-events-auto ${styles.root}`}
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
