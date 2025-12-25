'use client';

import { motion } from 'framer-motion';
import MosaicCard from './MosaicCard';
import type { MosaicRow } from './types';

type PortfolioMosaicGridProps = {
  rows: MosaicRow[];
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function PortfolioMosaicGrid({
  rows,
}: PortfolioMosaicGridProps) {
  const firstCardId = rows[0]?.items[0]?.id;

  return (
    <section
      id="portfolio-mosaic"
      aria-label="Mural de projetos em mosaico"
      className="relative bg-[#f7f7f7] text-[#0f172a] py-24 md:py-32"
    >
      {/* Overlay de fundo */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 xl:px-12">
        {/* Grid Editorial */}
        <div className="flex flex-col gap-8 md:gap-12 pb-10">
          {rows.map((row) => (
            <div key={row.id} className="grid grid-cols-12 gap-8 md:gap-12">
              {row.items.map((item) => {
                const tabletSpan =
                  row.columns === 1 ? 'md:col-span-12' : 'md:col-span-6';

                const desktopSpan =
                  row.columns === 3
                    ? 'lg:col-span-4'
                    : row.columns === 2
                    ? 'lg:col-span-6'
                    : 'lg:col-span-12';

                return (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    className={`col-span-12 ${tabletSpan} ${desktopSpan}`}
                  >
                    <MosaicCard
                      item={item}
                      priority={item.id === firstCardId}
                    />
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}