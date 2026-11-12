'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { logAdminAudit } from '@/lib/admin/audit';
import { requireAdminAccess } from '@/lib/admin/server-access';
import type { TablesInsert, TablesUpdate } from '@/lib/supabase.types';
import { landingPageMutationSchema } from '@/lib/admin/schemas/landing-page';
import { getD1Database } from '@/lib/d1/client';
import {
  deleteLandingPageInD1,
  saveLandingPageInD1,
} from '@/lib/d1/admin';

export type SaveLandingPageInput = z.infer<typeof landingPageMutationSchema>;

function parseContentJson(raw: unknown) {
  if (typeof raw !== 'string') return raw;
  try {
    return JSON.parse(raw || '[]');
  } catch {
    return [];
  }
}

export async function listLandingPagesAction() {
  await requireAdminAccess();

  const d1 = await getD1Database();
  if (d1) {
    const { results } = await d1
      .prepare(
        'SELECT id, title, slug, created_at, content FROM landing_pages ORDER BY created_at DESC'
      )
      .all<Record<string, unknown>>();
    return (results ?? []).map((row) => ({
      ...row,
      content: parseContentJson(row.content),
    }));
  }

  const { supabase } = await requireAdminAccess();
  const { data, error } = await supabase
    .from('landing_pages')
    .select('id, title, slug, created_at, content')
    .order('created_at', { ascending: false });

  if (error) {
    console.warn('[listLandingPagesAction] Supabase query warning:', error.message);
    return [];
  }
  return data ?? [];
}

export async function getLandingPageAction(id: string) {
  const parsedId = z.string().uuid().parse(id);
  const { supabase } = await requireAdminAccess();

  const d1 = await getD1Database();
  if (d1) {
    const row = await d1
      .prepare('SELECT id, title, slug, cover, content FROM landing_pages WHERE id = ? LIMIT 1')
      .bind(parsedId)
      .first<{
        id: string;
        title: string;
        slug: string;
        cover: string | null;
        content: unknown;
      }>();
    if (row) {
      return {
        id: row.id,
        title: row.title,
        slug: row.slug,
        cover: row.cover,
        content: parseContentJson(row.content),
      };
    }
    return null;
  }

  const { data, error } = await supabase
    .from('landing_pages')
    .select('id, title, slug, cover, content')
    .eq('id', parsedId)
    .single();

  if (error) return null;
  return data;
}

export async function saveLandingPageAction(input: SaveLandingPageInput) {
  const parsed = landingPageMutationSchema.parse(input);
  const { supabase, user } = await requireAdminAccess({
    requireServiceRole: true,
  });

  const d1 = await getD1Database();
  if (d1) {
    const result = await saveLandingPageInD1(d1, {
      id: parsed.id,
      title: parsed.title,
      slug: parsed.slug,
      cover: parsed.cover ?? null,
      content: parsed.content,
    });

    revalidatePath('/admin/landing-pages');
    revalidatePath('/portfolio');
    revalidatePath('/');
    revalidatePath(`/projects/${parsed.slug}`);
    return { ok: true as const, id: result.id };
  }

  const payload: TablesUpdate<'landing_pages'> = {
    title: parsed.title,
    slug: parsed.slug,
    cover: parsed.cover ?? null,
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

    revalidatePath('/admin/landing-pages');
    revalidatePath('/portfolio');
    revalidatePath('/');
    revalidatePath(`/projects/${parsed.slug}`);
    return { ok: true as const, id: parsed.id };
  }

  const insertPayload: TablesInsert<'landing_pages'> = {
    title: parsed.title,
    slug: parsed.slug,
    cover: parsed.cover ?? null,
    content: parsed.content,
    created_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('landing_pages')
    .insert(insertPayload)
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

  revalidatePath('/admin/landing-pages');
  revalidatePath('/portfolio');
  revalidatePath('/');
  revalidatePath(`/projects/${parsed.slug}`);
  return { ok: true as const, id: data.id };
}

export async function deleteLandingPageAction(id: string) {
  const parsedId = z.string().uuid().parse(id);
  const { supabase, user } = await requireAdminAccess({
    requireServiceRole: true,
  });

  const d1 = await getD1Database();
  if (d1) {
    const existing = await deleteLandingPageInD1(d1, parsedId);
    revalidatePath('/admin/landing-pages');
    revalidatePath('/portfolio');
    revalidatePath('/');
    if (existing?.slug) {
      revalidatePath(`/projects/${existing.slug}`);
    }
    return { ok: true as const };
  }

  const { data: existing } = await supabase
    .from('landing_pages')
    .select('slug')
    .eq('id', parsedId)
    .maybeSingle();

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
  revalidatePath('/');
  if (existing?.slug) {
    revalidatePath(`/projects/${existing.slug}`);
  }
  return { ok: true as const };
}
