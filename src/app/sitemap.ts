import type { MetadataRoute } from 'next';
import { HOME_CONTENT } from '@/config/content';
import { BRAND } from '@/config/brand';
import { createStaticClient } from '@/lib/supabase/static';
import { listProjects } from '@/lib/supabase/queries/projects';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = `https://${BRAND.domain}`;
  let projectUrls: MetadataRoute.Sitemap = [];

  try {
    const supabase = createStaticClient();
    const dbProjects = await listProjects({}, supabase);

    projectUrls = dbProjects.map((project) => ({
      url: `${baseUrl}/portfolio/${project.slug}`,
      lastModified: new Date(project.updated_at || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    // Add Landing Pages
    const { data: landingPages } = await supabase
      .from('landing_pages')
      .select('slug, updated_at');

    if (landingPages) {
      const landingPageUrls = (
        landingPages as { slug: string; updated_at?: string }[]
      ).map((page) => ({
        url: `${baseUrl}/projects/${page.slug}`,
        lastModified: new Date(page.updated_at || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }));
      projectUrls = [...projectUrls, ...landingPageUrls];
    }
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

  return [
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
    ...projectUrls,
  ];
}
