'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useBodyLock } from '@/hooks/useBodyLock';
import { isVideo } from '@/utils/utils';

type ImageLightboxProps = {
  isOpen: boolean;
  src: string | null;
  alt: string;
  onClose: () => void;
};

export function ImageLightbox({ isOpen, src, alt, onClose }: ImageLightboxProps) {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  useBodyLock(isOpen);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      lastFocusRef.current?.focus();
      return;
    }

    lastFocusRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const backdropTransition = shouldReduceMotion
    ? { duration: 0.16 }
    : { duration: 0.24, ease: [0.22, 1, 0.36, 1] as const };
  const panelTransition = shouldReduceMotion
    ? { duration: 0.16 }
    : { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const };

  return createPortal(
    <AnimatePresence>
      {isOpen && src ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Visualização ampliada"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/95 p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={backdropTransition}
          onClick={onClose}
        >
          <motion.div
            className="relative h-full w-full max-w-6xl"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14, filter: 'blur(6px)' }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14, filter: 'blur(6px)' }}
            transition={panelTransition}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Fechar zoom"
              className="absolute right-2 top-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <X size={18} />
            </button>

            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/60">
              {isVideo(src) ? (
                <video
                  src={src}
                  className="h-full w-full object-contain"
                  controls
                  autoPlay
                  muted
                  playsInline
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={src}
                  alt={alt}
                  className="h-full w-full object-contain"
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
