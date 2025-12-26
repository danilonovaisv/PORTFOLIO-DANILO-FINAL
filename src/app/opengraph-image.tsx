import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Image metadata
export const alt = 'Danilo Novais | Creative Developer Portfolio';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#050505',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 40,
        }}
      >
        {/* Logo Mark Representation */}
        <svg
          width="80"
          height="80"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginRight: 0 }}
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

      <h1
        style={{
          fontSize: 64,
          fontWeight: 700,
          background:
            'linear-gradient(to bottom right, #ffffff 0%, #a5a5a5 100%)',
          backgroundClip: 'text',
          color: 'transparent',
          margin: 0,
          marginBottom: 16,
          letterSpacing: '-0.03em',
          textAlign: 'center',
        }}
      >
        Danilo Novais
      </h1>
      <p
        style={{
          fontSize: 32,
          color: '#888888',
          margin: 0,
          letterSpacing: '-0.01em',
          textAlign: 'center',
        }}
      >
        Creative Developer & Interactive Designer
      </p>
    </div>,
    {
      ...size,
    }
  );
}
