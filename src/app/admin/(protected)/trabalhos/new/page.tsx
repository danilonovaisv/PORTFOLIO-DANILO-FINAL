import { createClient } from '@/lib/supabase/server';
import { ProjectForm } from '@/components/admin/ProjectForm';

export default async function NewProjectPage() {
  const supabase = await createClient();
  const { data: tags } = await supabase
    .from('portfolio_tags')
    .select('*')
    .order('sort_order', { ascending: true, nullsFirst: false });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Trabalhos</p>
        <h1 className="text-3xl font-semibold">Novo projeto</h1>
      </div>
      <ProjectForm tags={tags ?? []} />
    </div>
  );
}
