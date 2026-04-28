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
        className="flex items-center gap-2 rounded border border-white/10 bg-white/[0.03] px-3 py-1 text-[12px] text-white hover:border-[#0048ff] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0048ff] transition-all"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">
          System_Asset_Role
        </span>
        <span className="text-[10px] text-white/30 font-mono">
          {isOpen ? '[_CLOSE_]' : '[_OPEN_]'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-2 z-20 max-h-[320px] w-[500px] overflow-y-auto rounded border border-white/10 bg-[#040013]/95 p-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-4">
            {siteAssetRoleGroups.map((group) => (
              <div key={group.label}>
                <div className="text-[10px] font-mono uppercase tracking-widest text-white/30 border-b border-white/5 pb-1 mb-2">
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
                        className={`flex flex-col items-start gap-1 rounded border px-3 py-2 text-left transition-all ${
                          isActive
                            ? 'border-[#0048ff] bg-[#0048ff]/10 text-white'
                            : 'border-white/5 bg-white/[0.02] hover:border-[#0048ff]/50 hover:bg-[#0048ff]/5'
                        }`}
                      >
                        <span className="font-mono text-xs font-bold uppercase tracking-wide">
                          {role.label}
                        </span>
                        <span className="font-mono text-[9px] text-white/40 uppercase tracking-tight">
                          {role.key}
                        </span>
                        <span className="font-mono text-[10px] text-white/20 leading-tight">
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
