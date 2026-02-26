export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';

import { notFound } from 'next/navigation';
import { requireAdminAccess } from '@/lib/admin/server-access';
import { ProjectForm } from '@/components/admin/ProjectForm';
import type { DbProject } from '@/types/admin';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditProjectPage(props: Props) {
  const params = await props.params;
  const { id } = params;
  const { supabase } = await requireAdminAccess();

  const [
    { data: project, error: projectError },
    { data: tags },
    { data: landingPages },
  ] = await Promise.all([
    supabase
      .from('portfolio_projects')
      .select('*, project_tags:portfolio_project_tags(tag_id)')
      .eq('id', id)
      .single(),
    supabase
      .from('portfolio_tags')
      .select('*')
      .order('label', { ascending: true }),
    supabase
      .from('landing_pages')
      .select('id, title, slug, content')
      .order('title', { ascending: true }),
  ]);

  if (projectError || !project) {
    notFound();
  }

  const normalizedGallery = Array.isArray(project.gallery)
    ? project.gallery
      .filter(
        (
          item: any
        ): item is {
          path: string;
          caption?: string;
        } =>
          typeof item === 'object' &&
          item !== null &&
          'path' in item &&
          typeof (item as { path?: unknown }).path === 'string'
      )
      .map((item: any) => ({
        path: item.path,
        caption: typeof item.caption === 'string' ? item.caption : undefined,
      }))
    : null;

  const normalizedProject = {
    ...project,
    gallery: normalizedGallery,
  } as DbProject;

  const selectedTagIds =
    project.project_tags
      ?.map((tag: { tag_id: string }) => tag.tag_id)
      .filter(Boolean) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
          Trabalhos
        </p>
        <h1 className="text-3xl font-semibold">Editar projeto</h1>
      </div>
      <ProjectForm
        project={normalizedProject}
        tags={tags ?? []}
        landingPages={landingPages ?? []}
        selectedTagIds={selectedTagIds}
      />
    </div>
  );
}
