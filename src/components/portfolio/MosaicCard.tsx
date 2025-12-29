'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { MosaicItem } from './types';

type MosaicCardProps = {
  item: MosaicItem;
  priority?: boolean;
};

const easing = [0.22, 1, 0.36, 1] as const;

const entryVariants = {
  rest: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
  hover: { opacity: 1, y: 0 },
};

const overlayVariants = {
  rest: { opacity: 0 },
  visible: { opacity: 0 },
  hover: { opacity: 1 },
};

const textVariants = {
  rest: { opacity: 0, y: 16 },
  visible: { opacity: 0, y: 16 },
  hover: { opacity: 1, y: 0 },
};

export default function MosaicCard({ item, priority = false }: MosaicCardProps) {
  // Calculate the percentage for padding-bottom based on aspect ratio (default to 16:10 if not specified)
  const aspectRatio = item.aspectRatio || 1.6; // 16:10 = 1.6
  const paddingBottomPercentage = (1 / aspectRatio) * 100;

  return (
    <motion.article
      initial="rest"
      whileInView="visible"
      whileHover="hover"
      whileTap="hover"
      viewport={{ once: true, amount: 0.35 }}
      variants={entryVariants}
      transition={{ duration: 0.45, ease: easing }}
      className="relative overflow-hidden rounded-none border border-white/30 bg-[#0f172a]/5"
    >
      {/* Wrapper with fixed aspect ratio to prevent CLS */}
      <div
        className="relative w-full"
        style={{ paddingBottom: `${paddingBottomPercentage}%` }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: item.gradient,
          }}
          aria-hidden="true"
        />

        {item.imageSrc && (
          <Image
            src={item.imageSrc}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/30 mix-blend-multiply" />

        <motion.div
          variants={overlayVariants}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="absolute inset-0 bg-focus-ring flex flex-col justify-end px-6 pb-6 pt-10 text-white"
        >
          <motion.span
            variants={textVariants}
            transition={{ duration: 0.2, ease: 'easeInOut', delay: 0.05 }}
            className="text-[12px] uppercase tracking-[0.4em] text-white/80"
          >
            {item.subtitle}
          </motion.span>
          <motion.h2
            variants={textVariants}
            transition={{ duration: 0.25, ease: 'easeInOut', delay: 0.1 }}
            className="text-2xl font-semibold leading-tight"
          >
            {item.title}
          </motion.h2>
        </motion.div>
      </div>
    </motion.article>
  );
}
