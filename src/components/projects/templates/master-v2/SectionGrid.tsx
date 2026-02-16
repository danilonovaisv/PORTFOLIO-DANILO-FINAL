'use client';

import { motion } from 'framer-motion';
import { GHOST_EASE } from '@/config/motion';
import type { MasterProjectV2GalleryItem } from '@/types/project-template';
import BlockMedia from './BlockMedia';

type SectionGridProps = {
  item: MasterProjectV2GalleryItem;
  index: number;
  accentColor: string;
  prefersReducedMotion: boolean;
};

export default function SectionGrid({
  item,
  index,
  accentColor,
  prefersReducedMotion,
}: SectionGridProps) {
  const revealInitial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 18, filter: 'blur(8px)' };
  const revealVisible = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, filter: 'blur(0px)' };

  const isTwoCol = item.layout_type === 'grid_2_col';
  const title = item.title || `Seção ${index + 1}`;
  const hasCopy = Boolean(item.eyebrow || item.title || item.description);
  const textFirst = item.media_align === 'right';

  return (
    <motion.section
      initial={revealInitial}
      whileInView={revealVisible}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.72,
        ease: GHOST_EASE,
        delay: prefersReducedMotion ? 0 : index * 0.03,
      }}
      className="std-grid py-7 md:py-10"
    >
      <article
        className={`overflow-hidden rounded-3xl border border-white/12 bg-black/25 p-4 md:p-6 ${
          isTwoCol ? 'grid items-center gap-6 lg:grid-cols-2' : 'space-y-5'
        }`}
      >
        <div className={isTwoCol && textFirst ? 'lg:order-2' : ''}>
          <BlockMedia
            item={item}
            title={title}
            priority={index < 2}
            aspectClassName={
              isTwoCol
                ? 'aspect-[5/4] md:aspect-[16/10]'
                : 'aspect-[16/10] md:aspect-[21/10]'
            }
          />
        </div>

        {hasCopy ? (
          <div
            className={`space-y-4 px-1 pb-2 pt-2 ${
              isTwoCol ? (textFirst ? 'lg:order-1' : 'lg:order-2') : ''
            }`}
          >
            {item.eyebrow ? (
              <p
                className="text-[11px] uppercase tracking-[0.16em]"
                style={{ color: accentColor }}
              >
                {item.eyebrow}
              </p>
            ) : null}
            {item.title ? (
              <h3 className="text-2xl font-semibold leading-tight md:text-4xl">
                {item.title}
              </h3>
            ) : null}
            {item.description ? (
              <p className="max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
                {item.description}
              </p>
            ) : null}
          </div>
        ) : null}
      </article>
    </motion.section>
  );
}
