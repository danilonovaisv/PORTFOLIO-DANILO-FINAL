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
 * ProjectCard - Ghost Era v2.0
 * Card editorial com efeito parallax interno e hover states refinados
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

  // Adjusted for Ghost Era - No Scale on Hover, just clean slide up
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

  // Pre-calculate images to decouple desktop vs mobile
  const prefersSquareOnDesktop = ['sm', 'md', 'tall'].includes(size);

  const desktopImage =
    project.thumbnailMedia ??
    project.videoPreview ??
    (prefersSquareOnDesktop
      ? (project.imageSquare ?? project.imageLandscape ?? project.image)
      : (project.imageLandscape ?? project.imageSquare ?? project.image)) ??
    ASSET_PLACEHOLDER;

  const mobileImage =
    project.thumbnailMedia ??
    project.videoPreview ??
    (project.imageLandscape ?? project.imageSquare ?? project.image) ??
    ASSET_PLACEHOLDER;

  const isVideoPreview = isVideo(desktopImage);
  const imagesDiffer = desktopImage !== mobileImage && !isVideoPreview;

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

  // Deriva o WEBP do MP4 para o grid
  const getPoster = (src: string) => {
    if (src.endsWith('.mp4') || src.endsWith('.webm')) {
      return src.replace(/\.(mp4|webm)$/i, '.webp');
    }
    return DEFAULT_VIDEO_POSTER;
  };

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
        {isVideoPreview ? (
          <>
            <Image
              src={getPoster(desktopImage)}
              alt={project.title}
              fill
              className={cn(
                'hidden md:block object-cover object-center transition-opacity duration-500 md:group-hover:opacity-100',
                isHovered ? 'opacity-0' : 'opacity-95'
              )}
              style={{ objectPosition }}
              sizes={sizes}
              loading={priority ? 'eager' : 'lazy'}
              priority={priority}
              onError={applyImageFallback}
            />
            <Image
              src={getPoster(mobileImage)}
              alt={project.title}
              fill
              className={cn(
                'block md:hidden object-cover object-center transition-opacity duration-500 md:group-hover:opacity-100',
                isHovered ? 'opacity-0' : 'opacity-95'
              )}
              style={{ objectPosition }}
              sizes={sizes}
              loading={priority ? 'eager' : 'lazy'}
              priority={priority}
              onError={applyImageFallback}
            />
            {hasHoverRef.current && (
              <video
                src={desktopImage}
                autoPlay={isHovered}
                muted
                loop
                playsInline
                preload="none"
                poster={getPoster(desktopImage)}
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                  isHovered ? 'opacity-100' : 'opacity-0'
                )}
                style={{ objectPosition }}
              />
            )}
          </>
        ) : (
          <>
            {imagesDiffer ? (
              <>
                <Image
                  src={desktopImage}
                  alt={project.title}
                  fill
                  className={cn(
                    'hidden md:block object-cover object-center transition-opacity duration-500 group-hover:opacity-95'
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
                    'block md:hidden object-cover object-center transition-opacity duration-500 group-hover:opacity-95'
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
                  'object-cover object-center transition-opacity duration-500 group-hover:opacity-95'
                )}
                style={{ objectPosition }}
                sizes={sizes}
                loading={priority ? 'eager' : 'lazy'}
                priority={priority}
                onError={applyImageFallback}
              />
            )}
          </>
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

