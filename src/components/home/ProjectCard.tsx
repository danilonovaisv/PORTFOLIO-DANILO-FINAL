'use client';

import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.04,
      }}
      className={`group relative flex flex-col w-full ${
        project.isHero ? 'md:col-span-2' : ''
      }`}
    >
      <Link href={`/portfolio/${project.slug}`} className="block w-full">
        {/* Generative/Image Container */}
        <div className="relative overflow-hidden rounded-lg bg-gray-100 w-full aspect-[4/3] md:aspect-video mb-4 shadow-sm group-hover:shadow-xl group-hover:shadow-blue-500/15 transition-all duration-500 transform group-hover:scale-[1.03]">
          {/* Overlay Gradient (Hover) */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

          <Image
            src={project.img}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Hover Icon/Action (Optional, appearing on overlay) */}
          <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
            <div className="w-10 h-10 rounded-full bg-white text-[#0057FF] flex items-center justify-center">
              <ArrowRight size={20} />
            </div>
          </div>
        </div>

        {/* Legend / Info (Bottom) */}
        <div className="flex flex-col gap-1 items-center text-center md:items-start md:text-left">
          <h3 className="text-xl md:text-2xl font-bold font-sans tracking-tight text-[#111111] leading-tight group-hover:text-[#0057FF] transition-colors duration-300">
            {project.title}
          </h3>
          <div className="flex items-center gap-3 text-sm text-[#666666] font-medium uppercase tracking-wide">
            <span>{project.client}</span>
            {project.year && (
              <>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>{project.year}</span>
              </>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
