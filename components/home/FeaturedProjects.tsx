'use client';

import React, { useMemo, useState } from 'react';
import {
  motion,
  type Variants,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import Image from 'next/image';
import { FEATURED_PROJECTS } from '../../lib/constants';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: 'easeOut' },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: 0.05 },
  },
};

type Project = (typeof FEATURED_PROJECTS)[number];

const FeaturedProjects: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorScale = useSpring(useMotionValue(0), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    cursorX.set(event.clientX - 32);
    cursorY.set(event.clientY - 32);
  };

  const handleHover = (index: number | null) => {
    setHoveredIndex(index);
    cursorScale.set(index === null ? 0 : 1);
  };

  const cardHeight = 'h-[360px] md:h-[500px]';

  const extractTags = (project: Project) =>
    useMemo(() => {
      const items: string[] = [];
      if (project.category) items.push(project.category);
      if (
        project.displayCategory &&
        project.displayCategory !== project.category
      ) {
        items.push(
          ...project.displayCategory
            .split('&')
            .map((tag) => tag.trim())
            .filter(Boolean)
        );
      }
      return Array.from(new Set(items));
    }, [project.category, project.displayCategory]);

  const ProjectCard = ({
    project,
    index,
  }: {
    project: Project;
    index: number;
  }) => {
    const tags = extractTags(project);

    return (
      <motion.a
        key={project.slug}
        href={`/portfolio/${project.slug}`}
        variants={cardVariants}
        className={`group relative flex w-full flex-col gap-4 outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F5F7] ${
          hoveredIndex !== null && hoveredIndex !== index ? 'opacity-65' : ''
        }`}
        onMouseEnter={() => handleHover(index)}
        onMouseLeave={() => handleHover(null)}
      >
        <div
          className={`relative w-full overflow-hidden rounded-[6px] bg-[#0f0f11] ${cardHeight}`}
        >
          <motion.div
            className="absolute inset-0"
            whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              sizes="(min-width: 1280px) 60vw, (min-width: 1024px) 70vw, (min-width: 768px) 90vw, 100vw"
              className="object-cover brightness-[0.98]"
              priority={project.isHero}
            />
          </motion.div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />

          <div className="absolute right-3 top-3 z-10 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/18 px-3 py-1 text-[10px] font-light uppercase tracking-[0.14em] text-white backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <motion.h3
              variants={textVariants}
              className="text-base md:text-lg font-semibold text-[#111111] tracking-tight"
            >
              {project.title}
            </motion.h3>
            <motion.p
              variants={textVariants}
              className="text-sm font-light uppercase tracking-[0.12em] text-neutral-600"
            >
              {project.client || '—'}
            </motion.p>
          </div>

          <motion.span
            whileHover={prefersReducedMotion ? undefined : { scale: 1.08 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mt-1 flex h-10 w-10 items-center justify-center rounded-full border border-[#0057FF] text-[#0057FF] shadow-sm"
          >
            <ArrowRight size={18} />
          </motion.span>
        </div>
      </motion.a>
    );
  };

  const [card1, card2, card3, card4] = FEATURED_PROJECTS;

  return (
    <section
      id="featured-projects"
      className="relative w-full bg-[#F4F5F7] text-[#0b0b0b] py-16 md:py-24"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => handleHover(null)}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto flex max-w-6xl flex-col gap-12 px-6 md:px-10"
      >
        {/* Primeira linha: dois cards verticais alinhados pela base */}
        <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-5">
          <div className="md:col-span-2">
            {card1 && <ProjectCard project={card1} index={0} />}
          </div>
          <div className="md:col-span-3">
            {card2 && <ProjectCard project={card2} index={1} />}
          </div>
        </div>

        {/* Segunda linha: card horizontal full width */}
        <div className="w-full">
          {card3 && <ProjectCard project={card3} index={2} />}
        </div>

        {/* Terceira linha: card + CTA lateral */}
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-5">
          <div className="md:col-span-3">
            {card4 && <ProjectCard project={card4} index={3} />}
          </div>
          <div className="md:col-span-2 flex flex-col items-center justify-center gap-4 rounded-[10px] bg-[#F4F5F7] px-8 py-10 text-center">
            <h3 className="text-2xl md:text-3xl font-light text-[#111111] leading-tight">
              Like what
              <br />
              you see?
            </h3>
            <a
              href="/portfolio"
              className="group inline-flex items-center gap-3 rounded-full bg-[#0057FF] px-6 py-3 text-white text-sm font-semibold shadow-lg shadow-[#0057FF]/25 transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0057FF]"
            >
              view projects
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-colors duration-300 group-hover:bg-white/30">
                <ArrowUpRight className="h-4 w-4 text-white" />
              </span>
            </a>
          </div>
        </div>
      </motion.div>

      {!prefersReducedMotion && (
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-16 w-16 items-center justify-center rounded-full border-2 border-[#0057FF] bg-white/80 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0057FF] md:flex"
          style={{
            x: cursorX,
            y: cursorY,
            scale: cursorScale,
          }}
        >
          VIEW
        </motion.div>
      )}
    </section>
  );
};

export default FeaturedProjects;
