'use client';

import React, { useRef } from 'react';
import { motion } from 'motion/react';

interface BeliefSectionProps {
  index: number;
}

export function BeliefSection({ index }: BeliefSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <motion.section
      ref={sectionRef}
      className="relative w-full h-[100vh] pointer-events-none"
      // Scroll spacer section
      viewport={{ amount: 0.5 }}
    />
  );
}
