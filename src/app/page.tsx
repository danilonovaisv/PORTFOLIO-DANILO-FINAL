import HomeIntro from '@/components/home/HomeIntro';
import PortfolioShowcase from '@/components/home/PortfolioShowcase';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import Clients from '@/components/home/Clients';
import Contact from '@/components/home/Contact';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <HomeIntro />

      <PortfolioShowcase />
      <FeaturedProjects />
      <Clients />
      <Contact />
    </main>
  );
}
