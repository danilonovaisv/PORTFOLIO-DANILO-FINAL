// Client component for login
'use client';

import { Suspense } from 'react';
import LoginForm from '@/components/admin/LoginForm';

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
            Admin
          </p>
          <h1 className="text-2xl font-semibold mt-2">Carregando...</h1>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
