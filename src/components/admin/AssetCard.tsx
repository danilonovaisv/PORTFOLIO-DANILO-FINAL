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
  const roleLabel = currentRole?.label ?? 'Sem papel definido';

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
        setError(err instanceof Error ? err.message : 'Falha no upload');
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
          err instanceof Error ? err.message : 'Falha na alteração do papel'
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
          err instanceof Error ? err.message : 'Falha ao atualizar status'
        );
      }
    });
  };

  const handleDelete = () => {
    if (!confirm('Excluir este asset e o arquivo associado?')) return;
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
        setError(err instanceof Error ? err.message : 'Falha na exclusão');
      }
    });
  };

  const previewUrl =
    asset.publicUrl || buildSupabaseStorageUrl(asset.bucket, asset.file_path);
  const resolvedPage = asset.page ?? asset.resolvedPage ?? 'global';

  // Verificar se a chave ou caminho é inválido
  const isInvalidAsset =
    asset.key.startsWith('updated_at:') || asset.key.startsWith('key:');

  if (isInvalidAsset) {
    return (
      <div className="rounded-lg border border-red-500/50 bg-slate-900/60 p-4 flex gap-4">
        <div className="w-24 h-24 rounded-md bg-red-900/30 flex items-center justify-center">
          <span className="text-xs text-red-400">Inválido</span>
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
          <div className="text-xs text-slate-500 mt-1">
            {asset.bucket}/{asset.file_path}
          </div>
          <div className="text-xs text-red-500 mt-2">
            Este asset tem formato inválido e deve ser corrigido ou removido
          </div>
          <button
            type="button"
            onClick={handleDelete}
            className="mt-2 inline-flex items-center rounded-md border border-red-500/60 px-2 py-1 text-[11px] text-red-200 hover:bg-red-500/10"
          >
            Excluir
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
          <div className="font-mono text-sm font-medium tracking-tight text-white group-hover:text-blue-400 transition-colors">
            {asset.key}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">
              {resolvedPage}
            </span>
            <span className="h-3 w-[1px] bg-white/10" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-blue-500/80">
              {asset.asset_type}
            </span>
          </div>
        </div>
        <div className={`h-1.5 w-1.5 rounded-full ${asset.is_active ? 'bg-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-slate-700'}`} />
      </div>

      {/* Preview Area */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/5 bg-white/[0.02]">
        {asset.asset_type === 'image' && previewUrl ? (
          <Image
            src={previewUrl}
            alt={asset.key}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized={previewUrl.toLowerCase().endsWith('.svg')}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-mono text-[10px] uppercase tracking-widest text-slate-600">
            [ {asset.asset_type}_PREVIEW_NA ]
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
            {isPending ? 'UPLOADING...' : 'REPLACE_FILE'}
          </label>
        </div>
      </div>

      {/* Metadata & Actions */}
      <div className="space-y-4">
        {asset.description && (
          <p className="font-mono text-[11px] leading-relaxed text-slate-400 line-clamp-2 italic">
            " {asset.description} "
          </p>
        )}

        <div className="grid grid-cols-2 gap-2 border-y border-white/5 py-3">
          <div className="space-y-1">
            <span className="block font-mono text-[8px] uppercase tracking-widest text-slate-600">Role_Assignment</span>
            <div className="font-mono text-[10px] text-slate-300 truncate">
              {roleLabel}
            </div>
          </div>
          <div className="space-y-1 text-right">
            <span className="block font-mono text-[8px] uppercase tracking-widest text-slate-600">Path_Storage</span>
            <div className="font-mono text-[10px] text-slate-300 truncate">
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
              className={`rounded border px-2 py-1 font-mono text-[9px] uppercase tracking-widest transition-colors ${
                asset.is_active 
                  ? 'border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10' 
                  : 'border-white/10 text-slate-400 hover:bg-white/5'
              }`}
            >
              {asset.is_active ? 'Deactivate' : 'Activate'}
            </button>
            <AssetRoleMenu currentKey={asset.key} onSelectRole={handleRoleChange} />
          </div>
          
          <button
            type="button"
            onClick={handleDelete}
            className="rounded border border-red-500/20 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-red-400/70 transition-colors hover:bg-red-500/10 hover:text-red-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
