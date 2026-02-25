'use client';

import React, { useRef, useEffect } from 'react';
import { useAnimate, stagger } from 'framer-motion';
import type { Group } from 'three';
import { GHOST_EASE, MOTION_TOKENS } from '@/config/motion';

import { useGhostReveal } from '@/hooks/useGhostReveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { HOME_CONTENT } from '@/config/content';
import { Container } from '@/components/layout/Container';

import styles from '@/components/home/hero/HeroCopy.module.css';

export default function HeroCopy({
  ghostRef,
  isLoaded = true,
}: {
  ghostRef?: React.RefObject<Group | null>;
  isLoaded?: boolean;
}) {
  const revealRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [scope, animate] = useAnimate();

  // Sincroniza a posição do overlay 2D com o Ghost 3D
  useGhostReveal(ghostRef, revealRef, isLoaded && !prefersReducedMotion);

  useEffect(() => {
    if (!prefersReducedMotion && isLoaded && scope.current) {
      animate(
        '.hero-line',
        { y: [MOTION_TOKENS.offset.standard, 0], opacity: [0, 1], filter: ['blur(10px)', 'blur(0px)'] },
        {
          delay: stagger(MOTION_TOKENS.stagger.normal as number),
          duration: 1.2,
          ease: GHOST_EASE as [number, number, number, number],
        }
      );

      animate(
        '.hero-subtitle',
        { y: [MOTION_TOKENS.offset.standard, 0], opacity: [0, 1] },
        { delay: 0.4, duration: MOTION_TOKENS.duration.normal as number, ease: GHOST_EASE as [number, number, number, number] }
      );
    }
  }, [prefersReducedMotion, isLoaded, animate, scope]);

  // Initial states for SSR and static render
  const initialStyles = prefersReducedMotion ? {} : { opacity: 0, translateY: MOTION_TOKENS.offset.standard };

  // Estrutura de conteúdo idêntica para ambas as camadas para garantir alinhamento perfeito
  const renderTextContent = (isMask: boolean) => (
    <Container className={isMask ? styles.maskText : styles.baseText}>
      <div className="flex flex-col items-center">
        {/* Headline - Desktop (Visual Only) */}
        <div
          aria-hidden="true"
          className={`hidden lg:block mb-20 font-display ${styles.heroTitle}`}
        >
          {HOME_CONTENT.hero.titleDesktop.map((line, i) => (
            <span
              key={i}
              className={`hero-line inline-block`}
              style={initialStyles}
            >
              {line}
              {i < HOME_CONTENT.hero.titleDesktop.length - 1 && <br />}
            </span>
          ))}
        </div>

        {/* Headline - Mobile & Tablet (Visual Only) */}
        <div
          aria-hidden="true"
          className={`lg:hidden mb-12 font-display ${styles.heroTitle}`}
        >
          {HOME_CONTENT.hero.titleMobile.map((line, i) => (
            <span
              key={i}
              className={`hero-line inline-block`}
              style={initialStyles}
            >
              {line}
              {i < HOME_CONTENT.hero.titleMobile.length - 1 && <br />}
            </span>
          ))}
        </div>

        {/* Subheading */}
        <p
          className={`hero-subtitle font-h2 type-h2 mt-6 lg:mt-9 text-textSecondary ${isMask ? '' : 'opacity-80'} ${styles.heroSubtitle}`}
          style={initialStyles}
        >
          {HOME_CONTENT.hero.subtitle}
        </p>
      </div>
    </Container>
  );

  return (
    <div
      ref={scope}
      // Ajuste de z-index do Hero garantindo contexto visual / stacking sobre o webGL (#ajustes-orquestrados)
      className={`relative z-10 flex flex-col items-center justify-center text-center w-full pointer-events-auto ${styles.root}`}
    >
      <h1 className="sr-only">
        {HOME_CONTENT.hero.title.join(' ')} {HOME_CONTENT.hero.subtitle}
      </h1>

      {/* Camada 1: Texto Base (Low Opacity) */}
      <div className="w-full flex flex-col items-center">
        {renderTextContent(false)}
      </div>

      {/* Camada 2: Texto Revelado (Masked / Bright / Glow) */}
      {!prefersReducedMotion && (
        <div className={styles.maskLayer} aria-hidden="true">
          <div className="w-full flex flex-col items-center text-center">
            {renderTextContent(true)}
          </div>
        </div>
      )}

      {/* Brilho Global (Aura do Ghost) */}
      <div
        ref={revealRef}
        className={`${styles.ghostAura} ${isLoaded ? styles.isLoaded : ''}`}
      />
    </div>
  );
}

