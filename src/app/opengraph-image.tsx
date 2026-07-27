import { BRAND } from '@/config/brand';

export const dynamic = 'force-static';

// Image metadata
export const alt =
  'Danilo Novais | Head de Criação & Diretor de Criação Sênior';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/svg+xml';

/**
 * OG Image for the root page.
 * Returns a lightweight SVG Response to prevent bundling @vercel/og (resvg.wasm) into Cloudflare Worker.
 */
export default async function Image() {
  const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="${BRAND.colors.background}"/>
    <radialGradient id="grad" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#0048ff" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="${BRAND.colors.background}" stop-opacity="1"/>
    </radialGradient>
    <rect width="1200" height="630" fill="url(#grad)"/>
    <g transform="translate(568, 140) scale(1.6)">
      <path d="M9 11.2c0-1.2 1-2.2 2.2-2.2h12.2c6.4 0 11.6 5.2 11.6 11.6S29.8 32.2 23.4 32.2H11.2C10 32.2 9 31.2 9 30V11.2Z" stroke="white" stroke-width="2" stroke-opacity="0.9" fill="none"/>
      <path d="M14 14l12 12M26 14 14 26" stroke="white" stroke-width="1.6" stroke-opacity="0.55" fill="none"/>
    </g>
    <text x="600" y="340" font-family="system-ui, -apple-system, sans-serif" font-size="72" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="-0.04em">Danilo Novais</text>
    <text x="600" y="410" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="500" fill="#4fe6ff" text-anchor="middle" letter-spacing="0.12em">HEAD DE CRIAÇÃO &amp; DIRETOR DE CRIAÇÃO SÊNIOR</text>
  </svg>`;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
