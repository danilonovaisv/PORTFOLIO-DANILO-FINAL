// =============================================================================
// ProjectsGallery - Ghost Era v2.0
// Grid de projetos com filtro de categoria e layout masonry
// Conforme especificação: PORTFOLIO - PROTÓTIPO INTERATIVO.md
// =============================================================================

'use client';

import { FC, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { ProjectCategory, PortfolioProject } from '@/types/project';
import { PORTFOLIO_PROJECTS, filterProjectsByCategory } from '@/data/projects';
import CategoryFilter from './CategoryFilter';
import PortfolioCard from './PortfolioCard';

interface ProjectsGalleryProps {
  onProjectOpen?: (_project: PortfolioProject) => void;
  showFilter?: boolean;
  maxProjects?: number;
  className?: string;
}

const easing = [0.22, 1, 0.36, 1] as const;

const ProjectsGallery: FC<ProjectsGalleryProps> = ({
  onProjectOpen,
  showFilter = true,
  maxProjects,
  className = '',
}) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const prefersReducedMotion = useReducedMotion();

  // Filtra projetos baseado na categoria ativa
  const filteredProjects = useMemo(() => {
    let projects = filterProjectsByCategory(PORTFOLIO_PROJECTS, activeCategory);
    if (maxProjects) {
      projects = projects.slice(0, maxProjects);
    }
    return projects;
  }, [activeCategory, maxProjects]);

  return (
    <section
      id="projects-gallery"
      aria-label="Galeria de Projetos"
      className={`relative z-10 min-h-screen bg-ghost-bg ${className}`}
    >
      {/* Gallery Track */}
      <div className="relative w-full py-16 md:py-24 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-focus-ring/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-ghost-accent/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative std-grid">
          {/* Header com título e filtros */}
          {showFilter && (
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easing }}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 md:mb-16"
            >
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
                  portfólio{' '}
                  <span className="text-ghost-accent">showcase</span>
                </h2>
                <span className="text-sm uppercase tracking-[0.3em] text-white/40">
                  [{filteredProjects.length} projetos]
                </span>
              </div>

              <CategoryFilter
                activeCategory={activeCategory}
                onChange={setActiveCategory}
              />
            </motion.div>
          )}

          {/* Grid de projetos - Masonry com 12 colunas */}
          <motion.div
            layout={!prefersReducedMotion}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5"
            role="tabpanel"
            id={`projects-${activeCategory}`}
            aria-label={`Projetos de ${activeCategory}`}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <PortfolioCard
                  key={project.id}
                  project={project}
                  index={index}
                  onOpen={onProjectOpen}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <span className="text-6xl mb-4">🔍</span>
              <h3 className="text-xl font-medium text-white mb-2">
                Nenhum projeto encontrado
              </h3>
              <p className="text-white/60">
                Tente selecionar outra categoria.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsGallery;
