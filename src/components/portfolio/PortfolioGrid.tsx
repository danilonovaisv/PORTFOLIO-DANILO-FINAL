'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useBodyLock } from '@/hooks/useBodyLock';
import PortfolioItem, { PortfolioGridProject } from './PortfolioItem';
import styles from './PortfolioGrid.module.css';

interface PortfolioGridProps {
  projects: PortfolioGridProject[];
  /**
   * Controla a quantidade de colunas entre 992px e 1199px.
   * Aceita 3 ou 4 para espelhar o layout da referência.
   */
  columnsDesktop?: 3 | 4;
  className?: string;
}

export default function PortfolioGrid({
  projects,
  columnsDesktop = 3,
  className,
}: PortfolioGridProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeProject, setActiveProject] = useState<PortfolioGridProject | null>(null);
  const normalizedColumns = columnsDesktop === 4 ? 4 : 3;

  const gridStyle = useMemo(
    () => ({
      ['--columns-desktop' as string]: normalizedColumns,
    }),
    [normalizedColumns]
  );

  useBodyLock(!!activeProject);

  const handleClose = useCallback(() => {
    setActiveProject(null);
  }, []);

  useEffect(() => {
    if (!activeProject) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeProject, handleClose]);

  return (
    <section className={className} aria-label="Portfolio Grid">
      {/*
        Breakpoints controlados via CSS module para reproduzir o layout Finch:
        - <576px: 1 coluna
        - 576px: 2 colunas, gap 20px
        - 769px: 3 colunas
        - 992px-1199px: usa columnsDesktop
        - >=1200px: 4 colunas
      */}
      <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 md:px-12 lg:px-24">
        <div className={styles.grid} style={gridStyle}>
          {projects.map((project) => (
            <PortfolioItem
              key={project.id}
              project={project}
              onOpenDescription={setActiveProject}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              type="button"
              aria-label="Fechar modal"
              onClick={handleClose}
              className="absolute inset-0 bg-black/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="portfolio-modal-title"
              className="relative z-10 w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-950/90 p-6 text-white shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-lg sm:p-8"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={handleClose}
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Fechar modal"
              >
                <span aria-hidden>×</span>
              </button>

              <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                {activeProject.category}
              </p>
              <h3 id="portfolio-modal-title" className="mt-3 text-2xl font-semibold">
                {activeProject.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-white/80">
                {activeProject.description ?? 'Descrição detalhada em breve.'}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
