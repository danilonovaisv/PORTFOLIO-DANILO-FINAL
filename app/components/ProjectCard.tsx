'use client';

import { KeyboardEvent, useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/content/projects';

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

type ProjectCardProps = {
  project: Project;
  index: number;
};

const aspectClasses: Record<Project['layout'], string> = {
  small: 'aspect-[4/5]',
  medium: 'aspect-video',
  wide: 'aspect-[2/1]',
  rectangle: 'aspect-[3/2]',
};

const spanClasses: Record<Project['layout'], string> = {
  small: 'lg:col-span-1',
  medium: 'lg:col-span-1',
  wide: 'lg:col-span-2',
  rectangle: 'lg:col-span-1',
};

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.35, once: true });
  const aspectClass = aspectClasses[project.layout] ?? aspectClasses.medium;
  const spanClass = spanClasses[project.layout] ?? spanClasses.medium;

  const navigateToProject = () => {
    router.push(`/portfolio/${project.slug}`);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      navigateToProject();
    }
  };

  return (
    <motion.article
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={index}
      variants={cardVariants}
      whileHover={{
        scale: 1.02,
        boxShadow: '0px 12px 30px rgba(15, 23, 42, 0.15)',
      }}
      className={`relative overflow-hidden rounded-[1.5rem] bg-white shadow-sm transition-all duration-300 ${spanClass}`}
      onClick={navigateToProject}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Abrir estudo de caso ${project.title}`}
    >
      <div className="group block">
        <div
          className={`relative w-full overflow-hidden rounded-[1.3rem] bg-gray-100 ${aspectClass}`}
        >
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute top-3 right-3 rounded-full border border-white/60 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#0057FF] shadow-sm">
            {project.category}
          </span>
        </div>
        <div className="px-6 py-6">
          <h3 className="text-2xl font-semibold leading-tight text-[#111111]">
            {project.title}
          </h3>
          <p className="text-sm text-[#555770] mt-1">{project.client}</p>
        </div>
      </div>

      <motion.span
        whileHover={{ scale: 1.2 }}
        className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#0057FF] text-white shadow-lg transition-transform duration-200"
        aria-hidden="true"
      >
        <ArrowUpRight className="h-4 w-4" />
      </motion.span>
    </motion.article>
  );
};

export default ProjectCard;
