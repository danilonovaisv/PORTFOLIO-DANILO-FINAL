'use client';

import React, { useRef, useEffect } from 'react';
import { m, useAnimate, stagger } from 'motion/react';
import type { Group } from 'three';
import { GHOST_EASE, MOTION_TOKENS } from '@/config/motion';

import { useGhostReveal } from '@/hooks/useGhostReveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { HOME_CONTENT } from '@/config/content';
import { Container } from '@/components/layout/Container';

export default function HeroCopy({
  ghostRef,
  isLoaded = true,
}: {
  ghostRef?: React.RefObject<Group | null>;
  isLoaded?: boolean;
}) {
  const revealRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = React.useState(false);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Sincroniza a posição do overlay 2D com o Ghost 3D
  useGhostReveal(ghostRef, revealRef, isLoaded && !prefersReducedMotion);

  useEffect(() => {
    if (isMounted && !prefersReducedMotion && isLoaded && scope.current) {
      animate(
        '.hero-line',
        {
          y: [MOTION_TOKENS.offset.standard, 0],
          opacity: [0, 1],
          filter: ['blur(10px)', 'blur(0px)'],
        },
        {
          delay: stagger(MOTION_TOKENS.stagger.normal as number),
          duration: MOTION_TOKENS.duration.ghostIn,
          ease: GHOST_EASE as [number, number, number, number],
        }
      );

      animate(
        '.hero-subtitle',
        { y: [MOTION_TOKENS.offset.standard, 0], opacity: [0, 1] },
        {
          delay: MOTION_TOKENS.delay.medium,
          duration: MOTION_TOKENS.duration.normal as number,
          ease: GHOST_EASE as [number, number, number, number],
        }
      );
    }
  }, [prefersReducedMotion, isLoaded, animate, scope]);

  // Initial states for SSR and static render
  const initialStyles =
    !isMounted || prefersReducedMotion
      ? {}
      : { opacity: 0, y: MOTION_TOKENS.offset.standard };

  // Estrutura de conteúdo idêntica para ambas as camadas para garantir alinhamento perfeito
  const renderTextContent = (isMask: boolean) => (
    <Container
      className={
        isMask
          ? 'text-white [text-shadow:0_0_8px_rgba(255,255,255,0.9),0_0_20px_rgba(255,255,255,0.7),0_0_40px_rgba(79,230,255,0.5),0_0_80px_rgba(0,72,255,0.4)]'
          : 'text-white/85'
      }
    >
      <div className="flex flex-col items-center">
        {/* Editorial Tag */}
        {HOME_CONTENT.hero.tag && (
          <m.span
            className="hero-line mb-4 md:mb-6 block text-white text-[clamp(0.9rem,1.3vw,2rem)] tracking-[0.25em] uppercase font-semibold opacity-70"
            style={initialStyles}
            aria-hidden="true"
          >
            {HOME_CONTENT.hero.tag}
          </m.span>
        )}

        {/* Headline - Desktop & Tablet (Visual Only) -> md:block */}
        <div
          aria-hidden="true"
          className="hidden md:block mb-20 font-display text-[clamp(4.5rem,9.5vw,10rem)] font-black leading-[0.9] tracking-[-0.07em] whitespace-nowrap pl-[env(safe-area-inset-left,0)] pr-[env(safe-area-inset-right,0)]"
        >
          {HOME_CONTENT.hero.titleDesktop.map((line, i) => (
            <React.Fragment key={`desktop-${i}`}>
              <m.span className="hero-line inline-block" style={initialStyles}>
                {line}
              </m.span>
              {i < HOME_CONTENT.hero.titleDesktop.length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>

        {/* Headline - Mobile Only (Visual Only) -> md:hidden */}
        <div
          aria-hidden="true"
          className="md:hidden mb-12 font-display text-[clamp(2.25rem,11vw,8rem)] font-black leading-[0.95] tracking-[-0.04em] text-balance pl-[env(safe-area-inset-left,0)] pr-[env(safe-area-inset-right,0)]"
        >
          {HOME_CONTENT.hero.titleMobile.map((line, i) => (
            <React.Fragment key={`mobile-${i}`}>
              <m.span className="hero-line inline-block" style={initialStyles}>
                {line}
              </m.span>
              {i < HOME_CONTENT.hero.titleMobile.length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>

        {/* Subheading */}
        <m.p
          className={`hero-subtitle font-h2 type-h2 mt-6 lg:mt-9 text-textSecondary ${isMask ? '' : 'opacity-80'} text-[clamp(1.25rem,4.6vw,2rem)] md:text-[clamp(1.125rem,3vw,2.5rem)] font-medium leading-[1.4] md:leading-[1.2] opacity-60 tracking-[0.02em] md:tracking-[0.03em] max-w-full px-6 md:px-0 md:max-w-none mx-auto`}
          style={initialStyles}
        >
          {HOME_CONTENT.hero.subtitle}
        </m.p>
      </div>
    </Container>
  );

  return (
    <div
      ref={scope}
      className="relative z-10 flex flex-col items-center justify-center text-center w-full pointer-events-auto"
    >
      <h1 className="sr-only">
        {HOME_CONTENT.hero.tag ? `${HOME_CONTENT.hero.tag} ` : ''}
        {HOME_CONTENT.hero.title.join(' ')} {HOME_CONTENT.hero.subtitle}
      </h1>

      {/* Camada 1: Texto Base (Low Opacity) */}
      <div className="w-full flex flex-col items-center">
        {renderTextContent(false)}
      </div>

      {/* Camada 2: Texto Revelado (Masked / Bright / Glow) */}
      {!prefersReducedMotion && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-[var(--z-layer-glass)] overflow-hidden"
          style={{
            WebkitMaskImage: `radial-gradient(circle var(--ghost-radius, 420px) at var(--ghost-x, 50vw) var(--ghost-y, 50vh), rgb(1, 1, 16) 0%, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0) 100%)`,
            maskImage: `radial-gradient(circle var(--ghost-radius, 420px) at var(--ghost-x, 50vw) var(--ghost-y, 50vh), rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0) 100%)`,
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
          }}
          aria-hidden="true"
        >
          <div className="w-full flex flex-col items-center text-center">
            {renderTextContent(true)}
          </div>
        </div>
      )}

      {/* Brilho Global (Aura do Ghost) */}
      <div
        ref={revealRef}
        className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none mix-blend-screen z-10 transition-opacity duration-ghostIn ease-out"
        style={{
          backgroundColor: 'rgba(0, 72, 255, 0.2)',
          filter: 'blur(120px)',
          opacity: isLoaded ? 1 : 0,
        }}
      />
    </div>
  );
}
