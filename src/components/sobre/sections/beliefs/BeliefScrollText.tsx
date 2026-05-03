'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useBeliefStore } from '@/store/beliefStore';

interface Phrase {
  title: string;
  text: string;
}

interface BeliefScrollTextProps {
  phrases: Phrase[];
  prefersReducedMotion: boolean;
}

export function BeliefScrollText({
  phrases,
  prefersReducedMotion,
}: BeliefScrollTextProps) {
  const isMobile = useBeliefStore((s) => s.isMobile);

  return (
    <div
      className="absolute inset-0 z-30 pointer-events-none"
      data-testid="beliefs-scroll-text"
    >
      <div className="std-grid w-full h-full relative">
        {phrases.map((phrase, i) => (
          <PhraseItem
            key={i}
            index={i}
            phrase={phrase}
            isMobile={isMobile}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
    </div>
  );
}

function useTriggerInView(index: number, amount = 0.5) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const trigger = document.querySelector<HTMLElement>(
      `[data-belief-phrase-trigger="${index}"]`
    );
    if (!trigger) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: amount }
    );

    observer.observe(trigger);
    return () => observer.disconnect();
  }, [index, amount]);

  return isInView;
}

function PhraseItem({
  index,
  phrase,
  isMobile,
  prefersReducedMotion,
}: {
  index: number;
  phrase: Phrase;
  isMobile: boolean;
  prefersReducedMotion: boolean;
}) {
  const isInView = useTriggerInView(index, 0.5);

  return (
    <motion.div
      data-testid="belief-phrase"
      data-animation-contract="viewport-x-opacity"
      className="belief-phrase absolute flex flex-col pointer-events-none w-full md:w-auto text-center md:text-left left-0 md:left-0 lg:left-8 px-6 md:px-0 bottom-[15vh] md:bottom-auto md:top-1/2 md:-translate-y-1/2 max-w-[100vw] md:max-w-[45vw] lg:max-w-[40vw]"
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -100, y: isMobile ? 0 : '-50%' }}
      animate={
        isInView
          ? prefersReducedMotion
            ? { opacity: 1 }
            : { opacity: 1, x: 0, y: isMobile ? 0 : '-50%' }
          : prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, x: -100, y: isMobile ? 0 : '-50%' }
      }
      transition={{
        duration: 0.9,
        ease: [0.17, 0.55, 0.55, 1],
      }}
    >
      <span className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-blueAccent/70 md:mb-4 md:text-xs">
        {phrase.title}
      </span>
      <span
        className="font-display font-semibold italic leading-[1.15] text-blueAccent drop-shadow-[0_4px_20px_rgba(79,230,255,0.25)]"
        style={{
          fontSize: isMobile
            ? 'clamp(1.375rem, 6vw, 1.625rem)'
            : 'clamp(2rem, 2.4vw, 2.375rem)',
        }}
      >
        {phrase.text}
      </span>
    </motion.div>
  );
}
