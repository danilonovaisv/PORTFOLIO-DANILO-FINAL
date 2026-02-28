'use client';

import LandingPageForm from '@/components/admin/LandingPageForm';

export default function NewLandingPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
          Portfolio Projects
        </p>
        <h1 className="text-3xl font-semibold">Novo Projeto de Portfólio</h1>
      </div>

      <LandingPageForm />
    </div>
  );
}
