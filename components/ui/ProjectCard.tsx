import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
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
  const cardRef = useRef<HTMLAnchorElement>(null);

  // Mouse Move Parallax Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation for the parallax
  const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPos = e.clientX - rect.left - rect.width / 2;
    const yPos = e.clientY - rect.top - rect.height / 2;
    // Calculate parallax offset (inverted for depth effect)
    x.set(xPos / 25);
    y.set(yPos / 25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Card Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] as any },
    },
    hover: {
      y: -5,
      transition: { duration: 0.3, ease: 'easeOut' as any },
    },
  };

  // Image Variants
  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.5, ease: 'easeOut' as any },
    },
  };

  return (
    <motion.a
      ref={cardRef}
      href={`/portfolio/${project.slug}`}
      className={`group relative flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-[#0057FF]/60 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: '-5%' }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-[2.0rem] bg-[#E5E7EB] aspect-4/3 w-full transform-gpu shadow-sm group-hover:shadow-xl group-hover:shadow-blue-500/10 transition-shadow duration-300">
        {/* Parallax Image Wrapper */}
        <motion.div
          style={{ x: mouseX, y: mouseY, scale: 1.05 }}
          variants={imageVariants}
          className="w-full h-full relative"
        >
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            priority={priority}
            sizes="(min-width: 1200px) 50vw, (min-width: 768px) 80vw, 100vw"
            className="object-cover"
          />
        </motion.div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none" />

        {/* Tags (Canto Superior) */}
        <div className="absolute top-6 right-6 z-10 pointer-events-none">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-[#0057FF] shadow-sm ring-1 ring-white/50">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content Below */}
      <div className="flex flex-col gap-1 pt-6 px-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl md:text-[1.75rem] font-medium text-[#111111] leading-tight group-hover:text-[#0057FF] transition-colors duration-300">
              {project.title}
            </h3>
            {project.client && (
              <p className="text-sm font-medium text-gray-500 mt-2">
                {project.client}
              </p>
            )}
          </div>

          {/* Botão Circular com Seta */}
          <div className="shrink-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0057FF] text-white transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-blue-500/30">
              <ArrowRight className="w-5 h-5 group-hover:animate-pulse-horizontal" />
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
};

export default ProjectCard;
