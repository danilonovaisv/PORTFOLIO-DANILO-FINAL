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
  if (value.startsWith('http://') || value.startsWith('https://')) return value;

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

  const { data: project } = await supabase
    .from('landing_pages')
    .select('title, cover, content, slug')
    .eq('slug', slug)
    .single<LandingPageRecord>();

  if (!project) return { title: 'Projeto não encontrado' };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${BRAND.domain}`;
  const canonicalUrl = `${siteUrl.replace(/\/$/, '')}/projects/${slug}`;

  const parsed = parseLandingPageContent(project.content, {
    slug: project.slug,
    title: project.title,
    cover: project.cover,
  });

  const seoDescription = getProjectSeoDescription(parsed, project.title);
  const ogImageCandidate = getProjectOgImage(parsed, project.cover);
  const ogResolved = resolveSiteAssetUrl(ogImageCandidate);
  const ogImage = toAbsoluteUrl(siteUrl, ogResolved);

  return {
    title: `${project.title} | Danilo Novais`,
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

  const { data: project, error } = await supabase
    .from('landing_pages')
    .select('*')
    .eq('slug', slug)
    .single<LandingPageRecord>();

  if (error || !project) {
    notFound();
  }

  const parsed = parseLandingPageContent(project.content, {
    slug: project.slug,
    title: project.title,
    cover: project.cover,
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${BRAND.domain}`;
  const projectUrl = `${siteUrl.replace(/\/$/, '')}/projects/${slug}`;

  const projectCategory =
    parsed.template === 'master-project-v1'
      ? parsed.data.project_tags[0] || 'Creative Project'
      : 'Creative Project';

  const projectClient =
    parsed.template === 'master-project-v1'
      ? parsed.data.project_client || BRAND.name
      : BRAND.name;

  const projectYear =
    parsed.template === 'master-project-v1'
      ? (parsed.data.project_year ?? new Date().getFullYear())
      : new Date().getFullYear();

  const projectDescription = getProjectSeoDescription(parsed, project.title);
  const projectImage =
    toAbsoluteUrl(
      siteUrl,
      resolveSiteAssetUrl(getProjectOgImage(parsed, project.cover))
    ) ?? `${siteUrl.replace(/\/$/, '')}/opengraph-image`;

  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${projectUrl}#project`,
    name: project.title,
    description: projectDescription,
    image: projectImage,
    url: projectUrl,
    dateCreated: `${projectYear}-01-01`,
    creator: {
      '@type': 'Person',
      name: BRAND.name,
      url: `https://${BRAND.domain}`,
    },
    provider: {
      '@type': 'Organization',
      name: projectClient,
    },
    genre: projectCategory,
    keywords:
      parsed.template === 'master-project-v1'
        ? parsed.data.project_tags
        : ['Creative Development', 'Danilo Novais'],
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <ProjectRenderer project={project} />
      <SiteFooter />
    </div>
  );
}
