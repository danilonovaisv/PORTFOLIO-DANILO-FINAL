import type { ImageLoader } from 'next/image';

// Converts Supabase Storage object URLs to Supabase Image Transformation render URLs,
// appending width and quality params for CDN-native optimization.
// Non-Supabase URLs are returned unchanged.
const supabaseImageLoader: ImageLoader = ({ src, width, quality }) => {
  if (!src.includes('/storage/v1/object/public/')) {
    // Para imagens locais ou externas que não são do Supabase,
    // adicionamos parâmetros fictícios de largura e qualidade. Isso resolve a verificação
    // de sanidade do Next.js em tempo de desenvolvimento que exige que o loader global
    // retorne URLs distintas para larguras distintas (evitando o aviso de que o loader
    // "does not implement width"). Os arquivos locais estáticos ignoram estes parâmetros.
    try {
      const url = new URL(
        src,
        typeof window !== 'undefined'
          ? window.location.origin
          : 'http://localhost'
      );
      url.searchParams.set('w', String(width));
      if (quality) {
        url.searchParams.set('q', String(quality));
      }
      return src.startsWith('/')
        ? `${url.pathname}${url.search}`
        : url.toString();
    } catch {
      return src;
    }
  }
  const renderSrc = src.replace(
    '/storage/v1/object/public/',
    '/storage/v1/render/image/public/'
  );
  const url = new URL(renderSrc);
  url.searchParams.set('width', String(width));
  url.searchParams.set('quality', String(quality ?? 80));
  return url.toString();
};

export default supabaseImageLoader;
