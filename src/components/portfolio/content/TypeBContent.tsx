// =============================================================================
// TypeBContent - Ghost Era v2.0
// Layout de conteúdo para projetos Tipo B (Grid / Compacto)
// =============================================================================

'use client';

import { FC } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, Building2, Tag } from 'lucide-react';
import type { PortfolioProject } from '@/types/project';
import AntigravityCTA from '@/components/ui/AntigravityCTA';
import {
  easing,
  fadeInUp,
  MODAL_TIMELINE,
  getMediaVariants,
  getTitleVariants,
  getMetaVariants,
  getContentVariants
} from '@/components/portfolio/modal/variants';
import { isVideo } from '@/utils/utils';
import { sanitizeTailwindValue } from '@/lib/utils';

interface TypeBContentProps {
  project: PortfolioProject;
}

/**
 * Layout B: Imagem à esquerda, conteúdo à direita
 * Usado para projetos menores / grid items
 */
const TypeBContent: FC<TypeBContentProps> = ({ project }) => {
  const prefersReducedMotion = useReducedMotion();
  const shouldReduce = !!prefersReducedMotion;

  // Sanitize the accent color before using it in styles
  const sanitizedAccentColor = project.accentColor
    ? sanitizeTailwindValue(project.accentColor)
    : undefined;

  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-12">
      {/* Left: Image */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={getMediaVariants(shouldReduce)}
        className="relative w-full aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden bg-white/5"
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
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        )}

        {/* Accent color overlay on bottom */}
        {sanitizedAccentColor && (
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/3"
            style={{
              background: `linear-gradient(to top, ${sanitizedAccentColor}40, transparent)`
            }}
          />
        )}

        {/* Category pill */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center rounded-full bg-white/60 backdrop-blur-md border border-white/10 px-3 py-1 text-xs font-medium text-void">
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
            className="text-xs uppercase tracking-[0.3em] text-blueAccent"
          >
            [{project.category}]
          </motion.span>

          <motion.h2
            initial="hidden"
            animate="visible"
            variants={getTitleVariants(shouldReduce)}
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
          initial="hidden"
          animate="visible"
          variants={getMetaVariants(shouldReduce)}
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
          <ul className="flex flex-col gap-2 mt-2">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={getContentVariants(shouldReduce)}
              className="contents"
            >
              {project.detail.highlights.map((highlight, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-white/70"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blueAccent shrink-0" />
                  {highlight}
                </li>
              ))}
            </motion.div>
          </ul>
        )}

        {/* Tags cloud */}
        {project.tags && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: MODAL_TIMELINE.SECONDARY, duration: 0.2, ease: easing }}
            className="flex flex-wrap gap-2"
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-white/60 backdrop-blur-md border border-white/10 text-xs text-void font-medium"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        )}

        {/* CTA - Using AntigravityCTA component */}
        <motion.div variants={fadeInUp} className="flex gap-3 mt-4">
          {project.detail?.externalUrl && (
            <AntigravityCTA
              href={project.detail.externalUrl}
              text="ver projeto"
              className="relative"
            />
          )}
        </motion.div>
      </div>
    </div >
  );
};

export default TypeBContent;