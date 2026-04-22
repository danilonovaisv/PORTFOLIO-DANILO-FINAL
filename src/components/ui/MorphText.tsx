'use client';

import React from 'react';
import { motion, useTransform, cubicBezier, MotionValue } from 'framer-motion';
import { GHOST_EASE } from '@/config/motion';

interface MorphTextProps {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
}

export const MorphText: React.FC<MorphTextProps> = ({
  children,
  progress,
  range,
  className,
}) => {
  const blur = useTransform(progress, range, ['blur(12px)', 'blur(0px)'], {
    ease: cubicBezier(...GHOST_EASE),
  });
  const opacity = useTransform(progress, range, [0, 1], {
    ease: cubicBezier(...GHOST_EASE),
  });
  const y = useTransform(progress, range, [40, 0], {
    ease: cubicBezier(...GHOST_EASE),
  });

  return (
    <motion.span
      style={{ filter: blur, opacity, y }}
      className={`block ${className || ''}`}
    >
      {children}
    </motion.span>
  );
};
