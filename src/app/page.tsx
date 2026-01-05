import HomeHero from '@/components/home/HomeHero';
import ManifestoSection from '@/components/home/ManifestoSection';
import PortfolioShowcaseSection from '@/components/portfolio/PortfolioShowcaseSection';
import FeaturedProjectsSection from '@/components/home/FeaturedProjectsSection';

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ManifestoSection />
      <PortfolioShowcaseSection />
      <FeaturedProjectsSection />
    </>
  );
}
