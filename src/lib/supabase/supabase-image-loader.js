// supabase-image-loader.js
const DEFAULT_SUPABASE_URL = 'https://aymuvxysygrwoicsjgxj.supabase.co';
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.avif'];
const NON_TRANSFORM_EXTENSIONS = [
  '.svg',
  '.mp4',
  '.webm',
  '.mov',
  '.m4v',
  '.gif',
];

export default function supabaseLoader({ src, width, quality }) {
  const normalizedSrc = src.split('?')[0].toLowerCase();

  if (src.startsWith('/')) return src;

  const appendParams = (url, w, q) => {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}width=${w}&quality=${q || 75}`;
  };

  if (NON_TRANSFORM_EXTENSIONS.some((ext) => normalizedSrc.endsWith(ext))) {
    return src;
  }

  if (src.includes('/storage/v1/object/public/')) {
    const base = src.startsWith('http')
      ? src
      : `${DEFAULT_SUPABASE_URL}${src.startsWith('/') ? '' : '/'}${src}`;
    const isImage = IMAGE_EXTENSIONS.some((ext) => normalizedSrc.endsWith(ext));
    if (isImage) {
      const newSrc = base.replace(
        '/storage/v1/object/public/',
        '/storage/v1/render/image/public/'
      );
      return appendParams(newSrc, width, quality || 75);
    }
    return base;
  }

  if (src.includes('/storage/v1/render/image/public/')) {
    return appendParams(src, width, quality || 75);
  }

  return src;
}
