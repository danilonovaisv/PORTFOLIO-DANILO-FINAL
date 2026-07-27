import { BRAND } from '@/config/brand';

export const dynamic = 'force-static';

// Image metadata
export const alt = 'Contato | Danilo Novais';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/svg+xml';

export default async function Image() {
  const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="${BRAND.colors.background}"/>
    <radialGradient id="gradContato" cx="90%" cy="90%" r="60%">
      <stop offset="0%" stop-color="#0048ff" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="${BRAND.colors.background}" stop-opacity="1"/>
    </radialGradient>
    <rect width="1200" height="630" fill="url(#gradContato)"/>
    <g transform="translate(570, 120) scale(1.5)">
      <path d="M9 11.2c0-1.2 1-2.2 2.2-2.2h12.2c6.4 0 11.6 5.2 11.6 11.6S29.8 32.2 23.4 32.2H11.2C10 32.2 9 31.2 9 30V11.2Z" stroke="white" stroke-width="2" stroke-opacity="0.9" fill="none"/>
      <path d="M14 14l12 12M26 14 14 26" stroke="white" stroke-width="1.6" stroke-opacity="0.55" fill="none"/>
    </g>
    <text x="600" y="320" font-family="system-ui, -apple-system, sans-serif" font-size="72" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="-0.03em">Vamos Conversar?</text>
    <text x="600" y="390" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="500" fill="#0048ff" text-anchor="middle" letter-spacing="0.15em">BRANDING • MOTION • CREATIVE DEVELOPMENT</text>
    <text x="600" y="470" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-style="italic" fill="rgba(255, 255, 255, 0.5)" text-anchor="middle">Contato direto para projetos criativos</text>
  </svg>`;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}

