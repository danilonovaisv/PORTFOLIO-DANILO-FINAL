'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { PortfolioProject } from '@/types/project';
import { cn } from '@/lib/utils';
import { ASSET_PLACEHOLDER, applyImageFallback, isVideo } from '@/utils/utils';
import styles from './ProjectsGallery.module.css';
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
  const reduceMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const shouldUseSquare = !isMobile && ['sm', 'md', 'tall'].includes(size);
  const motionProps = reduceMotion
    ? {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport: { once: true },
      transition: { duration: 0.2 },
    }
    : {
      initial: { opacity: 0, y: 12 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: '-10% 0px -10% 0px' },
      transition: {
        duration: 0.6,
        delay: Math.min(0.18, index * 0.03),
        ease: [0.22, 1, 0.36, 1] as const,
      },
    };

  const preferredImage = shouldUseSquare
    ? project.imageSquare ?? project.imageLandscape ?? project.image
    : project.imageLandscape ?? project.imageSquare ?? project.image;
  const imageSrc = project.videoPreview ?? preferredImage ?? ASSET_PLACEHOLDER;
  const objectFit = project.layout?.objectFit ?? 'cover';
  const objectPosition = project.layout?.objectPosition ?? 'center';
  const sizes =
    project.layout?.sizes ??
    '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
  const headingId = `project-card-${project.id}-title`;

  return (
    <motion.button
      type="button"
      data-size={size}
      onClick={() => onClick?.(project)}
      aria-haspopup={onClick ? 'dialog' : undefined}
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
            poster={DEFAULT_VIDEO_POSTER}
            className="absolute inset-0 h-full w-full"
            style={{ objectFit, objectPosition }}
          >

          </video>
        ) : (
          <Image
            src={imageSrc}
            alt={project.title}
            fill
            className="object-cover object-center"
            sizes={sizes}
            priority={priority}
            onError={applyImageFallback}
            style={{ objectFit: objectFit as any, objectPosition }}
          />
        )}
      </div>

      <div className={styles.cardOverlay}>
        <div className="text-white">
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/70">
            {project.displayCategory}
          </p>
          <h3 id={headingId} className="mt-1 text-xl font-semibold leading-tight">
            {project.title}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-white/70">
            {project.client ? <span>{project.client}</span> : null}
            {project.client && project.year ? <span aria-hidden>•</span> : null}
            {project.year ? <span>{project.year}</span> : null}
          </div>
          {project.tags && project.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5 text-[0.5em] uppercase tracking-[0.18em] text-white/70">
              {project.tags.slice(0, 3).map((tag, tagIndex) => (
                <span
                  key={`${tag}-${tagIndex}`}
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-1.5 py-0.5 text-center"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.button>
  );
};
