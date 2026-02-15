'use client';

import React, { useMemo, useRef, useState } from 'react';
import {
  useInView,
  useMotionValueEvent,
  useScroll,
  MotionValue,
} from 'framer-motion';
import dynamic from 'next/dynamic';

import { BeliefFixedHeader, BeliefFinalSectionOverlay } from '../beliefs';
import { BRAND } from '@/config/brand';
import { useMotionGate } from '@/hooks/useMotionGate';

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

const GhostScene = dynamic<{ scrollProgress: MotionValue<number> }>(
  () =>
    import('../3d/GhostScene').then((mod: any) => {
      return mod.GhostScene || mod.default;
    }),
  {
    ssr: false,
    loading: () => <div className="w-full h-full bg-transparent" />,
  }
);

const PHRASES: readonly string[] = [
  'Um\nvídeo\nque\nrespira.',
  'Uma\nmarca\nque se\nreconhece.',
  'Um\ndetalhe\nque\nfica.',
  'Crio\npara\ngerar\npresença.',
  'Mesmo\nquando\nnão\nestou\nali.',
  'Mesmo\nquando\nninguém\npercebe\no esforço.',
];

const COLORS: readonly string[] = [
  BRAND.colors.bluePrimary,
  BRAND.colors.purpleDetails,
  BRAND.colors.pinkDetails,
  BRAND.colors.bluePrimary,
  BRAND.colors.purpleDetails,
  BRAND.colors.pinkDetails,
  BRAND.colors.bluePrimary,
];

export function AboutBeliefs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useMotionGate();
  const isInView = useInView(containerRef, { amount: 0.01 });

  const [baseColor, setBaseColor] = useState(COLORS[0]);
  const [overlayColor, setOverlayColor] = useState(COLORS[1]);
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);
  const [phraseProgress, setPhraseProgress] = useState(0);
  const [finalProgress, setFinalProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const segment = useMemo(() => 1 / (PHRASES.length + 1), []);

  const resetBeliefsState = React.useCallback(() => {
    setBaseColor(COLORS[0]);
    setOverlayColor(COLORS[1]);
    setOverlayOpacity(0);
    setActivePhraseIndex(0);
    setPhraseProgress(0);
    setFinalProgress(0);
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', (rawValue) => {
    const value = clamp01(rawValue);

    if (value <= 0.001) {
      resetBeliefsState();
      return;
    }

    const finalStart = segment * PHRASES.length;
    if (value >= finalStart) {
      const local = (value - finalStart) / Math.max(1 - finalStart, 0.0001);
      setBaseColor(COLORS[COLORS.length - 1]);
      setOverlayColor(COLORS[COLORS.length - 1]);
      setOverlayOpacity(0);
      setFinalProgress(clamp01(local));
      setPhraseProgress(1);
      setActivePhraseIndex(PHRASES.length - 1);
      return;
    }

    const index = Math.min(PHRASES.length - 1, Math.floor(value / segment));
    const localProgress = (value - index * segment) / segment;
    // O BG troca junto da entrada do texto (hump 0->1->0), evitando corte seco.
    const overlayIn = clamp01(localProgress / 0.45);
    const overlayOut = clamp01((1 - localProgress) / 0.35);
    const overlayMix = Math.min(overlayIn, overlayOut);

    setBaseColor(COLORS[index]);
    setOverlayColor(COLORS[index + 1]);
    setOverlayOpacity(overlayMix);
    setActivePhraseIndex(index);
    setPhraseProgress(clamp01(localProgress));
    setFinalProgress(0);
  });

  React.useEffect(() => {
    if (!isInView) {
      resetBeliefsState();
    }
  }, [isInView, resetBeliefsState]);

  const activePhrase = PHRASES[activePhraseIndex] ?? PHRASES[0];
  const phraseVisible = finalProgress < 0.04;
  const finalVisible = finalProgress > 0.06;
  const phraseIn = clamp01((phraseProgress - 0.04) / 0.34);
  const phraseOut = clamp01((1 - phraseProgress) / 0.28);
  const phraseOpacity = prefersReducedMotion ? 1 : phraseIn * phraseOut;
  const phraseTransformY = prefersReducedMotion
    ? 0
    : 18 - phraseIn * 18 - (1 - phraseOut) * 10;
  const phraseBlur = prefersReducedMotion
    ? 'blur(0px)'
    : `blur(${Math.max(0, (1 - phraseIn) * 8 + (1 - phraseOut) * 5)}px)`;

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[170vh] md:h-[180vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Layer 0: base background */}
        <div
          className="absolute inset-0 z-0 transition-colors duration-500"
          style={{ backgroundColor: baseColor }}
          aria-hidden="true"
        />
        {/* Layer 1: overlay crossfade */}
        <div
          className="absolute inset-0 z-[1] transition-opacity duration-300"
          style={{ backgroundColor: overlayColor, opacity: overlayOpacity }}
          aria-hidden="true"
        />

        {/* Layer 2: fixed intro header */}
        <BeliefFixedHeader scrollProgress={scrollYProgress} />

        {/* Layer 3: rotating phrase */}
        {phraseVisible && (
          <>
            <div className="hidden md:flex absolute inset-0 z-[30] pointer-events-none items-center px-[10%]">
              <div
                className="text-blueAccent italic font-bold whitespace-pre-line tracking-[-0.04em] leading-[0.85]"
                style={{
                  opacity: phraseOpacity,
                  transform: `translateY(${phraseTransformY}px)`,
                  filter: phraseBlur,
                  fontSize: 'clamp(2.6rem,5.8vw,6rem)',
                }}
              >
                {activePhrase}
              </div>
            </div>
            <div className="md:hidden absolute inset-x-0 bottom-[22%] z-[64] pointer-events-none px-8 text-center">
              <div
                className="text-blueAccent italic font-bold whitespace-pre-line tracking-widest leading-[1.35]"
                style={{
                  opacity: phraseOpacity,
                  transform: `translateY(${phraseTransformY}px)`,
                  filter: phraseBlur,
                  fontSize: 'clamp(2rem,6vw,3.5rem)',
                }}
              >
                {activePhrase}
              </div>
            </div>
          </>
        )}

        {/* Layer 4: final manifesto */}
        <div className="absolute inset-0 z-[82] pointer-events-none">
          <BeliefFinalSectionOverlay
            visible={finalVisible}
            progress={finalProgress}
          />
        </div>

        {/* Layer 5: Ghost 3D (acima de todas as camadas, conforme referência) */}
        {!prefersReducedMotion && (
          <div className="absolute inset-0 z-[95] pointer-events-none">
            <div className="w-full h-full pointer-events-auto flex md:items-center md:justify-center items-end justify-start">
              <div className="w-full h-full md:absolute md:inset-0 relative">
                <GhostScene scrollProgress={scrollYProgress} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
