export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';

import { requireAdminAccess } from '@/lib/admin/server-access';
import { ProjectForm } from '@/components/admin/ProjectForm';

export default async function NewProjectPage() {
  const { supabase } = await requireAdminAccess();
  const [{ data: tags }, { data: landingPages }] = await Promise.all([
    supabase
      .from('portfolio_tags')
      .select('*')
      .order('label', { ascending: true }),
    supabase
      .from('landing_pages')
      .select('id, title, slug, content')
      .order('title', { ascending: true }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
          System_Projects_Layer
        </p>
        <h1 className="font-mono text-3xl font-light text-white mt-2">
          SYSTEM_NEW_PROJECT_RECORD<span className="text-[#0048ff]">.</span>
        </h1>
      </div>
      <ProjectForm tags={tags ?? []} landingPages={landingPages ?? []} />
    </div>
  );
}
