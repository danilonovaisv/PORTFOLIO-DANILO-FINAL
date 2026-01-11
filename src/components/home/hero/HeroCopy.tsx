'use client';

import { motion, Variants } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useRef } from 'react';
import { useGhostReveal } from '@/hooks/useGhostReveal';
import type { Group } from 'three';
import styles from './HeroCopy.module.css';

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
      ease: [0.25, 0.46, 0.45, 0.94],
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
      ease: [0.25, 0.46, 0.45, 0.94],
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
    <div className={isMask ? styles.maskText : styles.baseText}>
      {/* Tag decorativa */}
      <span className={`block font-body mb-6 ${isMask ? '' : styles.tag}`}>
        [BRAND AWARENESS]
      </span>

      {/* Headline - Desktop/Tablet (2 linhas) */}
      <h1
        className={`hidden md:block font-black mb-1 md:mb-6 leading-[0.9] uppercase tracking-tighter ${styles.desktopH1}`}
      >
        Você não vê <br /> o design.
      </h1>

      {/* Headline - Mobile (3 linhas) */}
      <h1
        className={`md:hidden font-black mb-1 md:mb-4 leading-[0.85] uppercase tracking-tighter ${styles.mobileH1}`}
      >
        Você não <br /> vê o <br /> design.
      </h1>

      {/* Subheading */}
      <h2 className={`font-h2 md:bottom-10 ${isMask ? '' : styles.subText}`}>
        Mas ele vê você.
      </h2>
    </div>
  );

  return (
    <motion.div
      {...motionProps}
      className={`relative flex flex-col items-center justify-center text-center max-w-5xl px-4 pointer-events-auto ${styles.root}`}
    >
      {/* Camada 1: Texto Base (Low Opacity) */}
      <motion.div variants={itemAnimation}>
        {renderTextContent(false)}
      </motion.div>

      {/* Camada 2: Texto Revelado (Masked / Bright / Glow) */}
      {!prefersReducedMotion && (
        <div className={styles.maskLayer} aria-hidden="true">
          <div className="max-w-[1200px] px-4 w-full">
            <motion.div variants={itemAnimation}>
              {renderTextContent(true)}
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
