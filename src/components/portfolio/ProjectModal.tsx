'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import type { PortfolioProject } from '@/types/project';
import {
  getBackdropVariants,
  getContainerVariants,
  getMediaVariants,
  getTitleVariants,
  getMetaVariants,
  getContentVariants,
} from './modal/variants';
import { isVideo } from '@/utils/utils';

type ProjectModalProps = {
  project: PortfolioProject | null;
  open: boolean;
  onClose: () => void;
};

export default function ProjectModal({
  project,
  open,
  onClose,
}: ProjectModalProps) {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const titleId = useMemo(
    () =>
      project ? `project-modal-title-${project.slug.replace(/[^a-z0-9]/gi, '')}` : undefined,
    [project]
  );

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (open) {
      document.addEventListener('keydown', handleKey);
      closeRef.current?.focus({ preventScroll: true });
    }
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  const backdropVariants = useMemo(() => getBackdropVariants(shouldReduceMotion), [shouldReduceMotion]);
  const containerVariants = useMemo(() => getContainerVariants(shouldReduceMotion), [shouldReduceMotion]);
  const mediaVariants = useMemo(() => getMediaVariants(shouldReduceMotion), [shouldReduceMotion]);
  const titleVariants = useMemo(() => getTitleVariants(shouldReduceMotion), [shouldReduceMotion]);
  const metaVariants = useMemo(() => getMetaVariants(shouldReduceMotion), [shouldReduceMotion]);
  const contentVariants = useMemo(() => getContentVariants(shouldReduceMotion), [shouldReduceMotion]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && project ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 md:px-10">
          <motion.button
            type="button"
            aria-label="Fechar modal clicando no fundo"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0c1024] text-white shadow-[0_24px_90px_-30px_rgba(0,0,0,0.6)] border border-white/10"
          >
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(0,87,255,0.16),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(79,230,255,0.18),transparent_35%)]" />

            <div className="relative grid gap-8 p-6 md:grid-cols-[1.25fr,0.9fr] md:p-10">
              <div className="flex flex-col gap-4">
                <motion.div
                  variants={mediaVariants}
                  className="relative aspect-video w-full overflow-hidden rounded-2xl bg-linear-to-br from-white/5 to-white/0 border border-white/10"
                >
                    {isVideo(project.image) ? (
                      <video
                        src={project.image}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 60vw"
                        priority
                      />
                    )}
                </motion.div>
              </div>

              <motion.div
                className="flex flex-col gap-4"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="flex items-center justify-between gap-4">
                  <motion.h2
                    id={titleId}
                    variants={titleVariants}
                    className="text-2xl md:text-3xl font-semibold leading-tight"
                  >
                    {project.title}
                  </motion.h2>

                  <button
                    ref={closeRef}
                    type="button"
                    onClick={onClose}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ghost-blue"
                    aria-label="Fechar modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <motion.div
                  variants={metaVariants}
                  className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-[0.18em] text-white/60"
                >
                  <span className="rounded-full bg-white/5 px-3 py-1 border border-white/10">
                    {project.category}
                  </span>
                  <span aria-hidden className="opacity-50">
                    •
                  </span>
                  <span>{project.client}</span>
                  <span aria-hidden className="opacity-50">
                    •
                  </span>
                  <span>{project.year}</span>
                </motion.div>

                <motion.div
                  variants={contentVariants}
                  className="space-y-3 text-base leading-relaxed text-white/80"
                >
                  <p>
                    Uma visão ampliada do projeto para leitura confortável,
                    mantendo o contexto do showcase sem quebrar o fluxo.
                  </p>
                  <p>
                    O modal usa a sequência editorial: backdrop → container →
                    mídia → título → meta → detalhes. Nenhum elemento permanece
                    animando após a entrada.
                  </p>
                </motion.div>

                <motion.div
                  variants={contentVariants}
                  className="flex flex-wrap gap-2 pt-2"
                >
                  {(project.tags ?? []).map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
