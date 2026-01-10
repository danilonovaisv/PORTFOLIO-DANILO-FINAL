'use client';

import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/lib/types';
import { MOTION_TOKENS, ghostTransition } from '@/config/motion';

const { duration, stagger } = MOTION_TOKENS;

interface ProjectCardProps {
  project: Project;
  index: number;
  className?: string;
}

const ProjectCard: FC<ProjectCardProps> = ({
  project,
  index,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();

  // Ghost Era: sem scale, apenas translate
  const mediaHoverClass = prefersReducedMotion
    ? ''
    : 'md:group-hover:-translate-y-1';
  const arrowHoverClass = prefersReducedMotion
    ? ''
    : 'md:group-hover:translate-x-5 md:group-hover:-translate-y-px';
  const easeClass = 'ease-[cubic-bezier(0.22,1,0.36,1)]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={ghostTransition(index * stagger.tight, duration.normal)}
      className={`group relative flex h-full w-full flex-col ${className}`}
    >
      <Link href={`/portfolio/${project.slug}`} className="block w-full h-full">
        {/* Imagem Container - Ocupa toda a área do card */}
        <div className="relative h-full w-full overflow-hidden rounded-3xl transition-[transform,opacity] duration-650">
          {/* Imagem com fill */}
          <Image
            src={project.image}
            alt={project.title}
            fill
            className={`object-cover transition-transform duration-650 ${easeClass} will-change-transform ${mediaHoverClass}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Tag no canto superior direito - DENTRO da imagem */}
          <div className="absolute top-5 right-5 z-20">
            <span className="inline-flex items-center rounded-full bg-white/95 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-900 shadow-sm backdrop-blur-sm">
              {project.category || 'Case'}
            </span>
          </div>

          {/* Footer Info - DENTRO da imagem, no rodapé */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-6 flex items-end justify-between gap-4">
            {/* Texto do projeto */}
            <div className="flex flex-col gap-1">
              <h3 className="text-lg md:text-xl font-bold text-white leading-tight drop-shadow-lg">
                {project.title}
              </h3>
              <span className="text-sm text-white/80 font-medium drop-shadow-md">
                {project.client}
              </span>
            </div>

            {/* Botão Circular Azul com seta diagonal */}
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-focus-ring text-white shadow-lg shadow-blue-500/30 transition-transform duration-650 ${easeClass} will-change-transform ${arrowHoverClass}`}
            >
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>

          {/* Gradient overlay para legibilidade do texto no footer */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

          {/* Overlay sutil no hover para profundidade */}
          <div
            className={`pointer-events-none absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-500 ${prefersReducedMotion ? '' : 'group-hover:opacity-100'}`}
          />
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
