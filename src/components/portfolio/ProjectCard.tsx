'use client';

import React from 'react';
import { m } from 'motion/react';
import { useMotionGate } from '@/hooks/useMotionGate';
import { GHOST_EASE, MOTION_TOKENS } from '@/config/motion';
import { MediaCard } from '@/components/ui/media/MediaCard';
import { PortfolioProject } from '@/types/project';
import { cn } from '@/lib/utils';
import {
  getPreferredCoverForSlot,
  resolveProjectMedia,
  resolveProjectHoverMedia,
} from '@/lib/portfolio/card-media';
import { DEFAULT_VIDEO_POSTER } from '@/lib/video';
import type { ProjectMedia } from '@/lib/media/media-format';

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
 * Sempre mostra imagem estática por padrão; vídeo ou HTML animado aparece no hover se disponível.
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

  const visualAltText =
    project.client && project.client !== project.title
      ? `${project.title} para ${project.client}`
      : project.title;
  const desktopPreferredCover = getPreferredCoverForSlot(
    'portfolio-card-desktop',
    size
  );
  const desktopMedia = resolveProjectMedia(project, desktopPreferredCover, {
    alt: visualAltText,
    fit: 'cover',
  });
  const mobileMedia =
    resolveProjectMedia(project, 'square', {
      alt: visualAltText,
      fit: 'cover',
    }) ??
    desktopMedia;
  const baseMediaDiffers =
    !!desktopMedia &&
    !!mobileMedia &&
    (desktopMedia.src !== mobileMedia.src ||
      desktopMedia.kind !== mobileMedia.kind ||
      desktopMedia.format !== mobileMedia.format);

  const hoverMedia: ProjectMedia | null = resolveProjectHoverMedia(
    project,
    desktopMedia?.format ?? desktopPreferredCover,
    {
      alt: visualAltText,
      fit: project.thumbnailHtml ? 'cover' : 'contain',
    }
  );

  const hasVideo =
    !!hoverMedia &&
    !(
      hoverMedia.src === desktopMedia?.src &&
      hoverMedia.src === mobileMedia?.src &&
      desktopMedia?.kind === hoverMedia.kind &&
      mobileMedia?.kind === hoverMedia.kind
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
      onFocus={() => { hasHoverRef.current = true; setIsHovered(true); }}
      onBlur={() => setIsHovered(false)}
      onTouchStart={() => { hasHoverRef.current = true; }}
      initial={reduceMotion ? false : { opacity: 0, y: MOTION_TOKENS.offset.standard }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22, margin: '0px 0px -12% 0px' }}
      transition={{
        duration: MOTION_TOKENS.duration.normal,
        ease: GHOST_EASE,
      }}
    >
      <div className="absolute inset-0 h-full z-0">
        {/* Static image — always visible by default */}
        {desktopMedia && mobileMedia && baseMediaDiffers ? (
          <>
            <MediaCard
              preserveVideoFrame
              media={desktopMedia}
              sizes={sizes}
              priority={priority}
              poster={DEFAULT_VIDEO_POSTER}
              className="absolute inset-0 hidden h-full w-full md:block"
              mediaClassName={cn(
                'transition-opacity duration-modal',
                hasVideo && isHovered
                  ? 'opacity-0'
                  : 'opacity-95 group-hover:opacity-100'
              )}
              objectPosition={objectPosition}
            />
            <MediaCard
              preserveVideoFrame
              media={mobileMedia}
              sizes={sizes}
              priority={priority}
              poster={DEFAULT_VIDEO_POSTER}
              className="absolute inset-0 block h-full w-full md:hidden"
              mediaClassName={cn(
                'transition-opacity duration-modal',
                hasVideo && isHovered
                  ? 'opacity-0'
                  : 'opacity-95 group-hover:opacity-100'
              )}
              objectPosition={objectPosition}
            />
          </>
        ) : desktopMedia ? (
          <MediaCard
            preserveVideoFrame
            media={desktopMedia}
            sizes={sizes}
            priority={priority}
            poster={DEFAULT_VIDEO_POSTER}
            className="absolute inset-0 h-full w-full"
            mediaClassName={cn(
              'transition-opacity duration-modal',
              hasVideo && isHovered
                ? 'opacity-0'
                : 'opacity-95 group-hover:opacity-100'
            )}
            objectPosition={objectPosition}
          />
        ) : null}

        {/* Video — lazy-loaded on first hover */}
        {hasVideo && hoverMedia && hasHoverRef.current && (
          <MediaCard
            preserveVideoFrame
            media={hoverMedia}
            autoPlay={isHovered}
            poster={DEFAULT_VIDEO_POSTER}
            preload="none"
            className="absolute inset-0 h-full w-full"
            mediaClassName={cn(
              'transition-opacity duration-modal',
              isHovered ? 'opacity-100' : 'opacity-0'
            )}
            objectPosition={objectPosition}
            aria-hidden
          />
        )}
      </div>

      <div
        className={cn(
          "absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center transition-all duration-fast ease-out",
          "opacity-0 group-focus-visible:opacity-100 sm:group-hover:opacity-100",
          "max-sm:opacity-100 max-sm:justify-end max-sm:p-4 max-sm:bg-gradient-to-t max-sm:from-background/95 max-sm:via-background/60 max-sm:to-transparent",
          hasVideo || hoverMedia?.kind === 'html' || desktopMedia?.kind === 'html'
            ? "sm:bg-gradient-to-t sm:from-background/95 sm:via-background/50 sm:to-background/20 sm:backdrop-blur-[2px]"
            : "sm:bg-background/90 sm:backdrop-blur-md"
        )}
      >
        <div className="text-white flex flex-col items-center justify-center text-center w-full h-full max-sm:h-auto max-sm:justify-end">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-blueAccent/90 mb-1 sm:mb-2 font-medium">
            {project.displayCategory}
          </p>
          <h3 id={headingId} className="text-xl sm:text-2xl md:text-3xl font-black leading-[1.1] mb-2 sm:mb-3 text-balance tracking-tight">
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
