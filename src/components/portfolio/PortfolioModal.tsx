'use client';

import type { MouseEvent } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { PortfolioProject } from '@/types/project';
import { createPortal } from 'react-dom';
import { useBodyLock } from '@/hooks/useBodyLock';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import {
  getBackdropVariants,
  getContainerVariants,
} from './modal/variants';
import TypeAContent from './content/TypeAContent';
import TypeBContent from './content/TypeBContent';

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
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useBodyLock(isOpen);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;

    closeRef.current?.focus();

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

  const backdropVariants = useMemo(
    () => getBackdropVariants(shouldReduceMotion),
    [shouldReduceMotion]
  );
  const containerVariants = useMemo(
    () => getContainerVariants(shouldReduceMotion),
    [shouldReduceMotion]
  );

  const titleId = project
    ? `portfolio-modal-${project.slug.replace(/[^a-z0-9-]/gi, '')}`
    : undefined;

  const handleBackdropClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && project ? (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleBackdropClick}
            aria-hidden="true"
          />

          <motion.div
            key="modal"
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[60] overflow-y-auto"
          >
            <div className="min-h-full flex items-start justify-center p-4 md:p-8 lg:p-12">
              <div className="relative w-full max-w-5xl rounded-3xl border border-white/10 bg-[#0c1024] text-white shadow-[0_24px_90px_-30px_rgba(0,0,0,0.6)]">
                <button
                  ref={closeRef}
                  onClick={onClose}
                  aria-label="Fechar modal"
                  className="fixed top-6 right-6 z-[70] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  <X size={22} />
                </button>

                <div className="relative p-6 pt-14 md:p-10 md:pt-16 lg:p-12 lg:pt-20">
                  {titleId ? (
                    <h2 id={titleId} className="sr-only">
                      {project.title}
                    </h2>
                  ) : null}
                  <ErrorBoundary
                    fallback={
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
                        Não foi possível carregar este projeto agora. Tente
                        novamente em instantes.
                      </div>
                    }
                  >
                    {project.type === 'A' ? (
                      <TypeAContent project={project} />
                    ) : (
                      <TypeBContent project={project} />
                    )}
                  </ErrorBoundary>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>,
    document.body
  );
};
