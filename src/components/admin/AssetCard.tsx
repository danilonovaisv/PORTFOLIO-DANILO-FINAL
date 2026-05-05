'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  assignAssetRole,
  removeAsset,
  toggleAssetActive,
  updateAssetFilePath,
} from '@/app/admin/(protected)/midia/actions';
import { AssetRoleMenu } from '@/components/admin/AssetRoleMenu';
import {
  siteAssetRoleMap,
  type SiteAssetRole,
} from '@/lib/supabase/asset-roles';
import { uploadSiteAsset } from '@/lib/supabase/storage';
import { buildSupabaseStorageUrl } from '@/lib/supabase/urls';
import type { NormalizedSiteAsset } from '@/lib/supabase/site-asset-utils';

type Props = {
  asset: NormalizedSiteAsset;
};

export function AssetCard({ asset }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const currentRole = siteAssetRoleMap.get(asset.key);
  const roleLabel = currentRole?.label ?? 'SYSTEM_ROLE_UNDEFINED';

  const handleUpload = (file?: File | null) => {
    if (!file) return;
    setError(null);
    startTransition(async () => {
      try {
        const newPath = await uploadSiteAsset({
          file,
          key: asset.key,
          page: asset.page,
          subPath: currentRole?.subPath,
          bucket: asset.bucket as 'site-assets',
        });
        await updateAssetFilePath({
          id: asset.id,
          file_path: newPath ?? '',
          bucket: asset.bucket,
        });
        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'SYSTEM_ERR: UPLOAD_FAILED'
        );
      }
    });
  };

  const handleRoleChange = (role: SiteAssetRole) => {
    setError(null);
    startTransition(async () => {
      try {
        await assignAssetRole({ assetId: asset.id, role });
        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'SYSTEM_ERR: ROLE_MOD_FAILED'
        );
      }
    });
  };

  const toggleActive = () => {
    setError(null);
    startTransition(async () => {
      try {
        await toggleAssetActive({
          id: asset.id,
          is_active: !asset.is_active,
        });
        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'SYSTEM_ERR: STATUS_UPDATE_FAILED'
        );
      }
    });
  };

  const handleDelete = () => {
    if (!confirm('SYSTEM_PURGE: CONFIRM_DELETION_OF_ASSET_AND_BLOB?')) return;
    setError(null);
    startTransition(async () => {
      try {
        await removeAsset({
          id: asset.id,
          bucket: asset.bucket,
          file_path: asset.file_path,
        });
        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'SYSTEM_ERR: PURGE_FAILED'
        );
      }
    });
  };

  const previewUrl =
    asset.publicUrl || buildSupabaseStorageUrl(asset.bucket, asset.file_path);
  const resolvedPage = asset.page ?? asset.resolvedPage ?? 'global';

  // Verify if key or path is invalid
  const isInvalidAsset =
    asset.key.startsWith('updated_at:') || asset.key.startsWith('key:');

  if (isInvalidAsset) {
    return (
      <div className="rounded border border-rose-500/50 bg-black/60 p-4 flex gap-4">
        <div className="w-24 h-24 rounded bg-rose-900/30 flex items-center justify-center border border-rose-500/20">
          <span className="font-mono text-[10px] uppercase tracking-widest text-rose-400">
            Invalid
          </span>
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-sm font-semibold text-red-400">
              {asset.key}
            </div>
            <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-[11px] text-red-200">
              {resolvedPage}
            </span>
          </div>
          <div className="font-mono text-[10px] text-white/30 mt-1 uppercase tracking-tighter">
            {asset.bucket}/{asset.file_path}
          </div>
          <div className="font-mono text-[9px] text-rose-500 mt-2 uppercase tracking-tight">
            SYSTEM_ERROR: INVALID_FORMAT_RECOVERY_REQUIRED
          </div>
          <button
            type="button"
            onClick={handleDelete}
            className="mt-2 inline-flex items-center rounded border border-rose-500/60 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-rose-200 hover:bg-rose-500/10 transition-all"
          >
            System_Purge_Entry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex flex-col gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-white/10 hover:bg-white/[0.04]">
      {/* Header Info */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="font-mono text-sm font-medium tracking-tight text-white group-hover:text-[#0048ff] transition-colors">
            {asset.key}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">
              {resolvedPage}
            </span>
            <span className="h-3 w-[1px] bg-white/10" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#0048ff]/80">
              {asset.asset_type}
            </span>
          </div>
        </div>
        <div
          className={`h-1.5 w-1.5 rounded-full ${asset.is_active ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-white/10'}`}
        />
      </div>

      {/* Preview Area */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/5 bg-white/[0.02]">
        {asset.asset_type === 'image' && previewUrl ? (
          <Image
            src={previewUrl}
            alt={asset.key}
            fill
            className="object-cover transition-transform duration-modal group-hover:scale-105"
            unoptimized={previewUrl.toLowerCase().endsWith('.svg')}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-mono text-[9px] uppercase tracking-widest text-white/20">
            [ {asset.asset_type}_PREVIEW_NULL ]
          </div>
        )}

        {/* Overlay Actions */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100 backdrop-blur-[2px]">
          <label className="cursor-pointer rounded-full bg-white px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-black transition-transform hover:scale-105 active:scale-95">
            <input
              type="file"
              className="hidden"
              onChange={(e) => handleUpload(e.target.files?.[0] ?? null)}
              accept="image/*,video/*"
            />
            {isPending ? 'SYSTEM_UPLOADING...' : 'SYSTEM_UPDATE_BLOB'}
          </label>
        </div>
      </div>

      {/* Metadata & Actions */}
      <div className="space-y-4">
        {asset.description && (
          <p className="font-mono text-[10px] leading-relaxed text-white/40 line-clamp-2 italic">
            " {asset.description} "
          </p>
        )}

        <div className="grid grid-cols-2 gap-2 border-y border-white/5 py-3">
          <div className="space-y-1">
            <span className="block font-mono text-[8px] uppercase tracking-widest text-white/30">
              System_Role
            </span>
            <div className="font-mono text-[10px] text-white/80 truncate">
              {roleLabel}
            </div>
          </div>
          <div className="space-y-1 text-right">
            <span className="block font-mono text-[8px] uppercase tracking-widest text-white/30">
              System_Path
            </span>
            <div className="font-mono text-[10px] text-white/80 truncate">
              {asset.file_path.split('/').pop()}
            </div>
          </div>
        </div>

        {error && (
          <div className="font-mono text-[9px] uppercase text-red-400">
            !! {error}
          </div>
        )}

        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleActive}
              className={`rounded border px-2 py-1 font-mono text-[9px] uppercase tracking-widest transition-all ${
                asset.is_active
                  ? 'border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10'
                  : 'border-white/10 text-white/40 hover:bg-white/5'
              }`}
            >
              {asset.is_active ? 'System_Deactivate' : 'System_Activate'}
            </button>
            <AssetRoleMenu
              currentKey={asset.key}
              onSelectRole={handleRoleChange}
            />
          </div>

          <button
            type="button"
            onClick={handleDelete}
            className="rounded border border-rose-500/20 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-rose-400/70 transition-all hover:bg-rose-500/10 hover:text-rose-400"
          >
            System_Purge
          </button>
        </div>
      </div>
    </div>
  );
}
