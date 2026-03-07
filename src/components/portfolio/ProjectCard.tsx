'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useMotionGate } from '@/hooks/useMotionGate';
import { GHOST_EASE } from '@/config/motion';
import { PortfolioProject } from '@/types/project';
import { cn } from '@/lib/utils';
import {
  ASSET_PLACEHOLDER,
  applyImageFallback,
  getAssetUrl,
  isVideo,
} from '@/lib/utils';

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
 */
export const ProjectCard = ({
  project,
  index,
  onClick,
  className = '',
  priority = false,
  size = 'md',
}: ProjectCardProps) => {
  const reduceMotion = useMotionGate();

  const motionProps = reduceMotion
    ? {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport: { once: false, amount: 0.2 },
      transition: { duration: 0.2 },
    }
    : {
      initial: { opacity: 0, y: 12, filter: 'blur(8px)' },
      whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
      viewport: { once: false, margin: '-10% 0px -10% 0px' },
      transition: {
        duration: 0.6,
        delay: Math.min(0.18, index * 0.03),
        ease: GHOST_EASE as any,
      },
    };

  // Resolve best static image (never a video)
  const prefersSquareOnDesktop = ['sm', 'md', 'tall'].includes(size);

  // Build the static image: prefer non-video thumbnailMedia, then layout-appropriate images
  const staticImageCandidates = [
    prefersSquareOnDesktop
      ? (project.imageSquare ?? project.imageLandscape ?? project.image)
      : (project.imageLandscape ?? project.imageSquare ?? project.image),
    !isVideo(project.thumbnailMedia) ? project.thumbnailMedia : undefined,
  ].filter(Boolean) as string[];

  const desktopImage = getAssetUrl(staticImageCandidates[0] || ASSET_PLACEHOLDER);

  // Mobile image — prefer landscape
  const mobileImageCandidates = [
    project.imageLandscape ?? project.imageSquare ?? project.image,
    !isVideo(project.thumbnailMedia) ? project.thumbnailMedia : undefined,
  ].filter(Boolean) as string[];

  const mobileImage = getAssetUrl(mobileImageCandidates[0] || ASSET_PLACEHOLDER);

  // Video source for hover — from thumbnailMedia or videoPreview (only if it's actually a video)
  const videoSource = isVideo(project.thumbnailMedia)
    ? getAssetUrl(project.thumbnailMedia, { isVideo: true })
    : isVideo(project.videoPreview)
      ? getAssetUrl(project.videoPreview, { isVideo: true })
      : undefined;

  const hasVideo = !!videoSource;
  const imagesDiffer = desktopImage !== mobileImage && !hasVideo;

  const objectPosition = project.layout?.objectPosition ?? 'center';
  const sizes =
    project.layout?.sizes ??
    '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
  const headingId = `project-card-${project.id}-title`;
  const cardAnchorId = `portfolio-card-${project.slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')}-${index}`;

  const destination = project.destination ??
    (project.landingPageSlug
      ? { type: 'internal_landing' as const, landingSlug: project.landingPageSlug }
      : project.link && project.category === 'Landing Page'
        ? { type: 'external_url' as const, href: project.link }
        : { type: 'modal' as const });
  const isModalDestination = destination.type === 'modal';

  const handleClick = () => {
    if (destination.type === 'external_url' && destination.href) {
      window.open(destination.href, '_blank', 'noopener,noreferrer');
      return;
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

  const baseCardClasses = "relative overflow-hidden cursor-pointer bg-neutral border border-white/10 h-full transition-all duration-250 ease-out sm:hover:-translate-y-1 sm:hover:shadow-[0_18px_40px_rgba(0,0,0,0.4)] sm:hover:brightness-105 active:translate-y-px [contain:layout_paint]";
  const mobileCardClasses = "max-sm:!w-full max-sm:!h-auto max-sm:!border-none max-sm:!bg-transparent max-sm:!aspect-[4/5] max-sm:!block max-sm:!p-0 max-sm:!m-0 max-sm:leading-none";

  return (
    <motion.button
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
        {imagesDiffer ? (
          <>
            <Image
              src={desktopImage}
              alt={project.title}
              fill
              className={cn(
                'hidden md:block object-cover object-center transition-opacity duration-500',
                hasVideo && isHovered ? 'opacity-0' : 'opacity-95 group-hover:opacity-100'
              )}
              style={{ objectPosition }}
              sizes={sizes}
              quality={60}
              loading={priority ? 'eager' : 'lazy'}
              priority={priority}
              onError={applyImageFallback}
            />
            <Image
              src={mobileImage}
              alt={project.title}
              fill
              className={cn(
                'block md:hidden object-cover object-center transition-opacity duration-500',
                hasVideo && isHovered ? 'opacity-0' : 'opacity-95 group-hover:opacity-100'
              )}
              style={{ objectPosition }}
              sizes={sizes}
              quality={60}
              loading={priority ? 'eager' : 'lazy'}
              priority={priority}
              onError={applyImageFallback}
            />
          </>
        ) : (
          <Image
            src={desktopImage}
            alt={project.title}
            fill
            className={cn(
              'object-cover object-center transition-opacity duration-500',
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
            src={videoSource}
            autoPlay={isHovered}
            muted
            loop
            playsInline
            preload="none"
            className={cn(
              'absolute inset-0 h-full w-full object-cover transition-opacity duration-500',
              isHovered ? 'opacity-100' : 'opacity-0'
            )}
            style={{ objectPosition }}
          />
        )}
      </div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-primary/85 p-6 text-center opacity-0 transition-all duration-250 ease-out group-focus-visible:opacity-100 sm:group-hover:opacity-100 max-sm:active:opacity-100 max-sm:focus:opacity-100">
        <div className="text-white flex flex-col items-center justify-center text-center w-full h-full">
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/70 mb-2">
            {project.displayCategory}
          </p>
          <h3 id={headingId} className="text-2xl md:text-3xl font-bold leading-tight mb-3 text-balance">
            {project.title}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-white/80">
            {project.client ? <span>{project.client}</span> : null}
            {project.client && project.year ? <span aria-hidden="true">•</span> : null}
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
    </motion.button>
  );
};
