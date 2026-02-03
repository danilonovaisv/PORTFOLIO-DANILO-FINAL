'use client';

import React, { useMemo, useRef, type RefObject } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useLERPScroll } from '@/hooks/useLERPScroll';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ProjectCard, type ProjectCardSize } from './ProjectCard';
import { PortfolioProject } from '@/types/project';
import { galleryProjects } from '@/data/projects';
import { cn } from '@/lib/utils';
import styles from './ProjectsGallery.module.css';

interface ProjectsGalleryProps {
  projects?: PortfolioProject[];
  onProjectSelect?: (_project: PortfolioProject) => void;
  onOpenProject?: (_project: PortfolioProject) => void;
}

/**
 * ProjectsGallery - Ghost Era v2.0
 * Galeria com scroll suavizado (LERP) e grid editorial
 */
export const ProjectsGallery = ({
  projects,
  onProjectSelect,
  onOpenProject
}: ProjectsGalleryProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 640px)');
  const useLerp = !prefersReducedMotion && !isMobile;

  // Initialize LERP Scroll
  const { galleryRef } = useLERPScroll(trackRef, useLerp);

  // Use passed projects or fallback to mock data
  const projectsToRender = projects || galleryProjects;

  const sizePattern: ProjectCardSize[] = ['lg', 'md', 'sm', 'tall', 'md', 'wide', 'sm', 'md'];

  const items = useMemo(() => {
    const entries: Array<
      | { kind: 'project'; project: PortfolioProject; size: ProjectCardSize }
      | { kind: 'placeholder'; id: string; size: ProjectCardSize }
    > = [];

    projectsToRender.forEach((project, index) => {
      const size = project.layout?.size ?? sizePattern[index % sizePattern.length];
      entries.push({ kind: 'project', project, size });

      if (!isMobile && index > 0 && index % 5 === 2) {
        entries.push({
          kind: 'placeholder',
          id: `placeholder-${project.id}-${index}`,
          size: sizePattern[(index + 3) % sizePattern.length],
        });
      }
    });

    return entries;
  }, [projectsToRender, isMobile]);

  return (
    <section
      id="portfolio-gallery"
      aria-labelledby="portfolio-gallery-heading"
      className="relative w-full bg-background text-white"
    >
      <h2 id="portfolio-gallery-heading" className="sr-only">
        Projetos em destaque
      </h2>

      <div
        className={cn('gallery', styles.gallery)}
        ref={galleryRef as RefObject<HTMLDivElement>}
      >
        <div
          ref={trackRef}
          className={cn(
            styles.track,
            useLerp ? 'fixed inset-0' : 'relative'
          )}
        >
          {items.map((item, index) =>
            item.kind === 'project' ? (
              <ProjectCard
                key={item.project.id}
                project={item.project}
                index={index}
                size={item.size}
                enableParallax={useLerp}
                onClick={onProjectSelect || onOpenProject}
                priority={index < 3}
              />
            ) : (
              <div
                key={item.id}
                data-size={item.size}
                className={styles.placeholder}
                aria-hidden="true"
              />
            )
          )}
        </div>
      </div>
    </section>
  );
};
