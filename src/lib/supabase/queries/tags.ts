import { createClient } from '@/lib/supabase/server';
import type { DbTag } from '@/types/admin';

export async function listTags() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('portfolio_tags')
    .select('*')
    .order('sort_order', { ascending: true, nullsFirst: false });

  if (error) throw error;
  return data as DbTag[];
}

export async function upsertTag(payload: Partial<DbTag>) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('portfolio_tags')
    .upsert(payload, { onConflict: 'id' })
    .select()
    .single();

  if (error) throw error;
  return data as DbTag;
}

export async function deleteTag(tagId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('portfolio_tags')
    .delete()
    .eq('id', tagId);
  if (error) throw error;
}
