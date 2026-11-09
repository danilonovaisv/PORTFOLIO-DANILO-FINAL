import { listFromR2, moveInR2, deleteManyFromR2 } from '@/lib/storage/r2';

/**
 * List all files in Cloudflare R2 under a given bucket and prefix.
 * The `_supabase` parameter is preserved for API compatibility with existing callers.
 */
export async function listAllFiles(
  _supabase: unknown,
  bucket: string,
  prefix: string
): Promise<string[]> {
  try {
    return await listFromR2({ bucket, prefix });
  } catch (err) {
    console.error(
      `[storage-utils] Error listing files from R2 (${bucket}/${prefix}):`,
      err
    );
    return [];
  }
}

/**
 * Move all files under `oldPrefix/` to `newPrefix/` in Cloudflare R2.
 *
 * Uses anchored prefix matching (oldPrefix + '/') to prevent accidental
 * substitution when one project name is a prefix of another
 * (e.g. "brand/proj-abc" vs "brand/proj-abc-v2").
 */
export async function moveProjectFolder(
  _supabase: unknown,
  bucket: string,
  oldPrefix: string,
  newPrefix: string
): Promise<{ moved: string[]; failed: string[] }> {
  const files = await listAllFiles(_supabase, bucket, oldPrefix);
  if (files.length === 0) return { moved: [], failed: [] };

  const moved: string[] = [];
  const failed: string[] = [];

  for (const file of files) {
    let newFilePath: string;
    if (file.startsWith(oldPrefix + '/')) {
      newFilePath = newPrefix + file.slice(oldPrefix.length);
    } else if (file === oldPrefix) {
      newFilePath = newPrefix;
    } else {
      console.warn(`[storage-utils] Unexpected path skipped: ${file}`);
      continue;
    }

    try {
      await moveInR2({
        bucket,
        sourcePath: file,
        destinationPath: newFilePath,
      });
      moved.push(file);
    } catch (error) {
      console.error(
        `[storage-utils] Error moving in R2: ${file} → ${newFilePath}`,
        error
      );
      failed.push(file);
    }
  }

  return { moved, failed };
}

/**
 * Batch delete files from Cloudflare R2.
 */
export async function deleteStorageFiles(
  _supabase: unknown,
  bucket: string,
  files: string[]
): Promise<{ deleted: number; failed: string[] }> {
  if (files.length === 0) return { deleted: 0, failed: [] };

  try {
    const result = await deleteManyFromR2({
      bucket,
      paths: files,
    });
    return {
      deleted: result.deletedCount,
      failed: result.failed,
    };
  } catch (error) {
    console.error(`[storage-utils] Error deleting batch from R2:`, error);
    return { deleted: 0, failed: files };
  }
}

/**
 * Delete all files in a folder prefix in Cloudflare R2.
 */
export async function deleteProjectFolder(
  _supabase: unknown,
  bucket: string,
  prefix: string
): Promise<{ deleted: number; failed: string[] }> {
  const files = await listAllFiles(_supabase, bucket, prefix);
  return deleteStorageFiles(_supabase, bucket, files);
}
