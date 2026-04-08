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
import type { DbProjectWithTags } from '@/lib/supabase/queries/projects';
import { mapDbProjectToPortfolioProject } from '@/lib/portfolio/project-mappers';
import { createStaticClient } from '@/lib/supabase/static';
import type { PortfolioProject } from '@/types/project';
import { buildFallbackProjects } from '@/lib/portfolio/fallbacks';
import JsonLd from '@/components/ui/JsonLd';
import { SITE_ASSET_KEYS, SITE_ASSET_PRELOADS } from '@/config/site-assets';
import { shuffleHomeProjects } from '@/lib/portfolio/shuffle-projects';

import {
  normalizeMetaDescription,
  normalizeMetaTitle,
  toCanonicalUrl,
} from '@/lib/seo';

export const metadata: Metadata = {
  title: {
    absolute: normalizeMetaTitle(
      'Danilo Novais | Head de Criação & Diretor de Criação Sênior'
    ),
  },
  description: normalizeMetaDescription(
    'Você não vê o design. Mas ele vê você. Portfólio de Danilo Novais — branding, campanhas, vídeo, motion e soluções digitais que conectam design, movimento e tecnologia para transformar ideias em experiências visuais marcantes.'
  ),
  keywords: [
    'Danilo Novais',
    'Head de Criação',
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
    title: 'Danilo Novais | Head de Criação & Diretor de Criação Sênior',
    description:
      'Você não vê o design. Mas ele vê você. Portfólio de Danilo Novais — branding, campanhas, vídeo, motion e soluções digitais que conectam design, movimento e tecnologia para transformar ideias em experiências visuais marcantes.',
    url: toCanonicalUrl('/'),
    siteName: BRAND.name,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Danilo Novais | Head de Criação & Diretor de Criação Sênior',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Danilo Novais | Head de Criação & Diretor de Criação Sênior',
    description:
      'Você não vê o design. Mas ele vê você. Portfólio de Danilo Novais — branding, campanhas, vídeo, motion e soluções digitais que conectam design, movimento e tecnologia para transformar ideias em experiências visuais marcantes.',
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
  for (const poster of SITE_ASSET_PRELOADS.homeHero.posters) {
    preload(poster, {
      as: 'image',
      fetchPriority: 'high',
    });
  }

  for (const video of SITE_ASSET_PRELOADS.homeHero.videos) {
    preload(video, {
      as: 'video',
    });
  }

  let featuredProjects: PortfolioProject[] = [];
  try {
    const supabase = createStaticClient();
    const dbProjects = await listProjects({ featuredOnHome: true }, supabase);
    const mapped = dbProjects.map((project: DbProjectWithTags, index: number) =>
      mapDbProjectToPortfolioProject(project, index)
    );
    featuredProjects = shuffleHomeProjects(mapped);

    if (featuredProjects.length === 0) {
      console.warn('[Home] No projects returned, using fallback projects.');
      featuredProjects = shuffleHomeProjects(buildFallbackProjects());
    }
  } catch (error: any) {
    console.error('Error fetching projects:', error?.message || error);
    featuredProjects = shuffleHomeProjects(buildFallbackProjects());
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
