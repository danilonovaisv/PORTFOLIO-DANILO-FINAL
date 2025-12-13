'use client';

import React from 'react';
import { motion } from 'framer-motion';

export type MosaicItem = {
  id: string;
  imageSrc?: string;
  gradient: string;
  accent?: string;
  title: string;
  subtitle: string;
};

export type MosaicRow = {
  id: string;
  columns: 1 | 2 | 3;
  items: MosaicItem[];
};

type PortfolioMosaicGridProps = {
  rows: MosaicRow[];
};

const easing = [0.22, 1, 0.36, 1] as const;

const cardTransition = {
  duration: 0.5,
  ease: easing,
};

export default function PortfolioMosaicGrid({ rows }: PortfolioMosaicGridProps) {
  const gridItems = rows.flatMap((row) =>
    row.items.map((item) => ({
      ...item,
      columns: row.columns,
    }))
  );

  const overlayVariants = {
    rest: { opacity: 0 },
    visible: { opacity: 0 },
    hover: { opacity: 0.95 },
  };

  const textVariants = {
    rest: { opacity: 0, y: 26 },
    visible: { opacity: 0, y: 26 },
    hover: { opacity: 1, y: 0 },
  };

  const cardVariants = {
    rest: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    hover: {
      scale: 1.01,
      filter: 'saturate(1.05)',
    },
  };

  return (
    <section
      id="portfolio-mosaic"
      className="relative bg-[#f7f7f7] text-[#0f172a]"
      aria-label="Mural de projetos em mosaico"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-0 pb-28 pt-8 sm:px-6 sm:pt-14 lg:px-10">
        <div className="overflow-hidden rounded-3xl border border-white/40 bg-white shadow-[0_30px_60px_-45px_rgba(0,0,0,0.35)]">
          <div className="grid gap-4 px-4 py-6 sm:gap-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(12,minmax(0,1fr))]">
              {gridItems.map((item) => {
                const largeSpanClass =
                  item.columns === 3
                    ? 'lg:col-span-4'
                    : item.columns === 2
                    ? 'lg:col-span-6'
                    : 'lg:col-span-12';

                return (
                  <motion.article
                    key={item.id}
                    initial="rest"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={cardVariants}
                    transition={cardTransition}
                    className={`group relative col-span-12 sm:col-span-6 ${largeSpanClass} overflow-hidden rounded-3xl bg-[#0f172a]/5`}
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <div
                        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        style={{
                          background: item.gradient,
                        }}
                      />

                      {item.imageSrc ? (
                        <img
                          src={item.imageSrc}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                      ) : null}

                      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/60 mix-blend-multiply" />
                      <motion.div
                        variants={overlayVariants}
                        transition={{ duration: 0.38, ease: easing }}
                        className="pointer-events-none absolute inset-0 bg-[#0057FF]"
                      />
                      <motion.div
                        variants={textVariants}
                        transition={{ duration: 0.38, ease: easing }}
                        className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-1 px-6 pb-6 pt-10 text-white"
                      >
                        <span className="text-[11px] uppercase tracking-[0.45em] text-blue-100/80">
                          {item.subtitle}
                        </span>
                        <span className="text-lg font-semibold leading-tight">
                          {item.title}
                        </span>
                      </motion.div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
