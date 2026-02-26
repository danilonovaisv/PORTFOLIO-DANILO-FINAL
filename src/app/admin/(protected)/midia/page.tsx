export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';

import { createClient } from '@/lib/supabase/server';
import { AssetForm } from '@/components/admin/AssetForm';
import { AssetGuide } from '@/components/admin/AssetGuide';
import { PresetButtons } from '@/app/admin/(protected)/midia/preset-buttons';
import { normalizeAssetList } from '@/lib/supabase/site-asset-utils';
import { AssetGallery } from '@/components/admin/AssetGallery';

export default async function MidiaPage(props: {
  searchParams?: Promise<{
    query?: string;
    pageFilter?: string;
    typeFilter?: string;
    showInactive?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentQuery = searchParams?.query ?? '';
  const currentPageFilter = searchParams?.pageFilter ?? 'all';
  const currentTypeFilter = searchParams?.typeFilter ?? 'all';
  const currentShowInactive = searchParams?.showInactive === 'true';
  const currentPageParams = Number(searchParams?.page) || 1;

  const supabase = await createClient();
  const { data: assets } = await supabase
    .from('site_assets')
    .select(
      'id,key,bucket,file_path,asset_type,page,description,is_active,sort_order,metadata,created_at,updated_at'
    )
    .order('page', { ascending: true })
    .order('sort_order', { ascending: true, nullsFirst: false });

  const normalizedAssets = normalizeAssetList((assets ?? []) as any, {
    onlyActive: false,
  });
  const validAssets = normalizedAssets.filter((asset) => {
    // Filtrar assets com chaves inválidas
    return !(
      asset.key.startsWith('updated_at:') || asset.key.startsWith('key:')
    );
  });
  const activeCount = validAssets.filter((asset) => asset.is_active).length;

  const pageOptions = Array.from(
    new Set(validAssets.map((a) => a.page ?? a.resolvedPage ?? ''))
  )
    .filter(Boolean)
    .sort();
  const typeOptions = Array.from(new Set(validAssets.map((a) => a.asset_type)))
    .filter(Boolean)
    .sort();

  const filtered = validAssets.filter((asset) => {
    if (!currentShowInactive && !asset.is_active) return false;
    const resolvedPage = asset.page ?? asset.resolvedPage ?? '';
    if (currentPageFilter !== 'all' && resolvedPage !== currentPageFilter)
      return false;
    if (currentTypeFilter !== 'all' && asset.asset_type !== currentTypeFilter) {
      return false;
    }
    if (currentQuery) {
      const term = currentQuery.trim().toLowerCase();
      const haystack = `${asset.key} ${asset.description ?? ''} ${
        asset.file_path
      } ${resolvedPage}`.toLowerCase();
      if (!haystack.includes(term)) return false;
    }
    return true;
  });

  const PAGE_SIZE = 24;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.max(1, Math.min(currentPageParams, totalPages));
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(startIndex, startIndex + PAGE_SIZE);

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

      <AssetGallery
        pageItems={pageItems}
        pageOptions={pageOptions}
        typeOptions={typeOptions}
        totalFiltered={filtered.length}
        totalValid={validAssets.length}
        totalPages={totalPages}
        currentPage={safePage}
        currentQuery={currentQuery}
        currentPageFilter={currentPageFilter}
        currentTypeFilter={currentTypeFilter}
        currentShowInactive={currentShowInactive}
      />
    </div>
  );
}
