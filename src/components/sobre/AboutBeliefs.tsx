'use client';

import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import GhostEyes from './GhostEyes';
import { motionTokens } from './motion';

type PhraseSegment = {
  text: string;
  accent?: boolean;
};

const PHRASE_DURATION = 4200;
const PHRASE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const PHRASES: Array<{ id: number; segments: PhraseSegment[] }> = [
  {
    id: 1,
    segments: [
      { text: 'Um vídeo que ' },
      { text: 'respira', accent: true },
      { text: '.' },
    ],
  },
  {
    id: 2,
    segments: [
      { text: 'Uma marca que se ' },
      { text: 'reconhece', accent: true },
      { text: '.' },
    ],
  },
  {
    id: 3,
    segments: [
      { text: 'Um detalhe que ' },
      { text: 'fica', accent: true },
      { text: '.' },
    ],
  },
  {
    id: 4,
    segments: [
      { text: '' },
      { text: 'Crio', accent: true },
      { text: ' para gerar presença.' },
    ],
  },
  {
    id: 5,
    segments: [
      { text: '' },
      { text: 'Mesmo', accent: true },
      { text: ' quando não estou ali.' },
    ],
  },
  {
    id: 6,
    segments: [
      { text: '' },
      { text: 'Mesmo', accent: true },
      { text: ' quando ninguém percebe o esforço.' },
    ],
  },
];

const renderPhrase = (segments: PhraseSegment[]) =>
  segments.map((segment, index) => (
    <span
      key={`${segment.text}-${index}`}
      className={segment.accent ? 'text-primary font-semibold' : 'text-white font-light'}
    >
      {segment.text}
    </span>
  ));

export function AboutBeliefs() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.3, once: true });
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [showReveal, setShowReveal] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const timer = setTimeout(() => {
      setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
    }, PHRASE_DURATION);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion, phraseIndex]);

  useEffect(() => {
    setShowReveal(prefersReducedMotion);
    if (prefersReducedMotion) {
      return undefined;
    }

    const revealTimer = setTimeout(() => {
      setShowReveal(true);
    }, PHRASES.length * PHRASE_DURATION);

    return () => clearTimeout(revealTimer);
  }, [prefersReducedMotion]);

  const currentPhrase = PHRASES[phraseIndex];

  const phraseMotionProps = prefersReducedMotion
    ? {
        initial: { opacity: 1, y: 0, filter: 'blur(0px)' },
        animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
        exit: { opacity: 1, y: 0, filter: 'blur(0px)' },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: 28, filter: 'blur(8px)' },
        animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
        exit: { opacity: 0, y: -20, filter: 'blur(6px)' },
        transition: {
          opacity: { duration: 0.8, ease: PHRASE_EASE },
          y: { duration: 0.8, ease: PHRASE_EASE },
          filter: { duration: 0.8, ease: PHRASE_EASE },
        },
      };

  return (
    <section
      ref={sectionRef}
      className="bg-background relative overflow-hidden py-20 md:py-28 lg:py-32"
      aria-label="O que me move"
    >
      <div className="w-full max-w-[1200px] px-6 md:px-8 mx-auto flex flex-col items-center text-center gap-10">
        <motion.div
          variants={motionTokens.fadeGhost}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-[900px]"
        >
          <p className="text-[32px] sm:text-[36px] md:text-[44px] font-bold leading-[1.15] tracking-tight">
            Acredito no <span className="text-primary">design que muda o dia</span> de alguém.
            <br />
            Não pelo choque, <span className="text-primary">mas pela conexão.</span>
          </p>
        </motion.div>

        <div className="w-full flex flex-col items-center text-center">
          <div className="min-h-[32vh] md:min-h-[36vh] flex items-center justify-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={currentPhrase.id}
                className="text-[26px] sm:text-[30px] md:text-[36px] lg:text-[44px] font-semibold leading-[1.25] max-w-[700px]"
                initial={phraseMotionProps.initial}
                animate={phraseMotionProps.animate}
                exit={phraseMotionProps.exit}
                transition={phraseMotionProps.transition}
              >
                {renderPhrase(currentPhrase.segments)}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {showReveal && (
        <motion.div
          variants={motionTokens.fadeGhost}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          animate="visible"
          className="mt-16 w-full max-w-[1200px] px-6 md:px-8 mx-auto"
        >
          <div className="grid gap-10 items-center lg:grid-cols-2">
            <div className="flex justify-center lg:justify-start">
              <div className="w-[220px] h-[220px] md:w-[260px] md:h-[260px] lg:w-[320px] lg:h-[320px]">
                <GhostEyes interactive={!prefersReducedMotion} />
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 lg:items-start">
              <span className="text-[11px] uppercase tracking-[0.4em] text-white/60">
                ISSO É
              </span>
              <p className="text-[40px] sm:text-[48px] lg:text-[56px] font-black leading-[1.05] text-primary">
                GHOST
                <br />
                DESIGN.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
