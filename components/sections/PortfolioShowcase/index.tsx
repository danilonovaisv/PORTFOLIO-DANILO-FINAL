'use client';

import { useMemo, useState, type MouseEvent } from 'react';
import Link from 'next/link';
import { AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useReducedMotionPreference } from '@/hooks/usePrefersReducedMotion';
import CursorImage from './CursorImage';
import ShowcaseItem from './ShowcaseItem';

export type Category = {
  id: string;
  label: string;
  labelPT: string;
  href: string;
  src: string;
};

export type ActiveItem = Pick<Category, 'id' | 'label' | 'src'>;

const SPRING_CONFIG = { damping: 20, stiffness: 150, mass: 0.5 };

const categories: Category[] = [
  {
    id: 'branding-campaigns',
    label: 'Brand & Campaigns',
    labelPT: 'Brand & Campanhas',
    href: '/portfolio?filter=branding-campaigns',
    src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
  },
  {
    id: 'videos-motions',
    label: 'Videos & Motions',
    labelPT: 'Vídeos & Motions',
    href: '/portfolio?filter=videos-motions',
    src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
  },
  {
    id: 'websites-tech',
    label: 'Web Campaigns, Websites & Tech',
    labelPT: 'Campanhas Web, Websites & Tech',
    href: '/portfolio?filter=websites-tech',
    src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp',
  },
];

const PortfolioShowcase = () => {
  const prefersReducedMotion = useReducedMotionPreference();
  const [activeItem, setActiveItem] = useState<ActiveItem | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, SPRING_CONFIG);
  const smoothY = useSpring(mouseY, SPRING_CONFIG);

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;

    const { clientX, clientY } = event;
    mouseX.set(clientX - 200);
    mouseY.set(clientY - 150);
  };

  const deactivateItem = () => setActiveItem(null);

  const hasActive = useMemo(() => Boolean(activeItem), [activeItem]);

  return (
    <section
      id="portfolio-showcase"
      className="relative w-full overflow-hidden bg-white py-20 text-black md:py-24"
      onMouseMove={handleMouseMove}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-14 px-6 md:px-10">
        <header className="flex flex-col gap-4 border-b border-black/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-500">
              [ what we love working on ]
            </span>
            <h2 className="text-4xl font-semibold tracking-tight text-neutral-900 md:text-6xl">
              <span className="text-[#0057FF]">portfolio</span> showcase
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-3 text-sm font-mono uppercase tracking-[0.3em] text-neutral-500">
            <span>explore categories</span>
            <span
              className="inline-flex h-2 w-2 items-center justify-center rounded-full bg-[#0057FF]"
              aria-hidden
            />
          </div>
        </header>

        <div
          className="flex flex-col"
          onMouseLeave={deactivateItem}
          onBlur={deactivateItem}
        >
          {categories.map((category, index) => (
            <ShowcaseItem
              key={category.id}
              category={category}
              index={index}
              hasActive={hasActive}
              isActive={activeItem?.id === category.id}
              onActivate={(item) => setActiveItem(item)}
              onDeactivate={deactivateItem}
              reduceMotion={prefersReducedMotion}
            />
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-black/10 pt-8 md:flex-row md:items-center md:justify-between">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-lg font-medium uppercase tracking-[0.12em] text-neutral-900 transition hover:text-[#0057FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0057FF]"
          >
            veja mais
            <ArrowUpRight className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/#contact"
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#0057FF] px-8 py-4 text-white shadow-[0_18px_32px_rgba(0,87,255,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_40px_rgba(0,87,255,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0057FF]"
          >
            <span className="text-base font-semibold lowercase">
              let’s build something great
            </span>
            <ArrowUpRight className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {activeItem && !prefersReducedMotion ? (
          <CursorImage activeItem={activeItem} x={smoothX} y={smoothY} />
        ) : null}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioShowcase;
