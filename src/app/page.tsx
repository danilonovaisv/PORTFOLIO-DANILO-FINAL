import type { Metadata } from 'next';

import { SiteClosure } from '@/components/layout/SiteClosure';
import FeaturedProjectsSection from '@/components/home/featured-projects/FeaturedProjectsSection';
import HomeHero from '@/components/home/hero/HomeHero';
import PortfolioShowcase from '@/components/home/portfolio-showcase/PortfolioShowcase';
import { VideoManifesto } from '@/components/home/hero/VideoManifesto';
import { BRAND } from '@/config/brand';
import { listProjects } from '@/lib/supabase/queries/projects';
import { mapDbProjectToPortfolioProject } from '@/lib/portfolio/project-mappers';
import { createStaticClient } from '@/lib/supabase/static';

export const metadata: Metadata = {
  title: 'Danilo Novais | Creative Developer',
  description:
    'Você não vê o design. Mas ele vê você. Portfólio de Danilo Novais - Creative Developer especializado em WebGL, R3F, Next.js e experiências digitais interativas.',
  keywords: [
    'Danilo Novais',
    'Creative Developer',
    'WebGL',
    'R3F',
    'React Three Fiber',
    'Next.js',
    'Creative Development',
    'Brazil',
    'Portfolio',
    'Interactive Design',
  ],
};

export default async function HomePage() {
  let featuredProjects: any[] = [];
  try {
    const supabase = createStaticClient();
    const dbProjects = await listProjects({ featuredOnHome: true }, supabase);
    featuredProjects = dbProjects.map((project, index) =>
      mapDbProjectToPortfolioProject(project, index)
    );
  } catch (error) {
    console.error('Error fetching projects:', error);
    // Fallback ou array vazio para evitar crash
  }

  return (
    <>
      <HomeHero />
      <VideoManifesto src={BRAND.assets.video.manifesto} />
      <PortfolioShowcase />
      <FeaturedProjectsSection projects={featuredProjects} />
      <SiteClosure />
    </>
  );
}
