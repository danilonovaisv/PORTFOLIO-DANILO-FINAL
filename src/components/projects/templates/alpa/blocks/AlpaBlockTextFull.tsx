'use client';

import React from 'react';
import { m } from 'motion/react';
import { GHOST_EASE, MOTION_TOKENS } from '@/config/motion';

interface AlpaBlockTextFullProps {
  title?: string;
  content: string;
  accentColor: string;
  revealInitial: any;
  revealVisible: any;
}

export function AlpaBlockTextFull({
  title,
  content,
  accentColor,
  revealInitial,
  revealVisible,
}: AlpaBlockTextFullProps) {
  return (
    <m.div
      initial={revealInitial}
      whileInView={revealVisible}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: MOTION_TOKENS.duration.normal, ease: GHOST_EASE }}
      className="max-w-3xl mx-auto mb-16 md:mb-24 px-6"
    >
      {title && (
        <h3
          className="text-2xl md:text-3xl font-bold mb-6"
          style={{ color: accentColor }}
        >
          {title}
        </h3>
      )}
      <div className="text-lg md:text-xl text-textSecondary leading-relaxed space-y-4">
        {content?.split('\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </m.div>
  );
}
