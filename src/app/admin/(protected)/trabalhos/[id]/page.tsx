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
            path?: string;
            caption?: string;
            type?: 'image' | 'youtube' | 'video';
            youtube_video_id?: string;
          } =>
            typeof item === 'object' &&
            item !== null &&
            (typeof (item as { path?: unknown }).path === 'string' ||
              (item as { type?: unknown }).type === 'youtube')
        )
        .map((item: any) => ({
          path: typeof item.path === 'string' ? item.path : undefined,
          caption: typeof item.caption === 'string' ? item.caption : undefined,
          type:
            item.type === 'video' || item.type === 'youtube'
              ? item.type
              : 'image',
          youtube_video_id:
            typeof item.youtube_video_id === 'string'
              ? item.youtube_video_id
              : undefined,
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
      <div className="flex flex-col gap-1 border-b border-white/5 pb-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-500/80">
          Root / Trabalhos / Edit
        </p>
        <h1 className="text-4xl font-light tracking-tight text-white flex items-center gap-3">
          Editar Projeto
          <span className="text-[10px] font-mono bg-white/5 px-2 py-1 rounded text-white/40 uppercase tracking-widest">
            v3.0
          </span>
        </h1>
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
