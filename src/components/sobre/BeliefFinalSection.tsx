'use client';

import React, { useRef } from 'react';
import { MotionValue } from 'framer-motion';

interface BeliefFinalSectionProps {
  bgColor: string;
  scrollProgress?: MotionValue<number>;
}

export const BeliefFinalSection: React.FC<BeliefFinalSectionProps> = ({
  bgColor: _bgColor,
  scrollProgress: _scrollProgress,
}) => {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      className={`w-full h-screen flex flex-col items-center justify-center overflow-hidden px-4 bg-bluePrimary`}
    />
  );
};
