'use client';

import React from 'react';
import { motion, MotionValue, useMotionValue, useTransform } from 'framer-motion';

interface BeliefFinalSectionProps {
  scrollProgress?: MotionValue<number>;
  bgColor: string;
  MotionDiv?: React.ElementType;
  prefersReducedMotion?: boolean;
}

export const BeliefFinalSection: React.FC<BeliefFinalSectionProps> = ({
  scrollProgress,
  bgColor,
  MotionDiv,
  prefersReducedMotion,
}) => {
  const staticProgress = useMotionValue(1);
  const progress = scrollProgress ?? staticProgress;
  const opacity = useTransform(progress, [0.8, 1], [0, 1]);
  const Container = MotionDiv ?? motion.div;

  return (
    <Container
      style={
        prefersReducedMotion ? { backgroundColor: bgColor } : { opacity, backgroundColor: bgColor }
      }
      className="w-full h-screen flex flex-col items-center justify-center p-8 text-center"
    />
  );
};
