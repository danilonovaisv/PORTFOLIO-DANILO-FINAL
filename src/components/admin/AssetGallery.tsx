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
      className={`rounded-xl border border-white/10 bg-slate-900/40 backdrop-blur-sm p-4 space-y-6 transition ${isPending ? 'opacity-70' : ''}`}
    >
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative group flex-1 min-w-[280px]">
          <span className="absolute left-3 -top-2 px-2 bg-[#040013] text-[10px] font-mono uppercase tracking-widest text-blue-400 opacity-0 group-focus-within:opacity-100 transition-opacity z-10">
            Search_Assets
          </span>
          <input
            type="search"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder="BUSCAR ASSETS..."
            className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-4 py-2.5 text-xs font-mono text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 focus:outline-none transition-all"
          />
        </div>

        <div className="relative group">
          <span className="absolute left-3 -top-2 px-2 bg-[#040013] text-[10px] font-mono uppercase tracking-widest text-blue-400 opacity-0 group-focus-within:opacity-100 transition-opacity z-10">
            Page_Filter
          </span>
          <select
            value={currentPageFilter}
            onChange={(e) =>
              updateFilters({
                pageFilter: e.target.value === 'all' ? null : e.target.value,
                page: '1',
              })
            }
            className="rounded-lg border border-white/10 bg-slate-900/60 px-4 py-2.5 text-xs font-mono text-white focus:border-blue-500/50 focus:outline-none appearance-none transition-all"
          >
            <option value="all">TODAS AS PÁGINAS</option>
            {pageOptions.map((page) => (
              <option key={page} value={page}>
                {page.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="relative group">
          <span className="absolute left-3 -top-2 px-2 bg-[#040013] text-[10px] font-mono uppercase tracking-widest text-blue-400 opacity-0 group-focus-within:opacity-100 transition-opacity z-10">
            Type_Filter
          </span>
          <select
            value={currentTypeFilter}
            onChange={(e) =>
              updateFilters({
                typeFilter: e.target.value === 'all' ? null : e.target.value,
                page: '1',
              })
            }
            className="rounded-lg border border-white/10 bg-slate-900/60 px-4 py-2.5 text-xs font-mono text-white focus:border-blue-500/50 focus:outline-none appearance-none transition-all"
          >
            <option value="all">TODOS OS TIPOS</option>
            {typeOptions.map((type) => (
              <option key={type} value={type}>
                {type.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <label className="inline-flex items-center gap-3 px-3 py-2 rounded-lg border border-white/5 bg-white/2 cursor-pointer group transition-colors hover:bg-white/5">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-white/20 bg-slate-900/80 text-blue-600 focus:ring-offset-0 focus:ring-blue-500/50"
            checked={currentShowInactive}
            onChange={(e) =>
              updateFilters({
                showInactive: e.target.checked ? 'true' : null,
                page: '1',
              })
            }
          />
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 group-hover:text-slate-200 transition-colors">
            Show_Inactive
          </span>
        </label>
      </div>

      <div className="flex items-center justify-between px-1">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">
          Status: <span className="text-blue-400">{totalFiltered}</span> results from <span className="text-slate-300">{totalValid}</span> entries
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pageItems.map((asset) => (
          <AssetCard key={asset.id} asset={asset} />
        ))}
      </div>

      {!pageItems.length && (
        <div className="rounded-xl border border-white/5 bg-white/2 px-4 py-12 text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-500">
            [ NO_ASSETS_FOUND_WITH_CURRENT_FILTERS ]
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
          Showing {pageItems.length} elements
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => updateFilters({ page: String(currentPage - 1) })}
            disabled={currentPage <= 1 || isPending}
            className="rounded-lg border border-white/10 bg-white/2 px-4 py-2 text-[10px] font-mono uppercase tracking-widest text-white transition-all hover:bg-blue-500/10 hover:border-blue-500/50 disabled:opacity-20 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400">
            Page {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => updateFilters({ page: String(currentPage + 1) })}
            disabled={currentPage >= totalPages || isPending}
            className="rounded-lg border border-white/10 bg-white/2 px-4 py-2 text-[10px] font-mono uppercase tracking-widest text-white transition-all hover:bg-blue-500/10 hover:border-blue-500/50 disabled:opacity-20 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
