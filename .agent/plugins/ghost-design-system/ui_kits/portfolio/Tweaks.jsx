// Tweaks panel — design-time controls for the host review surface.
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primaryColor": "#0048ff",
  "auraIntensity": 100,
  "reduceMotion": false
}/*EDITMODE-END*/;

function useTweaks() {
  const [state, setState] = React.useState(TWEAK_DEFAULTS);
  const set = (patch) => {
    setState((s) => {
      const next = { ...s, ...patch };
      // persist to host
      try {
        window.parent.postMessage({ type: '__edit_mode_set_keys', edits: patch }, '*');
      } catch {}
      return next;
    });
  };

  // Apply live to the DOM
  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--color-bluePrimary', state.primaryColor);
    r.style.setProperty('--aura-intensity', String(state.auraIntensity / 100));
    // Scale the aura opacity via inline CSS var on body
    document.body.style.setProperty('--aura-opacity', String(state.auraIntensity / 100));
    document.body.dataset.reduceMotion = state.reduceMotion ? '1' : '0';
  }, [state]);

  return [state, set];
}

function TweaksPanel({ visible, onClose }) {
  const [state, set] = useTweaks();
  const colors = [
    { hex: '#0048ff', label: 'blue primary' },
    { hex: '#4fe6ff', label: 'ghost accent' },
    { hex: '#8705f2', label: 'purple details' },
    { hex: '#f501d3', label: 'pink details' },
  ];

  return (
    <aside className={`tweaks ${visible ? 'is-visible' : ''}`} aria-hidden={!visible}>
      <div className="tweaks__header">
        <div className="tweaks__title">Tweaks</div>
        <button className="tweaks__close" onClick={onClose} aria-label="fechar">close ×</button>
      </div>

      <div className="tweaks__row">
        <div className="tweaks__label">
          <span>primary color</span>
          <span>{state.primaryColor}</span>
        </div>
        <div className="tweaks__swatches">
          {colors.map((c) => (
            <button
              key={c.hex}
              className={`tweaks__swatch ${state.primaryColor === c.hex ? 'is-active' : ''}`}
              style={{ background: c.hex }}
              onClick={() => set({ primaryColor: c.hex })}
              aria-label={c.label}
            />
          ))}
        </div>
      </div>

      <div className="tweaks__row">
        <div className="tweaks__label">
          <span>aura intensity</span>
          <span>{state.auraIntensity}%</span>
        </div>
        <input
          type="range" min="0" max="150" step="5"
          value={state.auraIntensity}
          onChange={(e) => set({ auraIntensity: Number(e.target.value) })}
        />
      </div>

      <div className="tweaks__row">
        <div className="tweaks__label">
          <span>motion</span>
        </div>
        <button
          className={`tweaks__toggle ${state.reduceMotion ? 'is-active' : ''}`}
          onClick={() => set({ reduceMotion: !state.reduceMotion })}
        >
          {state.reduceMotion ? 'reduced · on' : 'full · ghost ease'}
        </button>
      </div>
    </aside>
  );
}

window.TweaksPanel = TweaksPanel;
