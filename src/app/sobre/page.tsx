'use client';

import React from 'react';
import AboutHero from '@/components/sobre/AboutHero';
import AboutOrigin from '@/components/sobre/AboutOrigin';
import AboutServices from '@/components/sobre/AboutServices';
import AboutMethod from '@/components/sobre/AboutMethod';
import AboutBeliefs from '@/components/sobre/AboutBeliefs';
import AboutClosing from '@/components/sobre/AboutClosing';
import ClientsBrandsSection from '@/components/home/ClientsBrandsSection';
import ContactSection from '@/components/home/ContactSection';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#000022] text-white">
      <AboutHero />
      <AboutOrigin />
      <AboutServices />
      <AboutMethod />
      <AboutBeliefs />
      <AboutClosing />

      {/* Reused Home Sections */}
      <ClientsBrandsSection />
      <ContactSection />

      {/* Footer is handled by the global layout */}
    </main>
  );
}
