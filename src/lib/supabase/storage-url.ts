/**
 * Helper to build Supabase Storage URLs dynamically.
 * Use this instead of hardcoding Supabase project URLs.
 */
import { getSupabaseBaseUrl } from '@/lib/supabase/urls';

export function getSupabaseStorageUrl(path: string): string {
  const baseUrl = getSupabaseBaseUrl();
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  if (!baseUrl) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        'Supabase base URL is required in production. Configure NEXT_PUBLIC_SUPABASE_URL.'
      );
    }
    return `/storage/v1/object/public/${cleanPath}`;
  }

  return `${baseUrl}/storage/v1/object/public/${cleanPath}`;
}
