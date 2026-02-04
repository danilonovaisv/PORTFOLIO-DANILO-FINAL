export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';

import { createClient } from '@/lib/supabase/server';
import { AssetForm } from '@/components/admin/AssetForm';
import { AssetGuide } from '@/components/admin/AssetGuide';
import { PresetButtons } from './preset-buttons';
import { normalizeAssetList } from '@/lib/supabase/site-asset-utils';
import { AssetGallery } from '@/components/admin/AssetGallery';

export default async function MidiaPage() {
  const supabase = await createClient();
  const { data: assets } = await supabase
    .from('site_assets')
    .select('*')
    .order('page', { ascending: true })
    .order('sort_order', { ascending: true, nullsFirst: false });

  const normalizedAssets = normalizeAssetList(assets ?? [], {
    onlyActive: false,
  }); // Mostrar todos para permitir edição
  const validAssets = normalizedAssets.filter((asset) => {
    // Filtrar assets com chaves inválidas
    return !(
      asset.key.startsWith('updated_at:') || asset.key.startsWith('key:')
    );
  });
  const activeCount = validAssets.filter((asset) => asset.is_active).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
            Mídia
          </p>
          <h1 className="text-3xl font-semibold">Assets do site</h1>
          <p className="text-sm text-slate-400">
            {activeCount} ativos de {normalizedAssets.length} registros válidos
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
          <h2 className="text-lg font-semibold mb-3">
            Adicionar/atualizar asset
          </h2>
          <AssetForm />
        </div>
        <div className="flex flex-col gap-4">
          <PresetButtons />
          <AssetGuide />
        </div>
      </div>

      <AssetGallery assets={validAssets} />
    </div>
  );
}
