'use client';

import React from 'react';
import Image from 'next/image';
import { m } from 'framer-motion';
import { useMotionGate } from '@/hooks/useMotionGate';
import { GHOST_EASE, MOTION_TOKENS } from '@/config/motion';
import { PortfolioProject } from '@/types/project';
import { cn } from '@/lib/utils';
import { getCardMediaCandidates } from '@/lib/portfolio/card-media';
import { isLegacyProjectMediaAsset } from '@/lib/portfolio/card-media';
import {
  ASSET_PLACEHOLDER,
  applyImageFallback,
  getAssetUrl,
  isVideo,
  supabaseLoader,
} from '@/lib/utils';
import { DEFAULT_VIDEO_POSTER } from '@/lib/video';

export type ProjectCardSize = 'sm' | 'md' | 'lg' | 'wide' | 'tall';

interface ProjectCardProps {
  project: PortfolioProject;
  index: number;
  onClick?: (_project: PortfolioProject) => void;
  className?: string;
  priority?: boolean;
  size?: ProjectCardSize;
}

/**
 * ProjectCard - Ghost Era v2.1
 * Card editorial com hover states refinados.
 * Sempre mostra imagem estática por padrão; vídeo aparece no hover se disponível.
 *
 * ⚡ BOLT OPTIMIZATION: Wrapped with React.memo to prevent unnecessary re-renders.
 * ProjectsGallery renders many of these cards and often re-renders on pagination
 * or filter changes. Memoizing prevents recalculating media URLs, motion
 * properties, and DOM layout for cards whose props haven't changed.
 * Expected impact: Significant reduction in render time during gallery interactions.
 */
export const ProjectCard = React.memo(function ProjectCard({
  project,
  index,
  onClick,
  className = '',
  priority = false,
  size = 'md',
}: ProjectCardProps) {
  const reduceMotion = useMotionGate();

  const motionProps = reduceMotion
    ? {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport: { once: true, amount: 0.2 },
      transition: { duration: MOTION_TOKENS.duration.fast },
    }
    : {
      initial: { opacity: 0, y: MOTION_TOKENS.offset.standard, filter: MOTION_TOKENS.blur.hidden },
      whileInView: { opacity: 1, y: 0, filter: MOTION_TOKENS.blur.visible },
      viewport: { once: true, margin: '-10% 0px -10% 0px' },
      transition: {
        duration: MOTION_TOKENS.duration.normal,
        delay: Math.min(0.18, index * 0.03),
        ease: GHOST_EASE as any,
      },
    };

  // Resolve best static image (never a video)
  const prefersSquareOnDesktop = ['sm', 'md', 'tall'].includes(size);

  const desktopMediaCandidate =
    getCardMediaCandidates(project, prefersSquareOnDesktop ? 'square' : 'landscape')[0] ??
    ASSET_PLACEHOLDER;

  const mobileMediaCandidate =
    getCardMediaCandidates(project, 'square')[0] ?? desktopMediaCandidate;

  const desktopMediaIsVideo = isVideo(desktopMediaCandidate);
  const mobileMediaIsVideo = isVideo(mobileMediaCandidate);
  const desktopMedia = getAssetUrl(
    desktopMediaCandidate,
    desktopMediaIsVideo ? { isVideo: true } : undefined
  );
  const mobileMedia = getAssetUrl(
    mobileMediaCandidate,
    mobileMediaIsVideo ? { isVideo: true } : undefined
  );
  const baseMediaDiffers =
    desktopMedia !== mobileMedia || desktopMediaIsVideo !== mobileMediaIsVideo;

  const hoverVideoCandidate =
    [project.videoPreview, project.thumbnailMedia].find(
      (candidate): candidate is string =>
        !!candidate &&
        isVideo(candidate) &&
        !isLegacyProjectMediaAsset(candidate)
    ) ?? null;
  const hoverVideoSource = hoverVideoCandidate
    ? getAssetUrl(hoverVideoCandidate, { isVideo: true })
    : undefined;
  const hasVideo =
    !!hoverVideoSource &&
    !(
      hoverVideoSource === desktopMedia &&
      hoverVideoSource === mobileMedia &&
      desktopMediaIsVideo &&
      mobileMediaIsVideo
    );

  const objectPosition = project.layout?.objectPosition ?? 'center';
  const sizeAwareSizes: Record<ProjectCardSize, string> = {
    sm: '(max-width: 640px) 92vw, (max-width: 1024px) 48vw, 400px',
    md: '(max-width: 640px) 92vw, (max-width: 1024px) 48vw, 400px',
    lg: '(max-width: 640px) 92vw, (max-width: 1024px) 92vw, 800px',
    wide: '(max-width: 640px) 92vw, (max-width: 1024px) 92vw, 1200px',
    tall: '(max-width: 640px) 92vw, (max-width: 1024px) 48vw, 400px',
  };
  const sizes = project.layout?.sizes ?? sizeAwareSizes[size];
  const headingId = `project-card-${project.id}-title`;
  const cardAnchorId = `portfolio-card-${project.slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')}-${index}`;

  const destination = project.destination ??
    (project.landingPageSlug
      ? { type: 'internal_landing' as const, landingSlug: project.landingPageSlug }
      : project.link && project.category === 'Landing Page'
        ? { type: 'external_url' as const, href: project.link, url: project.link }
        : { type: 'modal' as const });
  const isModalDestination = destination.type === 'modal';

  const handleClick = () => {
    if (destination.type === 'external_url') {
      // Admin payload uses `url`; legacy code paths set `href`. Both must work.
      const target = (destination.url ?? destination.href ?? '').trim();
      if (target) {
        window.open(
          target,
          destination.openInNewTab === false ? '_self' : '_blank',
          'noopener,noreferrer'
        );
        return;
      }
    }
    onClick?.(project);
  };

  const hasHoverRef = React.useRef(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const sizeClasses = {
    sm: 'col-span-4 lg:col-span-4 aspect-[4/5] w-full',
    md: 'col-span-4 lg:col-span-4 aspect-[4/5] w-full',
    lg: 'col-span-8 lg:col-span-8 aspect-[8/5] w-full',
    wide: 'col-span-8 lg:col-span-12 aspect-[16/9] lg:aspect-[16/7] w-full',
    tall: 'col-span-4 lg:col-span-4 aspect-[3/5] w-full',
  };

  const baseCardClasses = "relative overflow-hidden cursor-pointer bg-neutral border border-white/10 h-full transition-all duration-fast ease-out sm:hover:-translate-y-1 sm:hover:shadow-[0_18px_40px_rgba(0,0,0,0.4)] sm:hover:brightness-105 active:translate-y-px [contain:layout_paint]";
  const mobileCardClasses = "max-sm:!w-full max-sm:!h-auto max-sm:!border-none max-sm:!bg-transparent max-sm:!aspect-square max-sm:!block max-sm:!p-0 max-sm:!m-0 max-sm:leading-none";

  return (
    <m.button
      layout="position"
      type="button"
      id={cardAnchorId}
      data-size={size}
      data-destination={destination.type}
      onClick={handleClick}
      aria-haspopup={isModalDestination ? 'dialog' : undefined}
      aria-labelledby={headingId}
      className={cn(
        baseCardClasses,
        sizeClasses[size],
        mobileCardClasses,
        'group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className
      )}
      onMouseEnter={() => { hasHoverRef.current = true; setIsHovered(true); }}
      onMouseLeave={() => setIsHovered(false)}
      {...motionProps}
    >
      <div className="absolute inset-0 h-full z-0">
        {/* Static image — always visible by default */}
        {baseMediaDiffers ? (
          <>
            {desktopMediaIsVideo ? (
              <video
                src={desktopMedia}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={DEFAULT_VIDEO_POSTER}
                className={cn(
                  'hidden h-full w-full object-cover object-center transition-opacity duration-modal md:block',
                  hasVideo && isHovered ? 'opacity-0' : 'opacity-95 group-hover:opacity-100'
                )}
                style={{ objectPosition }}
              />
            ) : (
              <Image
                loader={supabaseLoader}
                src={desktopMedia}
                alt={`Projeto ${project.title}`}
                fill
                className={cn(
                  'hidden md:block object-cover object-center transition-opacity duration-modal',
                  hasVideo && isHovered ? 'opacity-0' : 'opacity-95 group-hover:opacity-100'
                )}
                style={{ objectPosition }}
                sizes={sizes}
                quality={60}
                loading={priority ? 'eager' : 'lazy'}
                priority={priority}
                onError={applyImageFallback}
              />
            )}
            {mobileMediaIsVideo ? (
              <video
                src={mobileMedia}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={DEFAULT_VIDEO_POSTER}
                className={cn(
                  'block h-full w-full object-cover object-center transition-opacity duration-modal md:hidden',
                  hasVideo && isHovered ? 'opacity-0' : 'opacity-95 group-hover:opacity-100'
                )}
                style={{ objectPosition }}
              />
            ) : (
              <Image
                loader={supabaseLoader}
                src={mobileMedia}
                alt={`Projeto ${project.title}`}
                fill
                className={cn(
                  'block md:hidden object-cover object-center transition-opacity duration-modal',
                  hasVideo && isHovered ? 'opacity-0' : 'opacity-95 group-hover:opacity-100'
                )}
                style={{ objectPosition }}
                sizes={sizes}
                quality={60}
                loading={priority ? 'eager' : 'lazy'}
                priority={priority}
                onError={applyImageFallback}
              />
            )}
          </>
        ) : desktopMediaIsVideo ? (
          <video
            src={desktopMedia}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={DEFAULT_VIDEO_POSTER}
            className={cn(
              'h-full w-full object-cover object-center transition-opacity duration-modal',
              hasVideo && isHovered ? 'opacity-0' : 'opacity-95 group-hover:opacity-100'
            )}
            style={{ objectPosition }}
          />
        ) : (
          <Image
            loader={supabaseLoader}
            src={desktopMedia}
            alt={`Projeto ${project.title}`}
            fill
            className={cn(
              'object-cover object-center transition-opacity duration-modal',
              hasVideo && isHovered ? 'opacity-0' : 'opacity-95 group-hover:opacity-100'
            )}
            style={{ objectPosition }}
            sizes={sizes}
            quality={60}
            loading={priority ? 'eager' : 'lazy'}
            priority={priority}
            onError={applyImageFallback}
          />
        )}

        {/* Video — lazy-loaded on first hover */}
        {hasVideo && hasHoverRef.current && (
          <video
            src={hoverVideoSource}
            autoPlay={isHovered}
            muted
            loop
            playsInline
            preload="none"
            className={cn(
              'absolute inset-0 h-full w-full object-cover transition-opacity duration-modal',
              isHovered ? 'opacity-100' : 'opacity-0'
            )}
            style={{ objectPosition }}
          />
        )}
      </div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/90 p-6 text-center opacity-0 backdrop-blur-md transition-all duration-fast ease-out group-focus-visible:opacity-100 sm:group-hover:opacity-100 max-sm:active:opacity-100 max-sm:focus:opacity-100">
        <div className="text-white flex flex-col items-center justify-center text-center w-full h-full">
          <p className="text-[11px] uppercase tracking-[0.22em] text-blueAccent/90 mb-2 font-medium">
            {project.displayCategory}
          </p>
          <h3 id={headingId} className="text-2xl md:text-3xl font-black leading-[1.1] mb-3 text-balance tracking-tight">
            {project.title}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-white/70">
            {project.client ? <span className="text-white/90">{project.client}</span> : null}
            {project.client && project.year ? <span className="text-blueAccent/40" aria-hidden="true">•</span> : null}
            {project.year ? <span>{project.year}</span> : null}
          </div>
          {/* Metadata invisível para SEO/Acessibilidade: Ghost v3.1 */}
          {project.tags && project.tags.length > 0 && (
            <div className="sr-only">
              Tags: {project.tags.join(', ')}
            </div>
          )}
        </div>
      </div>
    </m.button>
  );
});
