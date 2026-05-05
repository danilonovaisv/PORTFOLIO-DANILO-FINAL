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

  const PAGE_SIZE = 24;
  const startIndex = (currentPage - 1) * PAGE_SIZE;

  return (
    <div
      className={`space-y-8 transition-opacity duration-standard ${isPending ? 'opacity-50' : 'opacity-100'}`}
    >
      {/* Control Bar */}
      <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-xl">
        <div className="relative group flex-1 min-w-[300px]">
          <input
            type="search"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder="SYSTEM_DATABASE_SCAN..."
            className="w-full rounded border border-white/10 bg-white/[0.03] px-5 py-3 font-mono text-xs text-white placeholder:text-white/20 focus:border-bluePrimary/50 focus:ring-1 focus:ring-bluePrimary/20 focus:outline-none transition-all"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[9px] text-white/30 uppercase tracking-widest pointer-events-none">
            System_Query_Node
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select
              aria-label="Filter by page"
              value={currentPageFilter}
              onChange={(e) =>
                updateFilters({
                  pageFilter: e.target.value === 'all' ? null : e.target.value,
                  page: '1',
                })
              }
              className="rounded-lg border border-white/10 bg-white/[0.03] pl-4 pr-10 py-3 font-mono text-[10px] uppercase tracking-widest text-white focus:border-bluePrimary/50 focus:outline-none appearance-none cursor-pointer transition-all"
            >
              <option value="all">ALL_PAGES</option>
              {pageOptions.map((page) => (
                <option key={page} value={page}>
                  {page.toUpperCase()}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="relative">
            <select
              aria-label="Filter by type"
              value={currentTypeFilter}
              onChange={(e) =>
                updateFilters({
                  typeFilter: e.target.value === 'all' ? null : e.target.value,
                  page: '1',
                })
              }
              className="rounded-lg border border-white/10 bg-white/[0.03] pl-4 pr-10 py-3 font-mono text-[10px] uppercase tracking-widest text-white focus:border-bluePrimary/50 focus:outline-none appearance-none cursor-pointer transition-all"
            >
              <option value="all">ALL_TYPES</option>
              {typeOptions.map((type) => (
                <option key={type} value={type}>
                  {type.toUpperCase()}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <label className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 cursor-pointer group transition-colors hover:bg-white/[0.05]">
            <input
              type="checkbox"
              className="h-3.5 w-3.5 rounded border-white/20 bg-black text-bluePrimary focus:ring-offset-0 focus:ring-bluePrimary/50"
              checked={currentShowInactive}
              onChange={(e) =>
                updateFilters({
                  showInactive: e.target.checked ? 'true' : null,
                  page: '1',
                })
              }
            />
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
              System_Show_Inactive
            </span>
          </label>
        </div>
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2 px-1">
        <div className="flex items-center gap-3">
          <div className="h-1 w-1 rounded-full bg-bluePrimary/50" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            System_Search_Registry
          </span>
        </div>
        <span className="font-mono text-[10px] text-white/30 uppercase">
          Status:{' '}
          <span className="text-bluePrimary">
            {totalFiltered.toString().padStart(2, '0')}
          </span>
          _Matches /{' '}
          <span className="text-white/40">
            {totalValid.toString().padStart(2, '0')}
          </span>
          _Total
        </span>
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pageItems.map((asset) => (
          <AssetCard key={asset.id} asset={asset} />
        ))}
      </div>

      {/* Empty State */}
      {!pageItems.length && (
        <div className="rounded border border-dashed border-white/10 bg-white/[0.01] py-24 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
            System_Null_State_Active
          </p>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between pt-8 border-t border-white/5">
        <div className="font-mono text-[9px] uppercase tracking-widest text-white/30">
          System_Registry_Range: {startIndex + 1}-
          {Math.min(startIndex + PAGE_SIZE, totalFiltered)}
        </div>

        <div className="flex items-center gap-8">
          <button
            type="button"
            onClick={() => updateFilters({ page: String(currentPage - 1) })}
            disabled={currentPage <= 1 || isPending}
            className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white transition-opacity disabled:opacity-20"
          >
            <span className="text-bluePrimary group-hover:-translate-x-1 transition-transform">
              ←
            </span>{' '}
            System_Prev_Set
          </button>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-bluePrimary">
              {currentPage.toString().padStart(2, '0')}
            </span>
            <span className="h-4 w-[1px] bg-white/10" />
            <span className="font-mono text-[10px] text-white/30">
              {totalPages.toString().padStart(2, '0')}
            </span>
          </div>

          <button
            type="button"
            onClick={() => updateFilters({ page: String(currentPage + 1) })}
            disabled={currentPage >= totalPages || isPending}
            className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white transition-opacity disabled:opacity-20"
          >
            System_Next_Set{' '}
            <span className="text-bluePrimary group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
