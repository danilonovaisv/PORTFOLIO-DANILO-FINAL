'use client';

import Image from 'next/image';
import type { ProjectMedia } from '@/lib/media/media-format';
import {
  MEDIA_FIT_CLASS,
  MEDIA_FORMAT_CLASS,
  getDefaultMediaFit,
} from '@/lib/media/media-format';
import {
  applyImageFallback,
  cn,
  getAssetUrl,
  supabaseLoader,
} from '@/lib/utils';

type MediaCardProps = {
  media: ProjectMedia;
  sizes?: string;
  priority?: boolean;
  className?: string;
  mediaClassName?: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  objectPosition?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
};

export function MediaCard({
  media,
  sizes = '100vw',
  priority = false,
  className,
  mediaClassName,
  poster,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  preload = 'metadata',
  objectPosition = 'center',
  'aria-hidden': ariaHidden,
}: MediaCardProps) {
  const fit = media.fit ?? getDefaultMediaFit(media.kind);
  const mediaClasses = cn(
    'h-full w-full object-center',
    MEDIA_FIT_CLASS[fit],
    mediaClassName
  );
  const resolvedSrc = getAssetUrl(
    media.src,
    media.kind === 'video' ? { isVideo: true } : undefined
  );

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-neutral/20',
        MEDIA_FORMAT_CLASS[media.format],
        className
      )}
    >
      {media.kind === 'video' ? (
        <video
          src={resolvedSrc}
          poster={poster}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          preload={preload}
          aria-hidden={ariaHidden}
          className={mediaClasses}
          style={{ objectPosition }}
        />
      ) : (
        <Image
          loader={supabaseLoader}
          src={resolvedSrc}
          alt={media.alt ?? ''}
          fill
          sizes={sizes}
          quality={60}
          className={mediaClasses}
          loading={priority ? 'eager' : 'lazy'}
          priority={priority}
          onError={applyImageFallback}
          style={{ objectPosition }}
        />
      )}
    </div>
  );
}
