'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  assignAssetRole,
  removeAsset,
} from '@/app/admin/(protected)/midia/actions';
import { AssetRoleMenu } from '@/components/admin/AssetRoleMenu';
import {
  siteAssetRoleMap,
  type SiteAssetRole,
} from '@/lib/supabase/asset-roles';
import { createClientComponentClient } from '@/lib/supabase/client';
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
        const supabase = createClientComponentClient();
        const { error: updateError } = await supabase
          .from('site_assets')
          .update({ file_path: newPath })
          .eq('id', asset.id);
        if (updateError) throw updateError;
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
    startTransition(async () => {
      const supabase = createClientComponentClient();
      const { error: updateError } = await supabase
        .from('site_assets')
        .update({ is_active: !asset.is_active })
        .eq('id', asset.id);
      if (updateError) {
        setError(updateError.message);
        return;
      }
      router.refresh();
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
    <div className="rounded-lg border border-white/10 bg-slate-900/60 p-4 flex gap-4">
      <div className="w-24 h-24 rounded-md bg-slate-800 overflow-hidden relative">
        {asset.asset_type === 'image' && previewUrl ? (
          <Image
            src={previewUrl}
            alt={asset.key}
            fill
            sizes="96px"
            className="object-cover"
            unoptimized={previewUrl.toLowerCase().endsWith('.svg')}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
            {asset.asset_type}
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <div className="text-sm font-semibold text-white">{asset.key}</div>
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-slate-200">
            {resolvedPage}
          </span>
          <span className="rounded-full bg-blue-500/15 px-2 py-0.5 text-[11px] text-blue-100">
            {asset.asset_type}
          </span>
        </div>
        <div className="text-xs text-slate-400">{asset.description}</div>
        <div className="text-xs text-slate-500 mt-1">
          {asset.bucket}/{asset.file_path}
        </div>
        <div className="text-xs text-slate-400 mt-1">Papel: {roleLabel}</div>
        {error && <div className="text-xs text-red-400 mt-2">{error}</div>}
        <label className="mt-3 inline-flex items-center gap-2 text-xs text-blue-300 cursor-pointer">
          <input
            type="file"
            className="hidden"
            onChange={(e) => handleUpload(e.target.files?.[0] ?? null)}
            accept="image/*,video/*"
          />
          {isPending ? 'Enviando...' : 'Substituir arquivo'}
        </label>
        <AssetRoleMenu currentKey={asset.key} onSelectRole={handleRoleChange} />
        <div className="mt-2 text-xs text-slate-400">
          Status: {asset.is_active ? 'Ativo' : 'Inativo'}
        </div>
        <button
          type="button"
          onClick={toggleActive}
          className="mt-1 inline-flex items-center rounded-md border border-white/10 px-2 py-1 text-[11px] text-white hover:bg-white/10"
        >
          {asset.is_active ? 'Desativar' : 'Ativar'}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="ml-2 mt-1 inline-flex items-center rounded-md border border-red-500/60 px-2 py-1 text-[11px] text-red-200 hover:bg-red-500/10"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
