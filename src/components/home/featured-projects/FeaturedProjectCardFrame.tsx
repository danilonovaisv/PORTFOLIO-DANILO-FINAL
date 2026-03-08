'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';

import FeaturedProjectAnimatedBackground from '@/components/home/featured-projects/FeaturedProjectAnimatedBackground';
import type { FeaturedProjectBackgroundVariant } from '@/components/home/featured-projects/animated-backgrounds';
import { resolveHomeFeaturedConfig } from '@/lib/portfolio/home-featured';
import { applyImageFallback, cn, getAssetUrl } from '@/lib/utils';
import type { PortfolioProject } from '@/types/project';

type FeaturedProjectCardFrameProps = {
  project: PortfolioProject;
  backgroundVariant: FeaturedProjectBackgroundVariant;
  mediaSource?: string;
  priority?: boolean;
  reducedMotion: boolean;
};

export default function FeaturedProjectCardFrame({
  project,
  backgroundVariant,
  mediaSource,
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
  const showThumb = !showLogo && !!mediaSource;
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

  return (
    <div
      className={cn(
        'card-shell relative isolate overflow-hidden w-full h-full rounded-md border border-white/10 bg-white/[0.03] transition-[transform,box-shadow,border-color] duration-150 md:group-hover:duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
        reducedMotion
          ? ''
          : 'md:group-hover:-translate-y-px md:group-hover:border-white/20 md:group-hover:shadow-[0_28px_84px_-28px_rgba(135,5,242,0.55)]'
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointerMotion}
    >
      <div
        ref={visualRef}
        className="absolute -inset-[4%] will-change-transform transition-[translate,transform] duration-150 md:group-hover:duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
      >
        <FeaturedProjectAnimatedBackground variant={backgroundVariant} />

        {showThumb ? (
          <div className="absolute inset-0">
            <Image
              src={mediaSource}
              alt=""
              aria-hidden="true"
              fill
              sizes={project.layout.sizes ?? '100vw'}
              className="object-cover opacity-100 brightness-[1.06] contrast-[1.04] saturate-[1.02] transition-transform duration-150 md:group-hover:duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:-translate-y-px"
              loading={priority ? 'eager' : 'lazy'}
              priority={priority}
              onError={applyImageFallback}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,0,19,0.00)_0%,rgba(4,0,19,0.04)_54%,rgba(4,0,19,0.10)_100%)]" />
          </div>
        ) : null}
      </div>

      <div className={`absolute inset-0 ${topWashClass}`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(135,5,242,0.12),transparent_72%)] opacity-0 transition-opacity duration-150 md:group-hover:duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:opacity-100" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {showLogo ? (
        <div className="absolute inset-0 z-[var(--z-layer-content)] flex items-center justify-center px-6 sm:px-8 md:px-10">
          <div className="relative h-[36%] w-[72%] max-h-[176px] max-w-[420px] min-h-[88px] min-w-[180px]">
            <Image
              src={logoSrc}
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 768px) 52vw, 280px"
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
