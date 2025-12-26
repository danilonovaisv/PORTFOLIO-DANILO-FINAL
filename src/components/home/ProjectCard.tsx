'use client';

import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/lib/types';

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.08,
      }}
      className={`group relative flex flex-col w-full ${className}`}
    >
      <Link href={`/portfolio/${project.slug}`} className="block w-full h-full">
        {/* Imagem Container - Ocupa toda a área do card */}
        <div className="relative overflow-hidden rounded-3xl w-full h-full transition-all duration-500 transform group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-black/20">
          {/* Imagem com fill */}
          <Image
            src={project.img}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Tag no canto superior direito - DENTRO da imagem */}
          <div className="absolute top-5 right-5 z-20">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-xs font-semibold text-gray-900 shadow-sm uppercase tracking-wide">
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
            <div className="shrink-0 w-12 h-12 rounded-full bg-[#0057FF] flex items-center justify-center text-white shadow-lg shadow-blue-500/30 transform transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>

          {/* Gradient overlay para legibilidade do texto no footer */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

          {/* Overlay sutil no hover para profundidade */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
