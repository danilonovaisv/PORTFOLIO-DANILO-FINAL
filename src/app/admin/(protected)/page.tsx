export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';

import { createClient } from '@/lib/supabase/server';
import { StatCard } from '@/components/admin/StatCard';
import { Suspense } from 'react';

async function DashboardStats() {
  const supabase = await createClient();

  // Fetch results individually to prevent cascading failure
  const projectsRes = await supabase
    .from('portfolio_projects')
    .select('id', { count: 'exact', head: true });

  const tagsRes = await supabase
    .from('portfolio_tags')
    .select('id', { count: 'exact', head: true });

  const featuredHomeRes = await supabase
    .from('portfolio_projects')
    .select('id', { count: 'exact', head: true })
    .eq('featured_on_home', true);

  const featuredPortfolioRes = await supabase
    .from('portfolio_projects')
    .select('id', { count: 'exact', head: true })
    .eq('featured_on_portfolio', true);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total de Projetos"
        value={projectsRes.count ?? 0}
        error={projectsRes.error?.message}
      />
      <StatCard
        title="Tags Ativas"
        value={tagsRes.count ?? 0}
        error={tagsRes.error?.message}
      />
      <StatCard
        title="Destaques (Home)"
        value={featuredHomeRes.count ?? 0}
        error={featuredHomeRes.error?.message}
      />
      <StatCard
        title="Destaques (Portfólio)"
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
          className="h-32 animate-pulse rounded-xl bg-slate-800/50"
        />
      ))}
    </div>
  );
}

export default async function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
          Overview
        </p>
        <h1 className="mt-2 text-3xl font-semibold">Painel de Controle</h1>
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardStats />
      </Suspense>

      <section className="rounded-2xl border border-white/5 bg-slate-900/40 p-8">
        <h2 className="text-xl font-medium text-white">Bem-vindo, Danilo.</h2>
        <p className="mt-2 text-slate-400">
          Este é o centro de comando do seu portfólio. Aqui você pode gerenciar
          trabalhos, landing pages e ativos visuais.
        </p>
      </section>
    </div>
  );
}
