interface SupabaseLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export default function supabaseLoader({ src, width, quality }: SupabaseLoaderProps): string {
  // If the image is already a full URL, we need to extract the path or modify it.
  
  // 1. Handle local images (starting with /). Return as-is to avoid breaking them.
  // Next.js default loader would handle these if we weren't using a custom loader globally.
  // Since we are, returning src essentially serves the original asset.
  if (src.startsWith('/')) {
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
        console.error("Invalid NEXT_PUBLIC_SUPABASE_URL", e);
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
      } catch (e) {
          // ignore
      }
  }

  // Helper to append params safely
  const appendParams = (url: string, w: number, q: number) => {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}width=${w}&quality=${q || 75}`;
  };

  // Logic to transform the URL
  // Current pattern: .../storage/v1/object/public/bucket/path/to/image.ext
  // Target pattern: .../storage/v1/render/image/public/bucket/path/to/image.ext?width=...

  if (src.includes('/storage/v1/object/public/')) {
    // Replace /object/ with /render/image/
    const newSrc = src.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/');
    return appendParams(newSrc, width, quality || 75);
  } 
  
  // If it matches the render/image pattern already, just append params
  if (src.includes('/storage/v1/render/image/public/')) {
     return appendParams(src, width, quality || 75);
  }

  // For relative paths (if any) that are NOT local paths (already handled), 
  // construct the full Supabase URL.
  // This path is hit if `src` is something like 'my-bucket/image.png' (not starting with /)
  if (!src.startsWith('http') && projectId) {
      return `https://${projectId}.supabase.co/storage/v1/render/image/public/${src}?width=${width}&quality=${quality || 75}`;
  }

  // Fallback for non-Supabase images (return original)
  return src;
}
