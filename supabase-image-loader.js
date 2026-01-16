// supabase-image-loader.js
export default function supabaseLoader({ src, width, quality }) {
  if (src.startsWith('/')) return src;
  if (src.endsWith('.svg')) return src;

  const appendParams = (url, w, q) => {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}width=${w}&quality=${q || 75}`;
  };

  if (src.includes('/storage/v1/object/public/')) {
    const newSrc = src.replace(
      '/storage/v1/object/public/',
      '/storage/v1/render/image/public/'
    );
    return appendParams(newSrc, width, quality || 75);
  }

  return src;
}
