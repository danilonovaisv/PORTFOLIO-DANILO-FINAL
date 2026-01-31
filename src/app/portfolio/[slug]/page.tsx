import { notFound } from 'next/navigation';
import Image from 'next/image';
import { HOME_CONTENT } from '@/config/content';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { SiteClosure } from '@/components/layout/SiteClosure';
import { siteMetadata } from '@/config/metadata';
import type { Metadata } from 'next';
import { createStaticClient } from '@/lib/supabase/static';
import { listProjects } from '@/lib/supabase/queries/projects';
import {
  mapDbProjectToPortfolioProject,
  mapStaticProjectToPortfolioProject,
} from '@/lib/portfolio/project-mappers';
import type { PortfolioProject } from '@/types/project';
import { isVideo } from '@/utils/utils';

async function getProject(slug: string): Promise<PortfolioProject | undefined> {
  // Try database first
  try {
    const supabase = createStaticClient();
    const dbProjects = await listProjects({}, supabase);
    const dbProject = dbProjects.find((p) => p.slug === slug);

    if (dbProject) {
      // Find its index for layout mapping
      const index = dbProjects.findIndex((p) => p.slug === slug);
      return mapDbProjectToPortfolioProject(dbProject, index);
    }
  } catch (error) {
    console.warn(`Error fetching project ${slug} from DB:`, error);
  }



  // Fallback to static content
  const staticProject = HOME_CONTENT.featuredProjects.find(
    (p) => p.slug === slug
  );
  if (staticProject) {
    const index = HOME_CONTENT.featuredProjects.findIndex(
      (p) => p.slug === slug
    );
    return mapStaticProjectToPortfolioProject(staticProject, index);
  }

  return undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) return siteMetadata;

  return {
    title: project.title,
    description: `Case study: ${project.title} for ${project.client}. Category: ${project.displayCategory}.`,
    keywords: [...(project.tags || []), project.client, project.displayCategory, 'Danilo Novais', 'Creative Developer'],
    openGraph: {
      title: project.title,
      description: `Case study: ${project.title} for ${project.client}. Category: ${project.displayCategory}.`,
      images: [project.image || ''],
      type: 'article',
    },
    alternates: {
      canonical: `https://portfoliodanilo.com/portfolio/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const hasSupabaseEnv =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const staticSlugs = HOME_CONTENT.featuredProjects.map((p) => ({
    slug: p.slug,
  }));

  if (hasSupabaseEnv) {
    try {
      const supabase = createStaticClient();
      const dbProjects = await listProjects({}, supabase);
      const dbSlugs = dbProjects.map((p) => ({ slug: p.slug }));

      const allSlugs = [...dbSlugs, ...staticSlugs];
      const uniqueSlugs = Array.from(new Set(allSlugs.map((s) => s.slug))).map(
        (slug) => ({ slug })
      );
      return uniqueSlugs;
    } catch (error) {
      console.error('Error fetching projects for static params:', error);
    }
  }

  return staticSlugs;
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
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
              className="absolute inset-0 w-full h-full object-cover"
            />
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

      <section className="px-6 md:px-12 pb-32 max-w-4xl mx-auto">
        <div className="prose prose-invert prose-lg md:prose-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            About the Project
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            This is a showcase page for <strong>{project.title}</strong>.
            Detailed case study content, process documentation, and final
            deliverables would typically appear here.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            The project focuses on {project.displayCategory} solutions for{' '}
            {project.client}, delivered in {project.year}.
          </p>
        </div>
      </section>

      <SiteClosure />
    </div>
  );
}
