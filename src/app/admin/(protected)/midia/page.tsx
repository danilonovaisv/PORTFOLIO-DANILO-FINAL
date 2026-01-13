import { createClient } from '@/lib/supabase/server';
import { AssetCard } from '@/components/admin/AssetCard';

export default async function MidiaPage() {
  const supabase = await createClient();
  const { data: assets } = await supabase
    .from('site_assets')
    .select('*')
    .order('page', { ascending: true })
    .order('sort_order', { ascending: true, nullsFirst: false });

  const groups = (assets ?? []).reduce<Record<string, any[]>>((acc, asset) => {
    const page = asset.page || 'global';
    acc[page] = acc[page] || [];
    acc[page].push(asset);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Mídia</p>
          <h1 className="text-3xl font-semibold">Assets do site</h1>
        </div>
      </div>

      <div className="space-y-8">
        {Object.entries(groups).map(([page, list]) => (
          <section key={page} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold capitalize">{page}</h2>
              <span className="text-xs text-slate-400">{list.length} itens</span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {list.map((asset) => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                  onUpdated={() => {
                    // client component handles refresh via router.refresh
                  }}
                />
              ))}
            </div>
          </section>
        ))}
        {!assets?.length && (
          <div className="text-slate-400 text-sm">Nenhum asset cadastrado ainda.</div>
        )}
      </div>
    </div>
  );
}
