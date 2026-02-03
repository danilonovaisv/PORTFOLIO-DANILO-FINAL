'use client';

import Image from 'next/image';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import React, { useMemo, type MutableRefObject, type RefObject } from 'react';
import { Project } from '@/types/portfolio-grid';
import { cn } from '@/lib/utils';

type InteractionRef = MutableRefObject<{
  hover: number;
  tiltX: number;
  tiltY: number;
}>;

type ProjectCardProps = {
  project: Project;
  index: number;
  viewRef: RefObject<HTMLDivElement | null>;
  interactionRef: InteractionRef;
  onOpen: (_project: Project) => void;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function ProjectCard({
  project,
  index,
  viewRef,
  interactionRef,
  onOpen,
}: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const hover = useMotionValue(0);

  const rotXSmooth = useSpring(rotateX, { stiffness: 120, damping: 16, mass: 0.9 });
  const rotYSmooth = useSpring(rotateY, { stiffness: 120, damping: 16, mass: 0.9 });
  const hoverSmooth = useSpring(hover, { stiffness: 150, damping: 18, mass: 0.7 });
  const scale = useTransform(hoverSmooth, [0, 1], [1, 1.02]);

  const techLabel = useMemo(
    () => project.technologies?.slice(0, 3).join(' • '),
    [project.technologies]
  );

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const nextTiltY = clamp(x * 14, -12, 12);
    const nextTiltX = clamp(-y * 14, -12, 12);

    rotateX.set(nextTiltX);
    rotateY.set(nextTiltY);
    hover.set(1);

    interactionRef.current.tiltX = nextTiltX;
    interactionRef.current.tiltY = nextTiltY;
    interactionRef.current.hover = 1;
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
    hover.set(0);
    interactionRef.current.hover = 0;
    interactionRef.current.tiltX = 0;
    interactionRef.current.tiltY = 0;
  };

  const handleClick = () => onOpen(project);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpen(project);
    }
  };

  const motionProps = prefersReducedMotion
    ? {}
    : {
        style: {
          rotateX: rotXSmooth,
          rotateY: rotYSmooth,
          scale,
          transformPerspective: 900,
        },
      };

  return (
    <motion.article
      role="button"
      tabIndex={0}
      aria-label={`Projeto ${project.title}`}
      layoutId={`project-card-${project.id}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'group relative isolate overflow-hidden rounded-2xl border border-white/10 bg-white/5',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueAccent',
        'transition-transform duration-500 will-change-transform',
        'backdrop-blur-sm shadow-[0_0_0_1px_rgba(255,255,255,0.05)]',
        'aspect-[4/5] lg:aspect-[3/4]',
        'cursor-pointer'
      )}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{
        duration: 0.6,
        delay: Math.min(0.2, index * 0.04),
        ease: [0.22, 1, 0.36, 1],
      }}
      {...motionProps}
    >
      {/* Drei <View /> target */}
      <div
        ref={viewRef}
        className="absolute inset-0 pointer-events-none rounded-[18px] overflow-hidden"
        aria-hidden
      />

      {/* DOM fallback image */}
      <div className="absolute inset-0">
        {project.thumbnailUrl ? (
          <Image
            src={project.thumbnailUrl}
            alt={project.title}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-700 opacity-80 group-hover:opacity-100"
            priority={index < 2}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,230,255,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(135,5,242,0.16),transparent_30%)]"
          aria-hidden
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end gap-2 p-4 sm:p-5 lg:p-6 text-white">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/70">
          <span className="inline-flex h-2 w-2 rounded-full bg-current" />
          {techLabel || 'Case'}
        </div>

        <div className="space-y-1.5">
          <motion.h3
            layoutId={`project-title-${project.id}`}
            className="text-xl sm:text-2xl font-semibold leading-tight tracking-tight"
          >
            {project.title}
          </motion.h3>
          <p className="text-sm text-white/70 line-clamp-3">{project.description}</p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 2).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          <motion.span
            layoutId={`project-cta-${project.id}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-lg font-semibold shadow-lg shadow-cyan-500/10 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden
          >
            ↗
          </motion.span>
        </div>
      </div>
    </motion.article>
  );
}
