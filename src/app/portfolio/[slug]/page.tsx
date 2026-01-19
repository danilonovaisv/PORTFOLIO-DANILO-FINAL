import { notFound } from 'next/navigation';
import Image from 'next/image';
import { HOME_CONTENT } from '@/config/content'; // Adjust path if needed
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { SiteClosure } from '@/components/layout/SiteClosure';

import { siteMetadata } from '@/config/metadata';
import type { Metadata } from 'next';
import { createStaticClient } from '@/lib/supabase/static';
import { listProjects } from '@/lib/supabase/queries/projects';
import { mapDbProjectToPortfolioProject } from '@/lib/portfolio/project-mappers';

// Helper to find project from database
async function getProjectFromDatabase(slug: string) {
  const supabase = createStaticClient();
  const dbProjects = await listProjects({}, supabase);
  return dbProjects.find((p) => p.slug === slug);
}

// Fallback helper to find project from static content
function getProjectFromStaticContent(slug: string) {
  return HOME_CONTENT.featuredProjects.find((p) => p.slug === slug);
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const dbProject = await getProjectFromDatabase(slug);
  
  // If database project not found, try static content
  const staticProject = dbProject || getProjectFromStaticContent(slug);

  if (!staticProject) return siteMetadata;

  return {
    title: staticProject.title,
    description: `Case study: ${staticProject.title} for ${staticProject.client}. Category: ${staticProject.category}.`,
    openGraph: {
      title: staticProject.title,
      description: `Case study: ${staticProject.title} for ${staticProject.client}. Category: ${staticProject.category}.`,
      images: [staticProject.img || ''], // Provide fallback if no image
    },
  };
}

export async function generateStaticParams() {
  const hasSupabaseEnv =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
    );

  let allProjects = [...HOME_CONTENT.featuredProjects]; // Start with static projects

  // Fetch projects from database if Supabase is configured
  if (hasSupabaseEnv) {
    try {
      const supabase = createStaticClient();
      const dbProjects = await listProjects({}, supabase);
      
      // Combine static and DB projects, removing duplicates by slug
      const uniqueSlugs = new Set<string>();
      const combinedProjects = [
        ...dbProjects.map((p) => ({ slug: p.slug })),
        ...HOME_CONTENT.featuredProjects.map((p) => ({ slug: p.slug }))
      ].filter(item => {
        if (uniqueSlugs.has(item.slug)) {
          return false;
        }
        uniqueSlugs.add(item.slug);
        return true;
      });

      return combinedProjects;
    } catch (error) {
      console.error('Error fetching projects for static params:', error);
      // Fallback to static projects only
    }
  }

  // Return static projects as fallback
  return allProjects.map((project) => ({
    slug: project.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  
  // Try to get project from database first
  let project = await getProjectFromDatabase(slug);
  
  // If not found in DB, try static content as fallback
  if (!project) {
    const staticProject = getProjectFromStaticContent(slug);
    if (staticProject) {
      // Map static project to the same format as DB project for consistency
      project = {
        id: `fallback-${staticProject.id ?? slug}`,
        slug: staticProject.slug,
        title: staticProject.title,
        subtitle: staticProject.category,
        client: staticProject.client,
        category: staticProject.category.toLowerCase().includes('branding') ? 'branding' : 'web',
        displayCategory: staticProject.category,
        tags: staticProject.tags ?? [],
        year: staticProject.year ?? new Date().getFullYear(),
        image: staticProject.img,
        type: 'B',
        layout: {
          cols: 'md:col-span-12',
          height: 'min-h-[400px] md:h-[500px]',
          aspectRatio: 'aspect-video',
          sizes: '(max-width: 768px) 100vw, 80vw',
        },
        detail: {
          description: staticProject.title,
          highlights: staticProject.tags,
          gallery: [],
        },
        accentColor: '#0057ff',
        isFeatured: true,
        featuredOnHome: true,
        featuredOnPortfolio: true,
        videoPreview: undefined,
      };
    }
  }

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 md:py-8 mix-blend-difference">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>
      </nav>

      {/* Hero Content */}
      <section className="relative pt-32 pb-16 px-6 md:px-12 max-w-[1800px] mx-auto">
        <div className="flex flex-col gap-6 mb-12 md:mb-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight leading-[0.9]">
              {project.title}
            </h1>
            <div className="flex flex-col gap-1 text-right md:text-right">
              <span className="text-xs font-bold tracking-widest uppercase text-text-muted">Client</span>
              <span className="text-lg md:text-xl font-medium">{project.client}</span>
            </div>
          </div>

          <div className="flex gap-4 md:gap-8 border-t border-white/10 pt-6 mt-6">
            <div>
              <span className="block text-xs font-bold tracking-widest uppercase text-text-muted mb-1">Category</span>
              <span className="text-base uppercase tracking-wide">{project.displayCategory || project.category}</span>
            </div>
            <div>
              <span className="block text-xs font-bold tracking-widest uppercase text-text-muted mb-1">Year</span>
              <span className="text-base uppercase tracking-wide">{project.year}</span>
            </div>
          </div>
        </div>

        {/* Main Image */}
        <div className="relative w-full aspect-video md:aspect-[2.4/1] rounded-2xl md:rounded-4xl overflow-hidden bg-muted shadow-2xl">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 90vw"
          />
        </div>
      </section>

      {/* Placeholder Content Area */}
      <section className="px-6 md:px-12 pb-32 max-w-4xl mx-auto">
        <div className="prose prose-invert prose-lg md:prose-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">About the Project</h2>
          <p className="text-muted-foreground leading-relaxed">
            This is a showcase page for <strong>{project.title}</strong>.
            Detailed case study content, process documentation, and final deliverables would typically appear here.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            The project focuses on {(project.displayCategory || project.category)} solutions for {project.client}, delivered in {project.year}.
          </p>
        </div>
      </section>

      <SiteClosure />
    </div>
  );
}