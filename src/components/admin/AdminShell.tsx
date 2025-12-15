'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/admin/Sidebar';
import { Header } from '@/components/admin/Header';

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <main className="min-h-screen bg-gray-950">{children}</main>;
  }

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Header />
        <div className="p-8 flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
