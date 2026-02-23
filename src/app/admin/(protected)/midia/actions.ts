'use server';

import type { SiteAssetRole } from '@/lib/supabase/asset-roles';
import {
  buildAssetFilePath,
  getFileExtension,
} from '@/lib/supabase/asset-paths';
import { logAdminAudit } from '@/lib/admin/audit';
import { requireAdminAccess } from '@/lib/admin/server-access';
import { normalizeStoragePath } from '@/lib/supabase/urls';
import { revalidatePath } from 'next/cache';

type AssetPayload = {
  key: string;
  page: string;
  asset_type: string;
  description?: string | null;
  sort_order?: number | null;
  file_path?: string | null;
  bucket?: string;
  metadata?: {
    position?: [number, number, number];
    scale?: [number, number, number];
    rotation?: [number, number, number];
    [key: string]: unknown;
  } | null;
};

export async function upsertAsset(payload: AssetPayload) {
  const { supabase, user } = await requireAdminAccess();
  const normalizedPath = payload.file_path
    ? normalizeStoragePath(payload.file_path, payload.bucket ?? 'site-assets')
    : null;
  let filePath = normalizedPath;

  if (!filePath) {
    const { data: existing, error: existingError } = await supabase
      .from('site_assets')
      .select('file_path')
      .eq('key', payload.key)
      .maybeSingle();

    if (existingError) throw existingError;
    filePath = existing?.file_path ?? null;
  }

  if (!filePath) {
    throw new Error(
      'Informe um arquivo para criar o asset ou mantenha um caminho existente.'
    );
  }

  const { error } = await supabase.from('site_assets').upsert(
    {
      ...payload,
      bucket: payload.bucket ?? 'site-assets',
      is_active: true,
      file_path: filePath,
    } as any,
    { onConflict: 'key' }
  );
  if (error) {
    await logAdminAudit(supabase, user, {
      action: 'asset.upsert',
      resource: 'site_assets',
      resourceId: payload.key,
      status: 'error',
      errorMessage: error.message,
    });
    throw error;
  }
  await logAdminAudit(supabase, user, {
    action: 'asset.upsert',
    resource: 'site_assets',
    resourceId: payload.key,
    status: 'success',
  });
  refreshAssetRoutes();
}

type AssignAssetRolePayload = {
  assetId: string;
  role: SiteAssetRole;
};

export async function assignAssetRole(payload: AssignAssetRolePayload) {
  const { supabase, user } = await requireAdminAccess();
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

  let file_path = currentPath ?? existing.file_path;

  if (!file_path) {
    throw new Error('Asset sem caminho de arquivo válido para atualização.');
  }

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
  await logAdminAudit(supabase, user, {
    action: 'asset.assign_role',
    resource: 'site_assets',
    resourceId: payload.assetId,
    status: 'success',
    metadata: { role: payload.role.key },
  });
  refreshAssetRoutes();
}

export async function removeAsset(payload: {
  id: string;
  bucket: string;
  file_path?: string | null;
}) {
  const { supabase, user } = await requireAdminAccess();
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
  if (error) {
    await logAdminAudit(supabase, user, {
      action: 'asset.delete',
      resource: 'site_assets',
      resourceId: payload.id,
      status: 'error',
      errorMessage: error.message,
    });
    throw error;
  }
  await logAdminAudit(supabase, user, {
    action: 'asset.delete',
    resource: 'site_assets',
    resourceId: payload.id,
    status: 'success',
  });
  refreshAssetRoutes();
}

export async function updateAssetFilePath(payload: {
  id: string;
  file_path: string;
  bucket?: string;
}) {
  const { supabase, user } = await requireAdminAccess();
  const normalizedPath = normalizeStoragePath(
    payload.file_path,
    payload.bucket ?? 'site-assets'
  );

  if (!normalizedPath) {
    throw new Error('Caminho de arquivo inválido para atualização do asset.');
  }

  const { error } = await supabase
    .from('site_assets')
    .update({ file_path: normalizedPath })
    .eq('id', payload.id);

  if (error) {
    await logAdminAudit(supabase, user, {
      action: 'asset.update_file_path',
      resource: 'site_assets',
      resourceId: payload.id,
      status: 'error',
      errorMessage: error.message,
    });
    throw error;
  }

  await logAdminAudit(supabase, user, {
    action: 'asset.update_file_path',
    resource: 'site_assets',
    resourceId: payload.id,
    status: 'success',
    metadata: { file_path: normalizedPath },
  });

  refreshAssetRoutes();
}

export async function toggleAssetActive(payload: {
  id: string;
  is_active: boolean;
}) {
  const { supabase, user } = await requireAdminAccess();
  const { error } = await supabase
    .from('site_assets')
    .update({ is_active: payload.is_active })
    .eq('id', payload.id);

  if (error) {
    await logAdminAudit(supabase, user, {
      action: 'asset.toggle_active',
      resource: 'site_assets',
      resourceId: payload.id,
      status: 'error',
      errorMessage: error.message,
    });
    throw error;
  }

  await logAdminAudit(supabase, user, {
    action: 'asset.toggle_active',
    resource: 'site_assets',
    resourceId: payload.id,
    status: 'success',
    metadata: { is_active: payload.is_active },
  });

  refreshAssetRoutes();
}

function refreshAssetRoutes() {
  revalidatePath('/');
  revalidatePath('/sobre');
  revalidatePath('/portfolio');
  revalidatePath('/admin/landing-pages', 'layout');
}

export async function healLandingPagesBucketAction() {
  const { supabase, user } = await requireAdminAccess();

  // 1. Busca todos os assets corrompidos
  const { data: corruptedAssets, error: fetchError } = await supabase
    .from('site_assets')
    .select('id, file_path')
    .eq('bucket', 'landing-pages');

  if (fetchError) {
    throw new Error(
      `Falha ao buscar assets corrompidos: ${fetchError.message}`
    );
  }

  if (!corruptedAssets || corruptedAssets.length === 0) {
    return {
      success: true,
      fixedCount: 0,
      message: 'Nenhum bucket landing-pages incorreto encontrado.',
    };
  }

  let fixedCount = 0;

  // 2. Corrige um a um para reescrever file_path junto com o bucket
  for (const asset of corruptedAssets) {
    // Se o file_path não tiver landing-pages/, devemos adicionar para não quebrar no storage real
    let newPath = asset.file_path || '';
    if (newPath && !newPath.startsWith('landing-pages/')) {
      newPath = `landing-pages/${newPath}`;
    }

    const { error: updateError } = await supabase
      .from('site_assets')
      .update({
        bucket: 'site-assets',
        file_path: newPath,
      })
      .eq('id', asset.id);

    if (!updateError) {
      fixedCount++;
    }
  }

  await logAdminAudit(supabase, user, {
    action: 'system.heal_landing_pages_bucket',
    resource: 'site_assets',
    resourceId: 'batch',
    status: 'success',
    metadata: { fixedCount },
  });

  refreshAssetRoutes();
  return {
    success: true,
    fixedCount,
    message: `${fixedCount} assets corrigidos com sucesso.`,
  };
}
