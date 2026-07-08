export const runtime = 'edge';
import LandingPageForm from '@/components/admin/LandingPageForm';
import { getLandingPageAction } from '@/app/admin/(protected)/landing-pages/actions';
import { AdminHeader } from '@/components/admin/AdminHeader';

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
      <AdminHeader
        title="Edit_Landing_Page"
        subtitle={`Node_ID: ${id.substring(0, 8)}... | Modify existing landing page node settings.`}
        category="Content_Architecture"
        breadcrumbs={[
          { label: 'System', href: '/admin' },
          { label: 'Landing Pages', href: '/admin/landing-pages' },
          { label: 'Edit Page' },
        ]}
      />

      <LandingPageForm initialData={data} />
    </div>
  );
}
