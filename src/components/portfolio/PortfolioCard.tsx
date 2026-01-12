// =============================================================================
// PortfolioCard - Ghost Era v2.0
// Card de projeto com hover states premium
// =============================================================================

'use client';

import { FC, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useParallaxElement } from '@/hooks/useParallax';
import type { PortfolioProject } from '@/types/project';
import { MOTION_TOKENS, ghostTransition } from '@/config/motion';

interface PortfolioCardProps {
  project: PortfolioProject;
  index: number;
  onOpen?: (_project: PortfolioProject) => void;
  className?: string;
}

const { duration, spring, stagger } = MOTION_TOKENS;

const PortfolioCard: FC<PortfolioCardProps> = ({
  project,
  index,
  onOpen,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Parallax interno da imagem (só desktop)
  const { ref: parallaxRef, style: parallaxStyle } = useParallaxElement({
    speed: 0.15,
    direction: 'up',
    enabled: !prefersReducedMotion,
  });

  // Hover animations condicionais
  const overlayOpacity = isHovered ? 1 : 0;

  const handleClick = () => {
    if (onOpen) {
      onOpen(project);
    }
  };

  return (
    <motion.article
      ref={(node) => {
        // @ts-ignore
        cardRef.current = node;
        // @ts-ignore
        parallaxRef.current = node;
      }}
      initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={ghostTransition(index * stagger.tight, duration.normal)}
      className={`group relative overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer bg-white/5 will-change-transform ${project.layout.cols} ${project.layout.height} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`Ver projeto: ${project.title}`}
    >
      {/* Container de Imagem com Parallax */}
      <div className="relative h-full w-full overflow-hidden">
        <motion.div
           className="absolute inset-0 -top-[17.5%] h-[135%] w-full will-change-transform"
           style={prefersReducedMotion ? {} : parallaxStyle}
           animate={{ y: isHovered ? -8 : 0 }}
           transition={ghostTransition(0, duration.normal)}
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
      </div>

      {/* Video preview on hover */}
      {project.videoPreview && (
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
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
      <div className="absolute inset-0 z-20 bg-linear-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 opacity-60 group-hover:opacity-80" />

      {/* Hover Overlay mais escuro */}
      <motion.div 
        className="absolute inset-0 z-20 bg-black/40 backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: overlayOpacity }}
        transition={{ duration: 0.3 }}
      />

      {/* Category tag */}
      <div
        className="absolute top-4 right-4 z-30 hidden md:flex"
        aria-hidden="true"
      >
        <motion.span
          className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1.5 text-[10px] md:text-xs font-medium uppercase tracking-wide text-white"
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {project.displayCategory}
        </motion.span>
      </div>

      {/* Footer content */}
      <div className="absolute bottom-0 left-0 right-0 z-30 p-5 md:p-8 transform transition-transform duration-500 group-hover:md:-translate-y-2">
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5 local-reset">
            <motion.h3
              className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-[1.1] tracking-tight wrap-break-word hyphens-auto"
            >
              {project.title}
            </motion.h3>

            <span className="text-sm text-white/60 font-medium tracking-wide uppercase">
              {project.client} ・ {project.year}
            </span>
          </div>

          <motion.div
            className="flex h-11 w-11 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full bg-white text-black shadow-[0_0_16px_rgba(0,72,255,0.25)] transition-all duration-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', ...spring.snappy }}
            whileHover={!prefersReducedMotion ? { x: 4 } : undefined}
          >
            <ArrowUpRight className="w-5 h-5" />
          </motion.div>
        </div>
      </div>

      {/* Focus ring */}
      <div className="absolute inset-0 z-40 rounded-2xl md:rounded-3xl ring-2 ring-primary ring-offset-2 ring-offset-background opacity-0 group-focus-visible:opacity-100 transition-opacity pointer-events-none" />
    </motion.article>
  );
};

export default PortfolioCard;
