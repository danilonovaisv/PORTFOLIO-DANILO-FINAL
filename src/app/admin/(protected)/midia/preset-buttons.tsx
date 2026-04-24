'use client';

import {
  siteAssetRoleGroups,
  type SiteAssetRole,
} from '@/lib/supabase/asset-roles';

export function PresetButtons() {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl space-y-6">
      <div className="space-y-1">
        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#0048ff]/60">
          Module_Presets
        </p>
        <h2 className="font-mono text-xl font-light text-white uppercase">
          Quick_Sync<span className="text-[#0048ff]">.</span>
        </h2>
      </div>

      <div className="space-y-6">
        {siteAssetRoleGroups.map((group) => (
          <div key={group.label} className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-[#0048ff]/50" />
              <p className="font-mono text-[9px] uppercase tracking-widest text-white/40">
                {group.label}
              </p>
            </div>
            <div className="grid gap-2">
              {group.roles.map((role) => (
                <PresetButton key={role.key} preset={role} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="font-mono text-[10px] text-white/30 uppercase leading-relaxed">
        Note: Presets automate configuration for key system modules. Select a
        node to hydrate the primary sync form.
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
      className="group flex w-full flex-col items-start rounded-lg border border-white/5 bg-white/[0.01] px-4 py-3 text-left transition-all hover:border-[#0048ff]/30 hover:bg-[#0048ff]/5"
    >
      <div className="font-mono text-xs text-white group-hover:text-[#0048ff] transition-colors uppercase tracking-tight">
        {preset.label}
      </div>
      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
        <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">
          KEY: {preset.key}
        </span>
        <span className="font-mono text-[9px] text-[#0048ff]/50 uppercase tracking-widest">
          {preset.page} // {preset.asset_type}
        </span>
      </div>
    </button>
  );
}
