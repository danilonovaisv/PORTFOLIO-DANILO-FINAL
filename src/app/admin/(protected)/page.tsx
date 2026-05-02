export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';

import { createClient } from '@/lib/supabase/server';
import { StatCard } from '@/components/admin/StatCard';
import { Suspense } from 'react';

async function DashboardStats() {
  const supabase = await createClient();

  const [projectsRes, tagsRes, featuredHomeRes, featuredPortfolioRes] =
    await Promise.all([
      supabase.from('portfolio_projects').select('id', {
        count: 'exact',
        head: true,
      }),
      supabase.from('portfolio_tags').select('id', {
        count: 'exact',
        head: true,
      }),
      supabase
        .from('portfolio_projects')
        .select('id', { count: 'exact', head: true })
        .eq('featured_on_home', true),
      supabase
        .from('portfolio_projects')
        .select('id', { count: 'exact', head: true })
        .eq('featured_on_portfolio', true),
    ]);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="SYSTEM_TOTAL_PROJECTS"
        value={projectsRes.count ?? 0}
        error={projectsRes.error?.message}
      />
      <StatCard
        title="SYSTEM_ACTIVE_TAGS"
        value={tagsRes.count ?? 0}
        error={tagsRes.error?.message}
      />
      <StatCard
        title="SYSTEM_HOME_FEATURED"
        value={featuredHomeRes.count ?? 0}
        error={featuredHomeRes.error?.message}
      />
      <StatCard
        title="SYSTEM_PORTFOLIO_FEATURED"
        value={featuredPortfolioRes.count ?? 0}
        error={featuredPortfolioRes.error?.message}
      />
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-[148px] animate-pulse rounded-xl border border-white/5 bg-white/[0.01] p-6 backdrop-blur-xl"
        >
          <div className="flex justify-between">
            <div className="h-2 w-20 rounded bg-white/5" />
            <div className="h-1.5 w-1.5 rounded-full bg-white/10" />
          </div>
          <div className="mt-6 h-8 w-12 rounded bg-white/5" />
          <div className="mt-8 h-px w-full bg-white/5" />
        </div>
      ))}
    </div>
  );
}

import { AdminHeader } from '@/components/admin/AdminHeader';

export default async function AdminDashboardPage() {
  return (
    <div className="max-w-6xl space-y-12 py-6">
      <AdminHeader
        title="Dashboard"
        subtitle="System Real-Time Analytics & Operational Control."
        category="System_Main_Frame"
        breadcrumbs={[{ label: 'System', href: '/admin' }]}
      />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-xs uppercase tracking-widest text-white/40">
            SYSTEM_REAL_TIME_ANALYTICS
          </h2>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0048ff]/40 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0048ff]"></span>
            </span>
            <span className="font-mono text-[9px] text-white/40 uppercase">
              LIVE_SIGNAL
            </span>
          </div>
        </div>

        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardStats />
        </Suspense>
      </div>

      <section className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-10 transition-all hover:border-[#0048ff]/10 backdrop-blur-xl">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#0048ff]/5 blur-[100px] transition-all group-hover:bg-[#0048ff]/10" />

        <div className="relative z-10 space-y-6">
          <div className="space-y-2">
            <h2 className="font-mono text-3xl font-light text-white tracking-tight">
              WELCOME BACK, <span className="text-[#0048ff]">COMMANDER.</span>
            </h2>
            <div className="h-[1px] w-20 bg-[#0048ff]/30" />
          </div>

          <p className="max-w-2xl font-mono text-sm leading-relaxed text-white/60">
            SYSTEM_CORE_V3_OPERATIONAL. WEBGL_MODULES AND SUPABASE_INTEGRATIONS
            IN SYNCHRONIZED STATE. PREPARE FOR ARCHITECTURAL EVOLUTION.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <div className="inline-flex items-center gap-3 rounded-lg border border-white/5 bg-white/5 px-5 py-2.5 transition-colors hover:bg-white/10">
              <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
                SYSTEM_LAST_AUTH
              </span>
              <span className="text-[10px] font-mono text-white/80 uppercase">
                {new Date().toLocaleDateString('en-US')}
              </span>
            </div>

            <div className="inline-flex items-center gap-3 rounded-lg border border-white/5 bg-white/5 px-5 py-2.5 transition-colors hover:bg-white/10">
              <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
                SYSTEM_CLEARANCE
              </span>
              <span className="text-[10px] font-mono text-[#0048ff] uppercase font-bold tracking-tighter">
                LVL_00_ROOT
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
