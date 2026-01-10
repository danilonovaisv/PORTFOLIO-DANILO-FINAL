// =============================================================================
// TypeAContent - Ghost Era v2.0
// Layout de conteúdo para projetos Tipo A (Hero / Grande)
// =============================================================================

'use client';

import { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, Building2 } from 'lucide-react';
import type { PortfolioProject } from '@/types/project';

interface TypeAContentProps {
  project: PortfolioProject;
}

const easing = [0.22, 1, 0.36, 1] as const;

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.52,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.5, ease: easing },
};

/**
 * Layout A: Hero image grande no topo + Info abaixo
 * Usado para projetos de destaque
 */
const TypeAContent: FC<TypeAContentProps> = ({ project }) => {
  return (
    <motion.div
      variants={staggerChildren}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col gap-8"
    >
      {/* Hero Image */}
      <motion.div
        variants={fadeInUp}
        className="relative w-full aspect-video md:aspect-21/9 rounded-2xl overflow-hidden bg-white/5"
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 80vw"
          priority
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Category badge */}
        <div className="absolute top-6 left-6">
          <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-900">
            {project.displayCategory}
          </span>
        </div>
      </motion.div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-[1.5fr,1fr] gap-8 md:gap-12">
        {/* Left: Title & Description */}
        <div className="flex flex-col gap-6">
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
          >
            {project.title}
          </motion.h2>

          {project.subtitle && (
            <motion.p
              variants={fadeInUp}
              className="text-xl text-blueAccent font-medium"
            >
              {project.subtitle}
            </motion.p>
          )}

          {project.detail?.description && (
            <motion.p
              variants={fadeInUp}
              className="text-base md:text-lg text-white/70 leading-relaxed"
            >
              {project.detail.description}
            </motion.p>
          )}

          {/* Highlights */}
          {project.detail?.highlights && (
            <motion.ul variants={fadeInUp} className="flex flex-col gap-3 list-none">
              {project.detail.highlights.map((highlight, i) => (
                <motion.li 
                  key={i}
                  className="flex items-center gap-3 text-sm text-white/80"
                  variants={fadeInUp}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blueAccent" aria-hidden="true" />
                  {highlight}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </div>

        {/* Right: Metadata */}
        <motion.div variants={fadeInUp} className="flex flex-col gap-6">
          {/* Meta cards */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
              <Building2 className="w-5 h-5 text-blueAccent" />
              <div>
                <span className="block text-xs uppercase tracking-wider text-white/50">Cliente</span>
                <span className="text-sm font-medium text-white">{project.client}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
              <Calendar className="w-5 h-5 text-blueAccent" />
              <div>
                <span className="block text-xs uppercase tracking-wider text-white/50">Ano</span>
                <span className="text-sm font-medium text-white">{project.year}</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          {project.tags && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* External link */}
          {project.detail?.externalUrl && (
            <a
              href={project.detail.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-bluePrimary text-white font-semibold text-sm hover:bg-bluePrimary/90 transition-colors"
            >
              Ver projeto completo
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
        </motion.div>
      </div>

      {/* Gallery (se disponível) */}
      {project.detail?.gallery && project.detail.gallery.length > 0 && (
        <motion.div variants={fadeInUp} className="mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">Galeria</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {project.detail.gallery.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 1.12 + i * 0.08, 
                  duration: 0.2,
                  ease: easing,
                }}
                className="relative aspect-square rounded-xl overflow-hidden bg-white/5"
              >
                <Image
                  src={img}
                  alt={`${project.title} - Imagem ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TypeAContent;
