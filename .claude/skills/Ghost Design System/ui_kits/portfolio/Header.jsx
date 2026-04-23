// Fixed top-6 fluid-glass bar (desktop) + staggered mobile drawer.
function Header({ current = 'home' }) {
  const [open, setOpen] = React.useState(false);
  const items = [
    { id: 'home', label: 'home', num: '01' },
    { id: 'sobre', label: 'sobre', num: '02' },
    { id: 'portfolio', label: 'portfólio', num: '03' },
    { id: 'contato', label: 'contato', num: '04' },
  ];

  return (
    <>
      <div className="header-wrap">
        <div className="header" role="navigation" aria-label="principal">
          <div className="header__brand">
            <span className="header__brand-dot" aria-hidden="true" />
            <span className="header__brand-text">
              ghost<em>design</em>
            </span>
          </div>
          <nav className="header__nav">
            {items.map((i) => (
              <a
                key={i.id}
                href={`#${i.id}`}
                aria-current={current === i.id ? 'page' : undefined}
              >
                {i.label}
              </a>
            ))}
          </nav>
          <a className="header__cta" href="#contato" aria-label="let's build something great">
            <span>let's build something great</span>
            <span className="header__cta-orb" aria-hidden="true">
              <ArrowUpRight size={14} stroke={2.5} />
            </span>
          </a>
          <button
            className="header__burger"
            onClick={() => setOpen(true)}
            aria-label="abrir menu"
            aria-expanded={open}
          >
            <Menu size={18} stroke={2} />
          </button>
        </div>
      </div>

      <div className={`drawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <button className="drawer__close" onClick={() => setOpen(false)} aria-label="fechar menu">
          <Close size={18} stroke={2} />
        </button>
        <nav className="drawer__nav">
          {items.map((i) => (
            <a key={i.id} href={`#${i.id}`} onClick={() => setOpen(false)}>
              <span>{i.label}</span>
              <span className="num">{i.num}</span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
window.Header = Header;
