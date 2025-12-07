import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Project } from '../../lib/types';

type ProjectCardProps = {
  project: Project;
  index: number;
  priority?: boolean;
  className?: string;
};

const ProjectCard = ({
  project,
  index,
  priority = false,
  className = '',
}: ProjectCardProps) => {
  const isHero = project.isHero;
  const shouldReduceMotion = useReducedMotion();

  // Define animações sutis de hover se o usuário não preferir movimento reduzido
  const animationProps = shouldReduceMotion
    ? {}
    : {
        whileHover: { y: -4, scale: 1.02 },
        whileTap: { scale: 0.98 },
      };

  // Base styles sem transformações de hover conflitantes
  const cardClassNames = `group relative flex flex-col rounded-3xl border border-white/40 bg-white/95 shadow-sm transition-shadow duration-300 ease-out hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-white focus-visible:ring-[#0057FF]/60 ${className}`;

  return (
    <motion.a
      href={`/portfolio/${project.slug}`}
      aria-label={`Ver o projeto ${project.title}`}
      layout
      initial={{ opacity: 0, y: 30 }} // Reduzido de 50 para 30
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{
        duration: 0.6,
        delay: shouldReduceMotion ? 0 : index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      {...animationProps}
      className={cardClassNames}
    >
      <div
        className={`relative overflow-hidden rounded-[32px] bg-gray-200 shadow-md ${
          isHero ? 'aspect-[2.2/1]' : 'aspect-[4/5]'
        }`}
      >
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          priority={priority || isHero}
          loading={priority || isHero ? 'eager' : 'lazy'}
          sizes={
            isHero
              ? '(min-width: 1200px) 60vw, (min-width: 768px) 80vw, 95vw'
              : '(min-width: 1200px) 30vw, (min-width: 768px) 45vw, 95vw'
          }
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Overlay sutil ao hover para dar profundidade */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
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
          {/* Botão de seta com animação complementar suave */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0057FF] text-white shadow-lg transition-all duration-300 ease-out group-hover:bg-[#0046cc] group-hover:scale-110">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </motion.a>
  );
};

export default ProjectCard;
