'use client';

import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import FluidProjectCard from './FluidProjectCard';
import { PROJECT_SHOWCASE_CARDS } from '../../lib/constants';
import { useDynamicLayout } from '../../hooks/useDynamicLayout';

type LayoutTemplate = {
  columns: number;
  rows: number;
  minHeight: number;
};

type ArrangedCard = {
  cardId: string;
  card: typeof PROJECT_SHOWCASE_CARDS[number];
  template: LayoutTemplate;
};

const layoutTemplates: LayoutTemplate[] = [
  { columns: 6, rows: 4, minHeight: 360 },
  { columns: 4, rows: 3, minHeight: 320 },
  { columns: 8, rows: 5, minHeight: 420 },
  { columns: 5, rows: 3, minHeight: 300 },
  { columns: 7, rows: 4, minHeight: 360 },
];

const shuffleArray = <T,>(list: T[]) => {
  const result = [...list];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const gridItemMotion = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 90, damping: 20 },
  },
} as const;

const ctaMotion = {
  initial: gridItemMotion.initial,
  animate: {
    ...gridItemMotion.animate,
    transition: { ...gridItemMotion.animate.transition, delay: 0.4 },
  },
} as const;

const CtaPanel = () => (
  <div className="flex h-full flex-col justify-between rounded-[32px] border border-[#e0e7ff] bg-white/90 px-6 py-8 shadow-[0_20px_60px_rgba(15,23,42,0.25)] backdrop-blur-xl">
    <div>
      <p className="text-sm uppercase tracking-[0.4em] text-[#8b5cf6]">
        em construção
      </p>
      <p className="mt-2 text-2xl font-semibold text-[#111111]">
        Let’s translate this into a full experience.
      </p>
    </div>
    <Link
      href="/#contact"
      className="mt-2 inline-flex items-center gap-3 rounded-full bg-[#0057FF] px-6 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white transition hover:bg-[#0b4cd5]"
    >
      view projects
      <span className="text-white">↗</span>
    </Link>
  </div>
);

const createDeck = (): ArrangedCard[] => {
  const shuffledCards = shuffleArray(PROJECT_SHOWCASE_CARDS);
  const shuffledTemplates = shuffleArray(layoutTemplates);
  return shuffledCards.map((card, index) => ({
    cardId: card.id,
    card,
    template: shuffledTemplates[index % shuffledTemplates.length],
  }));
};

const FluidProjectGrid: React.FC = () => {
  const layout = useDynamicLayout();
  const isDesktop = layout.viewport === 'desktop';
  const [deck, setDeck] = React.useState<ArrangedCard[]>(() => createDeck());

  React.useEffect(() => {
    setDeck(createDeck());
  }, [layout.viewport]);

  return (
    <motion.div
      className="relative w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div
        className="mx-auto w-full"
        style={{
          maxWidth: layout.maxWidth,
          paddingLeft: layout.containerPadding,
          paddingRight: layout.containerPadding,
        }}
      >
        <div
          className="relative grid w-full"
          style={{
            gridTemplateColumns: isDesktop
              ? 'repeat(12, minmax(0, 1fr))'
              : '1fr',
            gridAutoRows: 'minmax(220px, auto)',
            gap: layout.gap,
          }}
        >
          {deck.map((entry, index) => (
            <motion.div
              key={entry.cardId}
              className="relative h-full"
              style={{
                minHeight: entry.template.minHeight,
                gridRow: `span ${entry.template.rows}`,
                ...(isDesktop
                  ? { gridColumn: `span ${entry.template.columns}` }
                  : { gridColumn: '1 / -1' }),
              }}
              {...gridItemMotion}
            >
              <FluidProjectCard
                card={entry.card}
                index={index}
                viewport={layout.viewport}
                className="h-full"
              />
            </motion.div>
          ))}
          <motion.div
            key="cta-panel"
            className="relative h-full"
            style={{
              minHeight: 280,
              gridRow: 'span 3',
              ...(isDesktop ? { gridColumn: 'span 6' } : { gridColumn: '1 / -1' }),
            }}
            {...ctaMotion}
          >
            <CtaPanel />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default FluidProjectGrid;
