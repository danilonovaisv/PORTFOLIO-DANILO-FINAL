// PortfolioShowcase — Category stripes + full Portfolio page
// Ghost Design System

const CATEGORIES = [
  { id: 'brand', label: 'Brand & Campaigns', mobileLabel: 'Brand\n& Campaigns', align: 'flex-end', bg: 'linear-gradient(135deg, #0a002a 0%, #0048ff 100%)', dot: '#0048ff' },
  { id: 'video', label: 'Videos & Motions', mobileLabel: 'Videos\n& Motions', align: 'center', bg: 'linear-gradient(135deg, #1a0030 0%, #8705f2 100%)', dot: '#8705f2' },
  { id: 'web',   label: 'Web Campaigns, Websites & Tech', mobileLabel: 'Web & Tech', align: 'flex-start', bg: 'linear-gradient(135deg, #001030 0%, #4fe6ff22 100%)', dot: '#4fe6ff' },
];

function CategoryStripe({ category, onNavigate }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onNavigate('portfolio')}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 0', cursor: 'pointer',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        transition: `all 0.2s ${EASE_GHOST}`,
      }}
    >
      <h3 style={{
        fontFamily: "'Manrope', sans-serif",
        fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
        fontWeight: 600, color: hovered ? COLORS.bluePrimary : '#fcffff',
        letterSpacing: '-0.03em', margin: 0,
        transition: `color 0.2s ${EASE_GHOST}`,
      }}>{category.label}</h3>
      <div style={{
        width: 10, height: 10, borderRadius: '50%',
        background: hovered ? category.dot : 'rgba(255,255,255,0.2)',
        transition: `background 0.2s ${EASE_GHOST}`,
        flexShrink: 0, marginLeft: 24,
      }} />
    </div>
  );
}

function PortfolioShowcaseSection({ onNavigate }) {
  return (
    <Section id="showcase" style={{ padding: '80px 0' }}>
      <div style={{ marginBottom: 48 }}>
        <MicroLabel>[what we love working on]</MicroLabel>
        <h2 style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: 'clamp(2rem, 3.5vw, 2.5rem)',
          fontWeight: 600, color: '#fcffff',
          letterSpacing: '-0.03em', margin: '8px 0 0',
        }}>portfólio <span style={{ color: COLORS.bluePrimary }}>showcase</span></h2>
      </div>
      <div>
        {CATEGORIES.map(cat => <CategoryStripe key={cat.id} category={cat} onNavigate={onNavigate} />)}
      </div>
      <div style={{ marginTop: 48, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <AntigravityCTA text="fale comigo" href="#contact" />
        <button style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '0 24px', height: 52,
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 9999, color: '#fcffff', fontSize: 14, fontWeight: 500,
          cursor: 'pointer', fontFamily: "'Manrope', sans-serif", letterSpacing: '0.03em',
        }}>baixar curriculum</button>
      </div>
    </Section>
  );
}

// ── Portfolio page with bento grid ──────────────────────
const ALL_PROJECTS = [
  { id: 1, title: 'Magic Radio Branding', category: 'Brand', client: 'Magic', year: 2023, bg: 'linear-gradient(135deg,#060028,#0048ff)', w: 2, h: 1 },
  { id: 2, title: 'Nestlé — Garoto', category: 'Campaign', client: 'Nestlé', year: 2022, bg: 'linear-gradient(135deg,#1a0020,#8705f2)', w: 1, h: 2 },
  { id: 3, title: 'Swift — Brand Identity', category: 'Branding', client: 'Swift', year: 2022, bg: 'linear-gradient(135deg,#001040,#0048ff88)', w: 1, h: 1 },
  { id: 4, title: 'Hellmann\'s Campaign', category: 'Campaign', client: 'Hellmann\'s', year: 2021, bg: 'linear-gradient(135deg,#201500,#f501d322)', w: 1, h: 1 },
  { id: 5, title: 'FFF Legal Identity', category: 'Branding', client: 'FFF', year: 2021, bg: 'linear-gradient(135deg,#040020,#4fe6ff22)', w: 2, h: 1 },
  { id: 6, title: 'Ambev Motion', category: 'Motion', client: 'Ambev', year: 2022, bg: 'linear-gradient(135deg,#0c0030,#8705f244)', w: 1, h: 1 },
];

function PortfolioPage({ onNavigate }) {
  const [activeFilter, setActiveFilter] = React.useState('all');
  const filters = ['all', 'Brand', 'Campaign', 'Motion', 'Branding'];
  const filtered = activeFilter === 'all' ? ALL_PROJECTS : ALL_PROJECTS.filter(p => p.category === activeFilter);

  return (
    <div style={{ minHeight: '100vh', background: COLORS.bg, paddingTop: 100 }}>
      {/* Hero */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px 60px' }}>
        <MicroLabel>portfólio</MicroLabel>
        <h1 style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: 'clamp(3rem, 7vw, 6rem)',
          fontWeight: 800, color: '#fcffff',
          letterSpacing: '-0.05em', lineHeight: 1.0, margin: '12px 0 32px',
        }}>portfólio <span style={{ color: COLORS.bluePrimary }}>showcase</span></h1>

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{
              padding: '8px 20px', borderRadius: 9999,
              background: activeFilter === f ? COLORS.bluePrimary : 'rgba(255,255,255,0.06)',
              border: `1px solid ${activeFilter === f ? COLORS.bluePrimary : 'rgba(255,255,255,0.12)'}`,
              color: '#fcffff', fontSize: 12, fontWeight: activeFilter === f ? 600 : 400,
              cursor: 'pointer', fontFamily: "'Manrope', sans-serif",
              letterSpacing: '0.03em', transition: `all 0.2s ${EASE_GHOST}`,
            }}>{f}</button>
          ))}
        </div>
      </div>
      <GhostDivider />

      {/* Bento grid */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {filtered.map(p => {
            const [hov, setHov] = React.useState(false);
            return (
              <div key={p.id}
                onMouseEnter={() => setHov(true)}
                onMouseLeave={() => setHov(false)}
                style={{
                  gridColumn: `span ${Math.min(p.w, 3)}`,
                  gridRow: `span ${p.h}`,
                  borderRadius: 10, overflow: 'hidden',
                  background: p.bg, cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.06)',
                  minHeight: p.h === 2 ? 360 : 180,
                  position: 'relative',
                  transform: hov ? 'translateY(-3px)' : 'none',
                  transition: `transform 0.2s ${EASE_GHOST}`,
                }}
              >
                <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
                  <div style={{ fontFamily: "'PPSupplyMono', monospace", fontSize: 8, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4 }}>{p.category} · {p.year}</div>
                  <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 16, fontWeight: 600, color: '#fcffff', letterSpacing: '-0.02em' }}>{p.title}</div>
                </div>
                {hov && (
                  <div style={{ position: 'absolute', top: 16, right: 16 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: COLORS.purpleDetails, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fcffff', fontSize: 14 }}>↗</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => onNavigate('home')} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 9999, padding: '10px 24px', color: '#fcffff', fontSize: 12, cursor: 'pointer', fontFamily: "'Manrope', sans-serif" }}>← voltar</button>
        <AntigravityCTA text="fale comigo" href="#" compact />
        <button style={{ background: 'rgba(0,72,255,0.15)', border: '1px solid rgba(0,72,255,0.3)', borderRadius: 9999, padding: '10px 24px', color: COLORS.blueAccent, fontSize: 12, cursor: 'pointer', fontFamily: "'Manrope', sans-serif" }}>mais projetos →</button>
      </div>
    </div>
  );
}

Object.assign(window, { PortfolioShowcaseSection, PortfolioPage });
