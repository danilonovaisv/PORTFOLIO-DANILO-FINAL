'use client';

// export const runtime = 'edge';
import LandingPageForm from '@/components/admin/LandingPageForm';
import { AdminHeader } from '@/components/admin/AdminHeader';

export default function NewLandingPage() {
  return (
    <div className="max-w-6xl space-y-12 py-6">
      <AdminHeader
        title="New_Landing_Page"
        subtitle="Initialize a new landing page node with specialized template configurations."
        category="Content_Architecture"
        breadcrumbs={[
          { label: 'System', href: '/admin' },
          { label: 'Landing Pages', href: '/admin/landing-pages' },
          { label: 'New Page' },
        ]}
      />

      <LandingPageForm />
    </div>
  );
}
