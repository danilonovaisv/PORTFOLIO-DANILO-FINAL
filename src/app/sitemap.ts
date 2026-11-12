import type { MetadataRoute } from 'next';
import { getD1Database } from '@/lib/d1/client';
import { listProjectsFromD1 } from '@/lib/d1/projects';
import { getRecoveredDbProjects } from '@/lib/portfolio/fallbacks';
import { FALLBACK_LANDING_PAGES } from '@/lib/projects/landing-page-fallback';
import type { DbProjectWithTags } from '@/lib/supabase/queries/projects';
import { getCanonicalSiteUrl } from '@/lib/seo';
import { logger } from '@/lib/logger';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getCanonicalSiteUrl().replace(/\/$/, '');

  let projectUrls: MetadataRoute.Sitemap = [];

  try {
    const db = await getD1Database();
    let dbProjects: DbProjectWithTags[] = db
      ? await listProjectsFromD1(db, { publishedOnly: true })
      : [];

    if (dbProjects.length === 0) {
      dbProjects = getRecoveredDbProjects();
    }

    let landingRows: Array<{ slug: string; created_at?: string | null }> = [];
    if (db) {
      try {
        const result = await db
          .prepare('SELECT slug, created_at FROM landing_pages')
          .all<{ slug: string; created_at?: string | null }>();
        landingRows = result.results ?? [];
      } catch {
        landingRows = [];
      }
    }

    if (landingRows.length === 0) {
      landingRows = FALLBACK_LANDING_PAGES.map((page) => ({
        slug: page.slug,
        created_at: page.created_at ?? null,
      }));
    }

    const landingSlugs = new Set<string>();
    const landingPageUrls: MetadataRoute.Sitemap = landingRows.map((page) => {
      const cleanSlug = page.slug.replace(/_/g, '-');
      landingSlugs.add(cleanSlug);
      return {
        url: `${baseUrl}/projects/${cleanSlug}`,
        lastModified: new Date(page.created_at || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      };
    });

    const filteredProjectUrls = dbProjects
      .filter((project: DbProjectWithTags) => {
        const cleanSlug = project.slug.replace(/_/g, '-');
        return !landingSlugs.has(cleanSlug);
      })
      .map((project: DbProjectWithTags) => ({
        url: `${baseUrl}/portfolio/${project.slug.replace(/_/g, '-')}`,
        lastModified: new Date(project.updated_at || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));

    projectUrls = [...landingPageUrls, ...filteredProjectUrls];
  } catch (error) {
    logger.warn(
      'Sitemap: Error fetching data from D1, using recovered catalog.',
      error
    );

    projectUrls = FALLBACK_LANDING_PAGES.map((page) => ({
      url: `${baseUrl}/projects/${page.slug.replace(/_/g, '-')}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));
  }

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacidade`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.4,
    },
  ];

  const seenUrls = new Set<string>();
  const combinedSitemap: MetadataRoute.Sitemap = [];

  for (const item of [...staticUrls, ...projectUrls]) {
    if (!seenUrls.has(item.url)) {
      seenUrls.add(item.url);
      combinedSitemap.push(item);
    }
  }

  return combinedSitemap;
}
