'use client';

import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotionGate } from '@/hooks/useMotionGate';
import { useLERPScroll } from '@/hooks/useLERPScroll';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ProjectCard, type ProjectCardSize } from '@/components/portfolio/ProjectCard';
import { PortfolioProject, ProjectCategory } from '@/types/project';
import { cn } from '@/lib/utils';
import styles from '@/components/portfolio/ProjectsGallery.module.css';
import { StandardGrid } from '@/components/layout/Container';
import { GHOST_EASE } from '@/config/motion';

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
    label: 'Websites & Tech',
    categories: ['web', 'Landing Page'] as ProjectCategory[],
  },
] as const;

function mapCategoryToPillar(category?: string) {
  const normalized = category?.trim().toLowerCase();
  if (!normalized) return 'brand-campaigns';
  if (normalized === 'motion' || normalized === 'videos-motions' || normalized === 'videos & motions') {
    return 'videos-motions';
  }
  if (
    normalized === 'web' ||
    normalized === 'web-tech' ||
    normalized === 'websites & tech' ||
    normalized === 'websites-tech'
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
  const filterRefs = useRef<Array<HTMLButtonElement | null>>([]);
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
  const { scrollState } = useLERPScroll(trackRef, galleryWrapperRef, useLerp);

  // PAGINATION LOGIC
  const ITEMS_PER_PAGE = 15;
  const [currentPage, setCurrentPage] = useState(1);

  // Sync activeFilter changes with page reset
  const handleFilterChange = useCallback((newFilter: string) => {
    setActiveFilter(newFilter);
    setCurrentPage(1);

    // Smooth scroll to top of gallery on filter change
    if (galleryWrapperRef.current) {
      galleryWrapperRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = useMemo(() => {
    return filteredProjects.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  const sizePattern = useMemo<ProjectCardSize[]>(
    () => ['lg', 'sm', 'sm', 'sm', 'lg', 'sm', 'sm', 'sm', 'wide'],
    []
  );

  const items = useMemo(
    () =>
      paginatedProjects.map((project, index) => ({
        project,
        size: project.layout?.size ?? sizePattern[index % sizePattern.length],
      })),
    [paginatedProjects, sizePattern]
  );

  const activeFilterIndex = useMemo(
    () =>
      Math.max(
        0,
        CATEGORY_PILLARS.findIndex((pillar) => pillar.id === activeFilter)
      ),
    [activeFilter]
  );

  const handleFilterKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (
        event.key !== 'ArrowRight' &&
        event.key !== 'ArrowLeft' &&
        event.key !== 'Home' &&
        event.key !== 'End'
      ) {
        return;
      }

      event.preventDefault();

      let nextIndex = index;

      if (event.key === 'ArrowRight') {
        nextIndex = (index + 1) % CATEGORY_PILLARS.length;
      } else if (event.key === 'ArrowLeft') {
        nextIndex = (index - 1 + CATEGORY_PILLARS.length) % CATEGORY_PILLARS.length;
      } else if (event.key === 'Home') {
        nextIndex = 0;
      } else if (event.key === 'End') {
        nextIndex = CATEGORY_PILLARS.length - 1;
      }

      const nextFilter = CATEGORY_PILLARS[nextIndex];
      handleFilterChange(nextFilter.id);
      filterRefs.current[nextIndex]?.focus();
    },
    [handleFilterChange]
  );

  // Determine track classes based on scroll state
  const getTrackClasses = () => {
    if (!useLerp) return 'relative';

    switch (scrollState) {
      case 'fixed':
        return 'fixed left-0 right-0 top-[88px] md:top-24 z-10 max-w-[1680px] mx-auto px-6 md:px-16';
      case 'post':
        return 'absolute bottom-0 left-0 right-0 z-10 max-w-[1680px] mx-auto px-6 md:px-16';
      default: // 'pre'
        return 'relative';
    }
  };

  return (
    <section
      id="portfolio-gallery"
      aria-labelledby="portfolio-gallery-heading"
      aria-live="polite"
      className="relative z-20 w-full bg-background text-white pb-32"
    >
      {/* Filter Bar - Editorial Positioning */}
      <div className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md py-6 px-6 md:px-16 border-b border-white/5">
        <div className="mx-auto flex max-w-[1400px] items-center justify-center">
          <h2 id="portfolio-gallery-heading" className="sr-only">
            Portfolio Showcase
          </h2>

          <div
            role="tablist"
            aria-label="Filtros de categorias do portfólio"
            className="flex items-center gap-4 md:gap-8 overflow-x-auto whitespace-nowrap pb-1"
          >
            {CATEGORY_PILLARS.map((pillar, index) => (
              <button
                key={pillar.id}
                id={`portfolio-filter-${pillar.id}`}
                ref={(element) => {
                  filterRefs.current[index] = element;
                }}
                type="button"
                role="tab"
                aria-controls="portfolio-filter-panel"
                aria-selected={activeFilter === pillar.id ? true : false}
                tabIndex={activeFilter === pillar.id ? 0 : -1}
                onClick={() => handleFilterChange(pillar.id)}
                onKeyDown={(event) =>
                  handleFilterKeyDown(event, index)
                }
                className={cn(
                  'relative shrink-0 text-xs uppercase tracking-widest transition-colors py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4fe6ff]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
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
                    transition={{ duration: 0.28, ease: GHOST_EASE }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        id="portfolio-filter-panel"
        role="tabpanel"
        aria-labelledby={`portfolio-filter-${CATEGORY_PILLARS[activeFilterIndex]?.id ?? CATEGORY_PILLARS[0].id
          }`}
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
              className={cn(styles.track, getTrackClasses())}
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

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="col-span-full mt-16 mb-8 flex justify-center items-center gap-6">
                  <button
                    onClick={() => {
                      setCurrentPage(p => Math.max(1, p - 1));
                      galleryWrapperRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    disabled={currentPage === 1}
                    className="relative group px-6 py-3 font-display font-medium text-sm tracking-widest uppercase transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:text-[#4fe6ff]"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Voltar
                    </span>
                  </button>
                  <span className="text-white/40 font-mono text-sm tracking-widest">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => {
                      setCurrentPage(p => Math.min(totalPages, p + 1));
                      galleryWrapperRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    disabled={currentPage === totalPages}
                    className="relative group px-6 py-3 font-display font-medium text-sm tracking-widest uppercase transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:text-[#4fe6ff]"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Avançar
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </button>
                </div>
              )}
            </div>
          )}
        </StandardGrid>
      </div>
    </section>
  );
};
