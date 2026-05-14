'use client';

import React from 'react';
import { m } from 'motion/react';
import { GHOST_EASE, MOTION_TOKENS } from '@/config/motion';

interface AlpaBlockVideoFullProps {
  src: string;
  poster?: string;
  revealInitial: any;
  revealVisible: any;
}

export function AlpaBlockVideoFull({
  src,
  poster,
  revealInitial,
  revealVisible,
}: AlpaBlockVideoFullProps) {
  return (
    <m.div
      initial={revealInitial}
      whileInView={revealVisible}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: MOTION_TOKENS.duration.normal, ease: GHOST_EASE }}
      className="w-full mb-12 md:mb-20 px-4 md:px-0"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral/20">
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </m.div>
  );
}
