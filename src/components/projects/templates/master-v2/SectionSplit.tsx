'use client';

import { motion } from 'framer-motion';
import { GHOST_EASE } from '@/config/motion';
import type { MasterProjectV2GalleryItem } from '@/types/project-template';
import BlockMedia from './BlockMedia';

type SectionSplitProps = {
  item: MasterProjectV2GalleryItem;
  index: number;
  accentColor: string;
  prefersReducedMotion: boolean;
};

export default function SectionSplit({
  item,
  index,
  accentColor,
  prefersReducedMotion,
}: SectionSplitProps) {
  const revealInitial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 18, filter: 'blur(8px)' };
  const revealVisible = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, filter: 'blur(0px)' };

  const mediaOnRight = item.media_align === 'right';
  const title = item.title || `Seção ${index + 1}`;

  return (
    <motion.section
      initial={revealInitial}
      whileInView={revealVisible}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.74,
        ease: GHOST_EASE,
        delay: prefersReducedMotion ? 0 : index * 0.02,
      }}
      className="std-grid py-8 md:py-14"
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <aside
          className={`rounded-3xl border border-white/10 bg-black/28 p-6 lg:col-span-5 lg:h-fit lg:self-start lg:p-8 ${
            mediaOnRight ? 'lg:order-1' : 'lg:order-2'
          } lg:sticky lg:top-28`}
        >
          {item.eyebrow ? (
            <p
              className="text-[11px] uppercase tracking-[0.16em]"
              style={{ color: accentColor }}
            >
              {item.eyebrow}
            </p>
          ) : null}
          <h3 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">
            {title}
          </h3>
          {item.description ? (
            <p className="mt-4 text-base leading-relaxed text-white/80 md:text-lg">
              {item.description}
            </p>
          ) : null}
        </aside>

        <div
          className={`lg:col-span-7 ${
            mediaOnRight ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          <BlockMedia
            item={item}
            title={title}
            priority={index < 2}
            aspectClassName="aspect-[4/3] md:aspect-[16/10]"
          />
        </div>
      </div>
    </motion.section>
  );
}
