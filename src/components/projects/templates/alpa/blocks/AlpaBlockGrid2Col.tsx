'use client';

import React from 'react';
import { m } from 'motion/react';
import Image from 'next/image';
import type { ZoomAsset } from '../../types';
import { GHOST_EASE, MOTION_TOKENS } from '@/config/motion';

interface AlpaBlockGrid2ColProps {
  columns: any[];
  revealInitial: any;
  revealVisible: any;
  openAsset: (
    _asset: ZoomAsset,
    _event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export function AlpaBlockGrid2Col({
  columns,
  revealInitial,
  revealVisible,
  openAsset,
}: AlpaBlockGrid2ColProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-12 md:mb-20 px-4 md:px-0">
      {columns?.map((col, cIdx) => (
        <m.div
          key={cIdx}
          initial={revealInitial}
          whileInView={revealVisible}
          viewport={{ once: true, margin: '-10%' }}
          transition={{
            duration: MOTION_TOKENS.duration.normal,
            delay: cIdx * 0.1,
            ease: GHOST_EASE,
          }}
          className="relative aspect-square md:aspect-auto md:h-[60vh] overflow-hidden rounded-xl bg-neutral/20"
        >
          {col.type === 'image' ? (
            <button
              onClick={(e) =>
                openAsset(
                  {
                    src: col.src,
                    kind: 'image',
                    alt: col.alt || '',
                  },
                  e
                )
              }
              className="group relative h-full w-full overflow-hidden"
            >
              <Image
                src={col.src}
                alt={col.alt || ''}
                fill
                className="object-cover transition-transform duration-normal group-hover:scale-105"
              />
            </button>
          ) : col.type === 'video' ? (
            <video
              src={col.src}
              poster={col.poster}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : null}
        </m.div>
      ))}
    </div>
  );
}
