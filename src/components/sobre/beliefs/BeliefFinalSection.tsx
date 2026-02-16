import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface BeliefFinalSectionProps {
  scrollProgress: MotionValue<number>;
  bgColor: string;
}

export const BeliefFinalSection: React.FC<BeliefFinalSectionProps> = ({
  scrollProgress,
  bgColor,
}) => {
  const opacity = useTransform(scrollProgress, [0.8, 1], [0, 1]);

  return (
    <motion.div
      style={{ opacity, backgroundColor: bgColor }}
      className="w-full h-screen flex flex-col items-center justify-center p-8 text-center"
    />
  );
};
