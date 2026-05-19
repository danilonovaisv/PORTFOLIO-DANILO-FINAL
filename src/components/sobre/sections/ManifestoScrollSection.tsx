'use client';

import { useRef } from 'react';
import { useScroll, useTransform, m } from 'motion/react';
import type { MotionValue } from 'motion/react';
import { ShaderAnimation } from '@/components/ui/shader-lines';
import { WhatMovesMeBackground } from '@/components/sobre/beliefs/WhatMovesMeBackground';
import { useMotionGate } from '@/hooks/useMotionGate';

// ─── Content ──────────────────────────────────────────────────────────────────

const PHRASES = [
  'Crio o que a marca diz antes mesmo de falar.',
  'Transformo intenção em presença.',
  'Entre estética e estratégia, eu construo percepção.',
  'O que fica não é só a imagem. É a sensação de marca.',
] as const;

type Phrase = (typeof PHRASES)[number];

const BAND = 1 / PHRASES.length; // 0.25 per phrase

// ─── PhraseLayer ──────────────────────────────────────────────────────────────

interface PhraseLayerProps {
  text: Phrase;
  index: number;
  scrollYProgress: MotionValue<number>;
  prefersReducedMotion: boolean;
}

function PhraseLayer({
  text,
  index,
  scrollYProgress,
  prefersReducedMotion,
}: PhraseLayerProps) {
  const isLast = index === PHRASES.length - 1;

  // Mutable number[] required by useTransform's InputRange type
  const fadeInStart = index * BAND;
  const fadeInEnd   = index * BAND + BAND * 0.24;
  const peakEnd     = (index + 1) * BAND - BAND * 0.24;
  const fadeOutEnd  = isLast ? 1 : (index + 1) * BAND;

  const inputRange: number[] = [fadeInStart, fadeInEnd, peakEnd, fadeOutEnd];

  const opacity = useTransform(
    scrollYProgress,
    inputRange,
    isLast ? [0, 1, 1, 1] : [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    inputRange,
    isLast ? [18, 0, 0, 0] : [18, 0, 0, -18]
  );

  const filter = useTransform(
    scrollYProgress,
    inputRange,
    isLast
      ? ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(0px)']
      : ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(8px)']
  );

  return (
    <m.div
      aria-label={text}
      className="belief-phrase"
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        y: prefersReducedMotion ? 0 : y,
        filter: prefersReducedMotion ? 'none' : filter,
        willChange: 'transform',
      }}
    >
      <p
        aria-hidden="true"
        style={{
          color: '#fcffff',
          textAlign: 'center',
          fontFamily: 'inherit',
          fontSize: 'clamp(1.75rem, 4.5vw, 3.5rem)',
          fontWeight: 500,
          fontStyle: 'italic',
          lineHeight: 1.1,
          letterSpacing: '-0.035em',
          userSelect: 'none',
          paddingLeft: 'clamp(1.5rem, 6vw, 6rem)',
          paddingRight: 'clamp(1.5rem, 6vw, 6rem)',
        }}
      >
        {text}
      </p>
    </m.div>
  );
}

// ─── ManifestoScrollSection ───────────────────────────────────────────────────

/**
 * Scroll-driven manifesto section.
 *
 * Architecture:
 *   - h-[400vh] outer section creates the scroll track
 *   - sticky top-0 inner stage stays in viewport while user scrolls
 *   - ShaderAnimation (fixed -z-50) fades in/out via MotionValue<number>
 *   - 4 phrases, each occupying 25% of scroll progress
 */
export function ManifestoScrollSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useMotionGate();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Shader fades in at section entry (0→5%) and out at exit (95→100%)
  const shaderOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    prefersReducedMotion ? [0, 0, 0, 0] : [0, 1, 1, 0]
  );

  return (
    <section
      ref={sectionRef}
      id="o-que-me-move"
      data-testid="beliefs-section"
      aria-labelledby="manifesto-section-title"
      className="relative h-[400vh]"
    >
      <h2 id="manifesto-section-title" className="sr-only">
        O que me move
      </h2>

      {/* Global background shader — fixed -z-50, fade controlled by scroll */}
      <ShaderAnimation opacity={shaderOpacity} />

      {/* Sticky stage: persists in viewport across the 400vh scroll track */}
      <div className="sticky top-0 h-dvh overflow-hidden">
        {/* Gradient overlay on top of shader */}
        <WhatMovesMeBackground />

        <div
          data-testid="beliefs-scroll-text"
          className="relative h-full w-full"
          aria-live="polite"
          aria-atomic="true"
        >
          {PHRASES.map((text, i) => (
            <PhraseLayer
              key={text}
              text={text}
              index={i}
              scrollYProgress={scrollYProgress}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        {/* Scroll progress bar */}
        <m.div
          aria-hidden="true"
          style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
          className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-[#0048ff]/40 to-transparent"
        />
      </div>
    </section>
  );
}
