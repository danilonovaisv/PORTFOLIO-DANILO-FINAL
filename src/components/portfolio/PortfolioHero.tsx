'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import styles from './PortfolioHeroGallery.module.css';

const heroItems = [
  {
    id: 'brand-identity',
    label: 'Brand Identity',
    image:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp',
  },
  {
    id: 'key-visual',
    label: 'Key Visual',
    image:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp',
  },
  {
    id: 'web-design',
    label: 'Web Design',
    image:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
  },
  {
    id: 'motion-design',
    label: 'Motion Design',
    image:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/videos-motions-thumb.webp',
  },
];

export default function PortfolioHero() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  return (
    <section
      id="portfolio-hero"
      className="w-full bg-[#f5f5f5] text-[#0f172a] pt-[96px] overflow-hidden"
    >
      <div className="relative mb-2">
        <motion.div
          className="w-full bg-white shadow-inner"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.8,
            ease: 'easeOut',
          }}
        >
          <motion.div
            className={styles.galleryWrap}
            style={{ minHeight: '400px' }}
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            transition={{
              duration: reduceMotion ? 0 : 0.9,
              ease: 'easeOut',
            }}
          >
            {heroItems.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                className={styles.item}
                aria-label={item.label}
                style={{ backgroundImage: `url(${item.image})` }}
                initial={{ opacity: 0, y: 12, flex: 1 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  flex: reduceMotion
                    ? 1
                    : activeIndex === null
                      ? 1
                      : activeIndex === index
                        ? 7
                        : 1,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.8,
                  delay: reduceMotion ? 0 : index * 0.08,
                  ease: 'easeOut',
                }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onFocus={() => setActiveIndex(index)}
                onBlur={() => setActiveIndex(null)}
              >
                <span className="sr-only">{item.label}</span>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="mx-auto w-full px-[clamp(1.5rem,5vw,6rem)] max-w-[1680px] flex flex-col items-center justify-between gap-6 pb-10 pt-6 text-center sm:flex-row sm:items-center sm:gap-8 sm:text-left">
        <h1 className="text-3xl font-bold lowercase tracking-tight text-text-dark">
          <span className="text-focus-ring">portfólio</span>{' '}
          <span className="text-text-dark">showcase</span>
        </h1>

        <a
          href="#contact"
          className="group inline-flex w-full max-w-xs items-center justify-center gap-3 rounded-full bg-focus-ring px-8 py-4 text-lg font-semibold tracking-wide text-white shadow-[0_18px_30px_-15px_rgba(0,87,255,0.8)] transition duration-200 hover:bg-[#0046CC] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus-ring/50 sm:w-auto sm:max-w-none"
        >
          vamos trabalhar juntos
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition duration-200 group-hover:bg-white/30">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </a>
      </div>
    </section>
  );
}
