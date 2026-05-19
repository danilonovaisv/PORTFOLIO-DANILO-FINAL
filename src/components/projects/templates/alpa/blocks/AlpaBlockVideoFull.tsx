'use client';

import React from 'react';
import { m } from 'motion/react';
import { GHOST_EASE, MOTION_TOKENS } from '@/config/motion';
import {
  extractYoutubeId,
  resolveLandingAsset,
} from '@/lib/media/asset-contract';
import { YouTubePlayer } from '@/components/ui/YouTubePlayer';

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
  const resolved = resolveLandingAsset(src, 'video');
  const resolvedPoster = resolveLandingAsset(poster, 'image');
  const youtubeId =
    resolved.ok && resolved.asset.provider === 'youtube'
      ? extractYoutubeId(resolved.asset.url)
      : null;

  return (
    <m.div
      initial={revealInitial}
      whileInView={revealVisible}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: MOTION_TOKENS.duration.normal, ease: GHOST_EASE }}
      className="w-full mb-12 md:mb-20 px-4 md:px-0"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-none bg-neutral/20">
        {!resolved.ok ? (
          <div className="flex h-full w-full items-center justify-center text-sm text-white/55">
            Mídia indisponível
          </div>
        ) : youtubeId ? (
          <YouTubePlayer
            videoId={youtubeId}
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <video
            src={resolved.asset.url}
            poster={resolvedPoster.ok ? resolvedPoster.asset.url : undefined}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>
    </m.div>
  );
}
