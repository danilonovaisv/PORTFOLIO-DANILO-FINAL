import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import ProjectRenderer from '@/components/projects/ProjectRenderer';
import SiteFooter from '@/components/layout/SiteFooter';
import { Metadata } from 'next';
import { BRAND } from '@/config/brand';

type ProjectPageProps = {
  params?: Promise<{ slug: string }>;
  searchParams?: Promise<{ from?: string | string[] }>;
};

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
    .select('title, cover')
    .eq('slug', slug)
    .single();

  if (!project) return { title: 'Projeto não encontrado' };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${BRAND.domain}`;
  const url = `${siteUrl.replace(/\/$/, '')}/projects/${slug}`;

  return {
    title: `${project.title} | Danilo Novais`,
    description: `Landing page do projeto ${project.title} por Danilo Novais, com visão criativa, direção de arte e foco em narrativa visual e performance digital.`,
    openGraph: {
      title: project.title,
      images: project.cover ? [{ url: project.cover }] : [],
    },
    alternates: {
      canonical: url,
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
    .single();

  if (error || !project) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <ProjectRenderer project={project} />
      <SiteFooter />
    </div>
  );
}
