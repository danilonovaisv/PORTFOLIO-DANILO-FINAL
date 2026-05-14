import type React from 'react';
import type { MotionValue } from 'motion/react';

export type BeliefPhrase = {
  id: string;
  text: string;
  backgroundStopIndex: number;
};

export type BeliefsScrollContextValue = {
  containerRef: React.RefObject<HTMLElement | null>;
  scrollYProgress: MotionValue<number>;
  isMobile: boolean;
  shouldReduceMotion: boolean;
  activeIndex: number;
  isClimax: boolean;
};
