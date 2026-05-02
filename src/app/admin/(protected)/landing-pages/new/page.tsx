'use client';

import LandingPageForm from '@/components/admin/LandingPageForm';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';

export default function NewLandingPage() {
  return (
    <div className="max-w-6xl space-y-12 py-6">
      <AdminPageHeader
        title="Novo_Projeto"
        subtitle="Action: Create_New_Landing_Page"
        breadcrumbs={[
          { label: 'System', href: '/admin' },
          { label: 'Landing_Pages', href: '/admin/landing-pages' },
          { label: 'New_Page' },
        ]}
      />

      <LandingPageForm />
    </div>
  );
}
