export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';

import { createClient } from '@/lib/supabase/server';
import { ProjectForm } from '@/components/admin/ProjectForm';

export default async function NewProjectPage() {
  const supabase = await createClient();
  const [{ data: tags }, { data: landingPages }] = await Promise.all([
    supabase
      .from('portfolio_tags')
      .select('*')
      .order('sort_order', { ascending: true, nullsFirst: false }),
    supabase
      .from('landing_pages')
      .select('id, title, slug')
      .order('title', { ascending: true }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
          Trabalhos
        </p>
        <h1 className="text-3xl font-semibold">Novo projeto</h1>
      </div>
      <ProjectForm tags={tags ?? []} landingPages={landingPages ?? []} />
    </div>
  );
}
