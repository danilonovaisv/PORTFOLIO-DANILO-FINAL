import React from 'react';
import Hero from '@/components/hero/Hero';
import ManifestoSection from '@/components/manifesto/ManifestoSection';
import PortfolioShowcaseSection from '@/components/portfolio/PortfolioShowcaseSection';
import FeaturedProjectsSection from '@/components/projects/FeaturedProjectsSection';
import ClientsBrandsSection from '@/components/clients/ClientsBrandsSection';
import ContactSection from '@/components/contact/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ManifestoSection />
      <PortfolioShowcaseSection />
      <FeaturedProjectsSection />
      <ClientsBrandsSection />
      <ContactSection />
    </>
  );
}
