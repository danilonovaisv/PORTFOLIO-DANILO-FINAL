import { ImageResponse } from 'next/og';
import { BRAND } from '@/config/brand';

// export const runtime = 'edge'; // Removed to avoid conflict with force-static
export const dynamic = 'force-static'; // <--- ADICIONA ESTA LINHA

// Image metadata
export const alt = 'Danilo Novais | Creative Developer Portfolio';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    <div style={styles.container}>
      <div style={styles.logoContainer}>
        {/* Logo Mark Representation */}
        <svg
          width="80"
          height="80"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={styles.logoSvg}
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
      </div>

      <h1 style={styles.title}>Danilo Novais</h1>
      <p style={styles.subtitle}>Creative Developer & Interactive Designer</p>
    </div>,
    {
      ...size,
    }
  );
}

const styles = {
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BRAND.colors.background,
    fontFamily: BRAND.assets.fonts.primary,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  logoSvg: {
    marginRight: 0,
  },
  title: {
    fontSize: 64,
    fontWeight: 700,
    background: `linear-gradient(to bottom right, ${BRAND.colors.text} 0%, ${BRAND.colors.textHighlight} 100%)`,
    backgroundClip: 'text',
    color: 'transparent',
    margin: 0,
    marginBottom: 16,
    letterSpacing: '-0.03em',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 32,
    color: BRAND.colors.textSecondary,
    margin: 0,
    letterSpacing: '-0.01em',
    textAlign: 'center',
  },
} as const;
