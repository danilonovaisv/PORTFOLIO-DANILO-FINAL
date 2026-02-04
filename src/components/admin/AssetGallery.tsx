'use client';

import { useDeferredValue, useMemo, useState, useEffect } from 'react';
import type { NormalizedSiteAsset } from '@/lib/supabase/site-asset-utils';
import { AssetCard } from '@/components/admin/AssetCard';

type AssetGalleryProps = {
  assets: NormalizedSiteAsset[];
};

const PAGE_SIZE = 24;

export function AssetGallery({ assets }: AssetGalleryProps) {
  const [query, setQuery] = useState('');
  const [pageFilter, setPageFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showInactive, setShowInactive] = useState(false);
  const [page, setPage] = useState(1);

  const deferredQuery = useDeferredValue(query);

  // Filtrar assets válidos e extrair opções únicas
  const validAssets = useMemo(() => {
    return assets.filter((asset) => {
      // Filtrar assets com chaves ou caminhos inválidos
      if (
        !asset.key ||
        asset.key.startsWith('updated_at:') ||
        asset.key.startsWith('key:')
      ) {
        return false;
      }
      return true;
    });
  }, [assets]);

  const pageOptions = useMemo(() => {
    const set = new Set<string>();
    validAssets.forEach((asset) =>
      set.add(asset.page ?? asset.resolvedPage ?? '')
    );
    return Array.from(set).filter(Boolean).sort();
  }, [validAssets]);

  const typeOptions = useMemo(() => {
    const set = new Set<string>();
    validAssets.forEach(
      (asset) => asset.asset_type && set.add(asset.asset_type)
    );
    return Array.from(set).filter(Boolean).sort();
  }, [validAssets]);

  useEffect(() => {
    setPage(1);
  }, [pageFilter, typeFilter, showInactive, deferredQuery]);

  const filtered = useMemo(() => {
    const term = deferredQuery.trim().toLowerCase();
    return validAssets.filter((asset) => {
      if (!showInactive && !asset.is_active) return false;
      const resolvedPage = asset.page ?? asset.resolvedPage ?? '';
      if (pageFilter !== 'all' && resolvedPage !== pageFilter) return false;
      if (typeFilter !== 'all' && asset.asset_type !== typeFilter) {
        return false;
      }
      if (term) {
        const haystack = `${asset.key} ${asset.description ?? ''} ${
          asset.file_path
        } ${resolvedPage}`.toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      return true;
    });
  }, [validAssets, deferredQuery, pageFilter, typeFilter, showInactive]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4 space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por key, página ou caminho"
          className="w-full md:w-72 rounded-md border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
        />
        <select
          value={pageFilter}
          onChange={(e) => setPageFilter(e.target.value)}
          className="rounded-md border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white focus:border-blue-400 focus:outline-none"
        >
          <option value="all">Todas as páginas</option>
          {pageOptions.map((page) => (
            <option key={page} value={page}>
              {page}
            </option>
          ))}
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-md border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white focus:border-blue-400 focus:outline-none"
        >
          <option value="all">Todos os tipos</option>
          {typeOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <label className="inline-flex items-center gap-2 text-xs text-slate-300">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-white/20 bg-slate-900/80"
            checked={showInactive}
            onChange={(e) => setShowInactive(e.target.checked)}
          />
          Mostrar inativos
        </label>
        <div className="ml-auto text-xs text-slate-400">
          {filtered.length} de {validAssets.length} assets válidos
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pageItems.map((asset) => (
          <AssetCard key={asset.id} asset={asset} />
        ))}
      </div>

      {!pageItems.length && (
        <div className="rounded-lg border border-white/10 bg-slate-900/40 px-4 py-6 text-sm text-slate-400">
          Nenhum asset encontrado com os filtros atuais.
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-300">
        <div>
          Mostrando {pageItems.length} de {filtered.length} filtrados
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={safePage === 1}
            className="rounded-md border border-white/10 bg-slate-900/70 px-3 py-1 text-xs text-white transition hover:border-blue-400 hover:bg-blue-500/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Anterior
          </button>
          <span className="text-xs text-slate-400">
            Página {safePage} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={safePage >= totalPages}
            className="rounded-md border border-white/10 bg-slate-900/70 px-3 py-1 text-xs text-white transition hover:border-blue-400 hover:bg-blue-500/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}
