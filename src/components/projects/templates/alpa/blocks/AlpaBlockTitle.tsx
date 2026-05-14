'use client';

import React from 'react';
import { m } from 'motion/react';
import { GHOST_EASE, MOTION_TOKENS } from '@/config/motion';

interface AlpaBlockTitleProps {
  text: string;
  revealInitial: any;
  revealVisible: any;
}

export function AlpaBlockTitle({
  text,
  revealInitial,
  revealVisible,
}: AlpaBlockTitleProps) {
  return (
    <m.div
      initial={revealInitial}
      whileInView={revealVisible}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: MOTION_TOKENS.duration.normal, ease: GHOST_EASE }}
      className="mb-8 md:mb-12 px-6"
    >
      <h2 className="text-4xl md:text-6xl font-bold tracking-tight">{text}</h2>
    </m.div>
  );
}
