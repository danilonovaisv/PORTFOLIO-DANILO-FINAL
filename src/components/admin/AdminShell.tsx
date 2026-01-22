'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderOpen,
  Tag,
  Images,
  Settings,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { signOut } from '@/lib/supabase/auth-actions';
import { ADMIN_NAVIGATION } from '@/config/admin-navigation';

type Props = {
  children: ReactNode;
  userEmail?: string;
};

const navItems = [
  {
    href: ADMIN_NAVIGATION.dashboard,
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: ADMIN_NAVIGATION.trabalhos.index,
    label: 'Trabalhos',
    icon: FolderOpen,
  },
  { href: ADMIN_NAVIGATION.tags, label: 'Tags', icon: Tag },
  { href: ADMIN_NAVIGATION.midia, label: 'Mídia & Layout', icon: Images },
  {
    href: ADMIN_NAVIGATION['landing-pages'],
    label: 'Landing Pages',
    icon: LayoutDashboard,
  },
  { href: ADMIN_NAVIGATION.config, label: 'Configurações', icon: Settings },
];

export function AdminShell({ children, userEmail }: Props) {
  const pathname = usePathname();

  return (
    <div className="admin-shell min-h-screen bg-slate-950 text-slate-50">
      <div className="flex">
        <aside className="hidden md:flex w-64 flex-col border-r border-white/10 bg-slate-900/40 backdrop-blur-sm">
          <div className="px-6 py-6 border-b border-white/10">
            <Link
              href={ADMIN_NAVIGATION.dashboard}
              className="text-xl font-semibold tracking-tight"
            >
              Portfólio Admin
            </Link>
            <p className="text-xs text-slate-400 mt-1">CMS interno</p>
          </div>
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map((item) => {
              const active =
                pathname === item.href || pathname?.startsWith(item.href + '/');
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
            <div className="flex flex-col gap-2">
              <span>{userEmail ? `Logado como ${userEmail}` : 'Usuário'}</span>
              <form action={signOut}>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md border border-white/15 px-3 py-2 text-[11px] font-semibold text-white hover:bg-white/10"
                >
                  Sair
                </button>
              </form>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <header className="md:hidden sticky top-0 z-20 bg-slate-950/90 backdrop-blur border-b border-white/10 px-4 py-3 flex items-center justify-between">
            <Link
              href={ADMIN_NAVIGATION.dashboard}
              className="text-base font-semibold"
            >
              Admin
            </Link>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>{userEmail || 'Usuário'}</span>
              <form action={signOut}>
                <button className="rounded-md border border-white/15 px-2 py-1 text-[11px] font-semibold text-white hover:bg-white/10">
                  Sair
                </button>
              </form>
            </div>
          </header>
          <div className="px-4 md:px-10 py-6 md:py-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
