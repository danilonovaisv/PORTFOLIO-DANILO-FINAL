import type { Metadata } from 'next';
import PortfolioClient from '@/app/portfolio/PortfolioClient';
import { getD1Database } from '@/lib/d1/client';
import {
  listProjectsFromD1,
  listProjectsPagedFromD1,
} from '@/lib/d1/projects';
import type { DbProjectWithTags } from '@/lib/supabase/queries/projects';
import { mapDbProjectToPortfolioProject } from '@/lib/portfolio/project-mappers';
import type { PortfolioProject } from '@/types/project';
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

  const normalizedRaw = categoryRaw?.trim().toLowerCase();
  const category = (normalizedRaw && normalizedRaw in categoryMeta)
    ? normalizedRaw
    : normalizePortfolioCategoryQuery(categoryRaw);

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

    const db = await getD1Database();
    if (db) {
      if (ENABLE_SERVER_PAGINATION) {
        const { items: dbProjects, total } = await listProjectsPagedFromD1(db, {
          projectTypes: activeFilter.projectTypes
            ? [...activeFilter.projectTypes]
            : undefined,
          page: initialPage,
          pageSize: PORTFOLIO_PAGE_SIZE,
        });
        totalProjectsCount = total;
        projects = dbProjects.map((project: DbProjectWithTags, index: number) =>
          mapDbProjectToPortfolioProject(project, index)
        );
      } else {
        const dbProjects = await listProjectsFromD1(db, {
          projectTypes: activeFilter.projectTypes
            ? [...activeFilter.projectTypes]
            : undefined,
        });
        projects = dbProjects.map((project: DbProjectWithTags, index: number) =>
          mapDbProjectToPortfolioProject(project, index)
        );
        projects = shuffleProjects(projects);
        totalProjectsCount = projects.length;
      }

      if (projects.length === 0 && initialPage === 1) {
        console.warn('[Portfolio] No projects returned from D1, using canonical R2 recovery projects.');
        const orderedFallback = shuffleProjects(filteredFallbackProjects, 42);
        totalProjectsCount = orderedFallback.length;
        projects = ENABLE_SERVER_PAGINATION
          ? orderedFallback.slice(0, PORTFOLIO_PAGE_SIZE)
          : orderedFallback;
      }
    } else {
      const orderedFallback = shuffleProjects(filteredFallbackProjects, 42);
      totalProjectsCount = orderedFallback.length;
      projects = ENABLE_SERVER_PAGINATION
        ? orderedFallback.slice(
            (initialPage - 1) * PORTFOLIO_PAGE_SIZE,
            initialPage * PORTFOLIO_PAGE_SIZE
          )
        : orderedFallback;
    }
  } catch (error) {
    const errMsg = error instanceof Error
      ? (error.message || error.constructor.name)
      : String(error);
    const cause = (error as any)?.cause ?? (error as any)?.errors?.[0];
    const causeMsg = cause instanceof Error ? cause.message : cause ? String(cause) : undefined;
    console.error('[Portfolio] Error occurred:', errMsg, causeMsg ? `(cause: ${causeMsg})` : '');

    const fallbackProjects = buildFallbackProjects();
    const filtered = activeFilter.categories?.length
      ? fallbackProjects.filter((project) =>
        activeFilter.categories?.includes(project.category)
      )
      : fallbackProjects;
    const orderedFallback = shuffleProjects(filtered, 42);
    totalProjectsCount = orderedFallback.length;
    projects = ENABLE_SERVER_PAGINATION
      ? orderedFallback.slice(
          (initialPage - 1) * PORTFOLIO_PAGE_SIZE,
          initialPage * PORTFOLIO_PAGE_SIZE
        )
      : orderedFallback;
  }

  return (
    <main id="main-content" className="flex-1 w-full flex flex-col">
      <JsonLd
        pageType="portfolio"
        projects={projects}
        breadcrumbs={[
          { name: 'Home', url: toCanonicalUrl('/') },
          { name: 'Portfolio', url: toCanonicalUrl('/portfolio') },
        ]}
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
