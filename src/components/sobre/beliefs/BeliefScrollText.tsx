'use client';

/**
 * BeliefScrollText — Layer 3 (z-40).
 * Frases rotatórias em #4fe6ff (blueAccent).
 *
 * Desktop: frases empilhadas com janela de visibilidade contínua via useTransform.
 * Mobile: uma frase por vez via AnimatePresence mode="wait" — evita sobreposição.
 *
 * CORREÇÃO v2:
 * • AnimatePresence mode="wait" no mobile (update 2026-04-05)
 * • translateY máximo: 18px (GDS — proibido ultrapassar)
 * • prefersReducedMotion trava y=0, opacity=1 (estado final estático)
 * • Janela de entrada desktop: 0.50→0.64 para frase 1 (gate removido, v4)
 * • Janela mobile: 0.16→0.94 (pós-intro, pré-manifesto)
 *
 * Fonte: Motion docs — AnimatePresence mode="wait", useTransform continuous
 */

import {
  AnimatePresence,
  motion,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { useEffect, useState } from 'react';

interface BeliefScrollTextProps {
  phrases: readonly string[];
  scrollProgress: MotionValue<number>;
  isMobile?: boolean;
  prefersReducedMotion?: boolean;
}

// Janela global do texto rotativo (desktop e mobile)
const ENTER_START = 0.16;
const EXIT_END = 0.94;

// ── Desktop: uma phrase por janela de scroll ──────────────────────────────────
const DesktopPhrase = ({
  phrase,
  index,
  total,
  scrollProgress,
  prefersReducedMotion,
}: {
  phrase: string;
  index: number;
  total: number;
  scrollProgress: MotionValue<number>;
  prefersReducedMotion: boolean;
}) => {
  const segSize = (EXIT_END - ENTER_START) / total;
  const segStart = ENTER_START + index * segSize;
  const segEnd = segStart + segSize;
  const midIn = segStart + segSize * 0.18;
  const midOut = segStart + segSize * 0.82;

  const opacity = useTransform(
    scrollProgress,
    [segStart, midIn, midOut, segEnd],
    prefersReducedMotion ? [1, 1, 1, 1] : [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollProgress,
    [segStart, midIn, midOut, segEnd],
    prefersReducedMotion ? [0, 0, 0, 0] : [18, 0, 0, -18]
  );

  return (
    <motion.p
      style={{
        opacity,
        y,
        position: 'absolute',
        fontSize: 'clamp(2.8rem, 5.8vw, 6.3rem)',
      }}
      className="font-h1 font-bold text-[#4fe6ff] leading-[1.05]
                 left-6 md:left-16 lg:left-24 max-w-[38vw] lg:max-w-[34vw]"
      aria-hidden="true"
    >
      {phrase}
    </motion.p>
  );
};

// ── Mobile: AnimatePresence mode="wait" ───────────────────────────────────────
const MobilePhrase = ({
  phrases,
  scrollProgress,
  prefersReducedMotion,
}: {
  phrases: readonly string[];
  scrollProgress: MotionValue<number>;
  prefersReducedMotion: boolean;
}) => {
  const [activeIdx, setActiveIdx] = useState<number>(-1);

  useEffect(() => {
    const unsub = scrollProgress.on('change', (v) => {
      if (v < ENTER_START || v > EXIT_END) {
        setActiveIdx(-1);
        return;
      }
      const seg = (v - ENTER_START) / (EXIT_END - ENTER_START);
      setActiveIdx(
        Math.min(phrases.length - 1, Math.floor(seg * phrases.length))
      );
    });
    return () => unsub();
  }, [scrollProgress, phrases.length]);

  if (prefersReducedMotion) {
    const idx = activeIdx >= 0 && activeIdx < phrases.length ? activeIdx : 0;
    return (
      <p
        className="font-h1 font-bold text-[#4fe6ff] text-center leading-tight px-6"
        style={{ fontSize: 'clamp(2rem, 8vw, 3rem)' }}
      >
        {phrases[idx]}
      </p>
    );
  }

  return (
    // mode="wait": frase saindo completa sua exit antes da próxima entrar
    <AnimatePresence mode="wait">
      {activeIdx >= 0 && activeIdx < phrases.length && (
        <motion.p
          key={`mobile-phrase-${activeIdx}`}
          initial={{ opacity: 0, x: -24, filter: 'blur(6px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, x: 24, filter: 'blur(6px)' }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="font-h1 font-bold text-[#4fe6ff] text-center
                     leading-tight px-6"
          style={{ fontSize: 'clamp(2rem, 8vw, 3rem)' }}
          aria-live="polite"
        >
          {phrases[activeIdx]}
        </motion.p>
      )}
    </AnimatePresence>
  );
};

// ── Componente principal ───────────────────────────────────────────────────────
export const BeliefScrollText = ({
  phrases,
  scrollProgress,
  isMobile = false,
  prefersReducedMotion = false,
}: BeliefScrollTextProps) => {
  if (isMobile) {
    return (
      <div
        className="relative w-full h-[80vh] flex items-end justify-center
                   pb-[20vh] pointer-events-none md:hidden"
      >
        <MobilePhrase
          phrases={phrases}
          scrollProgress={scrollProgress}
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>
    );
  }

  return (
    <div
      className="hidden md:block relative w-full h-full pointer-events-none"
      aria-label={phrases.join(' ')}
    >
      {phrases.map((phrase, index) => (
        <DesktopPhrase
          key={`desktop-${index}`}
          phrase={phrase}
          index={index}
          total={phrases.length}
          scrollProgress={scrollProgress}
          prefersReducedMotion={prefersReducedMotion}
        />
      ))}
    </div>
  );
};
