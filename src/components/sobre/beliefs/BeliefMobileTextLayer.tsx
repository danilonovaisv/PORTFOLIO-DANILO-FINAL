'use client';

import React from 'react';
import {
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
  cubicBezier,
  AnimatePresence,
  useMotionValueEvent,
} from 'framer-motion';
import {
  BELIEF_FINAL_START,
  BELIEF_INTRO_END,
  BELIEF_PHRASE_ZONE_END,
} from '@/hooks/useBeliefsAnimation';

// Easing Ghost Padrão: cubic-bezier(0.22, 1, 0.36, 1)
const ghostEase = cubicBezier(0.22, 1, 0.36, 1);

interface MobileTextLayerProps {
  phrases: string[];
  scrollYProgress?: MotionValue<number>;
  MotionDiv?: React.ElementType;
  prefersReducedMotion?: boolean;
}

export const BeliefMobileTextLayer: React.FC<MobileTextLayerProps> = ({
  phrases,
  scrollYProgress,
  MotionDiv,
  prefersReducedMotion,
}) => {
  const totalPhrases = phrases.length;
  const staticProgress = useMotionValue(0);
  const progress = scrollYProgress ?? staticProgress;
  const Container = MotionDiv ?? motion.div;
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const segmentSize =
    (BELIEF_PHRASE_ZONE_END - BELIEF_INTRO_END) / totalPhrases;

  const sectionOpacity = useTransform(
    progress,
    [
      BELIEF_INTRO_END - 0.01,
      BELIEF_INTRO_END + 0.015,
      BELIEF_FINAL_START,
      0.94,
    ],
    [0, 1, 1, 0]
  );

  useMotionValueEvent(progress, 'change', (value) => {
    if (value <= BELIEF_INTRO_END || value >= BELIEF_PHRASE_ZONE_END) {
      setActiveIndex(-1);
      return;
    }

    const nextIndex = Math.min(
      totalPhrases - 1,
      Math.floor((value - BELIEF_INTRO_END) / segmentSize)
    );

    setActiveIndex(nextIndex);
  });

  const activePhrase = activeIndex >= 0 ? phrases[activeIndex] : null;

  return (
    <motion.div
      aria-hidden="true"
      data-testid="belief-text-layer-mobile"
      className="fixed inset-0 z-40 pointer-events-none md:hidden"
      style={prefersReducedMotion ? undefined : { opacity: sectionOpacity }}
    >
      <div className="absolute bottom-[20vh] left-0 right-0 px-6 text-center">
        <AnimatePresence mode="wait">
          {activePhrase ? (
            <MobilePhrase
              key={`${activeIndex}-${activePhrase}`}
              text={activePhrase}
              MotionDiv={Container}
              prefersReducedMotion={prefersReducedMotion}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

interface MobilePhraseProps {
  text: string;
  MotionDiv?: React.ElementType;
  prefersReducedMotion?: boolean;
}

const MobilePhrase: React.FC<MobilePhraseProps> = ({
  text,
  MotionDiv,
  prefersReducedMotion,
}) => {
  const Container = MotionDiv ?? motion.div;
  const mobileText = text.replace(/\n/g, ' ');
  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, x: -24, filter: 'blur(6px)' },
        animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
        exit: { opacity: 0, x: 24, filter: 'blur(6px)' },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <Container
      className="mx-auto w-full max-w-[82vw] text-center pointer-events-none"
      {...motionProps}
    >
      <span className="block w-full mx-auto text-balance text-blueAccent font-bold text-[clamp(2.15rem,8.2vw,3.6rem)] leading-[1.08] tracking-[-0.045em] [text-shadow:0_2px_10px_rgba(4,0,19,0.42)]">
        {mobileText}
      </span>
    </Container>
  );
};
