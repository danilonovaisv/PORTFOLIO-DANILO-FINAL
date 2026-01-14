'use client';

type Preset = {
  key: string;
  page: string;
  asset_type: string;
  description?: string;
  subPath?: string;
};

const presetList: Preset[] = [
  {
    key: 'global.logo_header',
    page: 'global',
    asset_type: 'image',
    subPath: 'logos',
    description: 'Logo principal do header',
  },
  {
    key: 'global.favicon',
    page: 'global',
    asset_type: 'image',
    subPath: 'logos',
    description: 'Favicon',
  },
  {
    key: 'global.font_display',
    page: 'global',
    asset_type: 'font',
    subPath: 'fonts',
    description: 'Fonte principal do display',
  },
  {
    key: 'clients.strip',
    page: 'clients',
    asset_type: 'image',
    subPath: 'logos',
    description: 'Faixa de logos de clientes',
  },
  {
    key: 'about.hero_video',
    page: 'about',
    asset_type: 'video',
    subPath: 'hero',
    description: 'Vídeo da hero (sobre)',
  },
  {
    key: 'about.origin_image',
    page: 'about',
    asset_type: 'image',
    subPath: 'origin',
    description: 'Imagem da seção Origem',
  },
  {
    key: 'about.method_video',
    page: 'about',
    asset_type: 'video',
    subPath: 'method',
    description: 'Vídeo do método',
  },
  {
    key: 'about.curriculum_pdf',
    page: 'about',
    asset_type: 'file',
    subPath: 'curriculum',
    description: 'Currículo para download',
  },
  {
    key: 'portfolio.hero_video',
    page: 'portfolio',
    asset_type: 'video',
    subPath: 'hero',
    description: 'Vídeo da hero do portfólio',
  },
];

export function PresetButtons() {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4 space-y-3">
      <h2 className="text-lg font-semibold">Presets rápidos</h2>
      <div className="grid gap-2">
        {presetList.map((preset) => (
          <PresetButton key={preset.key} preset={preset} />
        ))}
      </div>
      <p className="text-xs text-slate-400">
        Clique para preencher o formulário ao lado com a key, página e tipo recomendados.
      </p>
    </div>
  );
}

function PresetButton({ preset }: { preset: Preset }) {
  const fillForm = () => {
    if (typeof window === 'undefined') return;
    const keyInput = document.querySelector<HTMLInputElement>('form input[name="asset-key"]');
    const pageSelect = document.querySelector<HTMLSelectElement>('form select[name="asset-page"]');
    const typeSelect = document.querySelector<HTMLSelectElement>('form select[name="asset-type"]');
    const subPathInput = document.querySelector<HTMLInputElement>('form input[name="asset-subpath"]');
    if (keyInput) keyInput.value = preset.key;
    if (pageSelect) pageSelect.value = preset.page;
    if (typeSelect) typeSelect.value = preset.asset_type;
    if (subPathInput) subPathInput.value = preset.subPath ?? '';
    // Disparar input events para RHF
    keyInput?.dispatchEvent(new Event('input', { bubbles: true }));
    pageSelect?.dispatchEvent(new Event('change', { bubbles: true }));
    typeSelect?.dispatchEvent(new Event('change', { bubbles: true }));
    subPathInput?.dispatchEvent(new Event('input', { bubbles: true }));
  };

  return (
    <button
      type="button"
      onClick={fillForm}
      className="w-full rounded-md border border-white/10 px-3 py-2 text-left text-sm text-white bg-slate-900/80 hover:bg-white/10 transition"
    >
      <div className="font-semibold">{preset.key}</div>
      <div className="text-xs text-slate-400">
        {preset.page} • {preset.asset_type}
      </div>
      {preset.description && <div className="text-xs text-slate-500">{preset.description}</div>}
    </button>
  );
}
