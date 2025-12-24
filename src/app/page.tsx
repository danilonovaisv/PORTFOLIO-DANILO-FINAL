import HomeHero from '@/components/home/HomeHero';
import PortfolioShowcase from '@/components/home/PortfolioShowcase';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import Clients from '@/components/home/Clients';
import Contact from '@/components/home/Contact';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#050505]">
      {/* 1. Hero with Video Expansion */}
      <HomeHero />

      {/* 2. Portfolio Content */}
      <PortfolioShowcase />
      <FeaturedProjects />
      <Clients />
      <Contact />
    </div>
  );
}
