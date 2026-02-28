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

export async function moveProjectFolder(
  supabase: SupabaseClient,
  bucket: string,
  oldPrefix: string,
  newPrefix: string
) {
  const files = await listAllFiles(supabase, bucket, oldPrefix);
  if (files.length === 0) return;

  for (const file of files) {
    // Determine the new file path by replacing oldPrefix with newPrefix
    const newFilePath = file.replace(oldPrefix, newPrefix);
    const { error } = await supabase.storage
      .from(bucket)
      .move(file, newFilePath);
    if (error) {
      console.error(`Error moving ${file} to ${newFilePath}`, error);
    }
  }
}

export async function deleteProjectFolder(
  supabase: SupabaseClient,
  bucket: string,
  prefix: string
) {
  const files = await listAllFiles(supabase, bucket, prefix);
  if (files.length === 0) return;

  // Storage API allows deleting multiple files at once
  // Batch in chunks of 100 just in case
  for (let i = 0; i < files.length; i += 100) {
    const chunk = files.slice(i, i + 100);
    await supabase.storage.from(bucket).remove(chunk);
  }
}
