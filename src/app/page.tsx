import HomeHero from '@/components/home/HomeHero';
import PortfolioShowcaseSection from '@/components/home/PortfolioShowcaseSection';
import FeaturedProjectsSection from '@/components/home/FeaturedProjectsSection';
import ClientsBrandsSection from '@/components/home/ClientsBrandsSection';
import ContactSection from '@/components/home/ContactSection';
import DynamicThumb from '@/components/home/DynamicThumb';

export default function Page() {
  return (
    <main>
      <HomeHero />
      <PortfolioShowcaseSection />
      <FeaturedProjectsSection />
      <ClientsBrandsSection />
      <ContactSection />

      {/* Dynamic Thumbnail - Fixed position, changes with scroll */}
      <DynamicThumb />
    </main>
  );
}
