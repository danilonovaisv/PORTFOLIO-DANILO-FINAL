export const runtime = 'edge';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { HOME_CONTENT } from '@/config/content';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { SiteClosure } from '@/components/layout/SiteClosure';
import { siteMetadata } from '@/config/metadata';
import type { Metadata } from 'next';
import { createStaticClient } from '@/lib/supabase/static';

import {
  mapDbProjectToPortfolioProject,
  mapStaticProjectToPortfolioProject,
} from '@/lib/portfolio/project-mappers';
import type { PortfolioProject } from '@/types/project';
import { isVideo } from '@/lib/utils';
import { DEFAULT_CAPTIONS, DEFAULT_VIDEO_POSTER } from '@/lib/video';
import { generateVideoSchema } from '@/lib/schema';

import {
  normalizeMetaDescription,
  normalizeTemplatedTitle,
  toCanonicalUrl,
} from '@/lib/seo';
import RotatingHighlights from '@/components/portfolio/RotatingHighlights';
import ReactMarkdown from 'react-markdown';
import { extractYoutubeId as extractYoutubeIdFromContract } from '@/lib/media/asset-contract';

export const dynamic = 'force-dynamic';


type PortfolioBodyBlock = {
  type: 'text' | 'video_youtube';
  value: string;
  settings: {
    autoplay: boolean;
  };
};

const extractYoutubeId = (rawValue: string): string | null => {
  return extractYoutubeIdFromContract(rawValue);
};

const parsePortfolioBodyBlocks = (value?: string | null): PortfolioBodyBlock[] => {
  if (!value?.trim()) return [];

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) {
      const isYoutube = extractYoutubeId(value);
      return [{ type: isYoutube ? 'video_youtube' : 'text', value, settings: { autoplay: false } }];
    }

    const blocks = parsed.reduce<PortfolioBodyBlock[]>((acc, item) => {
      if (!item || typeof item !== 'object') {
        if (typeof item === 'string' && item.trim()) {
          const isYoutube = extractYoutubeId(item);
          acc.push({
            type: isYoutube ? 'video_youtube' : 'text',
            value: item,
            settings: { autoplay: !!isYoutube },
          });
        }
        return acc;
      }

      const block = item as {
        type?: unknown;
        value?: unknown;
        settings?: { autoplay?: unknown };
      };

      if (typeof block.value !== 'string' || !block.value.trim()) return acc;

      const isYoutube = extractYoutubeId(block.value);
      const type =
        block.type === 'video_youtube' || isYoutube ? 'video_youtube' : 'text';

      acc.push({
        type,
        value: block.value,
        settings: {
          autoplay:
            typeof block.settings?.autoplay === 'boolean'
              ? block.settings.autoplay
              : type === 'video_youtube',
        },
      });

      return acc;
    }, []);

    if (blocks.length > 0) return blocks;

    const isYoutube = extractYoutubeId(value);
    return [{ type: isYoutube ? 'video_youtube' : 'text', value, settings: { autoplay: false } }];
  } catch {
    const isYoutube = extractYoutubeId(value);
    return [{ type: isYoutube ? 'video_youtube' : 'text', value, settings: { autoplay: false } }];
  }
};

function normalizeSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
}

async function getProject(slug: string): Promise<PortfolioProject | undefined> {
  const normalizedSlug = slug.replace(/-/g, '_');
  const normalizedRequested = normalizeSlug(slug);

  // Try database first with direct query for better performance and reliability
  try {
    const supabase = createStaticClient();

    // Search by slug using common variations
    const { data: dbProjects } = await supabase
      .from('public_projects_view')
      .select('*, tags:portfolio_project_tags(tag:portfolio_tags(id, slug, label, kind))')
      .or(`slug.eq.${slug},slug.eq.${normalizedSlug}`);

    if (dbProjects && dbProjects.length > 0) {
      // Find the best match among results
      const dbProject = dbProjects.find(
        (p: any) =>
          p.slug === slug ||
          p.slug === normalizedSlug ||
          p.slug?.replace(/_/g, '-') === slug ||
          normalizeSlug(p.slug || '') === normalizedRequested
      );

      if (dbProject) {
        // Need to find index for layout (though less critical for direct slug navigation)
        return mapDbProjectToPortfolioProject(dbProject, 0);
      }
    }
  } catch (error) {
    console.warn(`Error fetching project ${slug} from DB:`, error);
  }

  // Fallback to static content
  const staticProject = HOME_CONTENT.featuredProjects.find(
    (p) => p.slug === slug || normalizeSlug(p.slug || '') === normalizedRequested
  );
  if (staticProject) {
    const index = HOME_CONTENT.featuredProjects.findIndex(
      (p) => p.slug === slug || normalizeSlug(p.slug || '') === normalizedRequested
    );
    return mapStaticProjectToPortfolioProject(staticProject, index);
  }

  return undefined;
}

import { BRAND } from '@/config/brand';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) return siteMetadata;

  const metadataDescription =
    project.shortDescription?.trim() ||
    project.detail?.description?.trim() ||
    `${project.title} para ${project.client}.`;
  const description = normalizeMetaDescription(metadataDescription);
  const url = toCanonicalUrl(`/portfolio/${slug}`);
  const title = normalizeTemplatedTitle(project.title);

  return {
    title,
    description,
    keywords: [
      ...(project.tags || []),
      project.client || BRAND.name,
      project.displayCategory,
      'Danilo Novais',
      'Head de Criação',
    ].filter(Boolean) as string[],
    openGraph: {
      title,
      description,
      url,
      siteName: BRAND.name,
      images: [
        {
          url: project.image || '/opengraph-image',
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      locale: 'pt_BR',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [project.image || '/opengraph-image'],
    },
    alternates: {
      canonical: url,
    },
  };
}



type Props = {
  params: Promise<{ slug: string }>;
};

import JsonLd from '@/components/ui/JsonLd';

const projectMarkdownComponents = {
  h1: ({ children }: { children?: ReactNode }) => (
    <h2 className="mt-10 mb-4 text-2xl md:text-3xl font-semibold text-white">
      {children}
    </h2>
  ),
};

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const baseUrl = `https://${BRAND.domain}`;
  const description =
    project.detail?.description?.trim() || project.shortDescription?.trim();
  const narrativeParagraphs = description
    ? description.split(/\n{2,}/).reduce<string[]>((acc, paragraph) => {
        const trimmed = paragraph.trim();
        if (trimmed) acc.push(trimmed);
        return acc;
      }, [])
    : [];
  const portfolioBodyBlocks = parsePortfolioBodyBlocks(project.caseBody);
  const highlights = (project.detail?.highlights ?? project.tags ?? []).reduce<
    string[]
  >((acc, item) => {
    const trimmed = item.trim();
    if (trimmed) acc.push(trimmed);
    return acc;
  }, []);

  const gallerySet = new Set<string>();
  const gallerySource = project.detail?.gallery ?? [];
  for (let i = 0; i < gallerySource.length; i++) {
    const item = gallerySource[i];
    if (item) {
      const trimmed = item.trim();
      if (trimmed && trimmed !== project.image) {
        gallerySet.add(trimmed);
      }
    }
  }
  const galleryMedia = Array.from(gallerySet);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <JsonLd
        pageType="project"
        breadcrumbs={[
          { name: 'Home', url: toCanonicalUrl('/') },
          { name: 'Portfolio', url: toCanonicalUrl('/portfolio') },
          { name: project.title, url: toCanonicalUrl(`/portfolio/${slug}`) },
        ]}
        project={{
          title: project.title,
          description: description || '',
          image: project.image,
          client: project.client || BRAND.name,
          category: project.displayCategory,
          year: project.year || 2024,
          url: toCanonicalUrl(`/portfolio/${slug}`),
        }}
      />
      {isVideo(project.image) && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              generateVideoSchema({
                name: project.title,
                description: description || `Case video for ${project.title}`,
                thumbnailUrl: project.image.replace(/\.(mp4|webm|mov)$/, '-poster.jpg'),
                uploadDate: project.year ? `${project.year}-01-01` : '2024-01-01',
                contentUrl: project.image,
                embedUrl: `${baseUrl}/portfolio/${slug}`,
              })
            ),
          }}
        />
      )}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 md:py-8 mix-blend-difference">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>
      </nav>

      <section className="relative pt-32 pb-16 px-6 md:px-12 max-w-[1800px] mx-auto">
        <div className="flex flex-col gap-6 mb-12 md:mb-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight leading-[0.9]">
              {project.title}
            </h1>
            <div className="flex flex-col gap-1 text-right md:text-right">
              <span className="text-xs font-bold tracking-widest uppercase text-text-muted">
                Client
              </span>
              <span className="text-lg md:text-xl font-medium">
                {project.client}
              </span>
            </div>
          </div>

          <div className="flex gap-4 md:gap-8 border-t border-white/10 pt-6 mt-6">
            <div>
              <span className="block text-xs font-bold tracking-widest uppercase text-text-muted mb-1">
                Category
              </span>
              <span className="text-base uppercase tracking-wide">
                {project.displayCategory}
              </span>
            </div>
            <div>
              <span className="block text-xs font-bold tracking-widest uppercase text-text-muted mb-1">
                Year
              </span>
              <span className="text-base uppercase tracking-wide">
                {project.year}
              </span>
            </div>
          </div>
        </div>

        <div className="relative w-full aspect-video md:aspect-[2.4/1] rounded-2xl md:rounded-4xl overflow-hidden bg-muted shadow-2xl">
          {isVideo(project.image) ? (
            <video
              src={project.image}
              autoPlay
              muted
              loop
              playsInline
              poster={DEFAULT_VIDEO_POSTER}
              className="absolute inset-0 w-full h-full object-cover"
            >
              <track
                kind="captions"
                src={DEFAULT_CAPTIONS}
                srcLang="pt-BR"
                label="Português"
              />
            </video>
          ) : (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 90vw"
            />
          )}
        </div>
      </section>

      <section className="px-6 md:px-12 pb-32 max-w-5xl mx-auto">
        <div className="prose prose-invert prose-lg md:prose-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Sobre o projeto</h2>
          {portfolioBodyBlocks.length > 0 ? (
            portfolioBodyBlocks.map((block, index) => {
              if (block.type === 'video_youtube') {
                const videoId = extractYoutubeId(block.value);
                if (!videoId) return null;

                return (
                  <div key={`${project.id}-video-${index}`} className="aspect-video w-full bg-neutral-900">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`}
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      className="h-full w-full border-0"
                      title={`${project.title} video ${index + 1}`}
                    />
                  </div>
                );
              }

              return (
                <div
                  key={`${project.id}-markdown-${index}`}
                  className="prose prose-invert max-w-none font-figtree prose-headings:text-bluePrimary"
                >
                  <ReactMarkdown components={projectMarkdownComponents}>
                    {block.value}
                  </ReactMarkdown>
                </div>
              );
            })
          ) : narrativeParagraphs.length > 0 ? (
            narrativeParagraphs.map((paragraph, index) => (
              <p
                key={`${project.id}-paragraph-${index}`}
                className="text-muted-foreground leading-relaxed"
              >
                {paragraph}
              </p>
            ))
          ) : (
            <p className="text-muted-foreground leading-relaxed">
              {project.title} para {project.client} em {project.year}. Projeto de{' '}
              {project.displayCategory} com foco em clareza narrativa, precisão
              visual e experiência consistente.
            </p>
          )}

          {highlights.length > 0 ? (
            <>
              <h3 className="text-xl md:text-2xl font-semibold mt-10 mb-4">
                Destaques
              </h3>
              <RotatingHighlights
                items={highlights}
                maxVisible={4}
                intervalMs={4200}
                className="list-disc pl-5 space-y-2"
              />
            </>
          ) : null}
        </div>

        {galleryMedia.length > 0 ? (
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {galleryMedia.map((media, index) => (
              <div
                key={`${project.id}-gallery-${index}`}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-muted aspect-video"
              >
                {isVideo(media) ? (
                  <video
                    src={media}
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={DEFAULT_VIDEO_POSTER}
                    className="absolute inset-0 h-full w-full object-cover"
                  >
                    <track
                      kind="captions"
                      src={DEFAULT_CAPTIONS}
                      srcLang="pt-BR"
                      label="Português"
                    />
                  </video>
                ) : (
                  <Image
                    src={media}
                    alt={`${project.title} - mídia ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
              </div>
            ))}
          </div>
        ) : null}
      </section>

      <SiteClosure />
    </div>
  );
}
