'use client';

import { useState, useTransition, useRef } from 'react';
import { useRouter } from 'next/navigation';

import { upsertAsset } from '@/app/admin/(protected)/midia/actions';
import { getSiteAssetRoleByKey } from '@/lib/supabase/asset-roles';
import { uploadSiteAsset } from '@/lib/supabase/storage';

type AssetFormProps = {
  preset?: {
    key: string;
    page: string;
    asset_type: string;
    subPath?: string;
    description?: string;
  };
};

export function AssetForm({ preset }: AssetFormProps) {
  const router = useRouter();
  const [key, setKey] = useState(preset?.key ?? '');
  const [page, setPage] = useState(preset?.page ?? 'global');
  const [assetType, setAssetType] = useState(preset?.asset_type ?? 'image');
  const [description, setDescription] = useState(preset?.description ?? '');
  const [subPath, setSubPath] = useState(preset?.subPath ?? '');
  const [sortOrder, setSortOrder] = useState<number | undefined>();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        const role = getSiteAssetRoleByKey(key);
        let file_path: string | null = null;
        if (file) {
          file_path = await uploadSiteAsset({
            file,
            key,
            page,
            subPath: role?.subPath ?? subPath,
            bucket: 'site-assets',
          });
        }

        await upsertAsset({
          key,
          page,
          asset_type: assetType,
          description: description || role?.description || null,
          sort_order: sortOrder ?? null,
          file_path,
          bucket: 'site-assets',
        });
        router.refresh();
        // reset only file
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'SYSTEM_ERR: ASSET_SAVE_FAILURE');
      }
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-6 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/20">Key_Identifier</span>
          <input
            name="asset-key"
            required
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white placeholder:text-white/10 focus:border-[#0048ff]/50 focus:ring-1 focus:ring-[#0048ff]/20 focus:outline-none transition-all"
            placeholder="SYSTEM_KEY"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/20">Page_Scope</span>
          <select
            name="asset-page"
            value={page}
            onChange={(e) => setPage(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white focus:border-[#0048ff]/50 focus:outline-none appearance-none transition-all"
          >
            <option value="global">GLOBAL</option>
            <option value="home">HOME</option>
            <option value="portfolio">PORTFOLIO</option>
            <option value="about">ABOUT</option>
            <option value="clients">CLIENTS</option>
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/20">Data_Type</span>
          <select
            name="asset-type"
            value={assetType}
            onChange={(e) => setAssetType(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white focus:border-[#0048ff]/50 focus:outline-none appearance-none transition-all"
          >
            <option value="image">IMAGE</option>
            <option value="video">VIDEO</option>
            <option value="file">FILE</option>
            <option value="font">FONT</option>
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/20">Sub_Path (Optional)</span>
          <input
            name="asset-subpath"
            value={subPath}
            onChange={(e) => setSubPath(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white placeholder:text-white/10 focus:border-[#0048ff]/50 focus:ring-1 focus:ring-[#0048ff]/20 focus:outline-none transition-all"
            placeholder="PATH/TO/ASSET"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/20">Sort_Order</span>
          <input
            type="number"
            value={sortOrder ?? ''}
            onChange={(e) =>
              setSortOrder(e.target.value ? Number(e.target.value) : undefined)
            }
            className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white placeholder:text-white/10 focus:border-[#0048ff]/50 focus:ring-1 focus:ring-[#0048ff]/20 focus:outline-none transition-all"
            placeholder="00"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/20">Technical_Description</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white placeholder:text-white/10 focus:border-[#0048ff]/50 focus:ring-1 focus:ring-[#0048ff]/20 focus:outline-none transition-all resize-none"
          placeholder="ENTER_METADATA_DESCRIPTION..."
        />
      </label>

      <div className="rounded-lg border border-dashed border-white/10 bg-white/[0.01] p-6 text-center">
        <label className="cursor-pointer group">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*,video/*,.ttf,.otf,.woff,.woff2,.pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
          <div className="space-y-2">
            <p className="font-mono text-xs text-white/40 group-hover:text-[#0048ff] transition-colors">
              {file ? `[ FILE_SELECTED: ${file.name} ]` : '[ CLICK_TO_SELECT_BINARY ]'}
            </p>
            <p className="font-mono text-[9px] uppercase tracking-tighter text-white/20">
              SUPPORTED: IMG, VID, FONT, DOC
            </p>
          </div>
        </label>
      </div>

      {error && (
        <div className="rounded border border-red-500/20 bg-red-500/5 px-4 py-2 font-mono text-[10px] uppercase text-red-400">
          Error: {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center rounded-lg bg-[#0048ff] px-6 py-4 font-mono text-xs uppercase tracking-[0.2em] text-white shadow-lg shadow-[#0048ff]/20 transition-all hover:bg-[#0048ff]/80 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Processing_Request...' : 'SYSTEM_PUSH_CHANGES'}
      </button>
    </form>
  );
}
