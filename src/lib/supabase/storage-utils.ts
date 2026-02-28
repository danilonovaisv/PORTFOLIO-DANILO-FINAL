import { SupabaseClient } from '@supabase/supabase-js';

export async function listAllFiles(
  supabase: SupabaseClient,
  bucket: string,
  prefix: string
): Promise<string[]> {
  const files: string[] = [];

  async function scan(currentPrefix: string) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(currentPrefix);
    if (error || !data) return;

    for (const item of data) {
      if (item.id === null) {
        // It's a folder (Supabase lists folders with id = null)
        await scan(`${currentPrefix}/${item.name}`);
      } else {
        files.push(`${currentPrefix}/${item.name}`);
      }
    }
  }

  await scan(prefix);
  return files;
}

/**
 * Move all files under `oldPrefix/` to `newPrefix/`.
 *
 * Uses anchored prefix matching (oldPrefix + '/') to prevent accidental
 * substitution when one project name is a prefix of another
 * (e.g. "brand/proj-abc" vs "brand/proj-abc-v2").
 */
export async function moveProjectFolder(
  supabase: SupabaseClient,
  bucket: string,
  oldPrefix: string,
  newPrefix: string
): Promise<{ moved: string[]; failed: string[] }> {
  const files = await listAllFiles(supabase, bucket, oldPrefix);
  if (files.length === 0) return { moved: [], failed: [] };

  const moved: string[] = [];
  const failed: string[] = [];

  for (const file of files) {
    // Anchored replacement: only substitute when oldPrefix is a true prefix
    // segment (followed by '/') to avoid "proj-abc" matching "proj-abc-v2".
    let newFilePath: string;
    if (file.startsWith(oldPrefix + '/')) {
      newFilePath = newPrefix + file.slice(oldPrefix.length);
    } else if (file === oldPrefix) {
      newFilePath = newPrefix;
    } else {
      // Path does not start with the expected prefix — skip to avoid corruption
      console.warn(`[storage-utils] Unexpected path skipped: ${file}`);
      continue;
    }

    const { error } = await supabase.storage
      .from(bucket)
      .move(file, newFilePath);

    if (error) {
      console.error(
        `[storage-utils] Error moving ${file} → ${newFilePath}`,
        error
      );
      failed.push(file);
    } else {
      moved.push(file);
    }
  }

  return { moved, failed };
}

export async function deleteProjectFolder(
  supabase: SupabaseClient,
  bucket: string,
  prefix: string
): Promise<{ deleted: number; failed: string[] }> {
  const files = await listAllFiles(supabase, bucket, prefix);
  if (files.length === 0) return { deleted: 0, failed: [] };

  const failed: string[] = [];
  let deleted = 0;

  // Storage API allows deleting multiple files at once — batch in chunks of 100
  for (let i = 0; i < files.length; i += 100) {
    const chunk = files.slice(i, i + 100);
    const { error } = await supabase.storage.from(bucket).remove(chunk);
    if (error) {
      console.error(`[storage-utils] Error deleting batch`, error);
      failed.push(...chunk);
    } else {
      deleted += chunk.length;
    }
  }

  return { deleted, failed };
}
