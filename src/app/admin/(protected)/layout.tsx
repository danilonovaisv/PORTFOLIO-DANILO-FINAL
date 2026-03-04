export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { AdminShellNoSSR } from '@/components/admin/AdminShellNoSSR';
import { AdminErrorDisplay } from '@/components/admin/AdminErrorDisplay';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { isAdminUser, shouldEnforceAdminRole } from '@/lib/admin/authz';
import { isServiceRoleConfigured } from '@/lib/supabase/admin';

function isRedirectError(error: unknown): boolean {
  if (!error || typeof error !== 'object' || !('digest' in error)) {
    return false;
  }

  const digest = (error as { digest?: unknown }).digest;
  return typeof digest === 'string' && digest.startsWith('NEXT_REDIRECT');
}

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error('[Admin Layout] auth.getUser error:', error.message);
    }

    if (!user) {
      // O middleware já redireciona para /admin/login se não houver usuário.
      // Adicionamos um redirecionamento explícito aqui como safeguard.
      redirect('/admin/login');
    }

    if (shouldEnforceAdminRole() && !isAdminUser(user)) {
      redirect('/');
    }

    const missingServiceRole = !isServiceRoleConfigured();

    return (
      <AdminShellNoSSR
        userEmail={user.email ?? undefined}
        missingServiceRole={missingServiceRole}
      >
        {children}
      </AdminShellNoSSR>
    );
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    console.error(
      '[Admin Layout] Critical failure:',
      error instanceof Error ? error.message : error
    );

    const isMissingEnv =
      error instanceof Error &&
      error.message.includes('Missing Supabase server client credentials');

    return (
      <AdminErrorDisplay
        message={error instanceof Error ? error.message : 'Falha desconhecida'}
        isMissingEnv={isMissingEnv}
      />
    );
  }
}
