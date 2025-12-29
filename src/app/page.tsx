import SiteHeader from '@/components/header/SiteHeader';
import HomeHero from '@/components/home/HomeHero';
import PortfolioShowcaseSection from '@/components/home/PortfolioShowcaseSection';
import FeaturedProjectsSection from '@/components/home/FeaturedProjectsSection';
import ClientsBrandsSection from '@/components/home/ClientsBrandsSection';
import ContactSection from '@/components/home/ContactSection';
import SiteFooter from '@/components/layout/SiteFooter';

export default function Page() {
  return (
    <main>
      <SiteHeader
        navItems={[
          { label: 'home', href: '#hero' },
          { label: 'sobre', href: '/sobre' },
          { label: 'portfolio showcase', href: '#portfolio-showcase' },
          { label: 'contato', href: '#contact' },
        ]}
        logoUrl="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoLight.svg"
        gradient={['rgba(0,87,255,0.55)', 'rgba(82,39,255,0.45)']}
        accentColor="#0057FF"
      />

      <HomeHero />
      <PortfolioShowcaseSection />
      <FeaturedProjectsSection />
      <ClientsBrandsSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
