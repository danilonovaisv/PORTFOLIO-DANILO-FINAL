'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface PortfolioGridProject {
  id: string;
  title: string;
  category: string;
  landingPageUrl?: string | null;
  description?: string;
  image?: string;
}

interface PortfolioItemProps {
  project: PortfolioGridProject;
  onOpenDescription: (_project: PortfolioGridProject) => void;
  className?: string;
}

const hoverEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function PortfolioItem({
  project,
  onOpenDescription,
  className,
}: PortfolioItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const hoverScale = prefersReducedMotion ? 1 : 1.05;

  const cardContent = (
    <motion.div
      className={cn(
        'group relative isolate overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left shadow-[0_20px_60px_rgba(0,0,0,0.25)]',
        className
      )}
      initial="rest"
      animate="rest"
      whileHover="hover"
    >
      <div className="relative aspect-[4/3] w-full">
        {project.image ? (
          <motion.div
            className="absolute inset-0"
            variants={{
              rest: { scale: 1 },
              hover: { scale: hoverScale, transition: { duration: 0.4, ease: hoverEase } },
            }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 1200px) 25vw, (min-width: 992px) 33vw, (min-width: 769px) 33vw, (min-width: 576px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        ) : (
          <motion.div
            className="absolute inset-0 bg-linear-to-br from-slate-800 via-slate-900 to-slate-950"
            variants={{
              rest: { scale: 1 },
              hover: { scale: hoverScale, transition: { duration: 0.4, ease: hoverEase } },
            }}
          />
        )}
        <motion.div
          className="absolute inset-0 bg-black/60"
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1, transition: { duration: 0.4, ease: hoverEase } },
          }}
        />

        <motion.div
          className="absolute inset-x-0 bottom-0 p-4 sm:p-5"
          variants={{
            rest: { opacity: 0, y: 20 },
            hover: { opacity: 1, y: 0, transition: { duration: 0.4, ease: hoverEase } },
          }}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-white/70">
            {project.category}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-white sm:text-xl">
            {project.title}
          </h3>
        </motion.div>
      </div>
    </motion.div>
  );

  if (project.landingPageUrl) {
    const isExternal = project.landingPageUrl.startsWith('http');

    if (isExternal) {
      return (
        <a
          href={project.landingPageUrl}
          target="_blank"
          rel="noreferrer"
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          aria-label={`Abrir ${project.title} em nova aba`}
        >
          {cardContent}
        </a>
      );
    }

    return (
      <Link
        href={project.landingPageUrl}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        aria-label={`Visitar ${project.title}`}
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onOpenDescription(project)}
      className="block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
      aria-label={`Abrir detalhes de ${project.title}`}
    >
      {cardContent}
    </button>
  );
}
