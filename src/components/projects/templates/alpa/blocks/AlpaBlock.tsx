'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { ZoomAsset } from '../../types';
import { MOTION_TOKENS } from '../../constants';

interface AlpaBlockProps {
  block: any;
  prefersReducedMotion: boolean;
  accentColor: string;
  revealInitial: any;
  revealVisible: any;
  openAsset: (asset: ZoomAsset, event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function AlpaBlock({
  block,
  prefersReducedMotion,
  accentColor,
  revealInitial,
  revealVisible,
  openAsset,
}: AlpaBlockProps) {
  switch (block.type) {
    case 'section-title':
      return (
        <motion.div
          initial={revealInitial}
          whileInView={revealVisible}
          viewport={{ once: true, margin: '-10%' }}
          className="mb-8 md:mb-12 px-6"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            {block.text}
          </h2>
        </motion.div>
      );

    case 'text-full':
      return (
        <motion.div
          initial={revealInitial}
          whileInView={revealVisible}
          viewport={{ once: true, margin: '-10%' }}
          className="max-w-3xl mx-auto mb-16 md:mb-24 px-6"
        >
          {block.title && (
            <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: accentColor }}>
              {block.title}
            </h3>
          )}
          <div className="text-lg md:text-xl text-textSecondary leading-relaxed space-y-4">
            {block.content?.split('\n').map((para: string, i: number) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </motion.div>
      );

    case 'image-full':
      return (
        <motion.div
          initial={revealInitial}
          whileInView={revealVisible}
          viewport={{ once: true, margin: '-10%' }}
          className="w-full mb-12 md:mb-20 px-4 md:px-0"
        >
          <button
            onClick={(e) =>
              openAsset(
                {
                  src: block.src,
                  kind: 'image',
                  alt: block.alt || '',
                },
                e
              )
            }
            className="group relative block w-full overflow-hidden rounded-xl bg-neutral/20"
          >
            <Image
              src={block.src}
              alt={block.alt || ''}
              width={1920}
              height={1080}
              className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
            />
            {block.caption && (
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <p className="text-sm text-white/60 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full inline-block">
                  {block.caption}
                </p>
              </div>
            )}
          </button>
        </motion.div>
      );

    case 'video-full':
      return (
        <motion.div
          initial={revealInitial}
          whileInView={revealVisible}
          viewport={{ once: true, margin: '-10%' }}
          className="w-full mb-12 md:mb-20 px-4 md:px-0"
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral/20">
            <video
              src={block.src}
              poster={block.poster}
              stagger={MOTION_TOKENS.duration.WORD_STAGGER}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </motion.div>
      );

    case 'grid-2-col':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-12 md:mb-20 px-4 md:px-0">
          {block.columns?.map((col: any, cIdx: number) => (
            <motion.div
              key={cIdx}
              initial={revealInitial}
              whileInView={revealVisible}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ delay: cIdx * 0.1 }}
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
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
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
            </motion.div>
          ))}
        </div>
      );

    case 'spacer':
      return <div style={{ height: block.height || '8rem' }} />;

    default:
      return null;
  }
}
