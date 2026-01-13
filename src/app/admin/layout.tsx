import React from 'react';
import { AdminShell } from '@/components/admin/AdminShell';

export const metadata = {
  title: 'Admin Panel',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
