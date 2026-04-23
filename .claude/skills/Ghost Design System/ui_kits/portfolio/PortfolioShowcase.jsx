// Three accordion stripes — Brand / Video / Web. One expanded by default.
function PortfolioShowcase() {
  const [open, setOpen] = React.useState('brand');

  const stripes = [
    {
      id: 'brand', num: '01',
      italic: 'brand', solid: '& campaigns',
      meta: '08 projetos · 2023 — 2026',
      tags: ['identidade visual', 'naming', 'sistemas visuais', 'keyart', 'campanha 360'],
      projects: [
        { t: 'heliópolis · rebrand', m: 'brand · 2025', fill: 'fill-blue' },
        { t: 'obraz · identidade', m: 'brand · 2025', fill: 'fill-deep' },
        { t: 'sonho de verão', m: 'campanha · 2024', fill: 'fill-magenta' },
        { t: 'orbital co.', m: 'brand · 2024', fill: 'fill-grid' },
      ],
    },
    {
      id: 'video', num: '02',
      italic: 'videos', solid: '& motions',
      meta: '06 projetos · 2024 — 2026',
      tags: ['direção', 'roteiro', 'motion design', 'pós-produção', 'cor'],
      projects: [
        { t: 'itaú · campanha anual', m: 'filme · 2026', fill: 'fill-cyan' },
        { t: 'nubank — neon', m: 'motion · 2025', fill: 'fill-magenta' },
        { t: 'bauducco · 70 anos', m: 'filme · 2024', fill: 'fill-deep' },
      ],
    },
    {
      id: 'web', num: '03',
      italic: 'websites', solid: '& tech',
      meta: '04 projetos · 2024 — 2026',
      tags: ['next.js', 'r3f', 'webgl', 'supabase', 'design sistêmico'],
      projects: [
        { t: 'obraz — website', m: 'web · 2025', fill: 'fill-grid' },
        { t: 'orbital · dashboard', m: 'web · 2024', fill: 'fill-blue' },
        { t: 'ghost · this portfolio', m: 'web · 2026', fill: 'fill-noise' },
      ],
    },
  ];

  return (
    <section className="section" id="portfolio" data-screen-label="Portfolio Showcase">
      <div className="section__wrap">
        <div className="section__eyebrow">
          <span className="num">02</span>
          <span>o que está em exposição</span>
        </div>
        <h2 className="section__title"><em>portfólio</em> showcase</h2>

        <div className="stripes">
          {stripes.map((s) => {
            const isOpen = open === s.id;
            return (
              <div
                key={s.id}
                className={`stripe ${isOpen ? 'is-open' : ''}`}
                onClick={() => setOpen(isOpen ? null : s.id)}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(isOpen ? null : s.id); } }}
              >
                <div className="stripe__num">{s.num}</div>
                <h3 className="stripe__title">
                  <em>{s.italic}</em> {s.solid}
                </h3>
                <div className="stripe__meta">{s.meta}</div>

                <div className="stripe__expand">
                  <div className="stripe__expand-inner">
                    <div className="stripe__tags">
                      {s.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                    </div>
                    <div className="stripe__grid">
                      {s.projects.map((p) => (
                        <div className="mini-card" key={p.t}>
                          <div className={`mini-card__fill ${p.fill}`} />
                          <div className="mini-card__meta">{p.m}</div>
                          <div className="mini-card__title">{p.t}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
window.PortfolioShowcase = PortfolioShowcase;
