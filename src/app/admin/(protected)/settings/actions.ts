'use server';

import { requireAdminAccess } from '@/lib/admin/server-access';
import { revalidatePath } from 'next/cache';
import { logAdminAudit } from '@/lib/admin/audit';

export async function saveOpenAIKey(key: string) {
  try {
    const { supabase, user } = await requireAdminAccess({
      requireServiceRole: true,
    });

    // Try to update or insert the API key in site_settings
    const { error } = await supabase.from('site_settings').upsert(
      {
        key: 'openai_api_key',
        value: { key },
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'key' }
    );

    if (error) {
      console.error('Failed to save OpenAI API Key', error);
      return { ok: false, error: error.message };
    }

    await logAdminAudit(supabase, user, {
      action: 'settings.update',
      resource: 'site_settings',
      status: 'success',
      metadata: { key: 'openai_api_key' },
    });

    revalidatePath('/admin/settings');
    return { ok: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return { ok: false, error: msg };
  }
}

export async function removeOpenAIKey() {
  try {
    const { supabase, user } = await requireAdminAccess({
      requireServiceRole: true,
    });

    const { error } = await supabase
      .from('site_settings')
      .delete()
      .eq('key', 'openai_api_key');

    if (error) {
      console.error('Failed to remove OpenAI API Key', error);
      return { ok: false, error: error.message };
    }

    await logAdminAudit(supabase, user, {
      action: 'settings.delete',
      resource: 'site_settings',
      status: 'success',
      metadata: { key: 'openai_api_key' },
    });

    revalidatePath('/admin/settings');
    return { ok: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return { ok: false, error: msg };
  }
}
