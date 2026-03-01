'use client';

import Image from 'next/image';
import { useCallback, useRef } from 'react';
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
  const homeFeatured = resolveHomeFeaturedConfig(
    project.homeFeatured,
    project.featuredOnHome ?? project.isFeatured
  );
  const logoSrc = homeFeatured.logoPath ? getAssetUrl(homeFeatured.logoPath) : null;
  const showLogo =
    homeFeatured.cardStyle === 'ANIMATED_BG_INVERTED_LOGO' && !!logoSrc;
  const showThumb = !showLogo && !!mediaSource;

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (reducedMotion || !visualRef.current) return;
      if (event.pointerType && event.pointerType !== 'mouse') return;

      const rect = event.currentTarget.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
      const offsetY = (event.clientY - rect.top) / rect.height - 0.5;

      visualRef.current.style.setProperty(
        '--featured-card-x',
        `${(offsetX * 12).toFixed(2)}px`
      );
      visualRef.current.style.setProperty(
        '--featured-card-y',
        `${(offsetY * 10).toFixed(2)}px`
      );
    },
    [reducedMotion]
  );

  const resetPointerMotion = useCallback(() => {
    if (!visualRef.current) return;
    visualRef.current.style.setProperty('--featured-card-x', '0px');
    visualRef.current.style.setProperty('--featured-card-y', '0px');
  }, []);

  return (
    <div
      className={cn(
        'card-shell relative isolate overflow-hidden rounded-md border border-white/10 bg-white/[0.03] transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
        reducedMotion
          ? ''
          : 'md:group-hover:-translate-y-1 md:group-hover:scale-[1.01] md:group-hover:border-white/20 md:group-hover:shadow-[0_28px_84px_-28px_rgba(135,5,242,0.55)]'
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointerMotion}
    >
      <div
        ref={visualRef}
        className="absolute -inset-[4%] will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform:
            'translate3d(var(--featured-card-x, 0px), var(--featured-card-y, 0px), 0) scale(1.03)',
        }}
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
              className="object-cover opacity-55 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:opacity-68 md:group-hover:scale-[1.02]"
              loading={priority ? 'eager' : 'lazy'}
              priority={priority}
              onError={applyImageFallback}
            />
            <div className="absolute inset-0 bg-[#040013]/50" />
          </div>
        ) : null}
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,0,19,0.08)_0%,rgba(4,0,19,0.2)_52%,rgba(4,0,19,0.5)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(135,5,242,0.12),transparent_72%)] opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:opacity-100" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {showLogo ? (
        <div className="absolute inset-0 z-[var(--z-layer-content)] flex items-center justify-center px-10">
          <div className="relative h-[28%] w-[58%] max-h-[120px] max-w-[280px] min-w-[160px]">
            <Image
              src={logoSrc}
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 768px) 45vw, 240px"
              className="object-contain opacity-95 drop-shadow-[0_20px_40px_rgba(4,0,19,0.5)]"
              loading={priority ? 'eager' : 'lazy'}
              priority={priority}
              onError={applyImageFallback}
            />
          </div>
        </div>
      ) : null}

      {!showLogo && !showThumb ? (
        <div className="absolute inset-0 z-[var(--z-layer-content)] flex items-center justify-center px-8">
          <span className="text-bluePrimary/50 text-base font-mono uppercase tracking-[0.35em] text-center">
            {project.displayCategory}
          </span>
        </div>
      ) : null}

      <div className="absolute inset-0 rounded-md ring-1 ring-inset ring-white/10" />
    </div>
  );
}
