'use client';

import PortfolioHero from '@/components/portfolio/PortfolioHero';
import PortfolioMosaicGrid from '@/components/portfolio/PortfolioMosaicGrid';
import { PORTFOLIO_MOSAIC_DATA } from '@/config/content';

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#F4F5F7]">
      <PortfolioHero />
      <PortfolioMosaicGrid rows={PORTFOLIO_MOSAIC_DATA} />
    </main>
  );
}
