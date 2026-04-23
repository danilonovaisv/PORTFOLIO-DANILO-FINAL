// Primary page-level CTA — fixed bottom-right.
// Compound shape: pill (text) + circle (icon) bonded at right edge with -1px overlap.
// Idle: both blue, icon at -45deg. Hover: circle → purple + translateX(8px), icon → 0deg.
function AntigravityCTA({
  href = '/#contact',
  label = 'vamos trabalhar juntos',
}) {
  return (
    <a className="antigravity" href={href} aria-label={label}>
      <span className="antigravity__pill">{label}</span>
      <span className="antigravity__orb" aria-hidden="true">
        <span className="antigravity__icon">
          <ArrowUpRight size={16} stroke={2} />
        </span>
      </span>
    </a>
  );
}
window.AntigravityCTA = AntigravityCTA;
