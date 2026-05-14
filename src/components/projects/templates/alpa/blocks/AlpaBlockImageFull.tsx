'use client';

import React from 'react';
import { m } from 'motion/react';
import Image from 'next/image';
import type { ZoomAsset } from '../../types';
import { GHOST_EASE, MOTION_TOKENS } from '@/config/motion';

interface AlpaBlockImageFullProps {
  src: string;
  alt?: string;
  caption?: string;
  revealInitial: any;
  revealVisible: any;
  openAsset: (
    _asset: ZoomAsset,
    _event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export function AlpaBlockImageFull({
  src,
  alt,
  caption,
  revealInitial,
  revealVisible,
  openAsset,
}: AlpaBlockImageFullProps) {
  return (
    <m.div
      initial={revealInitial}
      whileInView={revealVisible}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: MOTION_TOKENS.duration.normal, ease: GHOST_EASE }}
      className="w-full mb-12 md:mb-20 px-4 md:px-0"
    >
      <button
        onClick={(e) =>
          openAsset(
            {
              src,
              kind: 'image',
              alt: alt || '',
            },
            e
          )
        }
        className="group relative block w-full overflow-hidden rounded-xl bg-neutral/20"
      >
        <Image
          src={src}
          alt={alt || ''}
          width={1920}
          height={1080}
          className="w-full h-auto transition-transform duration-normal group-hover:scale-105"
        />
        {caption && (
          <div className="absolute bottom-4 left-4 right-4 text-left">
            <p className="text-sm text-white/60 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full inline-block">
              {caption}
            </p>
          </div>
        )}
      </button>
    </m.div>
  );
}
