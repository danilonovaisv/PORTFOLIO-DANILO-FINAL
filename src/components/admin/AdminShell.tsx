'use client';

import { MotionConfig } from 'framer-motion';
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
  Home,
} from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
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
  missingServiceRole?: boolean;
};

const navItems = [
  {
    href: ADMIN_NAVIGATION.dashboard,
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: ADMIN_NAVIGATION.trabalhos.index,
    label: 'Works',
    icon: FolderOpen,
  },
  { href: ADMIN_NAVIGATION.tags, label: 'Tags', icon: Tag },
  { href: ADMIN_NAVIGATION.midia, label: 'Media & Layout', icon: Images },
  {
    href: ADMIN_NAVIGATION['landing-pages'],
    label: 'Landing Pages',
    icon: LayoutDashboard,
  },
  { href: ADMIN_NAVIGATION.config, label: 'Settings', icon: Settings },
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

export function AdminShell({ children, userEmail, missingServiceRole }: Props) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <MotionConfig reducedMotion="user">
      <div className="admin-shell min-h-screen bg-[#040013] text-white selection:bg-[#0048ff]/30">
        <div className="flex">
          <aside className="hidden md:flex w-64 flex-col border-r border-white/5 bg-[#040013]/80 backdrop-blur-xl sticky top-0 h-screen overflow-y-auto">
            <div className="px-8 py-10">
              <Link
                href={ADMIN_NAVIGATION.dashboard}
                className="group flex items-center gap-2"
              >
                <div className="h-2 w-2 rounded-full bg-[#0048ff] shadow-[0_0_10px_rgba(0,72,255,0.8)] transition-all group-hover:scale-125" />
                <span className="font-mono text-lg font-light tracking-tighter text-white">
                  GHOST<span className="text-[#0048ff]">.</span>ADMIN
                </span>
              </Link>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-[1px] w-4 bg-white/10" />
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
                  Control_Center v3.0
                </p>
              </div>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6 scrollbar-hide">
              <div className="mb-4 px-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">
                  Main_Modules
                </span>
              </div>
              {navItems.map((item) => {
                const active =
                  pathname === item.href ||
                  pathname?.startsWith(item.href + '/');
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center gap-3 rounded px-4 py-3 text-xs font-medium transition-all duration-300 ${
                      active
                        ? 'bg-[#0048ff]/10 text-[#0048ff] shadow-[inset_0_0_20px_rgba(0,72,255,0.05)]'
                        : 'text-white/40 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon
                      size={16}
                      className={`transition-transform duration-300 group-hover:scale-110 ${active ? 'text-[#0048ff]' : ''}`}
                    />
                    <span className="tracking-wide">{item.label}</span>
                    {active && (
                      <div className="ml-auto h-1 w-1 rounded-full bg-[#0048ff] shadow-[0_0_8px_rgba(0,72,255,0.6)]" />
                    )}
                  </Link>
                );
              })}

              <div className="mt-8 mb-4 px-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">
                  External_Links
                </span>
              </div>
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-3 rounded px-4 py-3 text-xs text-white/40 transition-all hover:bg-white/5 hover:text-white"
              >
                <Home size={16} />
                <span className="tracking-wide italic">Public_View</span>
              </Link>
            </nav>

            <div className="mt-auto p-6 border-t border-white/5 bg-white/[0.02]">
              <div className="flex flex-col gap-4">
                <div className="space-y-1">
                  <p className="font-mono text-[9px] uppercase text-white/30">
                    Operator
                  </p>
                  <p className="truncate text-[11px] font-medium text-white/40">
                    {userEmail || 'danilo@ghost.sys'}
                  </p>
                </div>
                <form action={signOut}>
                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-2 rounded border border-white/5 bg-white/5 py-2.5 text-[10px] font-mono uppercase tracking-widest text-white/40 transition-all hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-400"
                  >
                    Terminate_Session
                  </button>
                </form>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/5 bg-[#040013]/80 px-6 py-4 backdrop-blur-xl md:hidden">
              <Link
                href={ADMIN_NAVIGATION.dashboard}
                className="flex items-center gap-2"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-[#0048ff]" />
                <span className="font-mono text-sm font-light tracking-tighter text-white">
                  GHOST<span className="text-[#0048ff]">.</span>ADMIN
                </span>
              </Link>

              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    className="group flex h-10 w-10 items-center justify-center rounded border border-white/5 bg-white/5 transition-all active:scale-95"
                    aria-label="Open menu"
                  >
                    <Menu
                      size={18}
                      className="text-white/40 group-hover:text-white"
                    />
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[280px] border-white/5 bg-[#040013] p-0 text-white"
                >
                  <SheetHeader className="border-b border-white/5 px-6 py-8 text-left">
                    <SheetTitle className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
                      System_Navigation
                    </SheetTitle>
                    <p className="mt-2 font-mono text-[10px] text-[#0048ff]/60 uppercase">
                      Operator_
                      {userEmail?.split('@')[0].toUpperCase() || 'ROOT'}
                    </p>
                  </SheetHeader>

                  <div className="flex h-[calc(100vh-140px)] flex-col">
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
                            className={`flex items-center gap-4 rounded px-4 py-4 text-sm transition-all ${
                              active
                                ? 'bg-[#0048ff]/10 text-white'
                                : 'text-white/40 hover:bg-white/5'
                            }`}
                          >
                            <Icon
                              size={18}
                              className={active ? 'text-[#0048ff]' : ''}
                            />
                            <span className="tracking-wide">{item.label}</span>
                          </Link>
                        );
                      })}

                      <div className="my-4 h-[1px] w-full bg-white/5" />

                      <Link
                        href="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-4 rounded px-4 py-4 text-sm text-white/40 transition-all hover:bg-white/5"
                      >
                        <Home size={18} />
                        <span className="tracking-wide italic">
                          Public_View
                        </span>
                      </Link>
                    </nav>

                    <div className="mt-auto border-t border-white/5 p-6">
                      <form action={signOut}>
                        <button
                          className="flex w-full items-center justify-center rounded bg-white/5 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-rose-400 transition-all active:scale-95"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Terminate_Session
                        </button>
                      </form>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </header>
            <div className="px-4 md:px-10 py-6 md:py-10">
              {missingServiceRole && (
                <div className="mb-8 overflow-hidden rounded-xl border border-rose-500/20 bg-rose-500/5 backdrop-blur-md">
                  <div className="flex items-stretch">
                    <div className="flex w-12 items-center justify-center bg-rose-500/10 border-r border-rose-500/20">
                      <svg
                        className="h-5 w-5 text-rose-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-rose-400">
                          Security_Alert
                        </span>
                        <div className="h-[1px] flex-1 bg-rose-500/10" />
                        <span className="font-mono text-[9px] text-rose-500/50 uppercase">
                          Code: ERR_MISSING_SERVICE_ROLE
                        </span>
                      </div>
                      <p className="font-mono text-xs font-medium text-rose-400">
                        Degraded radio signal: Service Role Key not detected.
                      </p>
                      <p className="mt-2 text-[11px] leading-relaxed text-rose-400/60 max-w-2xl">
                        Advanced management modules (Auth, Storage, Config) may
                        operate with latency or critical failure. Verify core
                        credentials in the production environment.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {children}
            </div>
          </main>
        </div>
      </div>
    </MotionConfig>
  );
}
