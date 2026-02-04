// =============================================================================
// TypeAContent - Ghost Era v2.0
// Layout de conteúdo para projetos Tipo A (Hero / Grande)
// =============================================================================

'use client';

import { FC } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Calendar, Building2 } from 'lucide-react';
import type { PortfolioProject } from '@/types/project';
import {
  getFadeInUp,
  getMediaVariants,
  getTitleVariants,
  getMetaVariants,
  getContentVariants,
} from '@/components/portfolio/modal/variants';
import { applyImageFallback, isVideo } from '@/utils/utils';
import { DEFAULT_CAPTIONS, DEFAULT_VIDEO_POSTER } from '@/lib/video';

interface TypeAContentProps {
  project: PortfolioProject;
}

/**
 * Layout A: Hero image grande no topo + Info abaixo
 * Usado para projetos de destaque
 */
const TypeAContent: FC<TypeAContentProps> = ({ project }) => {
  const prefersReducedMotion = useReducedMotion();
  const shouldReduce = !!prefersReducedMotion;
  const fadeInUpVariants = getFadeInUp(shouldReduce);

  return (
    <div className="flex flex-col gap-8">
      {/* Hero Image */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={getMediaVariants(shouldReduce)}
        className="card-shell relative w-full aspect-video md:aspect-21/9 rounded-2xl overflow-hidden bg-white/5"
      >
        {isVideo(project.image) ? (
          <video
            src={project.image}
            autoPlay
            muted
            loop
            playsInline
            poster={DEFAULT_VIDEO_POSTER}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <track
              kind="captions"
              src={DEFAULT_CAPTIONS}
              srcLang="pt-BR"
              label="Português"
              default
            />
          </video>
        ) : (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 80vw"
            priority
            onError={applyImageFallback}
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

        {/* Category badge */}
        <div className="absolute top-6 left-6">
          <span className="inline-flex items-center rounded-full bg-white/60 backdrop-blur-md border border-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-void">
            {project.displayCategory}
          </span>
        </div>
      </motion.div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-[1.5fr,1fr] gap-8 md:gap-12">
        {/* Left: Title & Description */}
        <div className="flex flex-col gap-6">
          <motion.h2
            initial="hidden"
            animate="visible"
            variants={getTitleVariants(shouldReduce)}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
          >
            {project.title}
          </motion.h2>

          {project.subtitle && (
            <motion.p
              variants={fadeInUpVariants}
              className="text-xl text-blueAccent font-medium"
            >
              {project.subtitle}
            </motion.p>
          )}

          {project.detail?.description && (
            <motion.p
              variants={fadeInUpVariants}
              className="text-base md:text-lg text-white/70 leading-relaxed"
            >
              {project.detail.description}
            </motion.p>
          )}

          {/* Highlights */}
          {project.detail?.highlights && (
            <motion.ul
              variants={fadeInUpVariants}
              className="flex flex-col gap-3 list-none"
            >
              {project.detail.highlights.map((highlight, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-3 text-sm text-white/80"
                  variants={fadeInUpVariants}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blueAccent" aria-hidden="true" />
                  {highlight}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </div>

        {/* Right: Metadata */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={getMetaVariants(shouldReduce)}
          className="flex flex-col gap-6"
        >
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
                  className="px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white/10 text-xs text-void font-medium"
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
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-sm transition-colors bg-primary hover:bg-[#3b36ff]"
            >
              Ver projeto completo
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
        </motion.div>
      </div>

      {/* Gallery (se disponível) */}
      {project.detail?.gallery && project.detail.gallery.length > 0 && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={getContentVariants(shouldReduce)}
          className="mt-8"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Galeria</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {project.detail.gallery.map((img, i) => (
              <motion.div
                key={i}
                variants={fadeInUpVariants}
                className="relative aspect-square rounded-xl overflow-hidden bg-white/5"
              >
                {isVideo(img) ? (
                  <video
                    src={img}
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={DEFAULT_VIDEO_POSTER}
                    className="absolute inset-0 w-full h-full object-cover transition duration-300 hover:brightness-110"
                  >
                    <track
                      kind="captions"
                      src={DEFAULT_CAPTIONS}
                      srcLang="pt-BR"
                      label="Português"
                      default
                    />
                  </video>
                ) : (
                  <Image
                    src={img}
                    alt={`${project.title} - Imagem ${i + 1}`}
                    fill
                    className="object-cover transition duration-300 hover:brightness-110"
                    sizes="(max-width: 768px) 50vw, 33vw"
                    onError={applyImageFallback}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TypeAContent;
