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
      className="relative w-full overflow-hidden bg-[#f5f6f8] py-20 text-neutral-900 md:py-24"
      onMouseMove={handleMouseMove}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 md:px-8 lg:px-12">
        <header className="flex flex-col gap-3 md:items-start">
          <span className="text-[11px] font-mono uppercase tracking-[0.32em] text-[#2f5aff]">
            [ what we love working on ]
          </span>
          <h2 className="text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
            portfolio showcase
          </h2>
        </header>

        <div className="overflow-hidden rounded-[32px] border border-[#dcdfe6] bg-[#f7f8fb]">
          <div
            className="flex flex-col divide-y divide-[#dcdfe6]"
            onMouseLeave={deactivateItem}
            onBlur={deactivateItem}
          >
            {categories.map((category) => (
              <ShowcaseItem
                key={category.id}
                category={category}
                hasActive={hasActive}
                isActive={activeItem?.id === category.id}
                onActivate={(item) => setActiveItem(item)}
                onDeactivate={deactivateItem}
                reduceMotion={prefersReducedMotion}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-6 md:pt-2">
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-3 rounded-full bg-[#2f5aff] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(47,90,255,0.25)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_26px_60px_rgba(47,90,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2f5aff]"
          >
            <span className="lowercase">let’s build something great</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
