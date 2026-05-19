'use client';

import React from 'react';
import { m } from 'motion/react';
import Image from 'next/image';
import type { ZoomAsset } from '../../types';
import { GHOST_EASE, MOTION_TOKENS } from '@/config/motion';
import { isVideo } from '@/lib/utils';
import {
  extractYoutubeId,
  resolveLandingAsset,
} from '@/lib/media/asset-contract';
import { YouTubePlayer } from '@/components/ui/YouTubePlayer';

interface AlpaBlockMediaTextProps {
  media: string;
  mediaType?: 'image' | 'video' | 'youtube';
  text: string;
  layout?: 'media-text' | 'text-media';
  alt?: string;
  poster?: string;
  revealInitial: any;
  revealVisible: any;
  openAsset: (
    _asset: ZoomAsset,
    _event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export function AlpaBlockMediaText({
  media,
  mediaType,
  text,
  layout = 'media-text',
  alt,
  poster,
  revealInitial,
  revealVisible,
  openAsset,
}: AlpaBlockMediaTextProps) {
  const isVid =
    mediaType === 'video' || mediaType === 'youtube' || (media && isVideo(media));
  const resolvedMedia = resolveLandingAsset(
    media,
    mediaType === 'youtube' ? 'youtube' : isVid ? 'video' : 'image'
  );
  const resolvedPoster = resolveLandingAsset(poster, 'image');
  const youtubeId =
    resolvedMedia.ok && resolvedMedia.asset.provider === 'youtube'
      ? extractYoutubeId(resolvedMedia.asset.url)
      : null;

  const MediaComponent = (
    <m.div
      initial={revealInitial}
      whileInView={revealVisible}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: MOTION_TOKENS.duration.normal, ease: GHOST_EASE }}
      className="relative aspect-square md:aspect-auto md:h-[50vh] overflow-hidden rounded-none bg-neutral/20"
    >
      {!resolvedMedia.ok ? (
        <div className="flex h-full w-full items-center justify-center text-sm text-white/55">
          Mídia indisponível
        </div>
      ) : youtubeId ? (
        <YouTubePlayer
          videoId={youtubeId}
          className="absolute inset-0 h-full w-full"
        />
      ) : resolvedMedia.asset.type === 'image' ? (
        <button
          onClick={(e) =>
            openAsset(
              {
                src: resolvedMedia.asset.url,
                kind: 'image',
                alt: alt || '',
              },
              e
            )
          }
          className="group relative h-full w-full overflow-hidden"
        >
          <Image
            src={resolvedMedia.asset.url}
            alt={alt || ''}
            fill
            className="object-cover transition-opacity duration-normal group-hover:opacity-90"
          />
        </button>
      ) : (
        <video
          src={resolvedMedia.asset.url}
          poster={resolvedPoster.ok ? resolvedPoster.asset.url : undefined}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
    </m.div>
  );

  const TextComponent = (
    <m.div
      initial={revealInitial}
      whileInView={revealVisible}
      viewport={{ once: true, margin: '-10%' }}
      transition={{
        duration: MOTION_TOKENS.duration.normal,
        delay: 0.1,
        ease: GHOST_EASE,
      }}
      className="flex flex-col justify-center"
    >
      <div className="text-base md:text-lg text-textSecondary leading-relaxed space-y-4">
        {text?.split('\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </m.div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-24 px-6 md:px-0 items-center">
      {layout === 'media-text' ? (
        <>
          {MediaComponent}
          {TextComponent}
        </>
      ) : (
        <>
          <div className="order-2 md:order-1">{TextComponent}</div>
          <div className="order-1 md:order-2">{MediaComponent}</div>
        </>
      )}
    </div>
  );
}
