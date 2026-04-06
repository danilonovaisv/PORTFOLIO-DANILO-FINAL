'use client';

import React from 'react';
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion';
import {
  BELIEF_FINAL_START,
  BELIEF_INTRO_END,
  BELIEF_PHRASE_ZONE_END,
} from '@/hooks/useBeliefsAnimation';

interface BeliefDesktopTextLayerProps {
  phrases: string[];
  scrollYProgress?: MotionValue<number>;
  MotionDiv?: React.ElementType;
  prefersReducedMotion?: boolean;
}

export const BeliefDesktopTextLayer: React.FC<BeliefDesktopTextLayerProps> = ({
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
    [BELIEF_INTRO_END - 0.02, BELIEF_INTRO_END, BELIEF_FINAL_START - 0.04, BELIEF_FINAL_START],
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
      className="pointer-events-none fixed inset-0 z-[20] hidden md:flex"
      style={prefersReducedMotion ? undefined : { opacity: sectionOpacity }}
    >
      <div className="flex h-full w-full items-center pl-[15vw]">
        <AnimatePresence mode="wait">
          {activePhrase ? (
            <DesktopPhrase
              key={`${activeIndex}-${activePhrase}`}
              text={activePhrase}
              lineTestId={`belief-line-${activeIndex}`}
              MotionDiv={Container}
              prefersReducedMotion={prefersReducedMotion}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

interface DesktopPhraseProps {
  text: string;
  lineTestId: string;
  MotionDiv?: React.ElementType;
  prefersReducedMotion?: boolean;
}

const DesktopPhrase: React.FC<DesktopPhraseProps> = ({
  text,
  lineTestId,
  MotionDiv,
  prefersReducedMotion,
}) => {
  const Container = MotionDiv ?? motion.div;
  const lines = text.split('\n');
  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18, filter: 'blur(8px)' },
        animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
        exit: { opacity: 0, y: -18, filter: 'blur(8px)' },
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <Container
      className="pointer-events-none flex w-full max-w-[38vw] flex-col justify-center lg:max-w-[34vw]"
      data-testid={lineTestId}
      {...motionProps}
    >
      {lines.map((line, index) => (
        <span
          key={`${line}-${index}`}
          className="block max-w-fit whitespace-pre-line text-left font-bold italic tracking-[-0.04em] text-blueAccent"
          style={{
            fontSize: 'clamp(2.8rem,5.8vw,6.3rem)',
            lineHeight: 0.9,
          }}
        >
          {line}
        </span>
      ))}
    </Container>
  );
};
