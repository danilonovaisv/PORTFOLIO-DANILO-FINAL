// src/app/page.tsx
import HomeHero from '@/components/home/HomeHero';
import PortfolioShowcaseSection from '@/components/portfolio/PortfolioShowcaseSection';
import FeaturedProjectsSection from '@/components/home/FeaturedProjectsSection';
import ManifestoSection from '@/components/home/ManifestoSection';
export default function Page() {
  return (
    <main className="bg-neutral-950 text-white">
      {/* Hero + Ghost + Thumb (scroll-driven) */}
      <HomeHero />

      {/* Manifesto (mobile-first/full) */}
      <ManifestoSection />

      {/* Portfolio / Destaques */}
      <PortfolioShowcaseSection />
      <FeaturedProjectsSection />
    </main>
  );
}
