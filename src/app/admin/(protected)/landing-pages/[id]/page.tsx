import LandingPageForm from '@/components/admin/LandingPageForm';
import { getLandingPageAction } from '@/app/admin/(protected)/landing-pages/actions';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditLandingPage({ params }: Props) {
  const { id } = await params;
  const data = await getLandingPageAction(id).catch(() => null);

  if (!data) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
          Error: Page_Not_Found
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl space-y-12 py-6">
      <AdminPageHeader
        title="Editar_Projeto"
        subtitle={`Node_ID: ${id.substring(0, 8)}... | Action: Modify_Existing_Page`}
        breadcrumbs={[
          { label: 'System', href: '/admin' },
          { label: 'Landing_Pages', href: '/admin/landing-pages' },
          { label: 'Edit_Page' },
        ]}
      />

      <LandingPageForm initialData={data} />
    </div>
  );
}
