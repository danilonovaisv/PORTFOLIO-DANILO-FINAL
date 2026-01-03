// src/app/sobre/page.tsx
import SobreHero from '@/components/sobre/SobreHero';
import OrigemSection from '@/components/sobre/OrigemSection';
import InsightToImpactSection from '@/components/sobre/InsightToImpactSection';
import MetodoGhostSection from '@/components/sobre/MetodoGhostSection';
import CrencasGhostDesignSection from '@/components/sobre/CrencasGhostDesignSection';
import ClientsBrandsSection from '@/components/home/ClientsBrandsSection';
import ContactSection from '@/components/home/ContactSection';

export default function SobrePage() {
  return (
    <main className="bg-[#050511] text-white">
      <SobreHero videoSrc="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4" />
      <OrigemSection />
      <InsightToImpactSection />
      <MetodoGhostSection />
      <CrencasGhostDesignSection />
      <ClientsBrandsSection />
      <ContactSection />
    </main>
  );
}
