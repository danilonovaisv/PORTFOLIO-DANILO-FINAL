'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMotionGate } from '@/hooks/useMotionGate';
import { useLERPScroll } from '@/hooks/useLERPScroll';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ProjectCard, type ProjectCardSize } from '@/components/portfolio/ProjectCard';
import { PortfolioProject } from '@/types/project';
import { cn } from '@/lib/utils';
import { Container } from '@/components/layout/Container';
import { GHOST_EASE } from '@/config/motion';
import {
  PORTFOLIO_PAGE_SIZE,
  ENABLE_SERVER_PAGINATION,
  PORTFOLIO_FILTERS,
  type PortfolioFilterId,
  mapCategoryToPortfolioFilter,
  getPortfolioFilterById,
  getPortfolioCategoryQueryValue,
} from '@/config/portfolio';

interface ProjectsGalleryProps {
  projects?: PortfolioProject[];
  onProjectSelect?: (_project: PortfolioProject) => void;
  onOpenProject?: (_project: PortfolioProject) => void;
  initialCategory?: string;
  initialPage?: number;
  totalProjectsCount?: number;
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
  initialPage = 1,
  totalProjectsCount,
}: ProjectsGalleryProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<PortfolioFilterId>(
    mapCategoryToPortfolioFilter(initialCategory)
  );
  const filterRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const galleryWrapperRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useMotionGate();
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [liveProjects, setLiveProjects] = useState<PortfolioProject[]>(projects);

  // Filter logic
  const filteredProjects = useMemo(() => {
    const pillar = getPortfolioFilterById(activeFilter);
    const categories = pillar.categories;
    if (!categories?.length) return projects;
    return projects.filter((project) => categories.includes(project.category));
  }, [activeFilter, projects]);

  // LERP only for larger sets to avoid end-of-list distortion in short galleries.
  const useLerp = !prefersReducedMotion && !isMobile && filteredProjects.length > 6;

  // Initialize LERP Scroll
  const { scrollState } = useLERPScroll(trackRef, galleryWrapperRef, useLerp);

  // PAGINATION LOGIC
  const [currentPage, setCurrentPage] = useState(() => Math.max(1, initialPage));
  const [pageAnnouncement, setPageAnnouncement] = useState('');

  // Sync activeFilter changes with page reset
  const pushStateToUrl = useCallback((filterId: PortfolioFilterId, page: number) => {
    const params = new URLSearchParams(searchParams?.toString());
    const category = getPortfolioCategoryQueryValue(filterId);

    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }

    if (page > 1) {
      params.set('page', String(page));
    } else {
      params.delete('page');
    }
    const qs = params.toString();
    const url = qs ? `${pathname}?${qs}` : pathname;
    router.push(url);
  }, [pathname, router, searchParams]);

  const handleFilterChange = useCallback((newFilter: PortfolioFilterId) => {
    setActiveFilter(newFilter);
    setCurrentPage(1);
    pushStateToUrl(newFilter, 1);

    // Smooth scroll to top of gallery on filter change
    if (galleryWrapperRef.current) {
      galleryWrapperRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [pushStateToUrl]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      (ENABLE_SERVER_PAGINATION && totalProjectsCount)
        ? totalProjectsCount / PORTFOLIO_PAGE_SIZE
        : filteredProjects.length / PORTFOLIO_PAGE_SIZE
    )
  );

  const paginatedProjects = useMemo(() => {
    if (ENABLE_SERVER_PAGINATION) return filteredProjects;
    const start = (currentPage - 1) * PORTFOLIO_PAGE_SIZE;
    return filteredProjects.slice(start, start + PORTFOLIO_PAGE_SIZE);
  }, [filteredProjects, currentPage]);

  useEffect(() => {
    setLiveProjects(paginatedProjects);
  }, [paginatedProjects]);

  // A rotação contínua (setInterval) foi desativada para que a ordem mude apenas ao entrar ou recarregar a página.

  useEffect(() => {
    setActiveFilter(mapCategoryToPortfolioFilter(initialCategory));
  }, [initialCategory]);

  useEffect(() => {
    setCurrentPage(Math.max(1, initialPage));
  }, [initialPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
      return;
    }
    setPageAnnouncement(`Página ${currentPage} de ${totalPages}`);
  }, [currentPage, totalPages]);

  const goToPage = useCallback((nextPage: number) => {
    setCurrentPage(nextPage);
    pushStateToUrl(activeFilter, nextPage);
    galleryWrapperRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [activeFilter, pushStateToUrl]);

  const sizePattern = useMemo<ProjectCardSize[]>(
    () => ['lg', 'sm', 'sm', 'sm', 'sm', 'sm', 'lg', 'wide'],
    []
  );

  const items = useMemo(
    () =>
      liveProjects.map((project, index) => ({
        project,
        size: project.layout?.size ?? sizePattern[index % sizePattern.length],
      })),
    [liveProjects, sizePattern]
  );

  const activeFilterIndex = useMemo(
    () =>
      Math.max(
        0,
        PORTFOLIO_FILTERS.findIndex((pillar) => pillar.id === activeFilter)
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
        nextIndex = (index + 1) % PORTFOLIO_FILTERS.length;
      } else if (event.key === 'ArrowLeft') {
        nextIndex = (index - 1 + PORTFOLIO_FILTERS.length) % PORTFOLIO_FILTERS.length;
      } else if (event.key === 'Home') {
        nextIndex = 0;
      } else if (event.key === 'End') {
        nextIndex = PORTFOLIO_FILTERS.length - 1;
      }

      const nextFilter = PORTFOLIO_FILTERS[nextIndex];
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
            {PORTFOLIO_FILTERS.map((pillar, index) => (
              <button
                key={pillar.id}
                id={`portfolio-filter-${pillar.id}`}
                ref={(element) => {
                  filterRefs.current[index] = element;
                }}
                type="button"
                role="tab"
                aria-controls="portfolio-filter-panel"
                aria-selected={activeFilter === pillar.id ? true : undefined}
                tabIndex={activeFilter === pillar.id ? 0 : -1}
                onClick={() => handleFilterChange(pillar.id)}
                onKeyDown={(event) =>
                  handleFilterKeyDown(event, index)
                }
                className={cn(
                  'relative shrink-0 text-xs uppercase tracking-widest transition-colors py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueAccent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                  activeFilter === pillar.id
                    ? 'text-blueAccent'
                    : 'text-white/60 hover:text-white'
                )}
              >
                {pillar.label}
                {activeFilter === pillar.id && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-blueAccent"
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
        aria-labelledby={`portfolio-filter-${PORTFOLIO_FILTERS[activeFilterIndex]?.id ?? PORTFOLIO_FILTERS[0].id
          }`}
        className="w-full relative z-[1]"
        ref={galleryWrapperRef as RefObject<HTMLDivElement>}
      >
        <Container>
          <div className="sr-only" aria-live="polite" role="status">
            {pageAnnouncement}
          </div>
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
                'w-full grid grid-cols-8 lg:grid-cols-12 gap-[10px] lg:gap-3 p-0 items-stretch will-change-transform',
                'max-sm:flex max-sm:flex-col max-sm:items-center max-sm:h-auto max-sm:will-change-auto max-sm:static',
                getTrackClasses()
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
                    priority={index < 4}
                  />
                ))}
              </AnimatePresence>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="col-span-full mt-16 mb-8 flex justify-center items-center gap-6">
                  <button
                    onClick={() => goToPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    aria-label="Página anterior"
                    aria-controls="portfolio-filter-panel"
                    aria-disabled={currentPage === 1 ? true : undefined}
                    className="relative group px-6 py-3 font-display font-medium text-sm tracking-widest uppercase transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:text-blueAccent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueAccent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Voltar
                    </span>
                  </button>
                  <span
                    className="text-white/40 font-mono text-sm tracking-widest"
                    aria-live="polite"
                    role="status"
                  >
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    aria-label="Próxima página"
                    aria-controls="portfolio-filter-panel"
                    aria-disabled={currentPage === totalPages ? true : undefined}
                    className="relative group px-6 py-3 font-display font-medium text-sm tracking-widest uppercase transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:text-blueAccent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueAccent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
        </Container>
      </div>
    </section>
  );
};
