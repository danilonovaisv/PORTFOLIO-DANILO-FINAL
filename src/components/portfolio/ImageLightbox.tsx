'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { useMotionGate } from '@/hooks/useMotionGate';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useBodyLock } from '@/hooks/useBodyLock';
import { usePortalRoot } from '@/hooks/usePortalRoot';
import { ResponsiveCaptionTrack } from '@/components/ui/ResponsiveCaptionTrack';
import { getYouTubeEmbedUrl, isVideo, isYouTubeUrl } from '@/lib/utils';
import { DEFAULT_CAPTIONS } from '@/lib/video';
import Image from 'next/image';
import { GHOST_EASE } from '@/config/motion';

type ImageLightboxProps = {
  isOpen: boolean;
  src: string | null;
  alt: string;
  onClose: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
};

export function ImageLightbox({
  isOpen,
  src,
  alt,
  onClose,
  hasNext = false,
  hasPrev = false,
  onNext,
  onPrev,
}: ImageLightboxProps) {
  const shouldReduceMotion = useMotionGate();
  const closeRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const portalRoot = usePortalRoot();

  useBodyLock(isOpen);

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
        return;
      }

      if (event.key === 'ArrowRight' && hasNext && onNext) {
        event.preventDefault();
        onNext();
        return;
      }

      if (event.key === 'ArrowLeft' && hasPrev && onPrev) {
        event.preventDefault();
        onPrev();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !src || !isVideo(src) || !videoRef.current) return;

    const video = videoRef.current;
    video.muted = false;
    void video.play().catch(() => undefined);
  }, [isOpen, src]);

  if (!portalRoot) return null;

  const backdropTransition = shouldReduceMotion
    ? { duration: 0.16 }
    : { duration: 0.24, ease: GHOST_EASE };
  const panelTransition = shouldReduceMotion
    ? { duration: 0.16 }
    : { duration: 0.32, ease: GHOST_EASE };
  const youtubeEmbedUrl = src && isYouTubeUrl(src) ? getYouTubeEmbedUrl(src) : null;

  return createPortal(
    <AnimatePresence>
      {isOpen && src ? (
        <m.div
          role="dialog"
          aria-modal="true"
          aria-label="Visualização ampliada"
          className="fixed inset-0 z-[var(--z-layer-lightbox)] flex items-center justify-center bg-black/95 p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={backdropTransition}
          onClick={onClose}
        >
          <m.div
            className="relative flex max-h-[90vh] max-w-6xl flex-col items-center justify-center p-2"
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

            {hasPrev && onPrev ? (
              <button
                type="button"
                onClick={onPrev}
                aria-label="Imagem anterior"
                className="absolute left-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                <ChevronLeft size={18} />
              </button>
            ) : null}

            {hasNext && onNext ? (
              <button
                type="button"
                onClick={onNext}
                aria-label="Próxima imagem"
                className="absolute right-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                <ChevronRight size={18} />
              </button>
            ) : null}

            <div className="relative flex max-h-full max-w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-2xl">
              {youtubeEmbedUrl ? (
                <iframe
                  src={youtubeEmbedUrl}
                  title={alt}
                  className="h-full w-full border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : isVideo(src) ? (
                <video
                  ref={videoRef}
                  src={src}
                  className="h-full w-full object-contain"
                  controls
                  autoPlay
                  muted={false}
                  playsInline
                  preload="metadata"
                  onLoadedMetadata={(event) => {
                    event.currentTarget.muted = false;
                    void event.currentTarget.play().catch(() => undefined);
                  }}
                >
                  <ResponsiveCaptionTrack src={DEFAULT_CAPTIONS} />
                </video>
              ) : (

                <Image
                  src={src}
                  alt={alt}
                  width={1920}
                  height={1080}
                  sizes="90vw"
                  className="max-h-[85vh] w-auto max-w-full object-contain"
                  priority
                />
              )}
            </div>
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>,
    portalRoot
  );
}
