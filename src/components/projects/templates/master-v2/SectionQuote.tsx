'use client';

import { motion } from 'framer-motion';
import { GHOST_EASE } from '@/config/motion';
import type { MasterProjectV2GalleryItem } from '@/types/project-template';

type SectionQuoteProps = {
  item: MasterProjectV2GalleryItem;
  index: number;
  accentColor: string;
  prefersReducedMotion: boolean;
};

export default function SectionQuote({
  item,
  index,
  accentColor,
  prefersReducedMotion,
}: SectionQuoteProps) {
  const revealInitial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 18, filter: 'blur(8px)' };
  const revealVisible = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, filter: 'blur(0px)' };

  return (
    <motion.section
      initial={revealInitial}
      whileInView={revealVisible}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.7,
        ease: GHOST_EASE,
        delay: prefersReducedMotion ? 0 : index * 0.02,
      }}
      className="std-grid py-8 md:py-12"
    >
      <blockquote className="rounded-3xl border border-white/12 bg-black/35 px-6 py-10 text-center md:px-10 md:py-14">
        <p
          className="text-[10px] uppercase tracking-[0.18em]"
          style={{ color: accentColor }}
        >
          destaque
        </p>
        <p className="mx-auto mt-4 max-w-5xl text-3xl font-semibold leading-tight md:text-6xl">
          “{item.quote || item.title || 'Criar com intenção.'}”
        </p>
        {item.description ? (
          <p className="mx-auto mt-6 max-w-4xl text-base leading-relaxed text-white/82 md:text-xl">
            {item.description}
          </p>
        ) : null}
      </blockquote>
    </motion.section>
  );
}
