'use client';

import PortfolioHero from '@/components/portfolio/PortfolioHero';
import PortfolioMosaicGrid from '@/components/portfolio/PortfolioMosaicGrid';
import { PORTFOLIO_MOSAIC_DATA } from '@/config/content';

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-section-bg">
      <PortfolioHero />
      <PortfolioMosaicGrid rows={PORTFOLIO_MOSAIC_DATA} />
    </main>
  );
}
