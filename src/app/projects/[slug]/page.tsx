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

const VIDEO_FILE_PATTERN = /\.(mp4|webm|mov|m4v|ogg)(?:[?#].*)?$/i;

function findFirstVideoCandidate(value: unknown): string | null {
  if (!value) return null;

  if (typeof value === 'string') {
    const normalized = value.trim();
    return VIDEO_FILE_PATTERN.test(normalized) ? normalized : null;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findFirstVideoCandidate(item);
      if (found) return found;
    }
    return null;
  }

  if (typeof value === 'object') {
    for (const key of Object.keys(value as Record<string, unknown>)) {
      const found = findFirstVideoCandidate(
        (value as Record<string, unknown>)[key]
      );
      if (found) return found;
    }
  }

  return null;
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
  const projectImage =
    toAbsoluteUrl(
      siteUrl,
      resolveSiteAssetUrl(getProjectOgImage(parsed, project.cover))
    ) ?? `${siteUrl.replace(/\/$/, '')}/opengraph-image`;

  const videoCandidate = findFirstVideoCandidate(parsed);
  const projectVideoUrl = toAbsoluteUrl(
    siteUrl,
    resolveSiteAssetUrl(videoCandidate ?? undefined)
  );

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
    keywords: parsedMaster?.project_tags ?? [
      'Creative Development',
      'Danilo Novais',
    ],
    ...(projectVideoUrl
      ? {
          video: {
            '@type': 'VideoObject',
            name: `${project.title} - vídeo do projeto`,
            description: projectDescription,
            contentUrl: projectVideoUrl,
            thumbnailUrl: projectImage,
            uploadDate: `${projectYear}-01-01`,
          },
        }
      : {}),
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <ProjectRenderer project={project} />
      <section className="std-grid bg-background py-16 md:py-24">
        <div className="mx-auto max-w-4xl space-y-6 text-white/80">
          <h2
            id="project-context-heading"
            className="text-2xl font-semibold tracking-tight text-white md:text-3xl"
          >
            Contexto do Projeto
          </h2>
          <p className="leading-relaxed">
            Este case apresenta um recorte completo do processo criativo, do
            diagnóstico inicial à entrega final. O objetivo foi construir uma
            presença digital consistente, com narrativa visual clara,
            arquitetura de informação objetiva e execução técnica preparada para
            performance real em dispositivos móveis e desktop.
          </p>
          <p className="leading-relaxed">
            A proposta considera posicionamento de marca, direção de arte,
            composição de mídia e decisões de interação orientadas por contexto
            de uso. Cada bloco foi estruturado para manter legibilidade,
            acessibilidade e ritmo editorial, priorizando leitura, contraste e
            progressão de conteúdo sem ruído.
          </p>
          <p className="leading-relaxed">
            Em produção, o projeto adota abordagem incremental: melhorias de SEO
            técnico, metadados semânticos, estrutura de heading correta,
            otimização de ativos e monitoramento contínuo de Core Web Vitals.
            Isso reduz risco de regressão, fortalece descoberta orgânica e
            mantém experiência estável para usuários e crawlers.
          </p>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
