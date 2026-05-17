import type { ImageLoader } from 'next/image';

// Converts Supabase Storage object URLs to Supabase Image Transformation render URLs,
// appending width and quality params for CDN-native optimization.
// Non-Supabase URLs are returned unchanged.
const supabaseImageLoader: ImageLoader = ({ src, width, quality }) => {
  if (!src.includes('/storage/v1/object/public/')) {
    return src;
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
