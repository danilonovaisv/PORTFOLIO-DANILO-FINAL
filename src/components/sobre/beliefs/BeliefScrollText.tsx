'use client';

import { Container } from '@/components/layout/Container';
import { m, useInView, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';
import { useBeliefsScrollContext } from './BeliefsScrollContext';
import { MOTION_TOKENS } from '@/config/motion';
import { Z_INDEX } from '@/config/z-indices';
import { BELIEF_LAYOUT, BELIEF_PHRASE_ITEMS } from '@/config/beliefTokens';

function BeliefScrollTextItem({
  phrase,
  index,
}: {
  phrase: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    margin: MOTION_TOKENS.reveal.beliefsMargin,
    amount: 0.1,
  });
  const { isMobile, scrollYProgress, shouldReduceMotion } =
    useBeliefsScrollContext();
  const [isActiveByProgress, setIsActiveByProgress] = useState(false);
  const entryX = isMobile ? 24 : -72;
  const exitX = isMobile ? -24 : 48;
  const isActive = isInView || isActiveByProgress;

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const start = 0.06 + index * 0.075;
    const end = start + 0.28;
    setIsActiveByProgress(latest >= start && latest <= end);
  });

  const variants = {
    hidden: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : entryX,
      filter: shouldReduceMotion ? 'none' : 'blur(6px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: {
        duration: MOTION_TOKENS.duration.bg,
        ease: MOTION_TOKENS.ease.ghost,
      },
    },
    exit: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : exitX,
      filter: shouldReduceMotion ? 'none' : 'blur(6px)',
      transition: { duration: MOTION_TOKENS.duration.textOut },
    },
  };

  // We use exit variant conceptually when it goes out of view
  // But simply using animate={isInView ? "visible" : "hidden"} achieves the toggle
  return (
    <section
      ref={ref}
      data-index={index}
      className="belief-scroll-section relative flex w-full snap-center items-end justify-center pb-[20vh] md:items-center md:justify-start md:pb-0"
      style={{ height: BELIEF_LAYOUT.phraseSectionHeight }}
    >
      <Container style={{ zIndex: Z_INDEX.beliefs.scrollText }}>
        <m.div
          data-testid="belief-phrase"
          data-animation-contract="viewport-x-opacity"
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
  return (
    <div
      data-testid="beliefs-scroll-text"
      className="relative w-full"
      style={{
        scrollSnapType: 'y proximity',
        zIndex: Z_INDEX.beliefs.scrollText,
      }}
    >
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
    </div>
  );
}
