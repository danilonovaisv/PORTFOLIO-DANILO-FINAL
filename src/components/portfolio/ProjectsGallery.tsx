'use client';

import React, { useMemo, useRef, useState, type RefObject } from 'react';
import { useReducedMotion, motion, AnimatePresence } from 'framer-motion';
import { useLERPScroll } from '@/hooks/useLERPScroll';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ProjectCard, type ProjectCardSize } from './ProjectCard';
import { PortfolioProject, ProjectCategory } from '@/types/project';
import { cn } from '@/lib/utils';
import styles from './ProjectsGallery.module.css';
import { Container } from '@/components/layout/Container';

interface ProjectsGalleryProps {
  projects?: PortfolioProject[];
  onProjectSelect?: (_project: PortfolioProject) => void;
  onOpenProject?: (_project: PortfolioProject) => void;
}

const CATEGORY_PILLARS = [
  { id: 'all', label: 'Tudo' },
  {
    id: 'brand-campaigns',
    label: 'Brand & Campaigns',
    categories: ['branding', 'campanha', 'packaging', 'institucional'] as ProjectCategory[],
  },
  { id: 'videos-motions', label: 'Videos & Motion', categories: ['motion'] as ProjectCategory[] },
  { id: 'web-tech', label: 'Web & Tech', categories: ['web'] as ProjectCategory[] },
] as const;

/**
 * ProjectsGallery - Ghost Era v2.2
 * Galeria com scroll suavizado (LERP), grid editorial e filtros sincronizados.
 */
export const ProjectsGallery = ({
  projects = [],
  onProjectSelect,
  onOpenProject,
}: ProjectsGalleryProps) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 640px)');
  const useLerp = !prefersReducedMotion && !isMobile;

  // Initialize LERP Scroll
  const { galleryRef, isSticky } = useLERPScroll(trackRef, useLerp);

  // Filter logic
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    const pillar = CATEGORY_PILLARS.find((p) => p.id === activeFilter);
    if (!pillar || !('categories' in pillar)) return projects;
    return projects.filter((p) => pillar.categories.includes(p.category));
  }, [projects, activeFilter]);

  const sizePattern: ProjectCardSize[] = ['lg', 'md', 'sm', 'wide', 'md', 'sm', 'md', 'lg'];

  const items = useMemo(() => {
    const entries: Array<
      | { kind: 'project'; project: PortfolioProject; size: ProjectCardSize }
      | { kind: 'placeholder'; id: string; size: ProjectCardSize }
    > = [];

    filteredProjects.forEach((project, index) => {
      const size = project.layout?.size ?? sizePattern[index % sizePattern.length];
      entries.push({ kind: 'project', project, size });

      // Only add placeholders when temos volume suficiente para manter ritmo editorial
      const shouldAddPlaceholders =
        !isMobile && activeFilter === 'all' && filteredProjects.length >= 10;

      if (shouldAddPlaceholders && index > 0 && index % 5 === 2) {
        entries.push({
          kind: 'placeholder',
          id: `placeholder-${project.id}-${index}`,
          size: sizePattern[(index + 3) % sizePattern.length],
        });
      }
    });

    return entries;
  }, [filteredProjects, isMobile, activeFilter]);

  return (
    <section
      id="portfolio-gallery"
      aria-labelledby="portfolio-gallery-heading"
      className="relative z-20 w-full bg-background text-white pb-32"
    >
      {/* Filter Bar - Editorial Positioning */}
      <div className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md py-6 px-4 md:px-12 border-b border-white/5">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <h2 id="portfolio-gallery-heading" className="text-xs uppercase tracking-[0.3em] text-white/40">
            [showcase]
          </h2>

          <div className="flex items-center gap-4 md:gap-8">
            {CATEGORY_PILLARS.map((pillar) => (
              <button
                key={pillar.id}
                onClick={() => setActiveFilter(pillar.id)}
                className={cn(
                  'relative text-xs uppercase tracking-widest transition-colors py-2',
                  activeFilter === pillar.id
                    ? 'text-[#4fe6ff]'
                    : 'text-white/60 hover:text-white'
                )}
              >
                {pillar.label}
                {activeFilter === pillar.id && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-[#4fe6ff]"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className={cn('gallery', styles.gallery)}
        ref={galleryRef as RefObject<HTMLDivElement>}
      >
        <Container>
          <div
            ref={trackRef}
            className={cn(
              styles.track,
              useLerp && isSticky
                ? 'fixed left-0 right-0 top-[88px] md:top-24 z-10 max-w-[1680px] mx-auto px-6 md:px-12 lg:px-24'
                : 'relative'
            )}
          >
            <AnimatePresence mode="popLayout">
              {items.map((item, index) =>
                item.kind === 'project' ? (
                  <ProjectCard
                    key={item.project.id}
                    project={item.project}
                    index={index}
                    size={item.size}
                    enableParallax={useLerp && isSticky}
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
            </AnimatePresence>
          </div>
        </Container>
      </div>
    </section>
  );
};
