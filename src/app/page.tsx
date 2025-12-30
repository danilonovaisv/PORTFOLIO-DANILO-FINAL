// src/app/page.tsx

import HeroSection from '@/components/home/HeroSection';
import PortfolioShowcaseSection from '@/components/home/PortfolioShowcaseSection';
import FeaturedProjectsSection from '@/components/home/FeaturedProjectsSection';
import ClientsBrandsSection from '@/components/home/ClientsBrandsSection';
import ContactSection from '@/components/home/ContactSection';

export default function Page() {
  return (
    <main>
      <HeroSection />
      <PortfolioShowcaseSection />
      <FeaturedProjectsSection />
      <ClientsBrandsSection />
      <ContactSection />
    </main>
  );
}
