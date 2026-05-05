'use client';

import { type MouseEvent as ReactMouseEvent } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { resolveSiteAssetUrl } from '@/lib/projects/template-schema';
import { getYouTubeId } from '@/lib/projects/asset-utils';
import { ResponsiveCaptionTrack } from '@/components/ui/ResponsiveCaptionTrack';
import { DEFAULT_CAPTIONS } from '@/lib/video';
import type { ZoomAsset, AssetKind } from './types';

interface AssetInteractiveProps {
  src?: string;
  alt?: string;
  kind: AssetKind;
  poster?: string;
  className?: string;
  videoAutoplay?: boolean;
  displayMode?: 'inline' | 'full';
  prefersReducedMotion: boolean;
  onOpen: (
    _asset: ZoomAsset,
    _event: ReactMouseEvent<HTMLButtonElement>
  ) => void;
}

export function AssetInteractive({
  src,
  alt,
  kind,
  poster,
  className,
  videoAutoplay,
  displayMode = 'inline',
  prefersReducedMotion,
  onOpen,
}: AssetInteractiveProps) {
  if (!src) return null;

  const resolved = resolveSiteAssetUrl(src);
  if (!resolved) {
    return (
      <div
        className={`flex min-h-[220px] items-center justify-center border border-white/15 bg-black/35 px-4 text-center text-sm text-white/72 ${className || ''}`}
      >
        Mídia indisponível
      </div>
    );
  }

  const resolvedPoster = resolveSiteAssetUrl(poster);
  const youtubeId = kind === 'youtube' ? getYouTubeId(src) : null;
  const isFullDisplay = displayMode === 'full';

  return (
    <button
      type="button"
      onClick={(event) =>
        onOpen(
          {
            src: resolved,
            kind,
            alt: alt || 'Asset do projeto',
            poster: resolvedPoster,
            youtubeId: youtubeId ?? undefined,
          },
          event
        )
      }
      className={`group relative block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${className || ''}`}
      aria-label="Abrir asset ampliado"
    >
      {kind === 'image' ? (
        isFullDisplay ? (
          <div className="relative w-full overflow-hidden bg-black/30">
            <Image
              src={resolved}
              alt={alt || 'Asset do projeto'}
              width={1920}
              height={1080}
              className="h-auto w-full object-contain"
              sizes="100vw"
              priority={true}
            />
          </div>
        ) : (
          <div className="relative aspect-[16/10] w-full bg-black/30">
            <Image
              src={resolved}
              alt={alt || 'Asset do projeto'}
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover"
            />
          </div>
        )
      ) : kind === 'youtube' && youtubeId ? (
        <div className="relative aspect-video w-full bg-black/50">
          <Image
            src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
            alt={alt || 'Vídeo do YouTube'}
            fill
            sizes="(max-width: 768px) 100vw, 70vw"
            className="object-cover"
            unoptimized
          />
          <span className="absolute inset-0 bg-black/35" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="alpa-circle inline-flex h-14 w-14 items-center justify-center border border-white/40 bg-bluePrimary text-white">
              <Play className="h-5 w-5" />
            </span>
          </span>
        </div>
      ) : (
        <video
          className={
            isFullDisplay
              ? 'block max-h-[82vh] w-full bg-black object-contain'
              : 'aspect-video w-full bg-black object-cover'
          }
          src={resolved}
          poster={resolvedPoster}
          autoPlay={videoAutoplay && !prefersReducedMotion}
          muted
          loop={videoAutoplay && !prefersReducedMotion}
          controls={false}
          playsInline
          preload="metadata"
        >
          <ResponsiveCaptionTrack src={DEFAULT_CAPTIONS} />
        </video>
      )}

      <span className="pointer-events-none absolute inset-0 border border-white/10 opacity-0 transition-opacity duration-standard group-hover:opacity-100" />
    </button>
  );
}
