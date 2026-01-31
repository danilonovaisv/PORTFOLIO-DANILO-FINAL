interface SupabaseLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

const DEFAULT_SUPABASE_URL = 'https://umkmwbkwvulxtdodzmzf.supabase.co';
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.avif'];
const NON_TRANSFORM_EXTENSIONS = [
  '.svg',
  '.mp4',
  '.webm',
  '.mov',
  '.m4v',
  '.gif',
];

export default function supabaseLoader({
  src,
  width,
  quality,
}: SupabaseLoaderProps): string {
  const normalizedSrc = src.split('?')[0].toLowerCase();

  const appendParams = (url: string, w: number, q: number) => {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}width=${w}&quality=${q || 75}`;
  };

  // If the image is already a full URL, we need to extract the path or modify it.

  // 1. Handle local images (starting with /). Return as-is to avoid breaking them.
  // Next.js default loader would handle these if we weren't using a custom loader globally.
  // Since we are, returning src essentially serves the original asset.
  if (src.startsWith('/')) {
    return src;
  }

  // Skip transformation for non-image formats (videos, SVGs, GIFs)
  if (NON_TRANSFORM_EXTENSIONS.some((ext) => normalizedSrc.endsWith(ext))) {
    return src;
  }

  let projectId = '';
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl) {
    try {
      const url = new URL(supabaseUrl);
      const parts = url.hostname.split('.');
      if (parts.length > 0) {
        projectId = parts[0];
      }
    } catch (e) {
      console.error('Invalid NEXT_PUBLIC_SUPABASE_URL', e);
    }
  }

  // Fallback if env var is missing or we want to parse from src
  if (!projectId && src.includes('supabase.co')) {
    try {
      const url = new URL(src);
      const parts = url.hostname.split('.');
      if (parts.length > 0) {
        projectId = parts[0];
      }
    } catch {
      // ignore
    }
  }

  if (src.includes('/storage/v1/object/public/')) {
    const base = src.startsWith('http')
      ? src
      : `${DEFAULT_SUPABASE_URL}${src.startsWith('/') ? '' : '/'}${src}`;

    const isImage = IMAGE_EXTENSIONS.some((ext) => normalizedSrc.endsWith(ext));

    // Only apply Supabase image renderer for supported image extensions
    if (isImage) {
      const newSrc = base.replace(
        '/storage/v1/object/public/',
        '/storage/v1/render/image/public/'
      );
      return appendParams(newSrc, width, quality || 75);
    }

    // For other file types (e.g., video), serve the object URL untouched
    return base;
  }

  // If it matches the render/image pattern already, just append params
  if (src.includes('/storage/v1/render/image/public/')) {
    return appendParams(src, width, quality || 75);
  }

  // For relative paths (if any) that are NOT local paths (already handled),
  // construct the full Supabase URL.
  // This path is hit if `src` is something like 'my-bucket/image.png' (not starting with /)
  if (!src.startsWith('http') && projectId) {
    const isImage = IMAGE_EXTENSIONS.some((ext) => normalizedSrc.endsWith(ext));
    const prefix = isImage
      ? '/storage/v1/render/image/public/'
      : '/storage/v1/object/public/';
    const full = `https://${projectId}.supabase.co${prefix}${src}`;
    return isImage ? appendParams(full, width, quality || 75) : full;
  }

  // Fallback for non-Supabase images (return original)
  return src;
}
