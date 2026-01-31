'use client';

import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { GHOST_EASE } from '@/config/motion';
import { ProjectCard } from './ProjectCard';
import type { PortfolioProject } from '@/types/project';

interface PortfolioShowcaseSectionProps {
  projects: PortfolioProject[];
  onProjectSelect?: (_project: PortfolioProject) => void;
}

/**
 * Portfolio Showcase Section (Portfolio Page)
 * Grid de projetos com animações de parallax e overlays (Finch Style)
 * Atualizado conforme AUDITORIA_PORTFOLIO.md
 */
export default function PortfolioShowcaseSection({ projects, onProjectSelect }: PortfolioShowcaseSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = !!useReducedMotion();

  return (
    <section
      id="portfolio-showcase"
      ref={sectionRef}
      className="relative w-full bg-slate-950 pt-10 pb-20 lg:pb-32" // Updated bg to match audit dark theme preference
      aria-labelledby="portfolio-showcase-heading"
    >
      <Container>
        {/* Headline */}
        <motion.header
          initial={
            prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: GHOST_EASE }}
          className="text-center mb-16 lg:mb-24"
        >
          <h2
            id="portfolio-showcase-heading"
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight text-white"
          >
            <span className="text-sky-500 italic font-light">
              todos os{' '}
            </span>
            <span className="font-bold">projetos</span>
          </h2>
        </motion.header>

        {/* Portfolio Grid - 12 Columns */}
        {/* Adhere to the audit: grid grid-cols-12 gap-3 sm:gap-4 */}
        <div className="grid grid-cols-12 gap-3 sm:gap-4">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={onProjectSelect}
              // Map the existing layout.cols string (e.g. 'md:col-span-4') to the class
              // Default to col-span-12 if not specified
              className={`col-span-12 ${project.layout.cols || 'md:col-span-4'}`}
            />
          ))}
        </div>
        
        <div className="mt-8 flex items-center justify-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(2,132,199,0.25)] transition hover:bg-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            aria-label="Ver mais projetos (placeholder)"
          >
            <span aria-hidden>←</span> veja mais <span aria-hidden>→</span>
          </button>
        </div>

      </Container>
    </section>
  );
}
