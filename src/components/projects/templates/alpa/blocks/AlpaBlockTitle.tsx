'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GHOST_EASE } from '@/config/motion';

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
    <motion.div
      initial={revealInitial}
      whileInView={revealVisible}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.7, ease: GHOST_EASE }}
      className="mb-8 md:mb-12 px-6"
    >
      <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
        {text}
      </h2>
    </motion.div>
  );
}
