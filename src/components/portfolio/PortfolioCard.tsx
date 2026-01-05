// =============================================================================
// PortfolioCard - Ghost Era v2.0
// Card de projeto com hover states premium
// =============================================================================

'use client';

import { FC, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { PortfolioProject } from '@/types/project';

interface PortfolioCardProps {
  project: PortfolioProject;
  index: number;
  onOpen?: (project: PortfolioProject) => void;
  className?: string;
}

const easing = [0.22, 1, 0.36, 1] as const;

const PortfolioCard: FC<PortfolioCardProps> = ({
  project,
  index,
  onOpen,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Hover animations condicionais
  const hoverScale = prefersReducedMotion ? 1 : isHovered ? 1.02 : 1;
  const imageScale = prefersReducedMotion ? 1 : isHovered ? 1.08 : 1;

  const handleClick = () => {
    if (onOpen) {
      onOpen(project);
    }
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.8,
        ease: easing,
        delay: index * 0.06,
      }}
      className={`group relative cursor-pointer ${project.layout.cols} ${project.layout.height} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`Ver projeto: ${project.title}`}
    >
      <motion.div
        className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-3xl bg-white/5"
        animate={{ scale: hoverScale }}
        transition={{ duration: 0.5, ease: easing }}
        style={{ willChange: 'transform' }}
      >
        {/* Imagem de fundo */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: imageScale }}
          transition={{ duration: 0.7, ease: easing }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading={index < 4 ? 'eager' : 'lazy'}
          />
        </motion.div>

        {/* Video preview on hover (se disponível) */}
        {project.videoPreview && (
          <motion.div
            className="absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={project.videoPreview}
              alt=""
              fill
              className="object-cover"
              unoptimized
            />
          </motion.div>
        )}

        {/* Gradient overlay base */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

        {/* Category tag */}
        <div className="absolute top-4 right-4 z-30">
          <motion.span
            className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[10px] md:text-xs font-semibold uppercase tracking-wide text-gray-900 shadow-sm"
            animate={{ 
              y: isHovered ? 0 : -4,
              opacity: isHovered ? 1 : 0.9
            }}
            transition={{ duration: 0.3 }}
          >
            {project.displayCategory}
          </motion.span>
        </div>

        {/* Footer content */}
        <div className="absolute bottom-0 left-0 right-0 z-30 p-5 md:p-6">
          <div className="flex items-end justify-between gap-4">
            {/* Text info */}
            <div className="flex flex-col gap-1">
              <motion.h3
                className="text-lg md:text-xl lg:text-2xl font-bold text-white leading-tight"
                animate={{ y: isHovered ? -2 : 0 }}
                transition={{ duration: 0.4, ease: easing }}
              >
                {project.title}
              </motion.h3>
              
              <motion.span
                className="text-sm text-white/70 font-medium"
                initial={{ opacity: 0.7 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0.7,
                  y: isHovered ? -2 : 0
                }}
                transition={{ duration: 0.4, ease: easing, delay: 0.05 }}
              >
                {project.subtitle || project.client}
              </motion.span>
            </div>

            {/* CTA Button */}
            <motion.div
              className="flex h-11 w-11 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full bg-focus-ring text-white shadow-lg shadow-blue-500/25"
              animate={{
                scale: isHovered ? 1.1 : 1,
                x: isHovered ? 4 : 0,
                y: isHovered ? -4 : 0,
              }}
              transition={{ duration: 0.4, ease: easing }}
            >
              <ArrowUpRight className="w-5 h-5" />
            </motion.div>
          </div>
        </div>

        {/* Accent color glow on hover */}
        {project.accentColor && (
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.15 : 0 }}
            transition={{ duration: 0.5 }}
            style={{
              background: `radial-gradient(ellipse at center bottom, ${project.accentColor}, transparent 70%)`,
            }}
          />
        )}

        {/* Focus ring para acessibilidade */}
        <div className="absolute inset-0 z-40 rounded-2xl md:rounded-3xl ring-2 ring-ghost-accent ring-offset-2 ring-offset-ghost-bg opacity-0 group-focus-visible:opacity-100 transition-opacity pointer-events-none" />
      </motion.div>
    </motion.article>
  );
};

export default PortfolioCard;
