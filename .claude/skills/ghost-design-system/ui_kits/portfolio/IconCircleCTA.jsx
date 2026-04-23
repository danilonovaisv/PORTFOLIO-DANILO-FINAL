// Small 48px CTA — blue circle with ArrowUpRight, purple + glow on hover.
function IconCircleCTA({ href = '#', label = 'abrir projeto', size = 48, stroke = 2.5 }) {
  return (
    <a className="icon-circle" href={href} aria-label={label} style={{ width: size, height: size }}>
      <ArrowUpRight size={size * 0.42} stroke={stroke} />
    </a>
  );
}
window.IconCircleCTA = IconCircleCTA;
