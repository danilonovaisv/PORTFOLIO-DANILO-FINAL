'use client';

import React, {
  createRef,
  useEffect,
  useMemo,
  useRef,
  useState,
  RefObject,
} from 'react';
import Link from 'next/link';
import { Canvas } from '@react-three/fiber';
import { Variants, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Lenis from 'lenis';
import { featuredProjects, Project } from '@/content/projects';
import ProjectCard, { ProjectCardScene } from './ProjectCard';

const ctaVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

type PortfolioSectionProps = {
  projects?: Project[];
};

const PortfolioSection = ({ projects = featuredProjects }: PortfolioSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [eventSource, setEventSource] = useState<HTMLElement | null>(null);
  const lenisFrame = useRef<number | null>(null);

  const cardRefs = useMemo<RefObject<HTMLDivElement | null>[]>(
    () => projects.map(() => createRef<HTMLDivElement | null>()),
    [projects]
  );

  useEffect(() => {
    if (containerRef.current) {
      setEventSource(containerRef.current);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => t * (2 - t),
      smoothWheel: true,
    });

    const animate = (time: number) => {
      lenis.raf(time);
      lenisFrame.current = requestAnimationFrame(animate);
    };

    lenisFrame.current = requestAnimationFrame(animate);

    return () => {
      if (lenisFrame.current) cancelAnimationFrame(lenisFrame.current);
      lenis.destroy();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="portfolio"
      className="relative isolate overflow-hidden bg-[#F8F9FB] px-6 py-16 lg:px-12"
    >
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12">
        <div className="flex flex-col gap-3 text-slate-900">
          <p className="text-sm uppercase tracking-[0.6em] text-slate-400">
            Selected Work
          </p>
          <h2 className="text-4xl font-light leading-tight tracking-tight text-[#111111] md:text-5xl">
            Projetos em destaque com ritmo assimétrico e presença escultórica.
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className={`w-full ${
                index % 2 === 1 ? 'lg:mt-24 lg:pl-6' : 'lg:pr-6'
              }`}
            >
              <ProjectCard
                project={project}
                index={index}
                trackRef={cardRefs[index]}
                className="h-full"
              />
            </div>
          ))}
        </div>

        <motion.div
          variants={ctaVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="flex flex-col rounded-[2.5rem] border border-slate-200/70 bg-white/70 p-10 shadow-[0_30px_60px_rgba(15,23,42,0.08)] md:flex-row md:items-center md:justify-between"
        >
          <div className="flex-1 space-y-2">
            <p className="text-xs uppercase tracking-[0.55em] text-slate-400">
              Fala comigo
            </p>
            <h3 className="text-3xl font-light leading-tight text-slate-900">
              Precisa de um parceiro criativo para ativar a próxima experiência?
            </h3>
          </div>
          <Link
            href="/portfolio"
            className="mt-6 inline-flex items-center justify-center gap-3 rounded-full border border-black px-8 py-3 text-sm font-semibold uppercase tracking-[0.4em] transition-all duration-300 hover:bg-black hover:text-white md:mt-0"
          >
            Ir para portfólio
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      {eventSource && (
        <Canvas
          eventSource={eventSource}
          className="pointer-events-none absolute inset-0 z-0"
          dpr={[1, 2]}
          gl={{ antialias: true, toneMappingExposure: 1.2 }}
        >
          {projects.map((project, index) => (
            <ProjectCardScene
              key={project.slug}
              project={project}
              index={index}
              trackRef={cardRefs[index]}
            />
          ))}
        </Canvas>
      )}
    </section>
  );
};

export default PortfolioSection;
