'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FolderOpen, Tag, Images, Settings } from 'lucide-react';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  userEmail?: string;
};

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/trabalhos', label: 'Trabalhos', icon: FolderOpen },
  { href: '/admin/tags', label: 'Tags', icon: Tag },
  { href: '/admin/midia', label: 'Mídia & Layout', icon: Images },
  { href: '/admin/config', label: 'Configurações', icon: Settings },
];

export function AdminShell({ children, userEmail }: Props) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="flex">
        <aside className="hidden md:flex w-64 flex-col border-r border-white/10 bg-slate-900/40 backdrop-blur-sm">
          <div className="px-6 py-6 border-b border-white/10">
            <Link href="/admin" className="text-xl font-semibold tracking-tight">
              Portfólio Admin
            </Link>
            <p className="text-xs text-slate-400 mt-1">CMS interno</p>
          </div>
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname?.startsWith(item.href + '/');
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition hover:bg-white/5 ${
                    active ? 'bg-white/10 text-white' : 'text-slate-300'
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="px-4 py-3 border-t border-white/10 text-xs text-slate-400">
            {userEmail ? <span>Logado como {userEmail}</span> : <span>Usuário</span>}
          </div>
        </aside>

        <main className="flex-1">
          <header className="md:hidden sticky top-0 z-20 bg-slate-950/90 backdrop-blur border-b border-white/10 px-4 py-3 flex items-center justify-between">
            <Link href="/admin" className="text-base font-semibold">
              Admin
            </Link>
            <div className="text-xs text-slate-400">{userEmail || 'Usuário'}</div>
          </header>
          <div className="px-4 md:px-10 py-6 md:py-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
