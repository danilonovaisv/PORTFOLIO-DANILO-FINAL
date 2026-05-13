import type React from 'react';

export type BeliefPhrase = {
  id: string;
  text: string;
  backgroundStopIndex: number;
};

export type BeliefsScrollContextValue = {
  containerRef: React.RefObject<HTMLElement | null>;
  scrollYProgress: React.MutableRefObject<number>;
  isMobile: boolean;
  shouldReduceMotion: boolean;
  activeIndex: number;
  isClimax: boolean;
};
