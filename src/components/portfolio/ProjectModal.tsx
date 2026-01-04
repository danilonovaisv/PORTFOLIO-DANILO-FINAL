'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import type { FeaturedProject } from '@/components/home/featured-projects/FeaturedProjectCard';

type ProjectModalProps = {
  project: FeaturedProject | null;
  open: boolean;
  onClose: () => void;
};

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

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

  if (!mounted) return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.18,
        ease: 'linear',
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.15, ease: 'linear' },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98, y: 12 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.26,
        ease: easing,
        delay: shouldReduceMotion ? 0 : 0.12,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      y: 8,
      transition: { duration: shouldReduceMotion ? 0 : 0.18, ease: easing },
    },
  };

  const mediaVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.24,
        delay: shouldReduceMotion ? 0 : 0.52,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 6 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.2,
        delay: shouldReduceMotion ? 0 : 0.76,
        ease: easing,
      },
    },
  };

  const metaVariants = {
    hidden: { opacity: 0, y: 4 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.16,
        delay: shouldReduceMotion ? 0 : 0.96,
        ease: easing,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.24,
        delay: shouldReduceMotion ? 0 : 1.12,
        ease: easing,
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

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
                  className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10"
                >
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority
                  />
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
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#4fe6ff]"
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
