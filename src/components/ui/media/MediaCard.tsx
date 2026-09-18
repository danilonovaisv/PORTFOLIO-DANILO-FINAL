'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import type { ProjectMedia } from '@/lib/media/media-format';
import {
  MEDIA_FIT_CLASS,
  MEDIA_FORMAT_CLASS,
  getDefaultMediaFit,
} from '@/lib/media/media-format';
import { applyImageFallback, cn, getAssetUrl } from '@/lib/utils';

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
  pauseOffscreen?: boolean;
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
  pauseOffscreen = true,
  preload = 'metadata',
  objectPosition = 'center',
  'aria-hidden': ariaHidden,
}: MediaCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const fit =
    media.fit ??
    getDefaultMediaFit(media.kind === 'html' ? 'image' : media.kind);
  const mediaClasses = cn(
    'h-full w-full object-center',
    MEDIA_FIT_CLASS[fit],
    mediaClassName
  );
  const resolvedSrc = getAssetUrl(
    media.src,
    media.kind === 'video' ? { isVideo: true } : undefined
  );

  // Pause video off-screen (IntersectionObserver)
  useEffect(() => {
    const videoEl = videoRef.current;
    if (
      !videoEl ||
      !pauseOffscreen ||
      media.kind !== 'video' ||
      typeof IntersectionObserver === 'undefined'
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          if (!videoEl.paused) {
            videoEl.pause();
          }
        } else {
          if (videoEl.paused && autoPlay) {
            videoEl.play().catch(() => {});
          }
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(videoEl);
    return () => observer.disconnect();
  }, [pauseOffscreen, autoPlay, media.kind]);

  // Pause HTML iframe off-screen — manda mensagem postMessage ao iframe (melhor esforço)
  useEffect(() => {
    const iframeEl = iframeRef.current;
    if (
      !iframeEl ||
      !pauseOffscreen ||
      media.kind !== 'html' ||
      typeof IntersectionObserver === 'undefined'
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        try {
          iframeEl.contentWindow?.postMessage(
            entry.isIntersecting ? 'resume' : 'pause',
            '*'
          );
        } catch {
          // cross-origin iframe — ignora silenciosamente
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(iframeEl);
    return () => observer.disconnect();
  }, [pauseOffscreen, media.kind]);

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
          ref={videoRef}
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
      ) : media.kind === 'html' ? (
        // HTML embed thumbnail — sandboxed iframe com IntersectionObserver de pausa
        <iframe
          ref={iframeRef}
          srcDoc={media.src}
          title={media.alt || 'HTML Thumbnail'}
          className={cn('border-0', mediaClasses)}
          sandbox="allow-scripts allow-same-origin"
          aria-hidden={ariaHidden}
          loading="lazy"
        />
      ) : (
        <Image
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
