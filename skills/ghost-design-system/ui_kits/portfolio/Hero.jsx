// Editorial hero. WebGL entity replaced by CSS "Ghost Aura" per README flag.
function Hero() {
  return (
    <section className="hero" id="home" data-screen-label="Hero">
      <div className="aura" aria-hidden="true">
        <div className="aura__orb" />
        <div className="aura__orb aura__orb--accent" />
        <div className="aura__grain" />
        <div className="aura__label">
          <span>ghost aura · css stand-in</span>
        </div>
      </div>
      <div className="hero__inner">
        <div className="hero__tag reveal is-in" style={{ transitionDelay: '80ms' }}>
          danilo novais · creative director · são paulo / br
        </div>
        <h1 className="hero__headline reveal is-in" style={{ transitionDelay: '200ms' }}>
          <em>você não vê</em>
          <strong>o design.</strong>
          <em>mas ele vê</em>
          <strong>você.</strong>
        </h1>
        <p className="hero__body reveal is-in" style={{ transitionDelay: '380ms' }}>
          branding, campanhas, vídeo, motion e soluções digitais que conectam
          design, movimento e tecnologia — para marcas que preferem ser
          sentidas antes de serem explicadas.
        </p>
        <div className="hero__meta reveal is-in" style={{ transitionDelay: '520ms' }}>
          <span>
            ano
            <strong>2026</strong>
          </span>
          <span>
            projetos selecionados
            <strong>18 · 12 marcas</strong>
          </span>
          <span>
            disponibilidade
            <strong>q2 2026</strong>
          </span>
          <span>
            coordenadas
            <strong>-23.550 · -46.633</strong>
          </span>
        </div>
      </div>
    </section>
  );
}
window.Hero = Hero;
