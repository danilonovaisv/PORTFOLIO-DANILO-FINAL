'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderOpen,
  Tag,
  Images,
  Settings,
  PenTool,
  ImageIcon,
  Menu,
  House,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { signOut } from '@/lib/supabase/auth-actions';
import { ADMIN_NAVIGATION } from '@/config/admin-navigation';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

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
  {
    href: ADMIN_NAVIGATION.copyAgent,
    label: 'Copy Agent',
    icon: PenTool,
  },
  {
    href: ADMIN_NAVIGATION.sceneGenerator,
    label: 'Scene Generator',
    icon: ImageIcon,
  },
];

export function AdminShell({ children, userEmail }: Props) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <nav className="flex-1 space-y-1 px-3 py-4">
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
            <Link
              href="/"
              className="mt-3 flex items-center gap-3 rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5"
            >
              <House size={18} />
              Ir para o Site
            </Link>
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
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-slate-950/90 px-4 py-3 backdrop-blur md:hidden">
            <Link
              href={ADMIN_NAVIGATION.dashboard}
              className="text-base font-semibold"
            >
              Admin
            </Link>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/15 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  aria-label="Abrir menu do admin"
                >
                  <Menu size={18} />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="border-white/10 bg-slate-950 p-0 text-slate-50"
              >
                <SheetHeader className="border-b border-white/10 px-5 py-4 text-left">
                  <SheetTitle className="text-base font-semibold text-white">
                    Menu Admin
                  </SheetTitle>
                  <p className="text-xs text-slate-400">
                    {userEmail || 'Usuário autenticado'}
                  </p>
                </SheetHeader>
                <div className="flex h-full flex-col">
                  <nav className="flex-1 space-y-1 p-4">
                    {navItems.map((item) => {
                      const active =
                        pathname === item.href ||
                        pathname?.startsWith(item.href + '/');
                      const Icon = item.icon;

                      return (
                        <Link
                          key={`mobile-${item.href}`}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex min-h-12 items-center gap-3 rounded-lg px-3 py-2 text-sm transition hover:bg-white/5 ${
                            active
                              ? 'bg-white/10 text-white'
                              : 'text-slate-300'
                          }`}
                        >
                          <Icon size={18} />
                          {item.label}
                        </Link>
                      );
                    })}

                    <Link
                      href="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="mt-3 flex min-h-12 items-center gap-3 rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/5"
                    >
                      <House size={18} />
                      Ir para o Site
                    </Link>
                  </nav>

                  <div className="border-t border-white/10 p-4">
                    <form action={signOut}>
                      <button
                        className="inline-flex min-h-12 w-full items-center justify-center rounded-md border border-white/15 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sair
                      </button>
                    </form>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </header>
          <div className="px-4 md:px-10 py-6 md:py-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
