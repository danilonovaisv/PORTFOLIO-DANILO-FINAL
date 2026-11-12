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
import { moveInR2, deleteFromR2 } from '@/lib/storage/r2';
import { getD1Database } from '@/lib/d1/client';
import {
  deleteSiteAssetInD1,
  getSiteAssetByIdFromD1,
  getSiteAssetByKeyFromD1,
  healLandingPagesBucketInD1,
  toggleSiteAssetActiveInD1,
  updateSiteAssetFilePathInD1,
  updateSiteAssetRoleInD1,
  upsertSiteAssetInD1,
} from '@/lib/d1/admin';

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
  const d1 = await getD1Database();
  const normalizedPath = payload.file_path
    ? normalizeStoragePath(payload.file_path, payload.bucket ?? 'site-assets')
    : null;
  let filePath = normalizedPath;

  if (!filePath) {
    if (d1) {
      const existing = await getSiteAssetByKeyFromD1(d1, payload.key);
      filePath = existing?.file_path ?? null;
    } else {
      const { data: existing, error: existingError } = await supabase
        .from('site_assets')
        .select('file_path')
        .eq('key', payload.key)
        .maybeSingle();

      if (existingError) throw existingError;
      filePath = existing?.file_path ?? null;
    }
  }

  if (!filePath) {
    throw new Error(
      'SYSTEM_ERR: FILE_OR_EXISTING_PATH_REQUIRED — PROVIDE_ASSET_OR_KEEP_PATH'
    );
  }

  if (d1) {
    await upsertSiteAssetInD1(d1, {
      ...payload,
      file_path: filePath,
      bucket: payload.bucket ?? 'site-assets',
    });
    refreshAssetRoutes();
    return;
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
  const d1 = await getD1Database();

  const existing = d1
    ? await getSiteAssetByIdFromD1(d1, payload.assetId)
    : (
        await supabase
          .from('site_assets')
          .select('bucket,file_path')
          .eq('id', payload.assetId)
          .single()
      ).data;

  if (!existing) {
    throw new Error('SYSTEM_ERR: ASSET_NOT_FOUND');
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
    throw new Error('SYSTEM_ERR: INVALID_FILE_PATH — ASSET_MISSING_VALID_PATH');
  }

  if (file_path && file_path !== targetPath) {
    try {
      await moveInR2({
        bucket: existing.bucket,
        sourcePath: file_path,
        destinationPath: targetPath,
      });
      file_path = targetPath;
    } catch (moveError) {
      console.error('[assignAssetRole] R2 move failed:', moveError);
      throw moveError;
    }
  }

  if (d1) {
    await updateSiteAssetRoleInD1(d1, payload.assetId, {
      key: payload.role.key,
      page: payload.role.page,
      asset_type: payload.role.asset_type,
      description: payload.role.description,
      sort_order: payload.role.sort_order ?? null,
      file_path,
    });
    refreshAssetRoutes();
    return;
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
  const d1 = await getD1Database();

  if (payload.file_path) {
    const normalizedPath = normalizeStoragePath(
      payload.file_path,
      payload.bucket
    );
    if (normalizedPath) {
      try {
        await deleteFromR2({
          bucket: payload.bucket,
          path: normalizedPath,
        });
      } catch (storageError) {
        console.error('[removeAsset] Error deleting from R2:', storageError);
      }
    }
  }

  if (d1) {
    await deleteSiteAssetInD1(d1, payload.id);
    refreshAssetRoutes();
    return;
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
  const d1 = await getD1Database();
  const normalizedPath = normalizeStoragePath(
    payload.file_path,
    payload.bucket ?? 'site-assets'
  );

  if (!normalizedPath) {
    throw new Error(
      'SYSTEM_ERR: INVALID_FILE_PATH — ASSET_PATH_UPDATE_REJECTED'
    );
  }

  if (d1) {
    await updateSiteAssetFilePathInD1(d1, payload.id, normalizedPath);
    refreshAssetRoutes();
    return;
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
  const d1 = await getD1Database();

  if (d1) {
    await toggleSiteAssetActiveInD1(d1, payload.id, payload.is_active);
    refreshAssetRoutes();
    return;
  }

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
  const d1 = await getD1Database();

  if (d1) {
    const fixedCount = await healLandingPagesBucketInD1(d1);
    refreshAssetRoutes();
    return {
      success: true,
      fixedCount,
      message:
        fixedCount === 0
          ? 'SYSTEM_OK: NO_CORRUPT_LANDING_PAGE_BUCKETS_FOUND'
          : `SYSTEM_OK: ${fixedCount}_ASSETS_RECONSTRUCTED_SUCCESSFULLY`,
    };
  }

  const { data: corruptedAssets, error: fetchError } = await supabase
    .from('site_assets')
    .select('id, file_path')
    .eq('bucket', 'landing-pages');

  if (fetchError) {
    throw new Error(
      `SYSTEM_ERR: CORRUPT_ASSET_FETCH_FAILURE: ${fetchError.message}`
    );
  }

  if (!corruptedAssets || corruptedAssets.length === 0) {
    return {
      success: true,
      fixedCount: 0,
      message: 'SYSTEM_OK: NO_CORRUPT_LANDING_PAGE_BUCKETS_FOUND',
    };
  }

  let fixedCount = 0;

  const updatePromises = corruptedAssets.map(async (asset) => {
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
      return 1;
    }
    return 0;
  });

  const results = await Promise.all(updatePromises);
  fixedCount = results.reduce<number>((acc, curr) => acc + curr, 0);

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
    message: `SYSTEM_OK: ${fixedCount}_ASSETS_RECONSTRUCTED_SUCCESSFULLY`,
  };
}
