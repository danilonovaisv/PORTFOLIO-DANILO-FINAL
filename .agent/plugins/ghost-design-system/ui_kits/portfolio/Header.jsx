// Header — Fluid Glass Pill nav + Mobile header bar
// Ghost Design System

function Header({ activePage = 'home', onNavigate }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navItems = [
    { label: 'home', href: 'home' },
    { label: 'sobre', href: 'sobre' },
    { label: 'portfólio', href: 'portfolio' },
    { label: 'contato', href: 'contact' },
  ];

  const handleNav = (href) => {
    setMenuOpen(false);
    onNavigate && onNavigate(href);
  };

  return (
    <>
      {/* Desktop Header */}
      <header style={{
        position: 'fixed', top: 24, left: 0, right: 0, zIndex: 55,
        display: 'flex', justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <div style={{ maxWidth: 1280, width: '100%', padding: '0 48px', pointerEvents: 'none' }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            height: 60, padding: '0 36px',
            borderRadius: 9999,
            background: scrolled ? 'rgba(4,0,19,0.7)' : 'rgba(4,0,19,0.45)',
            border: '1px solid rgba(255,255,255,0.10)',
            backdropFilter: 'blur(14px)',
            boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.4)' : '0 4px 24px rgba(0,0,0,0.2)',
            position: 'relative', overflow: 'hidden',
            transition: `all 0.3s ${EASE_GHOST}`,
            pointerEvents: 'all',
          }}>
            {/* Glow layer */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: 9999,
              background: 'radial-gradient(circle at 50% -10%, rgba(0,72,255,0.22), transparent 65%)',
              pointerEvents: 'none',
            }} />

            {/* Logo */}
            <button onClick={() => handleNav('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
              <img src="../../assets/LogoDark.svg" alt="Danilo" style={{ height: 28, display: 'block' }}
                onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
              <span style={{ display: 'none', fontWeight: 800, fontSize: 18, color: '#fcffff', letterSpacing: '-0.04em', fontFamily: "'Manrope', sans-serif" }}>danilo</span>
            </button>

            {/* Nav */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: 28, position: 'relative', zIndex: 1 }}>
              {navItems.map(item => {
                const isActive = activePage === item.href;
                return (
                  <button key={item.href} onClick={() => handleNav(item.href)} style={{
                    background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
                    fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? COLORS.bluePrimary : 'rgba(255,255,255,0.55)',
                    position: 'relative', fontFamily: "'Manrope', sans-serif",
                    transition: `color 0.2s ${EASE_GHOST}`,
                  }}>
                    {item.label}
                    {isActive && <span style={{ position: 'absolute', bottom: -2, left: 0, width: '100%', height: 1, background: COLORS.bluePrimary }} />}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 90,
          background: 'rgba(4,0,19,0.97)', backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40,
        }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: '#fcffff', fontSize: 28, cursor: 'pointer' }}>✕</button>
          {navItems.map(item => (
            <button key={item.href} onClick={() => handleNav(item.href)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 32, fontWeight: 800, color: activePage === item.href ? COLORS.bluePrimary : '#fcffff',
              fontFamily: "'Manrope', sans-serif", letterSpacing: '-0.03em',
            }}>{item.label}</button>
          ))}
        </div>
      )}
    </>
  );
}

Object.assign(window, { Header });
