'use client';

import dynamic from 'next/dynamic';

export const AdminShellNoSSR = dynamic(
  () => import('@/components/admin/AdminShell').then((module) => module.AdminShell),
  { ssr: false }
);
