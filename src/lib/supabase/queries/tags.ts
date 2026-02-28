import { logAdminAudit } from '@/lib/admin/audit';
import { requireAdminAccess } from '@/lib/admin/server-access';
import { createClient } from '@/lib/supabase/server';
import type { TablesInsert } from '@/lib/supabase.types';
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

export async function upsertTag(payload: TablesInsert<'portfolio_tags'>) {
  const { supabase, user } = await requireAdminAccess();
  const { data, error } = await supabase
    .from('portfolio_tags')
    .upsert(payload, { onConflict: 'id' })
    .select()
    .single();

  if (error) {
    await logAdminAudit(supabase, user, {
      action: payload.id ? 'tag.update' : 'tag.create',
      resource: 'portfolio_tags',
      resourceId: payload.id ?? null,
      status: 'error',
      errorMessage: error.message,
    });
    throw error;
  }
  await logAdminAudit(supabase, user, {
    action: payload.id ? 'tag.update' : 'tag.create',
    resource: 'portfolio_tags',
    resourceId: data?.id ?? payload.id ?? null,
    status: 'success',
  });
  return data as DbTag;
}

export async function deleteTag(tagId: string) {
  const { supabase, user } = await requireAdminAccess();
  const { error } = await supabase
    .from('portfolio_tags')
    .delete()
    .eq('id', tagId);
  if (error) {
    await logAdminAudit(supabase, user, {
      action: 'tag.delete',
      resource: 'portfolio_tags',
      resourceId: tagId,
      status: 'error',
      errorMessage: error.message,
    });
    throw error;
  }
  await logAdminAudit(supabase, user, {
    action: 'tag.delete',
    resource: 'portfolio_tags',
    resourceId: tagId,
    status: 'success',
  });
}
