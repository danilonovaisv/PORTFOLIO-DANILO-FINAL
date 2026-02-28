'use client';

import { useState } from 'react';
import type { SiteAssetRole } from '@/lib/supabase/asset-roles';
import { siteAssetRoleGroups } from '@/lib/supabase/asset-roles';

type AssetRoleMenuProps = {
  currentKey: string;
  onSelectRole: (_role: SiteAssetRole) => void;
};

export function AssetRoleMenu({
  currentKey,
  onSelectRole,
}: AssetRoleMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (role: SiteAssetRole) => {
    onSelectRole(role);
    setIsOpen(false);
  };

  return (
    <div className="relative mt-3">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-md border border-white/10 bg-slate-900/70 px-3 py-1 text-[12px] text-white hover:border-blue-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
      >
        <span>Papel do asset</span>
        <span className="text-xs text-slate-400">
          {isOpen ? 'Fechar' : 'Abrir'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-2 z-20 max-h-[320px] w-[500px] overflow-y-auto rounded-2xl border border-white/10 bg-slate-900/90 p-4 shadow-xl">
          <div className="space-y-4">
            {siteAssetRoleGroups.map((group) => (
              <div key={group.label}>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {group.label}
                </div>
                <div className="mt-2 grid gap-2 md:grid-cols-2">
                  {group.roles.map((role) => {
                    const isActive = role.key === currentKey;
                    return (
                      <button
                        key={role.key}
                        type="button"
                        onClick={() => handleSelect(role)}
                        className={`flex flex-col items-start gap-1 rounded-lg border px-3 py-2 text-left text-sm transition ${
                          isActive
                            ? 'border-blue-400 bg-blue-500/40 text-white'
                            : 'border-white/5 bg-slate-900/70 hover:border-blue-400 hover:bg-blue-500/10'
                        }`}
                      >
                        <span className="font-semibold">{role.label}</span>
                        <span className="text-[11px] text-slate-400">
                          {role.key}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {role.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
