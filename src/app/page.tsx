import HomeHero from '@/components/home/HomeHero';
import ManifestoSection from '@/components/home/ManifestoSection';
import PortfolioShowcase from '@/components/home/PortfolioShowcase';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import Clients from '@/components/home/Clients';
import Contact from '@/components/home/Contact';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050505]">
      {/* 1. Hero Atmosphere (Ghost Blue + R3F + Static Text) */}
      <HomeHero />

      {/* 2. Manifesto Section (Cinematic Reveal) */}
      <ManifestoSection />

      {/* 3. Portfolio Content */}
      <PortfolioShowcase />
      <FeaturedProjects />
      <Clients />
      <Contact />
    </main>
  );
}
