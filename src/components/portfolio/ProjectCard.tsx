'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { PortfolioProject } from '@/types/project';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: PortfolioProject;
  index: number;
  onClick?: (_project: PortfolioProject) => void;
  className?: string;
  priority?: boolean;
}

/**
 * ProjectCard - Ghost Era v2.0
 * Card editorial com efeito parallax interno e hover states refinados
 */
export const ProjectCard = ({
  project,
  index,
  onClick,
  className = '',
  priority = false,
}: ProjectCardProps) => {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Mapeia o progresso de scroll do card para um offset vertical suave
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <motion.div
      ref={ref}
      onClick={() => onClick?.(project)}
      className={cn(
        'group relative overflow-hidden border border-white/10 bg-white/5 cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueAccent',
        'h-[320px] md:h-[420px] rounded-xl will-change-transform',
        className
      )}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{
        duration: 0.6,
        delay: Math.min(0.18, index * 0.03),
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <div className="absolute inset-0">
        {project.image ? (
          <motion.div
            className="absolute inset-0"
            style={reduceMotion ? undefined : { y }}
          >
            {/* Wrapper mais alto para permitir o efeito parallax vertical */}
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
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      <div className="relative flex h-full flex-col justify-end p-5 md:p-6">
        <div className="flex items-center justify-between gap-4 translate-z-10">
          <div className="flex-1">
            {project.tags?.[0] && (
              <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white/90 backdrop-blur-sm border border-white/10">
                {project.tags[0]}
              </span>
            )}
            <h3 className="mt-3 text-xl font-bold leading-tight text-white sm:text-2xl tracking-tight">
              {project.title}
            </h3>
            <p className="mt-1.5 text-sm font-medium text-white/60">
              {project.subtitle || project.client}
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-300 group-hover:bg-white/20 group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0">
            <span aria-hidden className="text-xl">↗</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
