'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { logAdminAudit } from '@/lib/admin/audit';
import { requireAdminAccess } from '@/lib/admin/server-access';

const tagMutationSchema = z.object({
  id: z.string().uuid().optional(),
  label: z.string().trim().min(2).max(80),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(120)
    .regex(
      /^[a-z0-9-]+$/,
      'Slug deve conter apenas letras minúsculas, números e hífen.'
    ),
  kind: z.enum(['category', 'discipline', 'industry']).default('category'),
  description: z.string().trim().max(400).optional(),
  sort_order: z.number().int().min(0).max(9999).optional(),
});

export type TagMutationInput = z.infer<typeof tagMutationSchema>;

export async function upsertTagAction(input: TagMutationInput) {
  const parsed = tagMutationSchema.parse(input);
  const { supabase, user } = await requireAdminAccess();

  const { data, error } = await supabase
    .from('portfolio_tags')
    .upsert(parsed, { onConflict: 'id' })
    .select('id')
    .single();

  if (error) throw error;

  await logAdminAudit(supabase, user, {
    action: parsed.id ? 'tag.update' : 'tag.create',
    resource: 'portfolio_tags',
    resourceId: data?.id ?? parsed.id ?? null,
    status: 'success',
  });

  revalidatePath('/admin/tags');
  revalidatePath('/admin/trabalhos');

  return { ok: true as const };
}

export async function deleteTagAction(tagId: string) {
  const id = z.string().uuid().parse(tagId);
  const { supabase, user } = await requireAdminAccess();

  // Passo 1: Verificar projetos vinculados
  const { count, error: countError } = await supabase
    .from('portfolio_project_tags')
    .select('tag_id', { count: 'exact' })
    .eq('tag_id', id);

  if (countError) {
    await logAdminAudit(supabase, user, {
      action: 'tag.delete_check_links',
      resource: 'portfolio_tags',
      resourceId: id,
      status: 'error',
      errorMessage: countError.message,
    });
    throw countError; // Ou um erro mais amigável
  }

  if (count && count > 0) {
    const errorMessage = 'Não é possível deletar a tag: ela está vinculada a projetos.';
    await logAdminAudit(supabase, user, {
      action: 'tag.delete_prevented',
      resource: 'portfolio_tags',
      resourceId: id,
      status: 'error',
      errorMessage,
    });
    throw new Error(errorMessage);
  }

  // Passo 2: Prosseguir com a exclusão se não houver projetos vinculados
  const { error } = await supabase.from('portfolio_tags').delete().eq('id', id);
  if (error) {
    await logAdminAudit(supabase, user, {
      action: 'tag.delete',
      resource: 'portfolio_tags',
      resourceId: id,
      status: 'error',
      errorMessage: error.message,
    });
    throw error;
  }

  await logAdminAudit(supabase, user, {
    action: 'tag.delete',
    resource: 'portfolio_tags',
    resourceId: id,
    status: 'success',
  });

  revalidatePath('/admin/tags');
  revalidatePath('/admin/trabalhos');

  return { ok: true as const };
}
