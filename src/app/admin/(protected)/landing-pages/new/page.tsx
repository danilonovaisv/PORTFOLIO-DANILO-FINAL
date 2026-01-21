'use client';

import LandingPageForm from '@/components/admin/LandingPageForm';

export default function NewLandingPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
          Projetos
        </p>
        <h1 className="text-3xl font-semibold">Nova Landing Page</h1>
      </div>

      <LandingPageForm />
    </div>
  );
}
