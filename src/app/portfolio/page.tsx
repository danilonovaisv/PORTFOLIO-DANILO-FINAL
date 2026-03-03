import type { Metadata } from 'next';
import PortfolioClient from '@/app/portfolio/PortfolioClient';
import { listProjects, listProjectsPaged } from '@/lib/supabase/queries/projects';
import { mapDbProjectToPortfolioProject } from '@/lib/portfolio/project-mappers';
import { createStaticClient } from '@/lib/supabase/static';
import type { PortfolioProject } from '@/types/project';
import { getSupabasePublicKey } from '@/lib/supabase/env';
import { ENABLE_SERVER_PAGINATION, PORTFOLIO_PAGE_SIZE } from '@/config/portfolio';

import { BRAND } from '@/config/brand';
import {
  normalizeMetaDescription,
  normalizeMetaTitle,
  toCanonicalUrl,
} from '@/lib/seo';

export const revalidate = 3600; // 1 hour caching for better TTFB

type PortfolioPageProps = {
  params?: Promise<Record<string, string>>;
  searchParams?: Promise<{ category?: string | string[]; page?: string | string[] }>;
};

export async function generateMetadata({
  searchParams,
}: PortfolioPageProps): Promise<Metadata> {
  const resolved = await searchParams;
  const categoryRaw = Array.isArray(resolved?.category)
    ? resolved?.category[0]
    : (resolved as { category?: string })?.category;
  const category = categoryRaw?.toLowerCase();
  const categoryMeta: Record<
    string,
    { label: string; description: string; keywords: string[] }
  > = {
    branding: {
      label: 'Brand & Campaigns',
      description:
        'Seleção de projetos de Brand & Campaigns com foco em presença, direção visual e consistência de marca.',
      keywords: ['Branding', 'Design Identidade', 'Direção de Arte', 'Campanhas Criativas', 'Visual Identity'],
    },
    motion: {
      label: 'Videos & Motions',
      description:
        'Projetos de motion design, vídeo e direção criativa com ritmo editorial, narrativa e impacto visual.',
      keywords: ['Motion Design', 'Video Editing', 'Direção Criativa', 'Animação 2D', 'After Effects', 'Editorial Video'],
    },
    web: {
      label: 'Websites & Tech',
      description:
        'Experiências web e digitais com foco em performance, interatividade e design que conecta pessoas e marcas.',
      keywords: ['Web Design', 'Next.js', 'React', 'WebGL', 'Three.js', 'User Experience', 'Front-end Engineering'],
    },
  };

  const metaForCategory = category ? categoryMeta[category] : undefined;
  const rawTitle = metaForCategory
    ? `Portfólio | ${metaForCategory.label} — Danilo Novais`
    : 'Portfólio — Projetos de Branding, Motion e Web';
  const rawDescription =
    metaForCategory?.description ??
    'Explore uma seleção curada de projetos de Branding, Motion Design e Creative Development de Danilo Novais, com foco em presença, narrativa e performance.';

  const title = normalizeMetaTitle(rawTitle);
  const description = normalizeMetaDescription(rawDescription);
  const baseUrl = toCanonicalUrl('/portfolio');
  const url = category ? `${baseUrl}?category=${category}` : baseUrl;

  return {
    title,
    description,
    keywords: [
      'Danilo Novais',
      'Portfólio',
      'Creative Developer',
      ...(metaForCategory?.keywords || ['Branding', 'Motion Design', 'Web Development']),
    ],
    openGraph: {
      title,
      description,
      url,
      siteName: BRAND.name,
      images: [
        {
          url: '/portfolio/opengraph-image',
          width: 1200,
          height: 630,
          alt: 'Portfólio | Danilo Novais',
        },
      ],
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/portfolio/opengraph-image'],
    },
    alternates: {
      canonical: url,
    },
    robots: { index: true, follow: true },
  };
}

import { buildFallbackProjects } from '@/lib/portfolio/fallbacks';

import JsonLd from '@/components/ui/JsonLd';
import { generateVideoSchema } from '@/lib/schema';

export default async function PortfolioPage(_props: PortfolioPageProps) {
  const resolvedSearchParams = await _props.searchParams;
  const categoryParam = Array.isArray(resolvedSearchParams?.category)
    ? resolvedSearchParams?.category[0]
    : resolvedSearchParams?.category;
  const pageParam = Array.isArray(resolvedSearchParams?.page)
    ? resolvedSearchParams?.page[0]
    : resolvedSearchParams?.page;
  const initialPage = Math.max(1, Number.parseInt(pageParam ?? '1', 10) || 1);
  let projects: PortfolioProject[] = [];
  let totalProjectsCount = 0;

  try {
    const fallbackProjects = buildFallbackProjects();
    const hasSupabaseEnv =
      Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
      Boolean(getSupabasePublicKey());

    if (hasSupabaseEnv) {
      const supabase = createStaticClient();
      if (ENABLE_SERVER_PAGINATION) {
        const { data: dbProjects, count } = await listProjectsPaged(
          {},
          { page: initialPage, pageSize: PORTFOLIO_PAGE_SIZE },
          supabase
        );
        totalProjectsCount = count ?? 0;
        projects = dbProjects.map((project, index) =>
          mapDbProjectToPortfolioProject(project, index)
        );
      } else {
        const dbProjects = await listProjects({}, supabase);
        projects = dbProjects.map((project, index) =>
          mapDbProjectToPortfolioProject(project, index)
        );
        totalProjectsCount = projects.length;
      }

      // If the database is empty (common in local dev/CI), fall back to curated static projects
      if (projects.length === 0) {
        console.warn('[Portfolio] No projects returned from Supabase, using fallback projects.');
        projects = fallbackProjects;
        totalProjectsCount = fallbackProjects.length;
      }
    } else {
      console.warn('[Portfolio] Supabase env vars missing, using fallback projects.');
      projects = fallbackProjects;
      totalProjectsCount = fallbackProjects.length;
    }
  } catch (error) {
    console.error('[Portfolio] Error occurred:', error instanceof Error ? error.message : error);
    projects = buildFallbackProjects();
    totalProjectsCount = projects.length;
  }

  return (
    <>
      <JsonLd
        pageType="portfolio"
        breadcrumbs={[
          { name: 'Home', url: `https://${BRAND.domain}` },
          { name: 'Portfolio', url: `https://${BRAND.domain}/portfolio` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateVideoSchema({
              name: 'Showcase de Vídeo | Portfólio Danilo Novais',
              description:
                'Vídeo de apresentação e amostras de motion no portfólio de Danilo Novais.',
              thumbnailUrl: `https://${BRAND.domain}/portfolio/opengraph-image`,
              uploadDate: '2025-01-01',
              contentUrl: BRAND.assets.video.manifesto,
              embedUrl: `https://${BRAND.domain}/portfolio`,
            })
          ),
        }}
      />
      <PortfolioClient
        projects={projects}
        initialCategory={categoryParam}
        initialPage={initialPage}
        totalProjectsCount={totalProjectsCount}
      />
    </>
  );
}
