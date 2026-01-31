 
import { ImageResponse } from 'next/og';
import { BRAND } from '@/config/brand';

export const dynamic = 'force-static';

// Image metadata
export const alt = 'Portfólio | Danilo Novais';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div style={styles.container}>
                <div style={styles.logoContainer}>
                    <svg
                        width="60"
                        height="60"
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

                <h1 style={styles.title}>Portfólio</h1>
                <p style={styles.subtitle}>Branding, Motion Design & Creative Development</p>

                <div style={styles.stats}>
                    <div style={styles.stat}>Experimental</div>
                    <div style={styles.statSeparator}>•</div>
                    <div style={styles.stat}>Premium</div>
                    <div style={styles.statSeparator}>•</div>
                    <div style={styles.stat}>Spectral</div>
                </div>
            </div>
        ),
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
        backgroundImage: 'radial-gradient(circle at 50% 50%, #0a0029 0%, #040013 70%)',
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
        fontSize: 80,
        fontWeight: 900,
        color: 'white',
        margin: 0,
        marginBottom: 16,
        letterSpacing: '-0.04em',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    subtitle: {
        fontSize: 28,
        color: '#8705f2',
        margin: 0,
        marginBottom: 60,
        letterSpacing: '0.2em',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 600,
    },
    stats: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 20,
        color: 'rgba(255, 255, 255, 0.4)',
        fontSize: 18,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
    },
    stat: {
        margin: '0 10px',
    },
    statSeparator: {
        opacity: 0.3,
    },
} as const;
