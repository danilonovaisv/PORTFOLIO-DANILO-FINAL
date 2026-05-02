export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';

import { requireAdminAccess } from '@/lib/admin/server-access';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { AdminHeader } from '@/components/admin/AdminHeader';

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
    <div className="max-w-6xl space-y-12 py-6">
      <AdminHeader
        title="New_Project"
        subtitle="Initialize a new cinematic project record within the system database."
        category="Work_Catalog"
        breadcrumbs={[
          { label: 'System', href: '/admin' },
          { label: 'Portfolio', href: '/admin/trabalhos' },
          { label: 'New Project' },
        ]}
      />
      <ProjectForm tags={tags ?? []} landingPages={landingPages ?? []} />
    </div>
  );
}
