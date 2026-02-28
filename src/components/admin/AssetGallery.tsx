'use client';

import { useEffect, useState, useCallback, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { NormalizedSiteAsset } from '@/lib/supabase/site-asset-utils';
import { AssetCard } from '@/components/admin/AssetCard';

type AssetGalleryProps = {
  pageItems: NormalizedSiteAsset[];
  pageOptions: string[];
  typeOptions: string[];
  totalFiltered: number;
  totalValid: number;
  totalPages: number;
  currentPage: number;
  currentQuery: string;
  currentPageFilter: string;
  currentTypeFilter: string;
  currentShowInactive: boolean;
};

export function AssetGallery({
  pageItems,
  pageOptions,
  typeOptions,
  totalFiltered,
  totalValid,
  totalPages,
  currentPage,
  currentQuery,
  currentPageFilter,
  currentTypeFilter,
  currentShowInactive,
}: AssetGalleryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [localQuery, setLocalQuery] = useState(currentQuery);

  const updateFilters = useCallback(
    (params: Record<string, string | null>) => {
      startTransition(() => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        for (const [key, value] of Object.entries(params)) {
          if (value === null) {
            current.delete(key);
          } else {
            current.set(key, value);
          }
        }
        router.push(`?${current.toString()}`);
      });
    },
    [router, searchParams]
  );

  // Debounce query
  useEffect(() => {
    const handler = setTimeout(() => {
      if (localQuery !== currentQuery) {
        updateFilters({ query: localQuery || null, page: '1' });
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [localQuery, currentQuery, updateFilters]);

  // Sync local if current changes via external (e.g. back button)
  useEffect(() => {
    setLocalQuery(currentQuery);
  }, [currentQuery]);

  return (
    <div
      className={`rounded-xl border border-white/10 bg-slate-900/60 p-4 space-y-4 transition ${isPending ? 'opacity-70' : ''}`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder="Buscar por key, página ou caminho"
          className="w-full md:w-72 rounded-md border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
        />
        <select
          value={currentPageFilter}
          onChange={(e) =>
            updateFilters({
              pageFilter: e.target.value === 'all' ? null : e.target.value,
              page: '1',
            })
          }
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
          value={currentTypeFilter}
          onChange={(e) =>
            updateFilters({
              typeFilter: e.target.value === 'all' ? null : e.target.value,
              page: '1',
            })
          }
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
            checked={currentShowInactive}
            onChange={(e) =>
              updateFilters({
                showInactive: e.target.checked ? 'true' : null,
                page: '1',
              })
            }
          />
          Mostrar inativos
        </label>
        <div className="ml-auto text-xs text-slate-400">
          {totalFiltered} de {totalValid} assets válidos
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
          Mostrando {pageItems.length} de {totalFiltered} filtrados
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => updateFilters({ page: String(currentPage - 1) })}
            disabled={currentPage <= 1 || isPending}
            className="rounded-md border border-white/10 bg-slate-900/70 px-3 py-1 text-xs text-white transition hover:border-blue-400 hover:bg-blue-500/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Anterior
          </button>
          <span className="text-xs text-slate-400">
            Página {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => updateFilters({ page: String(currentPage + 1) })}
            disabled={currentPage >= totalPages || isPending}
            className="rounded-md border border-white/10 bg-slate-900/70 px-3 py-1 text-xs text-white transition hover:border-blue-400 hover:bg-blue-500/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}
