import { ReactNode } from 'react';

export default function AntigravityLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Antigravity <span className="text-indigo-400">AI</span>
        </h1>
        <p className="text-slate-400 max-w-2xl">
          Ferramentas de inteligência artificial para potencializar o fluxo
          criativo e direção de arte.
        </p>
      </div>
      <div className="bg-slate-900/50 border border-white/5 p-6 rounded-xl min-h-[600px]">
        {children}
      </div>
    </div>
  );
}
