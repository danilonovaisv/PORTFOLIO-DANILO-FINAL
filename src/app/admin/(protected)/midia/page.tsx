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
    // Filter assets with invalid keys
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
    <div className="max-w-7xl space-y-12 py-6">
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-8 bg-[#0048ff]/40" />
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0048ff]/60">
            System_Main_Frame
          </p>
        </div>
        <h1 className="font-mono text-4xl font-light tracking-tight text-white sm:text-5xl uppercase">
          Media<span className="text-[#0048ff]">_</span>Vault
          <span className="text-[#0048ff]">.</span>
        </h1>
        <div className="flex items-center gap-6 font-mono text-[10px] text-white/40 uppercase tracking-widest">
          <span>Status: Online</span>
          <span>
            Registry: {activeCount.toString().padStart(2, '0')}/
            {normalizedAssets.length.toString().padStart(2, '0')}
          </span>
        </div>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-10">
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

        <aside className="space-y-8">
          <div className="sticky top-24 space-y-8">
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl">
              <div className="mb-8 space-y-1">
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#0048ff]/60">
                  Module_Upload
                </p>
                <h2 className="font-mono text-xl font-light text-white uppercase">
                  Sync_Asset<span className="text-[#0048ff]">.</span>
                </h2>
              </div>
              <AssetForm />
            </div>

            <div className="space-y-4">
              <PresetButtons />
              <AssetGuide />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
