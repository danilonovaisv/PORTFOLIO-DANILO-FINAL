import type { Metadata } from 'next';

import dynamic from 'next/dynamic';

const SiteClosure = dynamic(() =>
  import('@/components/layout/SiteClosure').then((mod) => mod.SiteClosure)
);
const FeaturedProjectsRealtime = dynamic(
  () => import('@/components/home/featured-projects/FeaturedProjectsRealtime')
);
import HomeHero from '@/components/home/hero/HomeHero';
const PortfolioShowcase = dynamic(
  () => import('@/components/home/portfolio-showcase/PortfolioShowcase')
);
const VideoManifesto = dynamic(() =>
  import('@/components/home/hero/VideoManifesto').then(
    (mod) => mod.VideoManifesto
  )
);
import { BRAND } from '@/config/brand';
import { listProjects } from '@/lib/supabase/queries/projects';
import { mapDbProjectToPortfolioProject } from '@/lib/portfolio/project-mappers';
import { createStaticClient } from '@/lib/supabase/static';
import { stableShuffle } from '@/lib/utils/stable-shuffle';
import type { PortfolioProject } from '@/types/project';
import JsonLd from '@/components/ui/JsonLd';
import { SITE_ASSET_KEYS } from '@/config/site-assets';

import {
  normalizeMetaDescription,
  normalizeMetaTitle,
  toCanonicalUrl,
} from '@/lib/seo';

export const metadata: Metadata = {
  title: normalizeMetaTitle('Danilo Novais | Creative Developer'),
  description: normalizeMetaDescription(
    'Você não vê o design. Mas ele vê você. Portfólio de Danilo Novais - Creative Developer especializado em WebGL, R3F, Next.js e experiências digitais interativas.'
  ),
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
  openGraph: {
    title: 'Danilo Novais | Creative Developer',
    description:
      'Você não vê o design. Mas ele vê você. Portfólio de Danilo Novais.',
    url: toCanonicalUrl('/'),
    siteName: BRAND.name,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Danilo Novais | Creative Developer Portfolio',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Danilo Novais | Creative Developer',
    description: 'Você não vê o design. Mas ele vê você.',
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: toCanonicalUrl('/'),
  },
  formatDetection: {
    telephone: false,
    date: false,
    email: false,
    address: false,
  },
};

import { preload } from 'react-dom';

export default async function HomePage() {
  // Preload video posters for LCP optimization
  preload(BRAND.assets.video.manifestoPosterDesk, {
    as: 'image',
    fetchPriority: 'high',
  });
  preload(BRAND.assets.video.manifestoPosterMobile, {
    as: 'image',
    fetchPriority: 'high',
  });

  let featuredProjects: PortfolioProject[] = [];
  try {
    const supabase = createStaticClient();
    const dbProjects = await listProjects({ featuredOnHome: true }, supabase);
    const mapped = dbProjects.map((project, index) =>
      mapDbProjectToPortfolioProject(project, index)
    );
    // PROMPT 05: Stable daily shuffle — rotates featured project order once per day
    // without "chaotic shuffle" on each render. Scope differentiates from /portfolio.
    featuredProjects = stableShuffle(mapped, {
      window: 'daily',
      scope: 'home',
    });
  } catch (error: any) {
    console.error('Error fetching projects:', error?.message || error);
  }

  const siteUrl = toCanonicalUrl('/');

  return (
    <>
      <JsonLd pageType="home" breadcrumbs={[{ name: 'Home', url: siteUrl }]} />
      <HomeHero />
      <VideoManifesto
        src={BRAND.assets.video.manifesto}
        srcMobile={BRAND.assets.video.manifestoMobile}
        posterDesk={BRAND.assets.video.manifestoPosterDesk}
        posterMobile={BRAND.assets.video.manifestoPosterMobile}
        assetKey={SITE_ASSET_KEYS.heroVideos.homeManifesto}
        assetKeyMobile={SITE_ASSET_KEYS.heroVideos.homeManifestoMobile}
      />
      <PortfolioShowcase />
      <FeaturedProjectsRealtime initialProjects={featuredProjects} />
      <SiteClosure />
    </>
  );
}
