import React from 'react';
import MosaicCard from './MosaicCard';
import type { MosaicRow } from './types';

type PortfolioMosaicGridProps = {
  rows: MosaicRow[];
};

export default function PortfolioMosaicGrid({
  rows,
}: PortfolioMosaicGridProps) {
  const firstCardId = rows[0]?.items[0]?.id;

  return (
    <section
      id="portfolio-mosaic"
      aria-label="Mural de projetos em mosaico"
      className="
        relative
        bg-[#f7f7f7]
        text-[#0f172a]
        py-10
        w-screen
        left-1/2
        -translate-x-1/2
      "
    >
      {/* Overlay de fundo */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white pointer-events-none" />

      <div className="relative z-10">
        {/* Grid com cards quase colados */}
        <div className="grid gap-0.5 pb-10">
          {rows.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-12 gap-0.5"
            >
              {row.items.map((item) => {
                const tabletSpan =
                  row.columns === 1
                    ? 'md:col-span-12'
                    : 'md:col-span-6';

                const desktopSpan =
                  row.columns === 3
                    ? 'lg:col-span-4'
                    : row.columns === 2
                    ? 'lg:col-span-6'
                    : 'lg:col-span-12';

                return (
                  <div
                    key={item.id}
                    className={`col-span-12 ${tabletSpan} ${desktopSpan}`}
                  >
                    <MosaicCard
                      item={item}
                      priority={item.id === firstCardId}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}