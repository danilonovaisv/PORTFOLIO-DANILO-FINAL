'use client';

import LandingPageForm from '@/components/admin/LandingPageForm';

export default function NewLandingPage() {
  return (
    <div className="max-w-6xl space-y-12 py-6">
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-8 bg-blue-500/40" />
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-blue-500/60">
            System_Main_Frame
          </p>
        </div>
        <h1 className="font-mono text-4xl font-light tracking-tight text-white sm:text-5xl">
          Novo_Projeto<span className="text-blue-500">.</span>
        </h1>
        <p className="font-mono text-[10px] uppercase text-white/40 tracking-widest">
          Action: Create_New_Landing_Page
        </p>
      </header>

      <LandingPageForm />
    </div>
  );
}
