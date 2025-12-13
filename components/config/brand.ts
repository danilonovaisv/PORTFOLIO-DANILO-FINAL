export interface FaviconsConfig {
  color: string;
  white: string;
}

export interface BrandAssets {
  logo: string;
  favicons: FaviconsConfig;
}

export const BRAND_ASSETS: BrandAssets = {
  logo: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/logo.svg',
  favicons: {
    color:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon.svg',
    white:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon-02.svg',
  },
};
