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
import { useMediaQuery } from '@/hooks/useMediaQuery';

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
  const isMobile = useMediaQuery('(max-width: 768px)');
  const shouldUseSquare = !isMobile && ['sm', 'md', 'tall'].includes(size);

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

  const preferredImage = shouldUseSquare
    ? project.imageSquare ?? project.imageLandscape ?? project.image
    : project.imageLandscape ?? project.imageSquare ?? project.image;
  const imageSrc =
    project.thumbnailMedia ??
    project.videoPreview ??
    preferredImage ??
    ASSET_PLACEHOLDER;
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
      {...motionProps}
    >
      <div className={styles.cardImageWrapper}>
        {isVideo(imageSrc) ? (
          <video
            src={imageSrc}
            autoPlay
            muted
            loop
            playsInline
            preload={priority ? 'auto' : 'metadata'}
            poster={DEFAULT_VIDEO_POSTER}
            className={cn(
              "absolute inset-0 h-full w-full object-cover"
            )}
            style={{ objectPosition }}
          />
        ) : (
          <Image
            src={imageSrc}
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
      </div>

      <div className={styles.cardOverlay}>
        <div className="text-white flex flex-col items-center justify-center text-center w-full h-full">
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/70 mb-2">
            {project.displayCategory}
          </p>
          <h3 id={headingId} className="text-2xl md:text-3xl font-bold leading-tight mb-3">
            {project.title}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-white/80">
            {project.client ? <span>{project.client}</span> : null}
            {project.client && project.year ? <span aria-hidden="true">•</span> : null}
            {project.year ? <span>{project.year}</span> : null}
          </div>
          {project.tags?.length ? (
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[11px] text-white/70">
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={`${project.id}-${tag}-${tagIndex}`}
                  className="rounded-[2px] border border-white/20 px-2 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </motion.button>
  );
};

