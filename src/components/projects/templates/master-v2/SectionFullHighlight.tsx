'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { GHOST_EASE } from '@/config/motion';
import type { MasterProjectV2GalleryItem } from '@/types/project-template';
import BlockMedia from './BlockMedia';

type SectionFullHighlightProps = {
  item: MasterProjectV2GalleryItem;
  index: number;
  accentColor: string;
  prefersReducedMotion: boolean;
};

export default function SectionFullHighlight({
  item,
  index,
  accentColor,
  prefersReducedMotion,
}: SectionFullHighlightProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : 14]
  );

  const revealInitial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 18, filter: 'blur(8px)' };
  const revealVisible = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, filter: 'blur(0px)' };
  const title = item.title || `Destaque ${index + 1}`;

  return (
    <section ref={containerRef} className="std-grid py-8 md:py-14">
      <motion.article
        initial={revealInitial}
        whileInView={revealVisible}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.78,
          ease: GHOST_EASE,
          delay: prefersReducedMotion ? 0 : index * 0.02,
        }}
        className="overflow-hidden rounded-3xl border border-white/10 bg-black/30"
      >
        <motion.div style={prefersReducedMotion ? undefined : { y: parallaxY }}>
          <BlockMedia
            item={item}
            title={title}
            priority={index < 2}
            aspectClassName="aspect-[16/10] md:aspect-[21/9]"
            sizes="100vw"
          />
        </motion.div>

        <div className="space-y-4 px-5 py-6 md:px-8 md:py-8">
          {item.eyebrow ? (
            <p
              className="text-[11px] uppercase tracking-[0.16em]"
              style={{ color: accentColor }}
            >
              {item.eyebrow}
            </p>
          ) : null}
          {item.title ? (
            <h3 className="max-w-4xl text-3xl font-semibold leading-[1.02] md:text-5xl">
              {item.title}
            </h3>
          ) : null}
          {item.description ? (
            <p className="max-w-3xl text-base leading-relaxed text-white/82 md:text-xl">
              {item.description}
            </p>
          ) : null}
        </div>
      </motion.article>
    </section>
  );
}
