export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { AdminShell } from '@/components/admin/AdminShell';
import { AdminErrorDisplay } from '@/components/admin/AdminErrorDisplay';
import { createClient } from '@/lib/supabase/server';

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
      // Se chegarmos aqui sem usuário, significa que houve um delay na sincronização.
      // Renderizamos o shell com usuário genérico para evitar 'blank page' e permitir que
      // o cliente ou o próximo request resolva.
      return <AdminShell userEmail={undefined}>{children}</AdminShell>;
    }

    return (
      <AdminShell userEmail={user.email ?? undefined}>{children}</AdminShell>
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
