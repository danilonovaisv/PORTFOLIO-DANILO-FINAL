'use client';

import dynamic from 'next/dynamic';
import { ComponentProps } from 'react';
import { AdminShell } from '@/components/admin/AdminShell';

export const AdminShellNoSSR = dynamic<ComponentProps<typeof AdminShell>>(
  () =>
    import('@/components/admin/AdminShell').then((module) => module.AdminShell),
  { ssr: false }
);
