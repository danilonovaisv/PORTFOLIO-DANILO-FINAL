// =============================================================================
// ProjectsGallery - Ghost Era v2.0
// Grid de projetos com filtro de categoria e layout masonry
// Conforme especificação: PORTFOLIO - PROTÓTIPO INTERATIVO.md
// =============================================================================

'use client';

import { FC, useMemo, useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { PortfolioProject, ProjectCategory } from '@/types/project';
import type { MouseEvent } from 'react';
import { filterProjectsByCategory } from '@/data/projects';
import CategoryFilter from './CategoryFilter';
import PortfolioCard from './PortfolioCard';
import useParallax from '@/hooks/useParallax';
import { Container } from '@/components/layout/Container';
import AntigravityCTA from '@/components/ui/AntigravityCTA';

interface ProjectsGalleryProps {
  projects: PortfolioProject[];
  onProjectOpen?: (_project: PortfolioProject) => void;
  showFilter?: boolean;
  maxProjects?: number;
  className?: string;
  isPaused?: boolean;
}

const easing = [0.22, 1, 0.36, 1] as const;

const ProjectsGallery: FC<ProjectsGalleryProps> = ({
  projects,
  onProjectOpen,
  showFilter = true,
  maxProjects,
  className = '',
  isPaused = false,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const prefersReducedMotion = useReducedMotion();
  const handleCTAClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  
  // Parallax Setup
  const { galleryRef, trackRef, isScrolling, style: parallaxStyle } = useParallax({
    springConfig: { stiffness: 45, damping: 25 },
    enabled: !prefersReducedMotion && !isPaused,
  });

  // Estado para altura do container (Sync Track -> Scroll)
  const [galleryHeight, setGalleryHeight] = useState('auto');

  // Filtra projetos baseado na categoria ativa
  const filteredProjects = useMemo(() => {
    let filtered = filterProjectsByCategory(projects, activeCategory);
    if (maxProjects) {
      filtered = filtered.slice(0, maxProjects);
    }
    return filtered;
  }, [activeCategory, maxProjects, projects]);

  // Sync Height Effect: Mede o track e define a altura do container de scroll
  useEffect(() => {
    if (!trackRef.current || prefersReducedMotion) {
      setGalleryHeight('auto');
      return;
    }

    const updateHeight = () => {
      if (trackRef.current) {
        const height = trackRef.current.offsetHeight;
        // Adiciona um pequeno buffer para garantir que o scroll chegue ao fim
        setGalleryHeight(`${height}px`);
      }
    };

    // Observer para mudanças de tamanho no conteúdo (ex: filtro)
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(trackRef.current);
    
    // Executa imediatamente também
    updateHeight();

    return () => resizeObserver.disconnect();
  }, [filteredProjects, prefersReducedMotion, activeCategory, trackRef]);

  // Set CSS variable on gallery element
  useEffect(() => {
    const galleryEl = galleryRef.current as HTMLElement | null;
    if (galleryEl) {
      galleryEl.style.setProperty('--gallery-height', galleryHeight);
    }
  }, [galleryHeight, galleryRef]);

  return (
    <section
      ref={galleryRef as React.RefObject<HTMLElement>}
      id="projects-gallery"
      aria-label="Galeria de Projetos"
      className={`relative z-10 bg-background transition-[height] duration-300 ease-out ${className}`}
      style={{ height: galleryHeight }}
    >
      {/* Gallery Track (Fixed or Static) */}
        <motion.div
          ref={trackRef}
          style={parallaxStyle}
          className={`w-full py-16 md:py-24 overflow-hidden ${
          !prefersReducedMotion && 'md:sticky md:top-0 md:w-full will-change-transform'
        }`}
      >
        {/* Background glow effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-bluePrimary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blueAccent/5 rounded-full blur-[100px]" />
        </div>

        <Container>
          {/* Heading + CTA posicionados abaixo da hero (desktop e mobile) */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easing }}
            className="mb-10 md:mb-14 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
          >
            <div className="flex flex-col gap-2">
              <p className="text-sm uppercase tracking-[0.08em] text-blueAccent font-semibold">
                portfólio
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-[56px] tracking-tight leading-[1.05] text-white">
                <span className="text-blueAccent font-bold">portfólio</span>{' '}
                <span className="font-bold">showcase</span>
              </h1>
            </div>
            <div className="flex md:justify-end">
              <AntigravityCTA
                onClick={handleCTAClick}
                href="#contact"
                text="vamos trabalhar juntos"
                className="relative"
              />
            </div>
          </motion.div>

          {/* Header com título e filtros */}
          {showFilter && (
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easing }}
              className="flex justify-center md:justify-end mb-16 md:mb-24"
            >
              <CategoryFilter
                activeCategory={activeCategory}
                onChange={setActiveCategory}
              />
            </motion.div>
          )}

          {/* Grid de projetos - Masonry com 12 colunas */}
          <motion.div
            layout={!prefersReducedMotion}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-x-8 md:gap-y-24"
            role="tabpanel"
            id={`projects-${activeCategory}`}
            aria-label={`Projetos de ${activeCategory}`}
            /* Removemos o layout prop se estivermos usando custom parallax scroll para evitar conflitos? 
               Não, framer motion layout deve funcionar para reordenação interna. 
            */
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <PortfolioCard
                  key={project.id}
                  project={project}
                  index={index}
                  onOpen={onProjectOpen}
                  /* Se estiver scrollando rápido, podemos otimizar renderização */
                  className={isScrolling ? 'pointer-events-none' : ''}
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
        </Container>
      </motion.div>
    </section>
  );
};

export default ProjectsGallery;
