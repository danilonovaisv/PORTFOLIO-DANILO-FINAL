import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Project } from '@/src/lib/types';

type ProjectCardProps = {
  project: Project;
  index: number;
};

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const isHero = project.isHero;
  const gridSpanClass = isHero ? 'md:col-span-2 lg:col-span-2' : '';

  return (
    <motion.a
      href={`/portfolio/${project.slug}`}
      aria-label={`Ver o projeto ${project.title}`}
      layout
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={`group relative flex flex-col rounded-3xl border border-white/40 bg-white/95 shadow-sm transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-white focus-visible:ring-[#0057FF]/60 focus-visible:-translate-y-1 focus-visible:scale-[1.03] focus-visible:shadow-2xl ${gridSpanClass}`}
    >
      <div
        className={`relative overflow-hidden rounded-[32px] bg-gray-200 shadow-lg ${isHero ? 'aspect-[2.2/1]' : 'aspect-[4/5]'}`}
      >
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          priority={isHero}
          loading={isHero ? 'eager' : 'lazy'}
          sizes={
            isHero
              ? '(min-width: 1200px) 60vw, (min-width: 768px) 80vw, 95vw'
              : '(min-width: 1200px) 30vw, (min-width: 768px) 45vw, 95vw'
          }
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col flex-1 gap-3 px-6 pb-6 pt-5">
        <span className="text-xs uppercase tracking-[0.35em] text-gray-500 font-semibold">
          {project.displayCategory}
        </span>
        <h3 className="text-2xl md:text-3xl font-semibold text-[#111111] leading-tight transition-colors duration-300 group-hover:text-[#0057FF]">
          {project.title}
        </h3>
        <p className="text-sm font-bold uppercase tracking-wide text-gray-500">
          {project.client}
        </p>

        <div className="mt-auto flex items-center justify-end">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0057FF] text-white shadow-lg transition-all duration-300 ease-out group-hover:shadow-2xl transform group-hover:-translate-y-1 group-hover:scale-[1.03]">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </motion.a>
  );
};

export default ProjectCard;
