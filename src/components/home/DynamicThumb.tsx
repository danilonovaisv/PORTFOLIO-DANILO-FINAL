'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

type ProjectThumb = {
  id: string;
  title: string;
  category: string;
  media: string;
  sectionId: string;
  kind: 'image' | 'video';
};

const PROJECTS: ProjectThumb[] = [
  {
    id: 'hero',
    title: 'Manifesto',
    category: 'Video',
    media: '/assets/thumb-hero.mp4',
    sectionId: 'hero',
    kind: 'video',
  },
  {
    id: 'portfolio-showcase',
    title: 'Portfolio',
    category: 'Categorias',
    media:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
    sectionId: 'portfolio-showcase',
    kind: 'image',
  },
  {
    id: 'featured-projects',
    title: 'Cases em destaque',
    category: 'Branding & Motion',
    media:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp',
    sectionId: 'featured-projects',
    kind: 'image',
  },
  {
    id: 'clients',
    title: 'Clients & Brands',
    category: 'Parcerias',
    media:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/clients-thumb.webp',
    sectionId: 'clients',
    kind: 'image',
  },
  {
    id: 'contact',
    title: 'Get in touch',
    category: 'Contato',
    media:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/contact-thumb.webp',
    sectionId: 'contact',
    kind: 'image',
  },
];

export default function DynamicThumb() {
  const [activeId, setActiveId] = useState<string>(PROJECTS[0]?.id ?? '');
  const reducedMotion = useReducedMotion();
  const ticking = useRef(false);

  const sections = useMemo(() => PROJECTS.map((item) => item.sectionId), []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportCenter = scrollY + window.innerHeight / 2;

      let closestId = activeId;
      let closestDelta = Number.POSITIVE_INFINITY;

      sections.forEach((sectionId) => {
        const el = document.getElementById(sectionId);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const top = scrollY + rect.top;
        const bottom = top + rect.height;
        const sectionCenter = (top + bottom) / 2;
        const delta = Math.abs(sectionCenter - viewportCenter);

        if (delta < closestDelta) {
          closestDelta = delta;
          closestId = sectionId;
        }
      });

      if (closestId !== activeId) {
        setActiveId(closestId);
      }
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking.current = false;
      });
    };

    handleScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [activeId, sections]);

  if (!activeId) return null;

  const current = PROJECTS.find((project) => project.sectionId === activeId);
  if (!current) return null;

  return (
    <motion.div
      className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-[999]"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: reducedMotion ? 0.1 : 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="relative w-[200px] h-[128px] md:w-[280px] md:h-[180px] rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.35)] bg-neutral-900 border border-white/5">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reducedMotion ? 0.12 : 0.4,
              ease: 'easeInOut',
            }}
            className="absolute inset-0"
          >
            {current.kind === 'video' ? (
              <video
                src={current.media}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={current.media}
                alt={current.title}
                fill
                sizes="(max-width: 768px) 220px, 320px"
                className="object-cover"
                unoptimized
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-3">
          <span className="text-white/70 text-[11px] uppercase tracking-[0.12em]">
            {current.category}
          </span>
          <span className="text-white text-sm font-semibold leading-tight">
            {current.title}
          </span>
        </div>

        <div className="absolute top-2 left-2 flex gap-1.5">
          {PROJECTS.map((item) => {
            const isActive = item.id === current.id;
            return (
              <span
                key={item.id}
                aria-label={item.title}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isActive ? 'w-5 bg-white' : 'w-2 bg-white/40'
                }`}
              />
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
