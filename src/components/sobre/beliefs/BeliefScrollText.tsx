'use client';

import { Container } from '@/components/layout/Container';
import { m, useTransform, animate, inView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useBeliefsScrollContext } from './BeliefsScrollContext';
import { GHOST_EASE_AMBIENT } from '@/config/motion';
import { Z_INDEX } from '@/config/z-indices';
import { BELIEF_LAYOUT, BELIEF_PHRASE_ITEMS, BELIEF_PHRASES } from '@/config/beliefTokens';

const REVEAL_DURATION = 0.8;
const EXIT_DURATION = 0.55;

function BeliefScrollTextItem({
  phrase,
  index,
}: {
  phrase: string;
  index: number;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const phraseRef = useRef<HTMLDivElement | null>(null);
  const { shouldReduceMotion } = useBeliefsScrollContext();

  useEffect(() => {
    const el = phraseRef.current;
    const section = sectionRef.current;
    if (!el || !section) return;

    if (shouldReduceMotion) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.filter = 'none';
      return;
    }

    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.filter = 'blur(6px)';

    const stop = inView(
      section,
      () => {
        animate(
          el,
          { opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)' },
          { duration: REVEAL_DURATION, ease: GHOST_EASE_AMBIENT }
        );

        return () => {
          animate(
            el,
            { opacity: 0, transform: 'translateY(-18px)', filter: 'blur(6px)' },
            { duration: EXIT_DURATION, ease: GHOST_EASE_AMBIENT }
          );
        };
      },
      { amount: 0.35, margin: '-15% 0px -15% 0px' }
    );

    return () => stop();
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      data-index={index}
      className="belief-scroll-section relative flex w-full snap-center items-end justify-center pb-[20vh] md:items-center md:justify-start md:pb-0"
      style={{ height: BELIEF_LAYOUT.phraseSectionHeight }}
    >
      <Container style={{ zIndex: Z_INDEX.beliefs.scrollText }}>
        <div
          ref={phraseRef}
          data-testid="belief-phrase"
          data-animation-contract="inview-y-opacity-blur"
          className="mx-auto max-w-[calc(100vw-2rem)] px-6 text-center will-change-[transform,opacity,filter] md:ml-0 md:max-w-[38vw] md:text-left lg:max-w-[34vw]"
        >
          <h2 className="text-[clamp(2rem,8vw,3rem)] md:text-[clamp(2.8rem,5.8vw,6.3rem)] font-h1 font-bold italic text-blueAccent">
            {phrase}
          </h2>
        </div>
      </Container>
    </section>
  );
}

export function BeliefScrollText() {
  const { activePhraseIndex, scrollYProgress, shouldReduceMotion } = useBeliefsScrollContext();

  const phrasesOpacity = useTransform(scrollYProgress, [0.48, 0.56], [1, 0]);

  return (
    <m.div
      data-testid="beliefs-scroll-text"
      className="relative w-full"
      style={{
        scrollSnapType: 'y proximity',
        zIndex: Z_INDEX.beliefs.scrollText,
        opacity: shouldReduceMotion ? 1 : phrasesOpacity,
      }}
    >
      <span aria-live="polite" aria-atomic="true" className="sr-only">
        {BELIEF_PHRASES[activePhraseIndex]}
      </span>

      <section className="flex h-[80vh] w-full snap-start items-center justify-center pointer-events-none">
        <Container>
          <div className="opacity-0">Spacer inicial</div>
        </Container>
      </section>

      {BELIEF_PHRASE_ITEMS.map((phrase, index) => (
        <BeliefScrollTextItem
          key={phrase.id}
          index={index}
          phrase={phrase.text}
        />
      ))}

      <section className="flex h-screen w-full snap-start items-center justify-center pointer-events-none">
        <Container>
          <div className="opacity-0">Spacer final</div>
        </Container>
      </section>
    </m.div>
  );
}
