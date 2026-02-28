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
  isVideo,
} from '@/lib/utils';
import styles from '@/components/portfolio/ProjectsGallery.module.css';

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
    !isVideo(project.thumbnailMedia) ? project.thumbnailMedia : undefined,
    prefersSquareOnDesktop
      ? (project.imageSquare ?? project.imageLandscape ?? project.image)
      : (project.imageLandscape ?? project.imageSquare ?? project.image),
  ].filter(Boolean) as string[];

  const desktopImage = staticImageCandidates[0] || ASSET_PLACEHOLDER;

  // Mobile image — prefer landscape
  const mobileImageCandidates = [
    !isVideo(project.thumbnailMedia) ? project.thumbnailMedia : undefined,
    project.imageLandscape ?? project.imageSquare ?? project.image,
  ].filter(Boolean) as string[];

  const mobileImage = mobileImageCandidates[0] || ASSET_PLACEHOLDER;

  // Video source for hover — from thumbnailMedia or videoPreview (only if it's actually a video)
  const videoSource = isVideo(project.thumbnailMedia)
    ? project.thumbnailMedia
    : isVideo(project.videoPreview)
      ? project.videoPreview
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
        styles.card,
        'group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className
      )}
      onMouseEnter={() => { hasHoverRef.current = true; setIsHovered(true); }}
      onMouseLeave={() => setIsHovered(false)}
      {...motionProps}
    >
      <div className={styles.cardImageWrapper}>
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

      <div className={styles.cardOverlay}>
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
        </div>
      </div>
    </motion.button>
  );
};
