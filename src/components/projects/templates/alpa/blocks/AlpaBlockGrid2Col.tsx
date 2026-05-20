'use client';

import React from 'react';
import { m } from 'motion/react';
import Image from 'next/image';
import type { ZoomAsset } from '../../types';
import { GHOST_EASE, MOTION_TOKENS } from '@/config/motion';
import {
  extractYoutubeId,
  resolveLandingAsset,
} from '@/lib/media/asset-contract';
import { YouTubePlayer } from '@/components/ui/YouTubePlayer';

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
      {columns?.map((col, cIdx) => {
        const isImage = col.type === 'image';
        const isVid = col.type === 'video' || col.type === 'youtube';
        const resolved = resolveLandingAsset(
          col.src,
          col.type === 'youtube' ? 'youtube' : isVid ? 'video' : 'image'
        );
        const resolvedPoster = resolveLandingAsset(col.poster, 'image');
        const youtubeId =
          resolved.ok && resolved.asset.provider === 'youtube'
            ? extractYoutubeId(resolved.asset.url)
            : null;

        return (
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
            className="relative aspect-square md:aspect-auto md:h-[60vh] overflow-hidden rounded-none bg-neutral/20"
          >
            {!resolved.ok ? (
              <div className="flex h-full w-full items-center justify-center text-sm text-white/55">
                Mídia indisponível
              </div>
            ) : youtubeId ? (
              <YouTubePlayer
                videoId={youtubeId}
                className="absolute inset-0 h-full w-full"
              />
            ) : isImage ? (
              <button
                onClick={(e) =>
                  openAsset(
                    {
                      src: resolved.asset.url,
                      kind: 'image',
                      alt: col.alt || '',
                    },
                    e
                  )
                }
                className="group relative h-full w-full overflow-hidden"
              >
                <Image
                  src={resolved.asset.url}
                  alt={col.alt || ''}
                  fill
                  className="object-cover transition-opacity duration-normal group-hover:opacity-90"
                />
              </button>
            ) : isVid ? (
              <video
                src={resolved.asset.url}
                poster={
                  resolvedPoster.ok ? resolvedPoster.asset.url : undefined
                }
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : null}
          </m.div>
        );
      })}
    </div>
  );
}
