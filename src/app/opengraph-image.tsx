import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

// Image metadata
export const alt =
  'Danilo Novais | Head de Criação & Diretor de Criação Sênior';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

/**
 * OG Image for the root page.
 * Fetches the real OG image from Supabase Storage and returns it as an ImageResponse.
 * This ensures the /opengraph-image endpoint serves the actual branded asset.
 */
const OG_IMAGE_URL =
  'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/portfolio-assets/assets-prop/og-image.png';

export default async function Image() {
  const imageData = await fetch(OG_IMAGE_URL).then((res) => res.arrayBuffer());

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={`data:image/png;base64,${Buffer.from(imageData).toString('base64')}`}
        alt="Danilo Novais | Head de Criação & Diretor de Criação Sênior"
        width={1200}
        height={630}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>,
    {
      ...size,
    }
  );
}
