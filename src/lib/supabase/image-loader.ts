/**
 * Supabase Image Loader
 *
 * Logic:
 * 1. Return local/static paths as is.
 * 2. Return non-optimizable formats (SVG, GIF, ICO) as public objects.
 * 3. Return non-Supabase absolute URLs as is.
 * 4. Transform Supabase 'object' URLs to 'render' URLs for optimization.
 * 5. Handle environment variables robustly.
 */

export default function supabaseLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  // 1. Local/Internal Paths
  if (src.startsWith('/')) {
    return src;
  }

  // 2. Base Configuration (Cleaned)
  const supabaseUrl = (
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://aymuvxysygrwoicsjgxj.supabase.co'
  )
    .trim()
    .replace(/\/$/, ''); // Remove trailing slash if any

  // 3. Skip optimization for vector/animated formats
  const notOptimizable = ['.svg', '.gif', '.ico'];
  const isNotOptimizable = notOptimizable.some((ext) =>
    src.toLowerCase().split('?')[0].endsWith(ext)
  );

  // 4. Handle Absolute URLs
  if (src.startsWith('http')) {
    const isSupabase = src.startsWith(supabaseUrl);

    // If not Supabase, return as is
    if (!isSupabase) return src;

    // If Supabase but not optimizable, return with width as query param to satisfy Next.js warning
    if (isNotOptimizable) {
      const sep = src.includes('?') ? '&' : '?';
      return `${src}${sep}width=${width}`;
    }

    // If Supabase and already a 'render' URL, just update params
    if (src.includes('/storage/v1/render/image/public/')) {
      try {
        const url = new URL(src);
        url.searchParams.set('width', width.toString());
        url.searchParams.set('quality', (quality || 75).toString());
        return url.toString();
      } catch {
        return src;
      }
    }

    // If Supabase 'object' URL, do NOT transform to 'render' because it is returning 403.
    // Return original URL with width param for Next.js compatibility (though it might be ignored by Supabase storage)
    if (src.includes('/storage/v1/object/public/')) {
      const separator = src.includes('?') ? '&' : '?';
      return `${src}${separator}width=${width}&quality=${quality || 75}`;
    }

    return src;
  }

  // 5. Handle Relative/Project Storage Keys
  const key = src.startsWith('/') ? src.slice(1) : src;
  const baseUrl = `${supabaseUrl}/storage/v1/object/public/${key}`;

  if (isNotOptimizable) {
    return `${baseUrl}?width=${width}`;
  }

  // Return object URL for relative paths as well (avoid render 403)
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}width=${width}&quality=${quality || 75}`;
}
