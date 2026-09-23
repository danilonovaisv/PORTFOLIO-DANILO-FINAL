import type { MetadataRoute } from 'next';
import { HOME_CONTENT } from '@/config/content';
import { createStaticClient } from '@/lib/supabase/static';
import { listProjects } from '@/lib/supabase/queries/projects';
import type { DbProjectWithTags } from '@/lib/supabase/queries/projects';
import { getCanonicalSiteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Always emit canonical production URLs in sitemap.
  const baseUrl = getCanonicalSiteUrl().replace(/\/$/, '');

  let projectUrls: MetadataRoute.Sitemap = [];

  try {
    const supabase = createStaticClient();
    const dbProjects = await listProjects({}, supabase);

    projectUrls = dbProjects.map((project: DbProjectWithTags) => ({
      url: `${baseUrl}/portfolio/${project.slug.replace(/_/g, '-')}`,
      lastModified: new Date(project.updated_at || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    // Landing Pages have priority for deduplication if slugs match
    const { data: landingPages } = await supabase
      .from('landing_pages')
      .select('slug, updated_at');

    const landingSlugs = new Set<string>();
    let landingPageUrls: MetadataRoute.Sitemap = [];

    if (landingPages) {
      landingPageUrls = (
        landingPages as { slug: string; updated_at?: string }[]
      ).map((page) => {
        const cleanSlug = page.slug.replace(/_/g, '-');
        landingSlugs.add(cleanSlug);
        return {
          url: `${baseUrl}/projects/${cleanSlug}`,
          lastModified: new Date(page.updated_at || new Date()),
          changeFrequency: 'monthly' as const,
          priority: 0.8,
        };
      });
    }

    // Exclude portfolio URLs that exist as landing pages to preserve single canonical URL
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
    console.warn(
      'Sitemap: Error fetching data from Supabase, using fallback.',
      error
    );

    projectUrls = HOME_CONTENT.featuredProjects.map((project) => ({
      url: `${baseUrl}/portfolio/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  }

  // Canonical base URLs (without query params to avoid non-canonical indexing)
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

  // Deduplicate all URLs by canonical url string
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
