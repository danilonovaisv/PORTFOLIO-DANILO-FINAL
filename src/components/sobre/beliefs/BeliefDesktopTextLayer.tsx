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
    [
      BELIEF_INTRO_END - 0.01,
      BELIEF_INTRO_END + 0.015,
      BELIEF_FINAL_START - 0.04,
      BELIEF_FINAL_START,
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
      data-testid="belief-text-layer-desktop"
      className="pointer-events-none absolute inset-0 z-20 hidden md:block"
      style={prefersReducedMotion ? undefined : { opacity: sectionOpacity }}
    >
      {/* SPEC: Text at left, with grid padding — pl-8 lg:pl-16 */}
      <div className="sticky top-0 h-screen w-full flex items-center pl-8 lg:pl-16">
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
  // SPEC: split by newline for multi-line desktop phrases
  const lines = text.split('\n');
  const motionProps = prefersReducedMotion
    ? {}
    : {
        // SPEC: Desktop vertical — entry from below, exit upward
        initial: { opacity: 0, y: 20, filter: 'blur(10px)' },
        animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
        exit: { opacity: 0, y: -20, filter: 'blur(10px)' },
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <Container
      className="pointer-events-none flex w-full max-w-[38vw] flex-col justify-center lg:max-w-[32vw]"
      data-testid={lineTestId}
      {...motionProps}
    >
      {lines.map((line, index) => (
        <div key={`${line}-${index}`} className="overflow-visible mb-1 md:mb-2 w-full">
          <span
            className="block max-w-fit text-left italic font-semibold tracking-[-0.01em] text-blueAccent text-belief-desktop whitespace-pre-line select-none drop-shadow-[0_4px_20px_rgba(79,230,255,0.25)]"
          >
            {line}
          </span>
        </div>
      ))}
    </Container>
  );
};
