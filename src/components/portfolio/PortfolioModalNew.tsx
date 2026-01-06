// =============================================================================
// PortfolioModalNew - Ghost Era v2.0
// Modal com animações editoriais e timings precisos
// =============================================================================

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import type { PortfolioProject } from '@/types/project';
import { useBodyLock } from '@/hooks/useBodyLock';
import { MOTION_TOKENS, ghostTransition, modalVariants } from '@/config/motion';
import TypeAContent from './content/TypeAContent';
import TypeBContent from './content/TypeBContent';

interface PortfolioModalNewProps {
  project: PortfolioProject | null;
  isOpen: boolean;
  onClose: () => void;
}

const { duration, offset } = MOTION_TOKENS;

export default function PortfolioModalNew({
  project,
  isOpen,
  onClose,
}: PortfolioModalNewProps) {
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Bloqueia scroll do body quando modal está aberto
  useBodyLock(isOpen);

  // Monta o componente apenas no cliente (para createPortal)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Focus trap e ESC handler
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }

      // Focus trap básico
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
    
    // Focus no botão de fechar ao abrir
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Previne click propagation no backdrop
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants.backdrop}
            onClick={handleBackdropClick}
            className="fixed inset-0 z-100 bg-black/85 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            key="modal"
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: offset.large }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: offset.standard }}
            transition={ghostTransition(prefersReducedMotion ? 0 : 0.1, prefersReducedMotion ? 0.15 : duration.modal)}
            className="fixed inset-0 z-101 overflow-y-auto"
          >
            <div className="min-h-full flex items-start justify-center p-4 md:p-8 lg:p-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={ghostTransition(prefersReducedMotion ? 0 : 0.3, duration.fast)}
                className="relative w-full max-w-5xl bg-ghost-bg/95 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden will-change-transform"
              >
                {/* Close button - Fixed */}
                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  className="absolute top-4 right-4 md:top-6 md:right-6 z-50 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ghost-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ghost-bg"
                  aria-label="Fechar modal"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                {/* Header glow */}
                <div className="absolute top-0 inset-x-0 h-40 pointer-events-none">
                  <div 
                    className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center_top,var(--glow-color,rgba(0,87,255,0.3)),transparent_70%)]"
                    {...(project.accentColor && { style: { '--glow-color': `${project.accentColor}40` } as React.CSSProperties })}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 md:p-10 lg:p-12 pt-16 md:pt-20">
                  {/* Renderiza layout baseado no tipo */}
                  {project.type === 'A' ? (
                    <TypeAContent project={project} />
                  ) : (
                    <TypeBContent project={project} />
                  )}
                </div>

                {/* Footer gradient */}
                <div className="absolute bottom-0 inset-x-0 h-24 bg-linear-to-t from-ghost-bg to-transparent pointer-events-none" />
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  // Renderiza no portal do body
  return createPortal(modalContent, document.body);
}
