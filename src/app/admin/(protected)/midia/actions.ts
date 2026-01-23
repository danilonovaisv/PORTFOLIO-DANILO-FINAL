'use server';

import type { SiteAssetRole } from '@/lib/supabase/asset-roles';
import {
  buildAssetFilePath,
  getFileExtension,
} from '@/lib/supabase/asset-paths';
import { normalizeStoragePath } from '@/lib/supabase/urls';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

type AssetPayload = {
  key: string;
  page: string;
  asset_type: string;
  description?: string | null;
  sort_order?: number | null;
  file_path?: string | null;
  bucket?: string;
};

export async function upsertAsset(payload: AssetPayload) {
  const supabase = await createClient();
  const normalizedPath = payload.file_path
    ? normalizeStoragePath(payload.file_path, payload.bucket ?? 'site-assets')
    : null;
  const { error } = await supabase.from('site_assets').upsert(
    {
      ...payload,
      bucket: payload.bucket ?? 'site-assets',
      is_active: true,
      file_path: normalizedPath,
    },
    { onConflict: 'key' }
  );
  if (error) throw error;
  refreshAssetRoutes();
}

type AssignAssetRolePayload = {
  assetId: string;
  role: SiteAssetRole;
};

export async function assignAssetRole(payload: AssignAssetRolePayload) {
  const supabase = await createClient();
  const { data: existing, error: fetchError } = await supabase
    .from('site_assets')
    .select('bucket,file_path')
    .eq('id', payload.assetId)
    .single();

  if (fetchError || !existing) {
    throw fetchError ?? new Error('Asset não encontrado.');
  }

  const currentPath = normalizeStoragePath(existing.file_path, existing.bucket);
  const extension = getFileExtension(currentPath) || 'bin';
  const targetPath = buildAssetFilePath({
    page: payload.role.page,
    key: payload.role.key,
    subPath: payload.role.subPath,
    extension,
  });

  let file_path = currentPath;

  if (file_path && file_path !== targetPath) {
    const { error: moveError } = await supabase.storage
      .from(existing.bucket)
      .move(file_path, targetPath);
    if (moveError) throw moveError;
    file_path = targetPath;
  }

  const { error: updateError } = await supabase
    .from('site_assets')
    .update({
      key: payload.role.key,
      page: payload.role.page,
      asset_type: payload.role.asset_type,
      description: payload.role.description,
      sort_order: payload.role.sort_order ?? null,
      file_path,
    })
    .eq('id', payload.assetId);

  if (updateError) throw updateError;
  refreshAssetRoutes();
}

export async function removeAsset(payload: {
  id: string;
  bucket: string;
  file_path?: string | null;
}) {
  const supabase = await createClient();
  if (payload.file_path) {
    const normalizedPath = normalizeStoragePath(
      payload.file_path,
      payload.bucket
    );
    if (normalizedPath) {
      const { error: storageError } = await supabase.storage
        .from(payload.bucket)
        .remove([normalizedPath]);
      if (storageError) throw storageError;
    }
  }
  const { error } = await supabase
    .from('site_assets')
    .delete()
    .eq('id', payload.id);
  if (error) throw error;
  refreshAssetRoutes();
}

function refreshAssetRoutes() {
  revalidatePath('/');
  revalidatePath('/about');
  revalidatePath('/portfolio');
}
