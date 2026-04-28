// Client component for login
'use client';

import { Suspense } from 'react';
import LoginForm from '@/components/admin/LoginForm';

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
            Ghost_Admin
          </p>
          <h1 className="font-mono text-2xl font-light mt-2 text-white">
            SYSTEM_LOADING_PORTAL
          </h1>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
