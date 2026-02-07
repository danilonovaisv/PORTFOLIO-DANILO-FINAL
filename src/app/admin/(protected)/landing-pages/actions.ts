'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { logAdminAudit } from '@/lib/admin/audit';
import { requireAdminAccess } from '@/lib/admin/server-access';

const landingPageMutationSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(3).max(160),
  slug: z
    .string()
    .trim()
    .min(3)
    .max(180)
    .regex(
      /^[a-z0-9-]+$/,
      'Slug deve conter apenas letras minúsculas, números e hífen.'
    ),
  cover: z.string().trim().max(600).optional(),
  content: z.unknown(),
});

export type SaveLandingPageInput = z.infer<typeof landingPageMutationSchema>;

export async function listLandingPagesAction() {
  const { supabase } = await requireAdminAccess();
  const { data, error } = await supabase
    .from('landing_pages')
    .select('id, title, slug, created_at, content')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getLandingPageAction(id: string) {
  const parsedId = z.string().uuid().parse(id);
  const { supabase } = await requireAdminAccess();
  const { data, error } = await supabase
    .from('landing_pages')
    .select('id, title, slug, cover, content')
    .eq('id', parsedId)
    .single();

  if (error) throw error;
  return data;
}

export async function saveLandingPageAction(input: SaveLandingPageInput) {
  const parsed = landingPageMutationSchema.parse(input);
  const { supabase, user } = await requireAdminAccess();

  const payload = {
    title: parsed.title,
    slug: parsed.slug,
    cover: parsed.cover ?? '',
    content: parsed.content,
  };

  if (parsed.id) {
    const { error } = await supabase
      .from('landing_pages')
      .update(payload)
      .eq('id', parsed.id);

    if (error) {
      await logAdminAudit(supabase, user, {
        action: 'landing_page.update',
        resource: 'landing_pages',
        resourceId: parsed.id,
        status: 'error',
        errorMessage: error.message,
      });
      throw error;
    }

    await logAdminAudit(supabase, user, {
      action: 'landing_page.update',
      resource: 'landing_pages',
      resourceId: parsed.id,
      status: 'success',
    });
  } else {
    const { data, error } = await supabase
      .from('landing_pages')
      .insert({
        ...payload,
        created_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (error) {
      await logAdminAudit(supabase, user, {
        action: 'landing_page.create',
        resource: 'landing_pages',
        status: 'error',
        errorMessage: error.message,
      });
      throw error;
    }

    await logAdminAudit(supabase, user, {
      action: 'landing_page.create',
      resource: 'landing_pages',
      resourceId: data?.id ?? null,
      status: 'success',
    });
  }

  revalidatePath('/admin/landing-pages');
  revalidatePath('/portfolio');
  return { ok: true as const };
}

export async function deleteLandingPageAction(id: string) {
  const parsedId = z.string().uuid().parse(id);
  const { supabase, user } = await requireAdminAccess();
  const { error } = await supabase
    .from('landing_pages')
    .delete()
    .eq('id', parsedId);

  if (error) {
    await logAdminAudit(supabase, user, {
      action: 'landing_page.delete',
      resource: 'landing_pages',
      resourceId: parsedId,
      status: 'error',
      errorMessage: error.message,
    });
    throw error;
  }

  await logAdminAudit(supabase, user, {
    action: 'landing_page.delete',
    resource: 'landing_pages',
    resourceId: parsedId,
    status: 'success',
  });

  revalidatePath('/admin/landing-pages');
  revalidatePath('/portfolio');
  return { ok: true as const };
}
