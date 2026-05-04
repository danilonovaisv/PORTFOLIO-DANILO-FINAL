// AboutPage — Full Sobre page: Origin, WhatIDo, Method, Beliefs, Closing
// Ghost Design System

function AboutPage({ onNavigate }) {
  const [activeBlock, setActiveBlock] = React.useState(0);
  const originBlocks = [
    { title: 'O QUE PERMANECE', text: 'Desde cedo, sempre prestei atenção no que ficava — não só no que aparecia. A essência das coisas sempre falou mais alto do que a superfície.' },
    { title: 'DO TRAÇO À INTENÇÃO', text: 'Rabiscos viraram ideias. Ideias viraram projetos. E os projetos começaram a deixar rastros. Meu processo criativo nasceu do improviso.' },
    { title: 'A DESCOBERTA DO INVISÍVEL', text: 'Foi ali que entendi: design não é enfeite. É ferramenta invisível de transformação. O design verdadeiro não grita — ele conduz.' },
    { title: 'EXPANSÃO COM PROPÓSITO', text: 'Estudei Comunicação, mergulhei no design, no branding e hoje uso inteligência artificial para expandir o alcance sem perder a essência humana.' },
  ];

  const whatIDoCards = [
    'Direção criativa que organiza o caos',
    'Design estratégico que guia decisões',
    'Identidades que permanecem na memória',
    'Campanhas multicanais com lógica e emoção',
    'Branding que não grita, mas marca',
    'Inteligência Artificial aplicada à criação',
    'Liderança Criativa com visão e método',
  ];

  return (
    <div style={{ minHeight: '100vh', background: COLORS.bg, fontFamily: "'Manrope', sans-serif" }}>
      {/* Hero */}
      <section style={{
        minHeight: '90vh', display: 'flex', alignItems: 'center',
        background: 'linear-gradient(180deg, #0c1445 0%, #040013 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '120px 64px 80px', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <MicroLabel style={{ marginBottom: 16 }}>[diretor de criação]</MicroLabel>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.04em', color: '#fcffff', margin: '12px 0 24px' }}>
                Sou <span style={{ color: COLORS.bluePrimary }}>Danilo Novais.</span>
                <br />Você não vê tudo
                <br />o que eu faço. Mas sente
                <br /><span style={{ color: COLORS.blueAccent }}>quando funciona.</span>
              </h1>
              <p style={{ fontSize: 17, fontWeight: 400, color: 'rgba(252,255,255,0.55)', lineHeight: 1.7, maxWidth: 420 }}>
                Crio designs que observam, entendem e guiam experiências com intenção, estratégia e tecnologia, na medida exata.
              </p>
            </div>
            <div style={{
              width: '100%', aspectRatio: '4/5', borderRadius: 16,
              background: 'linear-gradient(135deg, #0a0030 0%, #0048ff33 50%, #040013 100%)',
              border: '1px solid rgba(79,230,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'PPSupplyMono', monospace", fontSize: 10, color: 'rgba(255,255,255,0.2)',
              letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>Hero video placeholder</div>
          </div>
        </div>
      </section>

      {/* Origin */}
      <section style={{ padding: '96px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px' }}>
          <MicroLabel>origem</MicroLabel>
          <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: '#fcffff', letterSpacing: '-0.04em', margin: '12px 0 48px' }}>
            Do traço à intenção.<br /><span style={{ color: COLORS.bluePrimary }}>Mesmo quando você não percebe.</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {originBlocks.map((b, i) => (
              <div key={i} onClick={() => setActiveBlock(i)} style={{
                padding: 24, borderRadius: 10, cursor: 'pointer',
                background: activeBlock === i ? 'rgba(0,72,255,0.12)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${activeBlock === i ? 'rgba(0,72,255,0.3)' : 'rgba(255,255,255,0.07)'}`,
                transition: `all 0.2s ${EASE_GHOST}`,
              }}>
                <div style={{ fontFamily: "'PPSupplyMono', monospace", fontSize: 8, color: COLORS.blueAccent, letterSpacing: '0.15em', marginBottom: 10 }}>{String(i+1).padStart(2,'0')}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#fcffff', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>{b.title}</div>
                {activeBlock === i && <p style={{ fontSize: 13, color: 'rgba(252,255,255,0.6)', lineHeight: 1.6, margin: 0 }}>{b.text}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What I Do */}
      <section style={{ padding: '96px 0', background: 'rgba(11,13,58,0.4)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px' }}>
          <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: '#fcffff', letterSpacing: '-0.04em', margin: '0 0 48px', maxWidth: 600 }}>
            Do insight ao impacto.<br /><span style={{ color: COLORS.blueAccent }}>Mesmo quando você não percebe.</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {whatIDoCards.map((card, i) => (
              <div key={i} style={{
                padding: '20px 24px', borderRadius: 10,
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', gap: 14,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: COLORS.bluePrimary, flexShrink: 0 }} />
                <span style={{ fontSize: 14, fontWeight: 500, color: '#fcffff', lineHeight: 1.4 }}>{card}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beliefs interstitial */}
      <section style={{
        padding: '80px 64px', textAlign: 'center',
        background: COLORS.bluePrimary,
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: '#fcffff', opacity: 0.8, maxWidth: 180, textAlign: 'left', lineHeight: 1.5 }}>Um vídeo<br />que respira.</div>
            <div style={{
              fontSize: 'clamp(3rem,7vw,6rem)', fontWeight: 800,
              lineHeight: 0.9, letterSpacing: '-0.05em', color: '#fcffff', textAlign: 'left',
            }}>ACREDITO NO<br />DESIGN QUE<br />MUDA O DIA<br />DE ALGUÉM.</div>
          </div>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', marginTop: 24 }}>Não pelo choque, mas pela conexão.</p>
        </div>
      </section>

      {/* Closing */}
      <section style={{ padding: '96px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px' }}>
          <h2 style={{ fontSize: 'clamp(2rem,4.5vw,3.5rem)', fontWeight: 700, color: '#fcffff', letterSpacing: '-0.04em', lineHeight: 1.1, maxWidth: 700, margin: '0 0 32px' }}>
            Hoje sou Diretor de Criação, com mais de <span style={{ color: COLORS.bluePrimary }}>10 anos</span> de estrada.
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(252,255,255,0.55)', lineHeight: 1.7, maxWidth: 500, margin: '0 0 48px' }}>
            Já liderei marcas, agências, eventos e criei experiências para todos os canais. Agora, quero criar algo que permaneça — com você.
          </p>
          <div style={{ display: 'flex', gap: 16 }}>
            <AntigravityCTA text="fale comigo" href="#contact" />
            <button style={{ padding: '0 28px', height: 52, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 9999, color: '#fcffff', fontSize: 14, cursor: 'pointer', fontFamily: "'Manrope', sans-serif" }}>baixar curriculum</button>
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { AboutPage });
