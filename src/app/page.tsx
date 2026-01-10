import HomeHero from '@/components/home/hero/HomeHero';
import ManifestoSection from '@/components/home/hero/ManifestoSection';
import PortfolioShowcase from '@/components/home/portfolio-showcase/PortfolioShowcase';
import FeaturedProjectsSection from '@/components/home/featured-projects/FeaturedProjectsSection';
import { SiteClosure } from '@/components/layout/SiteClosure';

export default function HomePage() {
  return (
    <main className="relative">
      <HomeHero />
      <ManifestoSection />
      <PortfolioShowcase />
      <FeaturedProjectsSection />
      <SiteClosure />
    </main>
  );
}
