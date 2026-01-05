// =============================================================================
// TypeBContent - Ghost Era v2.0
// Layout de conteúdo para projetos Tipo B (Grid / Compacto)
// =============================================================================

'use client';

import { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, Building2, Tag } from 'lucide-react';
import type { PortfolioProject } from '@/types/project';

interface TypeBContentProps {
  project: PortfolioProject;
}

const easing = [0.22, 1, 0.36, 1] as const;

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.52,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.4, ease: easing },
};

const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: easing },
};

/**
 * Layout B: Imagem à esquerda, conteúdo à direita
 * Usado para projetos menores / grid items
 */
const TypeBContent: FC<TypeBContentProps> = ({ project }) => {
  return (
    <motion.div
      variants={staggerChildren}
      initial="initial"
      animate="animate"
      exit="exit"
      className="grid md:grid-cols-2 gap-8 md:gap-12"
    >
      {/* Left: Image */}
      <motion.div
        variants={fadeInLeft}
        className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden bg-white/5"
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        
        {/* Accent color overlay on bottom */}
        {project.accentColor && (
          <div 
            className="absolute inset-x-0 bottom-0 h-1/3"
            style={{
              background: `linear-gradient(to top, ${project.accentColor}40, transparent)`,
            }}
          />
        )}

        {/* Category pill */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center rounded-full bg-black/60 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
            {project.displayCategory}
          </span>
        </div>
      </motion.div>

      {/* Right: Content */}
      <div className="flex flex-col justify-center gap-6">
        {/* Title section */}
        <div className="flex flex-col gap-2">
          <motion.span
            variants={fadeInUp}
            className="text-xs uppercase tracking-[0.3em] text-ghost-accent"
          >
            [{project.category}]
          </motion.span>
          
          <motion.h2
            variants={fadeInUp}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight"
          >
            {project.title}
          </motion.h2>

          {project.subtitle && (
            <motion.p
              variants={fadeInUp}
              className="text-lg text-white/60"
            >
              {project.subtitle}
            </motion.p>
          )}
        </div>

        {/* Description */}
        {project.detail?.description && (
          <motion.p
            variants={fadeInUp}
            className="text-base text-white/70 leading-relaxed"
          >
            {project.detail.description}
          </motion.p>
        )}

        {/* Meta inline */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap items-center gap-4 text-sm text-white/50"
        >
          <span className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            {project.client}
          </span>
          <span className="w-px h-4 bg-white/20" />
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {project.year}
          </span>
          {project.tags && project.tags.length > 0 && (
            <>
              <span className="w-px h-4 bg-white/20" />
              <span className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                {project.tags.slice(0, 2).join(', ')}
              </span>
            </>
          )}
        </motion.div>

        {/* Highlights list */}
        {project.detail?.highlights && (
          <motion.ul variants={fadeInUp} className="flex flex-col gap-2 mt-2">
            {project.detail.highlights.map((highlight, i) => (
              <li 
                key={i}
                className="flex items-start gap-3 text-sm text-white/70"
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-ghost-accent shrink-0" />
                {highlight}
              </li>
            ))}
          </motion.ul>
        )}

        {/* Tags cloud */}
        {project.tags && (
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        )}

        {/* CTA */}
        <motion.div variants={fadeInUp} className="flex gap-3 mt-4">
          {project.detail?.externalUrl && (
            <a
              href={project.detail.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-focus-ring text-white font-medium text-sm hover:bg-focus-ring/90 transition-colors"
            >
              Ver projeto
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TypeBContent;
