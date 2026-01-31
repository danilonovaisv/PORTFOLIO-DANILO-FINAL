'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';

import { PortfolioProject } from '@/types/project';

type Props = {
  project: PortfolioProject;
  index: number;
  className?: string;
  onClick?: (_project: PortfolioProject) => void;
  priority?: boolean;
};

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ');

export const PortfolioCardParallax: React.FC<Props> = ({
  project,
  index,
  className = '',
  onClick,
  priority = false,
}) => {
  const isTestEnv = process.env.NODE_ENV === 'test';
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const heightClass = project.layout?.height ?? 'h-[420px]';
  const colsClass = project.layout?.cols ?? '';
  const aspectRatio = project.layout?.aspectRatio ?? '';
  const sizes =
    project.layout?.sizes ??
    '(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw';

  const motionProps = isTestEnv
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-10% 0px -10% 0px' },
        transition: {
          duration: 0.6,
          delay: Math.min(0.18, index * 0.03),
          ease: [0.22, 1, 0.36, 1] as const,
        },
      };

  const imageLayoutProps = isTestEnv
    ? {
        width: 1200,
        height: 1600,
        style: { width: '100%', height: '100%' },
      }
    : {
        fill: true,
        ...(priority ? { priority: true } : {}),
      };

  return (
    <motion.div
      ref={ref}
      className={cn(
        'parallax-card relative overflow-hidden rounded-2xl border border-white/10 bg-white/5',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400',
        colsClass,
        heightClass,
        aspectRatio,
        className
      )}
      onClick={() => onClick?.(project)}
      {...motionProps}
    >
      <motion.div
        className="card-image-wrapper absolute inset-0 h-[135%] will-change-transform"
        style={reduceMotion ? undefined : { y }}
      >
        <Image
          src={project.image}
          alt={project.title}
          {...imageLayoutProps}
          sizes={sizes}
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

      <div className="text-overlay absolute inset-0 flex items-end">
        <div className="info w-full p-4 sm:p-6 text-white">
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/70">
            {project.displayCategory}
          </p>
          <h3 className="mt-1 text-xl sm:text-2xl font-semibold leading-tight">
            {project.title}
          </h3>
          {project.client && (
            <p className="mt-1 text-sm text-white/70">{project.client}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioCardParallax;
