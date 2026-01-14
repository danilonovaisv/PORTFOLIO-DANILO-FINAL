export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';

import { createClient } from '@/lib/supabase/server';
import { AssetCard } from '@/components/admin/AssetCard';
import { AssetForm } from '@/components/admin/AssetForm';
import { PresetButtons } from './preset-buttons';

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

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
          <h2 className="text-lg font-semibold mb-3">Adicionar/atualizar asset</h2>
          <AssetForm />
          <div className="mt-4 text-xs text-slate-400 space-y-1">
            <p>Use nomes consistentes para keys. Sugestões:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Global: <code className="text-[11px]">global.logo_header</code>,{' '}
                <code className="text-[11px]">global.favicon</code>,{' '}
                <code className="text-[11px]">global.font_primary</code>
              </li>
              <li>
                Clients: <code className="text-[11px]">clients.strip</code> (logo strip) ou múltiplas logos
              </li>
              <li>
                Sobre: <code className="text-[11px]">about.hero_video</code>,{' '}
                <code className="text-[11px]">about.origin_image</code>,{' '}
                <code className="text-[11px]">about.method_video</code>,{' '}
                <code className="text-[11px]">about.curriculum_pdf</code>
              </li>
              <li>
                Portfolio: <code className="text-[11px]">portfolio.hero_video</code>
              </li>
            </ul>
          </div>
        </div>

        <PresetButtons />
      </div>

      <div className="space-y-8">
        {Object.entries(groups).map(([page, list]) => (
          <section key={page} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold capitalize">{page}</h2>
              <span className="text-xs text-slate-400">
                {list.length} itens
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {list.map((asset) => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                />
              ))}
            </div>
          </section>
        ))}
        {!assets?.length && (
          <div className="text-slate-400 text-sm">
            Nenhum asset cadastrado ainda.
          </div>
        )}
      </div>
    </div>
  );
}
