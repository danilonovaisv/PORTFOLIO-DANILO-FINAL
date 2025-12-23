import HeroSection from '@/components/home/HeroSection';
import HeroShowreel from '@/components/home/HeroShowreel';
import PortfolioShowcase from '@/components/home/PortfolioShowcase';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import Clients from '@/components/home/Clients';
import Contact from '@/components/home/Contact';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050505]">
      {/* 1. Hero Cinematic (Somente Vídeo + Máquina de Estados) */}
      <HeroSection />

      {/* 2. O Vídeo de Transição (Efeito Cortina) para o portfólio */}
      <HeroShowreel />

      {/* 3. Portfolio Content */}
      <PortfolioShowcase />
      <FeaturedProjects />
      <Clients />
      <Contact />
    </main>
  );
}
