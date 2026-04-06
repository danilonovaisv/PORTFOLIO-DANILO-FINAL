import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import ProjectRenderer from '@/components/projects/ProjectRenderer';
import SiteFooter from '@/components/layout/SiteFooter';
import { Metadata } from 'next';
import { BRAND } from '@/config/brand';
import {
  getProjectOgImage,
  getProjectSeoDescription,
  parseLandingPageContent,
  resolveSiteAssetUrl,
} from '@/lib/projects/template-schema';
import {
  getCanonicalSiteUrl,
  normalizeMetaDescription,
  normalizeMetaTitle,
} from '@/lib/seo';
import {
  MASTER_PROJECT_TEMPLATE,
  MASTER_PROJECT_TEMPLATE_V2,
  MASTER_PROJECT_TEMPLATE_V3,
} from '@/types/project-template';
import JsonLd from '@/components/ui/JsonLd';

type LandingPageRecord = {
  id: string;
  slug: string;
  title: string;
  cover: string | null;
  content: unknown;
};

type ProjectPageProps = {
  params?: Promise<{ slug: string }>;
  searchParams?: Promise<{ from?: string | string[] }>;
};

function toAbsoluteUrl(siteUrl: string, value?: string | null): string | null {
  if (!value) return null;
  if (value.startsWith('http://') || value.startsWith('https://')) {
    try {
      const parsed = new URL(value);
      const normalizedSite = new URL(siteUrl);
      const isLocal =
        parsed.hostname === 'localhost' ||
        parsed.hostname === '127.0.0.1' ||
        parsed.hostname === '0.0.0.0';
      if (isLocal) {
        return `${normalizedSite.origin}${parsed.pathname}${parsed.search}`;
      }
      if (parsed.hostname === normalizedSite.hostname) {
        parsed.protocol = 'https:';
        return parsed.toString();
      }
      return value;
    } catch {
      return value;
    }
  }

  const normalized = value.startsWith('/') ? value : `/${value}`;
  return `${siteUrl.replace(/\/$/, '')}${normalized}`;
}

export async function generateMetadata({
  params,
  searchParams,
}: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = (await params) ?? { slug: '' };
  const { slug } = resolvedParams;
  const resolvedSearch = await searchParams;
  const fromParam = Array.isArray(resolvedSearch?.from)
    ? resolvedSearch.from[0]
    : resolvedSearch?.from;
  const supabase = await createClient();

  const { data: project } = (await supabase
    .from('landing_pages')
    .select('title, cover, content, slug')
    .eq('slug', slug)
    .single()) as { data: LandingPageRecord | null; error: unknown };

  if (!project) return { title: 'Projeto não encontrado' };

  const siteUrl = getCanonicalSiteUrl();
  const canonicalUrl = `${siteUrl.replace(/\/$/, '')}/projects/${slug}`;

  const parsed = parseLandingPageContent(project.content, {
    slug: project.slug,
    title: project.title,
    cover: project.cover,
  });

  const seoDescription = normalizeMetaDescription(
    getProjectSeoDescription(parsed, project.title)
  );
  const ogImageCandidate = getProjectOgImage(parsed, project.cover);
  const ogResolved = resolveSiteAssetUrl(ogImageCandidate);
  const ogImage = toAbsoluteUrl(siteUrl, ogResolved);

  return {
    title: normalizeMetaTitle(project.title),
    description: seoDescription,
    openGraph: {
      title: project.title,
      description: seoDescription,
      url: canonicalUrl,
      images: ogImage ? [{ url: ogImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: seoDescription,
      images: ogImage ? [ogImage] : undefined,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: fromParam ? { index: false, follow: true } : undefined,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = (await params) ?? { slug: '' };
  const supabase = await createClient();

  const { data: project, error } = (await supabase
    .from('landing_pages')
    .select('*')
    .eq('slug', slug)
    .single()) as {
    data: LandingPageRecord | null;
    error: { message: string } | null;
  };

  if (error || !project) {
    notFound();
  }

  const parsed = parseLandingPageContent(project.content, {
    slug: project.slug,
    title: project.title,
    cover: project.cover,
  });

  const parsedMaster =
    parsed.template === MASTER_PROJECT_TEMPLATE ||
    parsed.template === MASTER_PROJECT_TEMPLATE_V2 ||
    parsed.template === MASTER_PROJECT_TEMPLATE_V3
      ? parsed.data
      : null;

  const siteUrl = getCanonicalSiteUrl();
  const projectUrl = `${siteUrl.replace(/\/$/, '')}/projects/${slug}`;

  const projectCategory = parsedMaster?.project_tags[0] || 'Creative Project';

  const projectClient = parsedMaster?.project_client || BRAND.name;

  const projectYear = parsedMaster?.project_year ?? new Date().getFullYear();

  const projectDescription = normalizeMetaDescription(
    getProjectSeoDescription(parsed, project.title)
  );
  return (
    <div className="min-h-screen">
      <JsonLd
        pageType="project"
        breadcrumbs={[
          { name: 'Home', url: siteUrl },
          { name: 'Portfolio', url: `${siteUrl.replace(/\/$/, '')}/portfolio` },
          { name: project.title, url: projectUrl },
        ]}
        project={{
          title: project.title,
          description: projectDescription,
          image:
            toAbsoluteUrl(
              siteUrl,
              resolveSiteAssetUrl(getProjectOgImage(parsed, project.cover))
            ) ?? `${siteUrl.replace(/\/$/, '')}/opengraph-image`,
          client: projectClient,
          category: projectCategory,
          year: projectYear as number,
          url: projectUrl,
        }}
      />
      <ProjectRenderer project={project} />
      <SiteFooter />
    </div>
  );
}
