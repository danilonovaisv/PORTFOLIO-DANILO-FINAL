'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { PortfolioProject } from '@/types/project';

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

interface ProjectCardProps {
  project: PortfolioProject;
  index: number;
  onClick?: (_project: PortfolioProject) => void;
  className?: string; // We will pass col-span classes here
  priority?: boolean;
}

export const ProjectCard = ({
  project,
  index,
  onClick,
  className = '',
  priority = false,
}: ProjectCardProps) => {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Mapeia o progresso de scroll do card para um offset vertical suave
  // - aproximação do comportamento do script parallax original (wrapper mais alto que o card)
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40])

  return (
    <motion.div
      ref={ref}
      onClick={() => onClick?.(project)}
      className={cn(
        // Keep legacy ".parallax-card" class so E2E tests can locate cards (was used by the previous Parallax card)
        'parallax-card group relative overflow-hidden border border-white/10 bg-white/5 cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400',
        'min-h-[320px] md:min-h-[420px]',
         className
      )}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.6, delay: Math.min(0.18, index * 0.03), ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0">
        {project.image ? (
          <motion.div
            className="absolute inset-0"
            style={reduceMotion ? undefined : { y }}
          >
            {/* Wrapper mais alto para permitir o efeito parallax vertical, inspirado no CSS da gallery-track */}
            <div className="absolute inset-x-0 top-0 h-[135%]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority={priority}
                unoptimized
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />
            </div>
          </motion.div>
        ) : (
          <div className="absolute inset-0 bg-white/10" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-black/0" />
      </div>

      <div className="relative flex h-full flex-col justify-end p-4 sm:p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            {project.tags?.[0] && (
              <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/80">
                {project.tags[0]}
              </span>
            )}
            <h3 className="mt-2 text-lg font-semibold leading-tight text-white sm:text-xl">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-white/70">{project.subtitle || project.client}</p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/90 transition group-hover:bg-white/10 shrink-0">
            <span aria-hidden>↗</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
