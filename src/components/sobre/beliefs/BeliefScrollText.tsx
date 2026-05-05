'use client';

import { Container } from '@/components/layout/Container';
import { m, useTransform } from 'framer-motion';
import { useBeliefsScrollContext } from './BeliefsScrollContext';
import { MOTION_TOKENS } from '@/config/motion';
import { Z_INDEX } from '@/config/z-indices';
import { BELIEF_LAYOUT, BELIEF_PHRASE_ITEMS, BELIEF_PHRASES } from '@/config/beliefTokens';

function BeliefScrollTextItem({
  phrase,
  index,
  isActive,
}: {
  phrase: string;
  index: number;
  isActive: boolean;
}) {
  const { shouldReduceMotion } = useBeliefsScrollContext();

  const variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 18,
      filter: shouldReduceMotion ? 'none' : 'blur(6px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: MOTION_TOKENS.duration.bg,
        ease: MOTION_TOKENS.ease.ghost,
      },
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -18,
      filter: shouldReduceMotion ? 'none' : 'blur(6px)',
      transition: { duration: MOTION_TOKENS.duration.textOut },
    },
  };

  return (
    <section
      data-index={index}
      className="belief-scroll-section relative flex w-full snap-center items-end justify-center pb-[20vh] md:items-center md:justify-start md:pb-0"
      style={{ height: BELIEF_LAYOUT.phraseSectionHeight }}
    >
      <Container style={{ zIndex: Z_INDEX.beliefs.scrollText }}>
        <m.div
          data-testid="belief-phrase"
          data-active={isActive}
          data-animation-contract="viewport-y-opacity"
          initial="hidden"
          animate={isActive ? 'visible' : 'exit'}
          variants={variants}
          className="mx-auto max-w-[calc(100vw-2rem)] px-6 text-center will-change-transform md:ml-0 md:max-w-[38vw] md:text-left lg:max-w-[34vw]"
        >
          <h2 className="text-[clamp(2rem,8vw,3rem)] md:text-[clamp(2.8rem,5.8vw,6.3rem)] font-h1 font-bold italic text-blueAccent">
            {phrase}
          </h2>
        </m.div>
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
      <span
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
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
          isActive={index === activePhraseIndex}
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
