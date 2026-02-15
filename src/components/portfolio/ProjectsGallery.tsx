'use client';

import React, { useMemo, useRef, useState, type RefObject } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotionGate } from '@/hooks/useMotionGate';
import { useLERPScroll } from '@/hooks/useLERPScroll';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ProjectCard, type ProjectCardSize } from './ProjectCard';
import { PortfolioProject, ProjectCategory } from '@/types/project';
import { cn } from '@/lib/utils';
import styles from './ProjectsGallery.module.css';
import { StandardGrid } from '@/components/layout/Container';

interface ProjectsGalleryProps {
  projects?: PortfolioProject[];
  onProjectSelect?: (_project: PortfolioProject) => void;
  onOpenProject?: (_project: PortfolioProject) => void;
  initialCategory?: string;
}

const CATEGORY_PILLARS = [
  {
    id: 'brand-campaigns',
    label: 'Brand & Campaigns',
    categories: ['branding', 'campanha', 'packaging', 'institucional'] as ProjectCategory[],
  },
  { id: 'videos-motions', label: 'Videos & Motions', categories: ['motion'] as ProjectCategory[] },
  {
    id: 'web-tech',
    label: 'Web Campaigns, Websites & Tech',
    categories: ['web', 'Landing Page'] as ProjectCategory[],
  },
] as const;

function mapCategoryToPillar(category?: string) {
  const normalized = category?.trim().toLowerCase();
  if (!normalized) return 'brand-campaigns';
  if (normalized === 'motion' || normalized === 'videos-motions') {
    return 'videos-motions';
  }
  if (
    normalized === 'web' ||
    normalized === 'web-tech' ||
    normalized === 'websites-tech' ||
    normalized === 'websites-webcampaigns-tech'
  ) {
    return 'web-tech';
  }
  return 'brand-campaigns';
}

/**
 * ProjectsGallery - Ghost Era v2.2
 * Galeria com scroll suavizado (LERP), grid editorial e filtros sincronizados.
 */
export const ProjectsGallery = ({
  projects = [],
  onProjectSelect,
  onOpenProject,
  initialCategory,
}: ProjectsGalleryProps) => {
  const [activeFilter, setActiveFilter] = useState<string>(
    mapCategoryToPillar(initialCategory)
  );
  const trackRef = useRef<HTMLDivElement>(null);
  const galleryWrapperRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useMotionGate();
  const isMobile = useMediaQuery('(max-width: 640px)');

  // Filter logic
  const filteredProjects = useMemo(() => {
    const pillar = CATEGORY_PILLARS.find((p) => p.id === activeFilter);
    if (!pillar || !('categories' in pillar)) return projects;
    return projects.filter((p) => pillar.categories.includes(p.category));
  }, [activeFilter, projects]);

  // LERP only for larger sets to avoid end-of-list distortion in short galleries.
  const useLerp = !prefersReducedMotion && !isMobile && filteredProjects.length > 6;

  // Initialize LERP Scroll
  const { isSticky } = useLERPScroll(trackRef, galleryWrapperRef, useLerp);

  const sizePattern = useMemo<ProjectCardSize[]>(
    () => ['lg', 'sm', 'sm', 'sm', 'lg', 'sm', 'sm', 'sm', 'wide'],
    []
  );

  const items = useMemo(
    () =>
      filteredProjects.map((project, index) => ({
        project,
        size: project.layout?.size ?? sizePattern[index % sizePattern.length],
      })),
    [filteredProjects, sizePattern]
  );

  return (
    <section
      id="portfolio-gallery"
      aria-labelledby="portfolio-gallery-heading"
      className="relative z-20 w-full bg-background text-white pb-32"
    >
      {/* Filter Bar - Editorial Positioning */}
      <div className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md py-6 px-4 md:px-12 border-b border-white/5">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <h2 id="portfolio-gallery-heading" className="text-xs uppercase tracking-[0.3em] text-white/60">
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
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className={cn('gallery', styles.gallery)}
        ref={galleryWrapperRef as RefObject<HTMLDivElement>}
      >
        <StandardGrid>
          {items.length === 0 ? (
            <div className="relative rounded-2xl border border-white/10 bg-neutral/40 p-8 text-center">
              <h3 className="text-lg font-semibold text-white">Nenhum projeto nesta categoria</h3>
              <p className="mt-2 text-sm text-white/70">
                Selecione outro filtro para visualizar os trabalhos disponíveis.
              </p>
            </div>
          ) : (
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
                {items.map((item, index) => (
                  <ProjectCard
                    key={item.project.id}
                    project={item.project}
                    index={index}
                    size={item.size}
                    onClick={onProjectSelect || onOpenProject}
                    priority={index < 3}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </StandardGrid>
      </div>
    </section>
  );
};
