import { ImageResponse } from 'next/og';
import { BRAND } from '@/config/brand';

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
 * Attempts to fetch the real OG image from Supabase Storage.
 * Falls back to an inline branded image if the network/DNS is unavailable
 * (e.g., CI without external access, local dev without Supabase reachable).
 */
const OG_IMAGE_URL =
  'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/portfolio-assets/assets-prop/og-image.png';

export default async function Image() {
  // Try to use the real Supabase-hosted image first
  try {
    const res = await fetch(OG_IMAGE_URL, { cache: 'force-cache' });
    if (res.ok) {
      const imageData = await res.arrayBuffer();
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
        { ...size }
      );
    }
  } catch {
    // Network/DNS unavailable — fall through to inline fallback
  }

  // Fallback: Ghost-branded inline OG image (same style as /portfolio, /sobre, /contato)
  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BRAND.colors.background,
        backgroundImage:
          'radial-gradient(circle at 50% 40%, #0048ff 0%, #040013 55%)',
      }}
    >
      <svg
        width="64"
        height="64"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginBottom: 32 }}
      >
        <path
          d="M9 11.2c0-1.2 1-2.2 2.2-2.2h12.2c6.4 0 11.6 5.2 11.6 11.6S29.8 32.2 23.4 32.2H11.2C10 32.2 9 31.2 9 30V11.2Z"
          stroke="white"
          strokeWidth="2"
          strokeOpacity="0.9"
        />
        <path
          d="M14 14l12 12M26 14 14 26"
          stroke="white"
          strokeWidth="1.6"
          strokeOpacity="0.55"
        />
      </svg>
      <h1
        style={{
          fontSize: 72,
          fontWeight: 900,
          color: 'white',
          margin: 0,
          marginBottom: 16,
          letterSpacing: '-0.04em',
          textAlign: 'center',
        }}
      >
        Danilo Novais
      </h1>
      <p
        style={{
          fontSize: 26,
          color: '#4fe6ff',
          margin: 0,
          letterSpacing: '0.12em',
          textAlign: 'center',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}
      >
        Head de Criação & Diretor de Criação Sênior
      </p>
    </div>,
    { ...size }
  );
}
