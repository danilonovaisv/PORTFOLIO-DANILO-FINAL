// ─── Animated Background — GRAINIENT ────────────────────────────────────────
// Animated gradient noise with warp. Canvas 2D stand-in for ReactBits Grainient.
function BgGrainient({ card }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let raf, t = 0;
    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width  = canvas.offsetWidth  * Math.min(devicePixelRatio, 1.5);
      canvas.height = canvas.offsetHeight * Math.min(devicePixelRatio, 1.5);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Check reduced motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const draw = () => {
      if (mq.matches) { cancelAnimationFrame(raf); return; }
      const W = canvas.width, H = canvas.height;
      t += 0.004;
      ctx.clearRect(0,0,W,H);

      // Base deep bg
      ctx.fillStyle = '#040013';
      ctx.fillRect(0,0,W,H);

      // Slow-moving radial blobs
      const cx = W * (0.5 + 0.2 * Math.sin(t * 0.7));
      const cy = H * (0.5 + 0.15 * Math.cos(t * 0.5));

      const g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.75);
      g1.addColorStop(0,   'rgba(0,72,255,0.75)');
      g1.addColorStop(0.4, 'rgba(135,5,242,0.45)');
      g1.addColorStop(1,   'rgba(4,0,19,0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0,0,W,H);

      // Second blob offset
      const bx = W * (0.8 + 0.15 * Math.cos(t * 0.6));
      const by = H * (0.3 + 0.2  * Math.sin(t * 0.4));
      const g2 = ctx.createRadialGradient(bx, by, 0, bx, by, W * 0.5);
      g2.addColorStop(0,   'rgba(153,111,214,0.5)');
      g2.addColorStop(1,   'rgba(4,0,19,0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0,0,W,H);

      // Grain overlay — sparse dots
      ctx.globalAlpha = 0.06;
      for (let i = 0; i < 800; i++) {
        const gx = Math.random() * W;
        const gy = Math.random() * H;
        const r  = Math.random() * 1.2;
        ctx.beginPath();
        ctx.arc(gx, gy, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.random()})`;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(draw);
    };
    draw();
    const vis = () => { if (document.hidden) cancelAnimationFrame(raf); else draw(); };
    document.addEventListener('visibilitychange', vis);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener('visibilitychange', vis);
    };
  }, []);
  return <canvas ref={ref} style={{ position:'absolute',inset:0,width:'100%',height:'100%',display:'block' }} />;
}

// ─── Animated Background — GHOST CURSOR ─────────────────────────────────────
// Mouse-tracking glow trail. Canvas 2D stand-in for ReactBits GhostCursor.
function BgGhostCursor({ card }) {
  const ref      = React.useRef(null);
  const mouse    = React.useRef({ x: 0.5, y: 0.5 });
  const trail    = React.useRef([]);
  const MAX_TRAIL = 30;

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const container = canvas.closest('.mag-card') || canvas.parentElement;
    let raf;
    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width  = canvas.offsetWidth  * Math.min(devicePixelRatio, 1.5);
      canvas.height = canvas.offsetHeight * Math.min(devicePixelRatio, 1.5);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.current.x = (e.clientX - rect.left) / rect.width;
      mouse.current.y = (e.clientY - rect.top)  / rect.height;
    };
    container.addEventListener('mousemove', onMove);

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const draw = () => {
      if (mq.matches) { cancelAnimationFrame(raf); return; }
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle = '#040013';
      ctx.fillRect(0,0,W,H);

      // base subtle radial
      const bg = ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,W*0.8);
      bg.addColorStop(0,   'rgba(11,13,58,0.9)');
      bg.addColorStop(1,   'rgba(4,0,19,1)');
      ctx.fillStyle = bg;
      ctx.fillRect(0,0,W,H);

      // push current mouse
      trail.current.push({ x: mouse.current.x * W, y: mouse.current.y * H });
      if (trail.current.length > MAX_TRAIL) trail.current.shift();

      // draw trail
      trail.current.forEach((pt, i) => {
        const alpha = (i / trail.current.length) * 0.6;
        const r     = 60 + i * 2;
        const g = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, r);
        g.addColorStop(0,   `rgba(135,5,242,${alpha * 0.9})`);
        g.addColorStop(0.5, `rgba(0,72,255,${alpha * 0.5})`);
        g.addColorStop(1,   'rgba(4,0,19,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0,0,W,H);
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    const vis = () => { if (document.hidden) cancelAnimationFrame(raf); else draw(); };
    document.addEventListener('visibilitychange', vis);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      container.removeEventListener('mousemove', onMove);
      document.removeEventListener('visibilitychange', vis);
    };
  }, []);

  return <canvas ref={ref} style={{ position:'absolute',inset:0,width:'100%',height:'100%',display:'block' }} />;
}

// ─── Animated Background — AURORA ────────────────────────────────────────────
// Flowing northern-lights waves. Canvas 2D stand-in for ReactBits Aurora.
function BgAurora({ card }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let raf, t = 0;
    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width  = canvas.offsetWidth  * Math.min(devicePixelRatio, 1.5);
      canvas.height = canvas.offsetHeight * Math.min(devicePixelRatio, 1.5);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const colors = ['#b301f4','#0048ff','#8705f2'];

    const draw = () => {
      if (mq.matches) { cancelAnimationFrame(raf); return; }
      const W = canvas.width, H = canvas.height;
      t += 0.006;
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle = '#040013';
      ctx.fillRect(0,0,W,H);

      // Draw 3 flowing aurora bands
      colors.forEach((col, i) => {
        const phase   = t + i * 2.1;
        const yCenter = H * (0.2 + 0.25 * i + 0.08 * Math.sin(phase * 0.7));
        const thick   = H * (0.35 + 0.1 * Math.sin(phase * 0.5));

        const g = ctx.createLinearGradient(0, yCenter - thick/2, 0, yCenter + thick/2);
        g.addColorStop(0,   'rgba(4,0,19,0)');
        g.addColorStop(0.3, col.replace('#','') && `${col}88`);
        g.addColorStop(0.5, `${col}cc`);
        g.addColorStop(0.7, col.replace('#','') && `${col}55`);
        g.addColorStop(1,   'rgba(4,0,19,0)');

        // Wavy path
        ctx.save();
        ctx.beginPath();
        for (let x = 0; x <= W; x += 4) {
          const y = yCenter + Math.sin(x / (W*0.18) + phase) * H * 0.06
                            + Math.sin(x / (W*0.09) + phase * 1.3) * H * 0.03;
          x === 0 ? ctx.moveTo(x, y - thick/2) : ctx.lineTo(x, y - thick/2);
        }
        for (let x = W; x >= 0; x -= 4) {
          const y = yCenter + Math.sin(x / (W*0.18) + phase) * H * 0.06
                            + Math.sin(x / (W*0.09) + phase * 1.3) * H * 0.03;
          ctx.lineTo(x, y + thick/2);
        }
        ctx.closePath();
        ctx.fillStyle = g;
        ctx.globalAlpha = 0.55 + 0.2 * Math.sin(phase * 0.4);
        ctx.fill();
        ctx.restore();
      });

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();
    const vis = () => { if (document.hidden) cancelAnimationFrame(raf); else draw(); };
    document.addEventListener('visibilitychange', vis);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener('visibilitychange', vis);
    };
  }, []);
  return <canvas ref={ref} style={{ position:'absolute',inset:0,width:'100%',height:'100%',display:'block' }} />;
}

// ─── Deterministic background assignment by card index ────────────────────────
const BG_POOL = [BgGrainient, BgGhostCursor, BgAurora];
function getVariant(id) { return BG_POOL[Math.abs(id * 2654435761 >>> 0) % BG_POOL.length]; }

// ─── Project Card ─────────────────────────────────────────────────────────────
function MagCard({ slot, project, bgVariant }) {
  const Bg = bgVariant;
  return (
    <article className={`mag-card mag-card--${slot}`}>
      <div className="mag-card__bg" aria-hidden="true"><Bg /></div>
      <div className="mag-card__overlay" aria-hidden="true" />
      <div className="mag-card__top">
        <div className="mag-card__meta">{project.category} · {project.client} · {project.year}</div>
        <IconCircleCTA href="#" label={`abrir ${project.title}`} size={40} />
      </div>
      <div className="mag-card__bottom">
        <h3 className="mag-card__title">{project.title}</h3>
      </div>
    </article>
  );
}

// ─── CTA Card ─────────────────────────────────────────────────────────────────
function CTACard() {
  return (
    <a href="#portfolio" className="mag-cta mag-card--cta" aria-label="ver todos os projetos">
      <p className="mag-cta__headline">Like what<br/>you see?</p>
      <span className="mag-cta__btn">
        view projects →
        <span className="mag-cta__btn-arrow" aria-hidden="true">
          <ArrowRight size={16} stroke={2} />
        </span>
      </span>
    </a>
  );
}

// ─── Featured Projects Section ────────────────────────────────────────────────
function FeaturedProjects() {
  const projects = [
    { id: 0, category: 'brand · campaign', client: 'heliópolis',  year: '2025', title: 'manifesto de bairro' },
    { id: 1, category: 'web · r3f',        client: 'obraz',       year: '2025', title: 'identidade e plataforma digital' },
    { id: 2, category: 'motion · film',    client: 'itaú',        year: '2026', title: 'campanha anual — o próximo passo' },
    { id: 3, category: 'brand',            client: 'orbital co.', year: '2024', title: 'sistema visual + naming' },
  ];

  const slots = ['a','b','c','d'];

  return (
    <section className="section" id="featured" data-screen-label="Featured Projects">
      <div className="section__wrap">
        <div className="section__eyebrow">
          <span className="num">03</span>
          <span>projetos recentes</span>
        </div>
        <h2 className="section__title">
          trabalhos <em>selecionados</em>
        </h2>

        <div className="magazine">
          {projects.map((p, i) => (
            <MagCard
              key={p.id}
              slot={slots[i]}
              project={p}
              bgVariant={getVariant(p.id)}
            />
          ))}
          <CTACard />
        </div>
      </div>
    </section>
  );
}
window.FeaturedProjects = FeaturedProjects;
