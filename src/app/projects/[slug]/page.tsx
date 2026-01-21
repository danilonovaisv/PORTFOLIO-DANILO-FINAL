import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import ProjectRenderer from '@/components/projects/ProjectRenderer';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from('landing_pages')
    .select('title, cover')
    .eq('slug', slug)
    .single();

  if (!project) return { title: 'Projeto não encontrado' };

  return {
    title: `${project.title} | Danilo Novais`,
    description: `Landing page do projeto ${project.title} por Danilo Novais.`,
    openGraph: {
      title: project.title,
      images: project.cover ? [{ url: project.cover }] : [],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
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
    <main className="min-h-screen">
      <ProjectRenderer project={project} />
    </main>
  );
}
