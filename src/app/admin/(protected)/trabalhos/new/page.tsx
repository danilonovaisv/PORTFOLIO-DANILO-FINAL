export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';

import { requireAdminAccess } from '@/lib/admin/server-access';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';

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
      <AdminPageHeader
        title="SYSTEM_NEW_PROJECT_RECORD"
        breadcrumbs={[
          { label: 'System', href: '/admin' },
          { label: 'Portfolio', href: '/admin/trabalhos' },
          { label: 'New_Project' },
        ]}
      />
      <ProjectForm tags={tags ?? []} landingPages={landingPages ?? []} />
    </div>
  );
}
