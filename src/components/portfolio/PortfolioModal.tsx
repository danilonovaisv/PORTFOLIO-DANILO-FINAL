'use client';

import { useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotionGate } from '@/hooks/useMotionGate';
import { X } from 'lucide-react';
import { PortfolioProject } from '@/types/project';
import { createPortal } from 'react-dom';
import { useBodyLock } from '@/hooks/useBodyLock';
import { usePortalRoot } from '@/hooks/usePortalRoot';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import {
  getBackdropVariants,
  getContainerVariants,
} from '@/components/portfolio/modal/variants';
import TypeAContent from '@/components/portfolio/content/TypeAContent';
import TypeBContent from '@/components/portfolio/content/TypeBContent';

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: PortfolioProject | null;
}

export const PortfolioModal = ({
  isOpen,
  onClose,
  project,
}: PortfolioModalProps) => {
  const shouldReduceMotion = useMotionGate();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const portalRoot = usePortalRoot();

  useBodyLock(isOpen);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Permitir uma renderização curta para o foco
      setTimeout(() => closeRef.current?.focus(), 50);
    } else {
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
        previousFocusRef.current = null;
      }
    }

    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const containerVariants = useMemo(
    () => getContainerVariants(shouldReduceMotion),
    [shouldReduceMotion]
  );
  const backdropVariants = useMemo(
    () => getBackdropVariants(shouldReduceMotion),
    [shouldReduceMotion]
  );

  const titleId = project
    ? `portfolio-modal-${project.slug.replace(/[^a-z0-9-]/gi, '')}`
    : undefined;

  if (!portalRoot) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && project ? (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[1200] pointer-events-none bg-background/95 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            aria-hidden="true"
          />

          <motion.div
            key="modal"
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={`${titleId}-desc`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
            className="fixed inset-0 z-[1210] flex h-[100dvh] w-screen flex-col overflow-x-hidden overflow-y-auto font-display selection:bg-primary selection:text-black"
          >
            {/* Ambient Background Gradient inside modal */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral via-background to-background opacity-80" />

            <div className="fixed top-4 right-4 md:top-8 md:right-8 z-[1220]">
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Fechar modal"
                className="group flex h-[48px] w-[48px] items-center justify-center rounded-full border border-white/10 bg-black/40 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:h-[68px] md:w-[68px]"
              >
                <X className="text-white/70 group-hover:text-white transition-colors" size={28} strokeWidth={1.5} />
              </button>
            </div>

            <main className="flex-1 relative z-10 w-full pt-16 md:pt-0 min-h-full">
              {titleId ? (
                <>
                  <h2 id={titleId} className="sr-only">
                    {project.title}
                  </h2>
                  <div id={`${titleId}-desc`} className="sr-only">
                    Detalhamento do projeto {project.title}. Categoria: {project.displayCategory}.
                  </div>
                </>
              ) : null}
              <ErrorBoundary
                fallback={
                  <div className="flex items-center justify-center min-h-[50vh]">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
                      Não foi possível carregar este projeto agora. Tente novamente em instantes.
                    </div>
                  </div>
                }
              >
                {project.type === 'A' ? (
                  <TypeAContent project={project} />
                ) : (
                  <TypeBContent project={project} />
                )}
              </ErrorBoundary>
            </main>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>,
    portalRoot
  );
};
