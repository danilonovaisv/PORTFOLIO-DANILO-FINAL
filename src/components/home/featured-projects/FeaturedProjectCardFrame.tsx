'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';

import FeaturedProjectAnimatedBackground from '@/components/home/featured-projects/FeaturedProjectAnimatedBackground';
import type { FeaturedProjectBackgroundVariant } from '@/components/home/featured-projects/animated-backgrounds';
import { MediaCard } from '@/components/ui/media/MediaCard';
import { resolveHomeFeaturedConfig } from '@/lib/portfolio/home-featured';
import { DEFAULT_VIDEO_POSTER } from '@/lib/video';
import {
  applyImageFallback,
  cn,
  getAssetUrl,
  supabaseLoader,
} from '@/lib/utils';
import type { ProjectMedia } from '@/lib/media/media-format';
import type { PortfolioProject } from '@/types/project';

type FeaturedProjectCardFrameProps = {
  project: PortfolioProject;
  backgroundVariant: FeaturedProjectBackgroundVariant;
  desktopMedia?: ProjectMedia | null;
  mobileMedia?: ProjectMedia | null;
  priority?: boolean;
  reducedMotion: boolean;
};

export default function FeaturedProjectCardFrame({
  project,
  backgroundVariant,
  desktopMedia,
  mobileMedia,
  priority = false,
  reducedMotion,
}: FeaturedProjectCardFrameProps) {
  const visualRef = useRef<HTMLDivElement | null>(null);
  const [logoFailed, setLogoFailed] = useState(false);
  const homeFeatured = resolveHomeFeaturedConfig(
    project.homeFeatured,
    project.featuredOnHome ?? project.isFeatured
  );
  const logoSrc = homeFeatured.logoPath
    ? getAssetUrl(homeFeatured.logoPath)
    : null;
  const shouldBypassNextOptimization =
    !!logoSrc &&
    (/\/storage\/v1\/render\/image\/public\//.test(logoSrc) ||
      /\.svg(?:$|\?)/i.test(logoSrc));
  const showLogo =
    homeFeatured.cardStyle === 'ANIMATED_BG_INVERTED_LOGO' &&
    !!logoSrc &&
    !logoFailed;
  const logoAltText = project.client
    ? `Logo de ${project.client}`
    : `Identidade visual de ${project.title}`;

  // Decide if we should show standard card thumbnails
  const showThumb = !showLogo && (!!desktopMedia || !!mobileMedia);

  const baseMediaDiffers =
    !!desktopMedia &&
    !!mobileMedia &&
    (desktopMedia.src !== mobileMedia.src ||
      desktopMedia.kind !== mobileMedia.kind ||
      desktopMedia.format !== mobileMedia.format);

  const topWashClass = showThumb
    ? 'bg-[linear-gradient(180deg,rgba(4,0,19,0.01)_0%,rgba(4,0,19,0.07)_56%,rgba(4,0,19,0.18)_100%)]'
    : 'bg-[linear-gradient(180deg,rgba(4,0,19,0.04)_0%,rgba(4,0,19,0.14)_56%,rgba(4,0,19,0.38)_100%)]';

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (reducedMotion || !visualRef.current) return;
      if (event.pointerType && event.pointerType !== 'mouse') return;

      const rect = event.currentTarget.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
      const offsetY = (event.clientY - rect.top) / rect.height - 0.5;

      visualRef.current.style.setProperty(
        'translate',
        `${(offsetX * 12).toFixed(2)}px ${(offsetY * 10).toFixed(2)}px`
      );
    },
    [reducedMotion]
  );

  const resetPointerMotion = useCallback(() => {
    if (!visualRef.current) return;
    visualRef.current.style.setProperty('translate', '0px 0px');
  }, []);

  const commonMediaClasses =
    'opacity-100 brightness-[1.06] contrast-[1.04] saturate-[1.02] transition-transform duration-micro md:group-hover:duration-fast ease-ghost md:group-hover:-translate-y-px';
  const cardMediaSizes =
    project.layout.sizes ??
    '(max-width: 768px) 92vw, (max-width: 1280px) 46vw, 31vw';

  return (
    <div
      className={cn(
        'card-shell relative isolate overflow-hidden w-full h-full rounded-md border border-white/10 bg-white/[0.03] transition-[transform,box-shadow,border-color] duration-micro md:group-hover:duration-fast ease-ghost',
        reducedMotion
          ? ''
          : 'md:group-hover:-translate-y-px md:group-hover:border-white/20 md:group-hover:shadow-[0_28px_84px_-28px_rgba(135,5,242,0.55)]'
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointerMotion}
    >
      <div
        ref={visualRef}
        className="absolute -inset-[4%] will-change-transform transition-[translate,transform] duration-micro md:group-hover:duration-fast ease-ghost"
      >
        <FeaturedProjectAnimatedBackground variant={backgroundVariant} />

        {showThumb ? (
          <div className="absolute inset-0">
            {desktopMedia && mobileMedia && baseMediaDiffers ? (
              <>
                <MediaCard
                  media={desktopMedia}
                  sizes={cardMediaSizes}
                  priority={priority}
                  poster={DEFAULT_VIDEO_POSTER}
                  className="absolute inset-0 hidden h-full w-full md:block"
                  mediaClassName={commonMediaClasses}
                  aria-hidden
                />
                <MediaCard
                  media={mobileMedia}
                  sizes={cardMediaSizes}
                  priority={priority}
                  poster={DEFAULT_VIDEO_POSTER}
                  className="absolute inset-0 block h-full w-full md:hidden"
                  mediaClassName={commonMediaClasses}
                  aria-hidden
                />
              </>
            ) : desktopMedia || mobileMedia ? (
              <MediaCard
                media={(desktopMedia ?? mobileMedia)!}
                sizes={cardMediaSizes}
                priority={priority}
                poster={DEFAULT_VIDEO_POSTER}
                className="absolute inset-0 h-full w-full"
                mediaClassName={commonMediaClasses}
                aria-hidden
              />
            ) : null}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,0,19,0.00)_0%,rgba(4,0,19,0.04)_54%,rgba(4,0,19,0.10)_100%)]" />
          </div>
        ) : null}
      </div>

      <div className={`absolute inset-0 ${topWashClass}`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(135,5,242,0.12),transparent_72%)] opacity-0 transition-opacity duration-micro md:group-hover:duration-fast ease-ghost md:group-hover:opacity-100" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay bg-[url('/site.assets/global/noise.svg')]" />

      {showLogo ? (
        <div className="absolute inset-0 z-[var(--z-layer-content)] flex items-center justify-center p-6 sm:p-8 md:p-12">
          <div className="relative h-full w-full max-h-[160px] max-w-[320px]">
            <Image
              loader={supabaseLoader}
              src={logoSrc}
              alt={logoAltText}
              fill
              sizes="(max-width: 768px) 52vw, 280px"
              quality={70}
              unoptimized={shouldBypassNextOptimization}
              className="object-contain object-center brightness-0 invert opacity-100 drop-shadow-[0_24px_48px_rgba(4,0,19,0.42)]"
              loading={priority ? 'eager' : 'lazy'}
              priority={priority}
              onError={(event) => {
                applyImageFallback(event);
                setLogoFailed(true);
              }}
            />
          </div>
        </div>
      ) : null}

      {!showLogo && !showThumb ? (
        <div className="absolute inset-0 z-[var(--z-layer-content)] flex items-center justify-center px-8">
          <span className="text-white/82 text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-center text-balance drop-shadow-[0_18px_32px_rgba(4,0,19,0.42)]">
            {project.client || project.title}
          </span>
        </div>
      ) : null}

      <div className="absolute inset-0 rounded-md ring-1 ring-inset ring-white/10" />
    </div>
  );
}
