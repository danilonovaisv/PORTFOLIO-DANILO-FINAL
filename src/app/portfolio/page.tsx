import type { Metadata } from 'next';
import PortfolioClient from '@/app/portfolio/PortfolioClient';
import { listProjects, listProjectsPaged } from '@/lib/supabase/queries/projects';
import type { DbProjectWithTags } from '@/lib/supabase/queries/projects';
import { mapDbProjectToPortfolioProject } from '@/lib/portfolio/project-mappers';
import { createStaticClient } from '@/lib/supabase/static';
import type { PortfolioProject } from '@/types/project';
import { getSupabasePublicKey } from '@/lib/supabase/env';
import {
  ENABLE_SERVER_PAGINATION,
  PORTFOLIO_PAGE_SIZE,
  mapCategoryToPortfolioFilter,
  getPortfolioFilterById,
  normalizePortfolioCategoryQuery,
} from '@/config/portfolio';

import { BRAND } from '@/config/brand';
import { SITE_ASSET_PRELOADS } from '@/config/site-assets';
import {
  normalizeMetaDescription,
  normalizeTemplatedTitle,
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
  const category = normalizePortfolioCategoryQuery(categoryRaw);
  const categoryMeta: Record<
    string,
    { label: string; description: string; keywords: string[] }
  > = {
    branding: {
      label: 'Brand & Campaigns',
      description:
        'Seleção de projetos de Brand & Campaigns com foco em presença, direção visual, consistência de marca e campanhas que transformam estratégia em percepção memorável.',
      keywords: ['Branding', 'Design Identidade', 'Direção de Arte', 'Campanhas Criativas', 'Visual Identity'],
    },
    creative: {
      label: 'Creative Development',
      description:
        'Projetos de creative development que combinam design, motion e tecnologia para criar experiências visuais autorais, interativas e orientadas a performance.',
      keywords: ['Creative Development', 'Experiências Digitais', 'Interatividade', 'Motion', 'Design Systems', 'Creative Technology'],
    },
    motion: {
      label: 'Videos & Motions',
      description:
        'Projetos de motion design, vídeo e direção criativa com ritmo editorial, narrativa visual forte e direção pensada para retenção, presença e impacto.',
      keywords: ['Motion Design', 'Video Editing', 'Direção Criativa', 'Animação 2D', 'After Effects', 'Editorial Video'],
    },
    web: {
      label: 'Websites & Tech',
      description:
        'Experiências web e produtos digitais com foco em performance, interatividade, direção visual e arquitetura front-end que conecta pessoas, marcas e tecnologia.',
      keywords: ['Web Design', 'Next.js', 'React', 'WebGL', 'Three.js', 'User Experience', 'Front-end Engineering'],
    },
  };

  const metaForCategory = category ? categoryMeta[category] : undefined;
  const rawTitle = metaForCategory
    ? `Portfólio | ${metaForCategory.label}`
    : 'Portfólio — Projetos de Branding, Motion e Web';
  const rawDescription =
    metaForCategory?.description ??
    'Explore uma seleção curada de projetos de Branding, Motion Design e Creative Development de Danilo Novais, com foco em presença, narrativa e performance.';

  const title = normalizeTemplatedTitle(rawTitle);
  const description = normalizeMetaDescription(rawDescription);
  const baseUrl = toCanonicalUrl('/portfolio');
  const url = category ? `${baseUrl}?category=${category}` : baseUrl;

  return {
    title,
    description,
    keywords: [
      'Danilo Novais',
      'Portfólio',
      'Head de Criação',
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
import { shuffleProjects } from '@/lib/portfolio/shuffle-projects';

import JsonLd from '@/components/ui/JsonLd';
import { generateVideoSchema } from '@/lib/schema';
import { preload } from 'react-dom';

export default async function PortfolioPage(_props: PortfolioPageProps) {
  for (const video of SITE_ASSET_PRELOADS.portfolioHero.videos) {
    preload(video, {
      as: 'video',
    });
  }

  const resolvedSearchParams = await _props.searchParams;
  const categoryParam = Array.isArray(resolvedSearchParams?.category)
    ? resolvedSearchParams?.category[0]
    : resolvedSearchParams?.category;
  const activeFilter = getPortfolioFilterById(
    mapCategoryToPortfolioFilter(categoryParam)
  );
  const pageParam = Array.isArray(resolvedSearchParams?.page)
    ? resolvedSearchParams?.page[0]
    : resolvedSearchParams?.page;
  const initialPage = Math.max(1, Number.parseInt(pageParam ?? '1', 10) || 1);
  let projects: PortfolioProject[] = [];
  let totalProjectsCount = 0;

  try {
    const fallbackProjects = buildFallbackProjects();
    const filteredFallbackProjects = activeFilter.categories?.length
      ? fallbackProjects.filter((project) =>
        activeFilter.categories?.includes(project.category)
      )
      : fallbackProjects;
    const hasSupabaseEnv =
      Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
      Boolean(getSupabasePublicKey());

    if (hasSupabaseEnv) {
      const supabase = createStaticClient();
      if (ENABLE_SERVER_PAGINATION) {
        const { data: dbProjects, count } = await listProjectsPaged(
          {
            projectTypes: activeFilter.projectTypes
              ? [...activeFilter.projectTypes]
              : undefined,
          },
          { page: initialPage, pageSize: PORTFOLIO_PAGE_SIZE },
          supabase
        );
        totalProjectsCount = count ?? 0;
        projects = dbProjects.map((project: DbProjectWithTags, index: number) =>
          mapDbProjectToPortfolioProject(project, index)
        );
      } else {
        const dbProjects = await listProjects(
          {
            projectTypes: activeFilter.projectTypes
              ? [...activeFilter.projectTypes]
              : undefined,
          },
          supabase
        );
        projects = dbProjects.map((project: DbProjectWithTags, index: number) =>
          mapDbProjectToPortfolioProject(project, index)
        );
        projects = shuffleProjects(projects);
        totalProjectsCount = projects.length;
      }

      // If the database is empty (common in local dev/CI), fall back to curated static projects
      if (projects.length === 0) {
        console.warn('[Portfolio] No projects returned from Supabase, using fallback projects.');
        projects = filteredFallbackProjects;
        projects = shuffleProjects(projects);
        totalProjectsCount = filteredFallbackProjects.length;
      }
    } else {
      console.warn('[Portfolio] Supabase env vars missing, using fallback projects.');
      projects = filteredFallbackProjects;
      projects = shuffleProjects(projects);
      totalProjectsCount = filteredFallbackProjects.length;
    }
  } catch (error) {
    const errMsg = error instanceof Error
      ? (error.message || error.constructor.name)
      : String(error);
    // AggregateError (fetch network failure) nests the real cause inside .errors[]
    const cause = (error as any)?.cause ?? (error as any)?.errors?.[0];
    const causeMsg = cause instanceof Error ? cause.message : cause ? String(cause) : undefined;
    console.error('[Portfolio] Error occurred:', errMsg, causeMsg ? `(cause: ${causeMsg})` : '');

    const fallbackProjects = buildFallbackProjects();
    projects = activeFilter.categories?.length
      ? fallbackProjects.filter((project) =>
        activeFilter.categories?.includes(project.category)
      )
      : fallbackProjects;
    projects = shuffleProjects(projects);
    totalProjectsCount = projects.length;
  }

  return (
    <main id="main-content" className="flex-1 w-full flex flex-col">
      <JsonLd
        pageType="portfolio"
        breadcrumbs={[
          { name: 'Home', url: toCanonicalUrl('/') },
          { name: 'Portfolio', url: toCanonicalUrl('/portfolio') },
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
    </main>
  );
}
