'use client';

import React, { useRef } from 'react';
import { motion, useScroll, cubicBezier } from 'motion/react';
import { useBeliefStore } from '@/store/beliefStore';
import { GHOST_EASE_AMBIENT } from '@/config/motion';

interface BeliefSectionProps {
  index: number;
  bgColor: string;
}

export function BeliefSection({ index, bgColor }: BeliefSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const setBgColor = useBeliefStore((s) => s.setBgColor);
  const ambientEase = cubicBezier(...GHOST_EASE_AMBIENT);

  return (
    <motion.section
      ref={sectionRef}
      className="relative w-full h-[100vh] pointer-events-none"
      onViewportEnter={() => {
        setBgColor(bgColor);
      }}
      // Bidirectional reset: if we leave the first section upwards, reset to void
      onViewportLeave={(entry) => {
        if (index === 0 && entry?.boundingClientRect.top > 0) {
          setBgColor('#040013');
        }
      }}
      viewport={{ amount: 0.5 }}
      style={{
        transition: `background-color 0.8s ${ambientEase}`,
      }}
    />
  );
}
