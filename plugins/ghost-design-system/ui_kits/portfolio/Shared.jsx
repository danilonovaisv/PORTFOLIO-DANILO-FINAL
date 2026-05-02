// Shared tokens, primitive components, and utilities
// Ghost Design System — portfoliodanilo.com

const COLORS = {
  bg: '#040013',
  bluePrimary: '#0048ff',
  blueAccent: '#4fe6ff',
  purpleDetails: '#8705f2',
  pinkDetails: '#f501d3',
  neutral: '#0b0d3a',
  text: '#fcffff',
  textSecondary: '#a1a3a3',
  abyssStart: '#0c1445',
  abyssMid: '#08031f',
};

const EASE_GHOST = 'cubic-bezier(0.22, 1, 0.36, 1)';

// ── AntigravityCTA ─────────────────────────────────────────
function AntigravityCTA({ text = "vamos trabalhar juntos", href = "#contact", color, compact = false, style = {} }) {
  const [hovered, setHovered] = React.useState(false);
  const col = color || COLORS.bluePrimary;
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: hovered ? (compact ? 14 : 8) : (compact ? 8 : 2),
        textDecoration: 'none', cursor: 'pointer',
        transition: `gap 0.24s ${EASE_GHOST}`,
        transform: hovered ? 'translateY(-1px)' : 'none',
        ...style,
      }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: compact ? 40 : 52, padding: compact ? '0 20px' : '0 32px',
        background: col, borderRadius: 9999,
        color: '#fcffff', fontWeight: 500, fontSize: compact ? 13 : 15,
        letterSpacing: '0.04em', whiteSpace: 'nowrap',
        fontFamily: "'Manrope', sans-serif",
      }}>
        {text}
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: compact ? 40 : 52, height: compact ? 40 : 52,
        borderRadius: 9999,
        background: hovered ? COLORS.purpleDetails : col,
        boxShadow: hovered ? '0 0 28px rgba(135,5,242,0.5)' : 'none',
        transform: hovered ? 'translateX(5px)' : 'none',
        transition: `background 0.24s ${EASE_GHOST}, box-shadow 0.24s ${EASE_GHOST}, transform 0.24s ${EASE_GHOST}`,
        color: '#fcffff', flexShrink: 0,
      }}>
        <svg width={compact ? 16 : 20} height={compact ? 16 : 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
        </svg>
      </div>
    </a>
  );
}

// ── IconCircle CTA ─────────────────────────────────────────
function IconCircle({ hovered: isHovered, size = 48 }) {
  const [hov, setHov] = React.useState(false);
  const active = isHovered !== undefined ? isHovered : hov;
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: size, height: size, borderRadius: '50%',
        background: active ? COLORS.purpleDetails : COLORS.bluePrimary,
        boxShadow: active ? '0 0 26px rgba(135,5,242,0.45)' : 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: `all 0.2s ${EASE_GHOST}`, color: '#fcffff', cursor: 'pointer',
        transform: active ? 'translateX(5px)' : 'none',
      }}
    >
      <svg width={size * 0.45} height={size * 0.45} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
      </svg>
    </div>
  );
}

// ── Tag badge ──────────────────────────────────────────────
function Tag({ children, color = 'default' }) {
  const styles = {
    default: { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(252,255,255,0.65)' },
    blue:    { background: 'rgba(0,72,255,0.15)',    border: '1px solid rgba(0,72,255,0.3)',      color: '#4fe6ff' },
    purple:  { background: 'rgba(135,5,242,0.15)',   border: '1px solid rgba(135,5,242,0.3)',     color: '#8705f2' },
    new:     { background: COLORS.bluePrimary,       border: 'none',                              color: '#fcffff' },
  };
  return (
    <span style={{
      display: 'inline-block', padding: '3px 10px', borderRadius: 4,
      fontFamily: "'PPSupplyMono', 'Space Mono', monospace",
      fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase',
      ...styles[color],
    }}>{children}</span>
  );
}

// ── Micro label ────────────────────────────────────────────
function MicroLabel({ children, color = COLORS.blueAccent }) {
  return (
    <span style={{
      fontFamily: "'PPSupplyMono', 'Space Mono', monospace",
      fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase',
      color, opacity: 0.8,
    }}>{children}</span>
  );
}

// ── Divider ────────────────────────────────────────────────
function GhostDivider() {
  return <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.06)', margin: '0' }} />;
}

// ── Section wrapper ────────────────────────────────────────
function Section({ children, id, style = {}, bg = 'transparent' }) {
  return (
    <section id={id} style={{
      width: '100%', background: bg,
      padding: '96px 0',
      ...style,
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px' }}>
        {children}
      </div>
    </section>
  );
}

Object.assign(window, { COLORS, EASE_GHOST, AntigravityCTA, IconCircle, Tag, MicroLabel, GhostDivider, Section });
