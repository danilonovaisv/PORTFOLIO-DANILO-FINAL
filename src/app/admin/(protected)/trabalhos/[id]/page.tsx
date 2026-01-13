export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';

import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ProjectForm } from '@/components/admin/ProjectForm';

type Props = {
  params: { id: string };
};

export default async function EditProjectPage({ params }: Props) {
  const { id } = params;
  const supabase = await createClient();

  const [{ data: project, error: projectError }, { data: tags }] = await Promise.all([
    supabase
      .from('portfolio_projects')
      .select('*, project_tags:portfolio_project_tags(tag_id)')
      .eq('id', id)
      .single(),
    supabase.from('portfolio_tags').select('*').order('sort_order', { ascending: true, nullsFirst: false }),
  ]);

  if (projectError || !project) {
    notFound();
  }

  const selectedTagIds =
    project.project_tags?.map((tag: { tag_id: string }) => tag.tag_id).filter(Boolean) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Trabalhos</p>
        <h1 className="text-3xl font-semibold">Editar projeto</h1>
      </div>
      <ProjectForm project={project} tags={tags ?? []} selectedTagIds={selectedTagIds} />
    </div>
  );
}
