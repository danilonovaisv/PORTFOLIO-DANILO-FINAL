'use client';

import React from 'react';
import Link from 'next/link';

interface AdminErrorDisplayProps {
  message: string;
  isMissingEnv: boolean;
}

export function AdminErrorDisplay({
  message,
  isMissingEnv,
}: AdminErrorDisplayProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full p-8 rounded-2xl border border-red-500/20 bg-slate-900 shadow-2xl">
        <h2 className="text-xl font-bold text-red-400 mb-4">
          Erro Crítico no Admin
        </h2>
        <p className="text-slate-300 text-sm mb-6">
          Não foi possível carregar o painel administrativo devido a uma falha
          na conexão com o servidor.
        </p>
        <div className="p-4 rounded bg-black/40 font-mono text-xs text-red-300 mb-6 overflow-x-auto text-left">
          {isMissingEnv
            ? 'Configuração ausente: Verifique as variáveis de ambiente (NEXT_PUBLIC_SUPABASE_URL, etc.) no console do seu provedor de hospedagem (Firebase/Vercel).'
            : message}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="w-full bg-slate-800 hover:bg-slate-700 py-2 rounded font-medium transition-colors"
        >
          Tentar novamente
        </button>
        <div className="mt-4">
          <Link
            href="/"
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            Voltar ao site público
          </Link>
        </div>
      </div>
    </div>
  );
}
