'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotionGate } from '@/hooks/useMotionGate';
import { X } from 'lucide-react';
import { PortfolioProject } from '@/types/project';
import { createPortal } from 'react-dom';
import { useBodyLock } from '@/hooks/useBodyLock';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import {
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

  const containerVariants = useMemo(
    () => getContainerVariants(shouldReduceMotion),
    [shouldReduceMotion]
  );

  const titleId = project
    ? `portfolio-modal-${project.slug.replace(/[^a-z0-9-]/gi, '')}`
    : undefined;

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && project ? (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[1200] pointer-events-none bg-[#040013]/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
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
            className="fixed inset-0 z-[1210] flex flex-col font-display selection:bg-[#4fe6ff] selection:text-black overflow-hidden h-[100dvh] w-screen"
          >
            {/* Ambient Background Gradient inside modal */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0b0d3a] via-[#040013] to-[#040013] opacity-80"></div>

            <div className="fixed top-8 right-6 md:right-10 z-[1220]">
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Fechar modal"
                className="flex items-center justify-center w-[56px] h-[56px] md:w-[68px] md:h-[68px] rounded-full bg-black/40 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all duration-300 group shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4fe6ff]"
              >
                <X className="text-white/70 group-hover:text-white transition-colors" size={32} strokeWidth={1.5} />
              </button>
            </div>

            <main className="flex-1 overflow-y-auto overscroll-contain relative z-10 w-full pt-16 md:pt-0">
              {titleId ? (
                <h2 id={titleId} className="sr-only">
                  {project.title}
                </h2>
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
    document.body
  );
};
