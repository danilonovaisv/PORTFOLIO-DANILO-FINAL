// ProjectsGrid — Featured projects bento grid (home page)
// Ghost Design System

const PROJECTS = [
  { id: 1, title: 'Magic — devolvendo a magia ao rádio', category: 'BRANDING', client: 'Magic', year: 2023, tags: ['Branding', 'Campaign'], cols: 5, bg: 'linear-gradient(135deg, #060028 0%, #0048ff 100%)' },
  { id: 2, title: 'Uma marca ousada e consistente', category: 'BRANDING', client: 'Conf.', year: 2022, tags: ['Strategy', 'Identity'], cols: 7, bg: 'linear-gradient(135deg, #120010 0%, #8705f2 100%)' },
  { id: 3, title: 'Key visual para campanha sazonal', category: 'CAMPANHA', client: 'Conf.', year: 2021, tags: ['Art Direction'], cols: 12, bg: 'linear-gradient(135deg, #001040 0%, #0048ff44 50%, #040013 100%)' },
  { id: 4, title: 'Experiência web em movimento', category: 'WEB & MOTION', client: 'Conf.', year: 2023, tags: ['UX/UI', 'Animation'], cols: 8, bg: 'linear-gradient(135deg, #040024 0%, #4fe6ff22 100%)' },
];

function ProjectCard({ project, onOpen }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen && onOpen(project)}
      style={{
        gridColumn: `span ${Math.min(project.cols, 12)}`,
        cursor: 'pointer',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: `transform 0.2s ${EASE_GHOST}`,
      }}
    >
      {/* Media */}
      <div style={{
        width: '100%',
        height: project.cols === 12 ? 260 : 220,
        borderRadius: 10,
        background: project.bg,
        overflow: 'hidden', position: 'relative',
        border: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'PPSupplyMono', monospace", fontSize: 10,
          color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>
          {project.cols === 12 ? 'Full-width media' : 'Project media'}
        </div>
      </div>

      {/* Meta */}
      <div style={{ marginTop: 16, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, padding: '0 4px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <span style={{ fontFamily: "'PPSupplyMono', monospace", fontSize: 9, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{project.category}</span>
            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 9 }}>•</span>
            <span style={{ fontSize: 11, color: '#6B7280' }}>{project.client} · {project.year}</span>
          </div>
          <h3 style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: 20, fontWeight: 500, lineHeight: 1.25,
            color: hovered ? COLORS.bluePrimary : '#fcffff',
            letterSpacing: '-0.02em', margin: 0,
            transition: `color 0.15s ${EASE_GHOST}`,
          }}>{project.title}</h3>
        </div>
        <div style={{ flexShrink: 0, marginTop: 4 }}>
          <IconCircle hovered={hovered} size={44} />
        </div>
      </div>
    </div>
  );
}

function ProjectsGrid({ onNavigate }) {
  const [activeProject, setActiveProject] = React.useState(null);

  return (
    <Section id="projects" style={{ padding: '80px 0' }}>
      {/* Header */}
      <div style={{ marginBottom: 48, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <MicroLabel>[featured work]</MicroLabel>
          <h2 style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: 'clamp(2rem, 3.5vw, 2.5rem)',
            fontWeight: 600, color: '#fcffff',
            letterSpacing: '-0.03em', margin: '8px 0 0',
          }}>portfólio <span style={{ color: COLORS.bluePrimary }}>showcase</span></h2>
        </div>
        <button onClick={() => onNavigate('portfolio')} style={{
          background: 'none', border: '1px solid rgba(79,230,255,0.35)', borderRadius: 9999,
          padding: '10px 20px', color: '#fcffff', fontSize: 12, fontWeight: 500,
          letterSpacing: '0.05em', cursor: 'pointer', fontFamily: "'Manrope', sans-serif",
          transition: `all 0.2s ${EASE_GHOST}`,
        }}>ver todos →</button>
      </div>

      {/* Bento grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 20 }}>
        {PROJECTS.map(p => <ProjectCard key={p.id} project={p} onOpen={setActiveProject} />)}
      </div>

      {/* Project detail modal */}
      {activeProject && (
        <div onClick={() => setActiveProject(null)} style={{
          position: 'fixed', inset: 0, zIndex: 95,
          background: 'rgba(4,0,19,0.92)', backdropFilter: 'blur(20px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32,
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: COLORS.neutral, border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 16, padding: 40, maxWidth: 600, width: '100%',
          }}>
            <div style={{ fontFamily: "'PPSupplyMono', monospace", fontSize: 9, color: COLORS.blueAccent, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>{activeProject.category}</div>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 28, fontWeight: 700, color: '#fcffff', margin: '0 0 16px', letterSpacing: '-0.03em' }}>{activeProject.title}</h2>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
              {activeProject.tags.map(t => <Tag key={t}>{t}</Tag>)}
            </div>
            <div style={{ height: 200, borderRadius: 10, background: activeProject.bg, marginBottom: 24 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 13, color: COLORS.textSecondary }}>{activeProject.client} · {activeProject.year}</span>
              <button onClick={() => setActiveProject(null)} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 9999, padding: '8px 20px', color: '#fcffff', fontSize: 12, cursor: 'pointer', fontFamily: "'Manrope', sans-serif" }}>fechar</button>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}

Object.assign(window, { ProjectsGrid });
