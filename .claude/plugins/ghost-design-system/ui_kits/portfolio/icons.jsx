// Inline Lucide-style icons (strokeWidth 2.5 on CTAs, 2 elsewhere).
// Single source so every component uses the same geometry.

const Icon = ({ size = 24, stroke = 2, children, style, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'block', ...style }}
    aria-hidden="true"
    {...rest}
  >
    {children}
  </svg>
);

const ArrowUpRight = (p) => (
  <Icon {...p}><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></Icon>
);
const ArrowLeft = (p) => (
  <Icon {...p}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></Icon>
);
const ArrowRight = (p) => (
  <Icon {...p}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></Icon>
);
const Menu = (p) => (
  <Icon {...p}><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="17" x2="20" y2="17" /></Icon>
);
const Close = (p) => (
  <Icon {...p}><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></Icon>
);
const Mail = (p) => (
  <Icon {...p}><rect x="2" y="5" width="20" height="14" rx="2" /><polyline points="2 7 12 13 22 7" /></Icon>
);
const Phone = (p) => (
  <Icon {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6A2 2 0 0 1 22 16.9z" /></Icon>
);
const Globe = (p) => (
  <Icon {...p}><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" /></Icon>
);

// Brand social marks — simplified inline SVG stand-ins for the repo's SocialIcons.tsx
const Instagram = (p) => (
  <Icon {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" /></Icon>
);
const LinkedIn = (p) => (
  <Icon {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="8" y1="10" x2="8" y2="17" /><circle cx="8" cy="7" r="1" fill="currentColor" stroke="none" /><path d="M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></Icon>
);
const XMark = (p) => (
  <Icon {...p}><path d="M4 4 L20 20 M20 4 L4 20" /></Icon>
);
const Facebook = (p) => (
  <Icon {...p}><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8a0 0 0 0 1 0 0z" /></Icon>
);

Object.assign(window, {
  Icon, ArrowUpRight, ArrowLeft, ArrowRight, Menu, Close, Mail, Phone, Globe,
  Instagram, LinkedIn, XMark, Facebook,
});
