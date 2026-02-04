'use client';

import {
  siteAssetRoleGroups,
  type SiteAssetRole,
} from '@/lib/supabase/asset-roles';

export function PresetButtons() {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4 space-y-4">
      <h2 className="text-lg font-semibold">Presets rápidos</h2>
      <div className="space-y-4">
        {siteAssetRoleGroups.map((group) => (
          <div key={group.label} className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              {group.label}
            </p>
            <div className="grid gap-2 md:grid-cols-2">
              {group.roles.map((role) => (
                <PresetButton key={role.key} preset={role} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-400">
        Clique para preencher o formulário ao lado com a key, página e tipo
        recomendados.
      </p>
    </div>
  );
}

function PresetButton({ preset }: { preset: SiteAssetRole }) {
  const fillForm = () => {
    if (typeof window === 'undefined') return;
    const keyInput = document.querySelector<HTMLInputElement>(
      'form input[name="asset-key"]'
    );
    const pageSelect = document.querySelector<HTMLSelectElement>(
      'form select[name="asset-page"]'
    );
    const typeSelect = document.querySelector<HTMLSelectElement>(
      'form select[name="asset-type"]'
    );
    const subPathInput = document.querySelector<HTMLInputElement>(
      'form input[name="asset-subpath"]'
    );
    if (keyInput) keyInput.value = preset.key;
    if (pageSelect) pageSelect.value = preset.page;
    if (typeSelect) typeSelect.value = preset.asset_type;
    if (subPathInput) subPathInput.value = preset.subPath ?? '';
    keyInput?.dispatchEvent(new Event('input', { bubbles: true }));
    pageSelect?.dispatchEvent(new Event('change', { bubbles: true }));
    typeSelect?.dispatchEvent(new Event('change', { bubbles: true }));
    subPathInput?.dispatchEvent(new Event('input', { bubbles: true }));
  };

  return (
    <button
      type="button"
      onClick={fillForm}
      className="flex w-full flex-col items-start rounded-md border border-white/10 bg-slate-900/80 px-3 py-2 text-left text-sm text-white transition hover:border-blue-400 hover:bg-blue-500/10"
    >
      <div className="font-semibold">{preset.label}</div>
      <div className="text-[11px] text-slate-400">{preset.key}</div>
      <div className="text-[11px] text-slate-500">
        {preset.page} • {preset.asset_type}
      </div>
      {preset.description && (
        <div className="text-[11px] text-slate-500">{preset.description}</div>
      )}
    </button>
  );
}
