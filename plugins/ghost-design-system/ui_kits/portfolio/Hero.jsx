// Hero — Home hero manifesto section
// Ghost Design System

function HomeHero({ onNavigate }) {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section style={{
      position: 'relative', width: '100%', minHeight: '100vh',
      background: COLORS.bg, overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Atmospheric background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 50% 40%, rgba(0,72,255,0.18) 0%, rgba(4,0,19,0) 60%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 30% 70%, rgba(135,5,242,0.08) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />

      {/* Ghost glow orb */}
      <div style={{
        position: 'absolute', width: 500, height: 500, borderRadius: '50%',
        background: 'rgba(0,72,255,0.15)', filter: 'blur(120px)',
        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        pointerEvents: 'none', opacity: loaded ? 1 : 0,
        transition: 'opacity 1.5s ease',
      }} />

      {/* Copy */}
      <div style={{
        position: 'relative', zIndex: 2, textAlign: 'center',
        padding: '0 32px', maxWidth: 900, width: '100%',
      }}>
        {/* Tag */}
        <div style={{
          fontFamily: "'PPSupplyMono', 'Space Mono', monospace",
          fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase',
          color: '#fcffff', opacity: 0.5, marginBottom: 32,
          transform: loaded ? 'translateY(0)' : 'translateY(18px)',
          opacity: loaded ? 0.5 : 0,
          transition: `all 0.8s ${EASE_GHOST} 0.1s`,
        }}>[BRAND AWARENESS]</div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: 'clamp(4rem, 9vw, 9rem)',
          fontWeight: 800, lineHeight: 0.92,
          letterSpacing: '-0.07em',
          color: '#fcffff', margin: '0 0 24px',
        }}>
          <span style={{
            display: 'block',
            transform: loaded ? 'translateY(0)' : 'translateY(18px)',
            opacity: loaded ? 1 : 0,
            filter: loaded ? 'blur(0)' : 'blur(10px)',
            transition: `all 1.2s ${EASE_GHOST} 0.2s`,
          }}>Você não vê</span>
          <span style={{
            display: 'block',
            transform: loaded ? 'translateY(0)' : 'translateY(18px)',
            opacity: loaded ? 1 : 0,
            filter: loaded ? 'blur(0)' : 'blur(10px)',
            transition: `all 1.2s ${EASE_GHOST} 0.32s`,
          }}>o design.</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: 'clamp(1.25rem, 3vw, 2rem)',
          fontWeight: 400, color: 'rgba(252,255,255,0.45)',
          letterSpacing: '0.02em', margin: '0 0 64px',
          transform: loaded ? 'translateY(0)' : 'translateY(18px)',
          opacity: loaded ? 0.45 : 0,
          transition: `all 0.8s ${EASE_GHOST} 0.4s`,
        }}>Mas ele vê você.</p>

        {/* CTA */}
        <div style={{
          transform: loaded ? 'translateY(0)' : 'translateY(18px)',
          opacity: loaded ? 1 : 0,
          transition: `all 0.8s ${EASE_GHOST} 0.55s`,
          display: 'flex', justifyContent: 'center',
        }}>
          <AntigravityCTA text="step inside" href="#" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        opacity: loaded ? 0.4 : 0, transition: `opacity 1s ease 1s`,
      }}>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.4))' }} />
        <span style={{ fontFamily: "'PPSupplyMono', monospace", fontSize: 8, letterSpacing: '0.2em', color: '#fcffff', textTransform: 'uppercase' }}>scroll</span>
      </div>
    </section>
  );
}

Object.assign(window, { HomeHero });
