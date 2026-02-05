import type { Metadata } from 'next';
import PortfolioClient from './PortfolioClient';
import { listProjects } from '@/lib/supabase/queries/projects';
import { mapDbProjectToPortfolioProject } from '@/lib/portfolio/project-mappers';
import { createStaticClient } from '@/lib/supabase/static';
import { HOME_CONTENT } from '@/config/content';
import type { PortfolioProject, ProjectCategory } from '@/types/project';

import { BRAND } from '@/config/brand';

export const revalidate = 60;

type PortfolioPageProps = {
  params?: Promise<Record<string, string>>;
  searchParams?: Promise<{ category?: string | string[] }>;
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
    { label: string; description: string }
  > = {
    branding: {
      label: 'Branding & Identidade',
      description:
        'Seleção de projetos de branding, identidade visual e campanhas que traduzem posicionamento em presença, forma e consistência.',
    },
    motion: {
      label: 'Motion & Vídeo',
      description:
        'Projetos de motion design, vídeo e direção criativa com ritmo editorial, narrativa e impacto visual.',
    },
    web: {
      label: 'Web & Digital',
      description:
        'Experiências web e digitais com foco em performance, interatividade e design que conecta pessoas e marcas.',
    },
  };

  const metaForCategory = category ? categoryMeta[category] : undefined;
  const title = metaForCategory
    ? `Portfólio ${metaForCategory.label} | Danilo Novais`
    : 'Portfólio | Danilo Novais';
  const description =
    metaForCategory?.description ??
    'Explore uma seleção curada de projetos de Branding, Motion Design e Creative Development de Danilo Novais, com foco em presença, narrativa e performance.';

  const baseUrl = `https://${BRAND.domain}/portfolio`;
  const url = category ? `${baseUrl}?category=${category}` : baseUrl;

  return {
    title,
    description,
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
      canonical: category ? baseUrl : url,
    },
    robots: category ? { index: false, follow: true } : undefined,
  };
}

const FALLBACK_CATEGORY_MAP: Record<string, ProjectCategory> = {
  'branding & campanha': 'branding',
  branding: 'branding',
  campanha: 'campanha',
  'web & motion': 'web',
  'web & digital': 'web',
  'motion & video': 'motion',
  'video & motion': 'motion',
  'motion': 'motion',
  'videos & motions': 'motion',
};

function mapFallbackCategory(label?: string): ProjectCategory {
  if (!label) return 'branding';
  const normalized = label.trim().toLowerCase();
  return FALLBACK_CATEGORY_MAP[normalized] ?? 'branding';
}

function buildFallbackProjects(): PortfolioProject[] {
  return (HOME_CONTENT.featuredProjects ?? []).map((project, index) => {
    const layout =
      (project.layout as {
        h?: string;
        cols?: string;
        sizes?: string;
        aspect?: string;
        aspectRatio?: string;
      }) ?? {};
    const category = mapFallbackCategory(project.category);

    return {
      id: `fallback-${project.id ?? index}`,
      slug: project.slug ?? `fallback-${index}`,
      title: project.title ?? 'Projeto de portfólio',
      subtitle: project.category,
      client: project.client ?? 'Cliente confidencial',
      category,
      displayCategory: project.category ?? 'Projeto',
      tags: project.tags ?? [],
      year:
        typeof project.year === 'number'
          ? project.year
          : Number(project.year) || new Date().getFullYear(),
      image: project.img || '',
      type: index < 4 ? 'A' : 'B',
      layout: {
        cols: layout.cols ?? 'md:col-span-4',
        height: layout.h ?? 'min-h-[320px]',
        aspectRatio: layout.aspect ?? layout.aspectRatio,
        sizes: layout.sizes,
      },
      detail: {
        description: project.title ?? 'Projeto de portfólio',
        highlights: project.tags,
      },
      accentColor:
        category === 'branding'
          ? '#0057ff'
          : category === 'campanha'
            ? '#ff3366'
            : undefined,
      featuredOnPortfolio: true,
    };
  });
}

import JsonLd from '@/components/ui/JsonLd';

export default async function PortfolioPage(_props: PortfolioPageProps) {
  let projects: PortfolioProject[] = [];

  try {
    const fallbackProjects = buildFallbackProjects();
    const hasSupabaseEnv =
      Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
      Boolean(
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
      );

    if (hasSupabaseEnv) {
      const supabase = createStaticClient();

      const dbProjects = await listProjects({}, supabase);
      projects = dbProjects.map((project, index) =>
        mapDbProjectToPortfolioProject(project, index)
      );

      // If the database is empty (common in local dev/CI), fall back to curated static projects
      if (projects.length === 0) {
        console.warn('[Portfolio] No projects returned from Supabase, using fallback projects.');
        projects = fallbackProjects;
      }
    } else {
      console.warn('[Portfolio] Supabase env vars missing, using fallback projects.');
      projects = fallbackProjects;
    }
  } catch (error) {
    console.error('[Portfolio] Error occurred:', error instanceof Error ? error.message : error);
    projects = buildFallbackProjects();
  }

  return (
    <>
      <JsonLd pageType="portfolio" />
      <PortfolioClient projects={projects} />
    </>
  );
}
