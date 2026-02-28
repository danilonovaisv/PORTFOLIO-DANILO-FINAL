'use client';

import ClientsBrandsSection from '@/components/home/clients/ClientsBrandsSection';
import ContactSection from '@/components/home/contact/ContactSection';
import SiteFooter from '@/components/layout/SiteFooter';

/**
 * SiteClosure Component
 *
 * This component unifies the mandatory ending sections of every page:
 * 1. Clients/Brands Grid (Blue)
 * 2. Contact Section (Light Grey/Form)
 * 3. Site Footer (Blue)
 *
 * Regra Absoluta (Ghost Era): Estas seções devem sempre aparecer juntas nesta ordem
 * para manter a consistência visual e narrativa do portfólio.
 */
export function SiteClosure() {
  return (
    <>
      <ClientsBrandsSection />
      <ContactSection />
      <SiteFooter />
    </>
  );
}
