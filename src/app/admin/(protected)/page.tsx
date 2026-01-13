export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';

import { createClient } from '@/lib/supabase/server';

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: projectsCount },
    { count: tagsCount },
    { data: featuredHome },
    { data: featuredPortfolio },
  ] = await Promise.all([
    supabase
      .from('portfolio_projects')
      .select('id', { count: 'exact', head: true }),
    supabase
      .from('portfolio_tags')
      .select('id', { count: 'exact', head: true }),
    supabase
      .from('portfolio_projects')
      .select('id')
      .eq('featured_on_home', true)
      .order('featured_home_order', { ascending: true }),
    supabase
      .from('portfolio_projects')
      .select('id')
      .eq('featured_on_portfolio', true)
      .order('featured_portfolio_order', { ascending: true }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
          Dashboard
        </p>
        <h1 className="text-3xl font-semibold">Visão geral</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Projetos" value={projectsCount ?? 0} />
        <StatCard title="Tags" value={tagsCount ?? 0} />
        <StatCard title="Destaques Home" value={featuredHome?.length ?? 0} />
        <StatCard
          title="Destaques Portfólio"
          value={featuredPortfolio?.length ?? 0}
        />
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="text-3xl font-semibold mt-2">{value}</p>
    </div>
  );
}
