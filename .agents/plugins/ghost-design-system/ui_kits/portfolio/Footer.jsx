// Footer — Blue footer with copyright, nav, social icons
// Ghost Design System

function Footer({ onNavigate }) {
  const links = ['home', 'sobre', 'portfólio', 'contato', 'privacidade'];
  const socials = [
    { label: 'Instagram', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    )},
    { label: 'LinkedIn', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="3"/><line x1="7" y1="10" x2="7" y2="17"/><circle cx="7" cy="7" r="0.5" fill="currentColor"/><path d="M11 10v7M11 13.5c0-2 6-3 6 1v2.5"/>
      </svg>
    )},
    { label: 'Twitter', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M4 4l7.5 9.5L4 20h2l6.5-7.5L18 20h2L12.5 10 20 4h-2l-6 7L6 4z"/>
      </svg>
    )},
  ];

  return (
    <footer style={{
      width: '100%', background: COLORS.bluePrimary, color: '#fcffff',
      fontFamily: "'Manrope', sans-serif",
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '0 64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
        minHeight: 72,
      }}>
        <p style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', opacity: 0.9, margin: 0 }}>
          © 2025 Danilo Novais Vilela — todos os direitos reservados
        </p>
        <nav style={{ display: 'flex', gap: 28 }}>
          {links.map(link => (
            <button key={link} onClick={() => onNavigate && onNavigate(link === 'portfólio' ? 'portfolio' : link.replace('ó','o'))} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em',
              color: '#fcffff', opacity: 0.9, fontFamily: "'Manrope', sans-serif", padding: 0,
            }}>{link}</button>
          ))}
        </nav>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {socials.map(s => (
            <a key={s.label} href="#" aria-label={s.label} style={{ color: '#fcffff', opacity: 0.85, display: 'flex', alignItems: 'center' }}>
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Footer });
