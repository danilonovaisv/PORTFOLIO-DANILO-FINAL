export default function supabaseLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  // 1. Return local paths as-is
  if (src.startsWith('/')) {
    return src;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  let urlStr = src;

  // 3. Handle relative paths (assume they are keys in the public bucket)
  if (!src.startsWith('http')) {
    if (!supabaseUrl) {
      // If we don't have a base URL, we can't construct a full URL, but
      // for the sake of not crashing, we return src.
      return src;
    }
    // Construct base render URL
    // Pattern: https://<project>.supabase.co/storage/v1/render/image/public/<path>
    // Remove leading slash if present to avoid double slash
    const cleanSrc = src.startsWith('/') ? src.slice(1) : src;
    urlStr = `${supabaseUrl}/storage/v1/render/image/public/${cleanSrc}`;
  } else {
    // 2. Return non-Supabase URLs as is
    // We check if it contains the supabase URL or generic supabase pattern
    // The test says "returns original src for non-Supabase URLs" referencing 'example.com'
    // But we need to identify what IS a Supabase URL.
    // If supabaseUrl is defined, we can check against it.
    if (supabaseUrl && !src.startsWith(supabaseUrl)) {
      return src;
    }
    // If supabaseUrl is not defined, strictly we can't know for sure, 
    // but we can look for the standard path structure /storage/v1/...
  }

  // 4 & 5. Transform object URL to render URL
  // Object URL: .../storage/v1/object/public/...
  // Render URL: .../storage/v1/render/image/public/...
  
  // Use URL object to parse and modify (handles query params automatically)
  try {
    const url = new URL(urlStr);
    
    // Check if it is a Supabase Storage URL
    if (url.pathname.includes('/storage/v1/object/public/')) {
      url.pathname = url.pathname.replace(
        '/storage/v1/object/public/',
        '/storage/v1/render/image/public/'
      );
    }

    // Only append params if it is a render URL (either originally or after transformation)
    // The test implies we modify valid supabase paths.
    if (url.pathname.includes('/storage/v1/render/image/public/')) {
        url.searchParams.set('width', width.toString());
        url.searchParams.set('quality', (quality || 75).toString());
        return url.toString();
    }
    
    // If it was a supabase URL but didn't match the patterns (e.g. invalid path?),
    // or we decided it wasn't a supabase URL above, return as is.
    return src;

  } catch {
    // If URL parsing fails (shouldn't given logic above), return original
    return src;
  }
}
