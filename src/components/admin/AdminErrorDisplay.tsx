'use client';

import React from 'react';
import Link from 'next/link';

interface AdminErrorDisplayProps {
  message: string;
  isMissingEnv: boolean;
}

export function AdminErrorDisplay({
  message,
  isMissingEnv,
}: AdminErrorDisplayProps) {
  return (
    <div className="min-h-screen bg-background text-white flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full p-8 rounded border border-rose-500/20 bg-white/[0.02] shadow-2xl backdrop-blur-xl">
        <h2 className="font-mono text-sm font-bold uppercase tracking-[0.3em] text-rose-500 mb-4">
          System_Critical_Error
        </h2>
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-6">
          Registry_Link_Failure: The administrative kernel could not initialize
          due to a system-level connection fault.
        </p>
        <div className="p-4 rounded bg-black/60 border border-rose-500/10 font-mono text-[10px] text-rose-400/80 mb-6 overflow-x-auto text-left leading-relaxed">
          {isMissingEnv
            ? 'ERR_CONFIG_MISSING: Environment variables (SUPABASE_REFS) not detected in current runtime scope.'
            : `ERR_EXCEPTION: ${message}`}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="w-full border border-white/10 bg-white/5 hover:bg-white/10 py-3 rounded font-mono text-[10px] uppercase tracking-[0.2em] transition-all active:scale-[0.98]"
        >
          System_Reboot_Kernel
        </button>
        <div className="mt-6 border-t border-white/5 pt-4">
          <Link
            href="/"
            className="font-mono text-[9px] uppercase tracking-widest text-white/20 hover:text-bluePrimary transition-colors"
          >
            System_Exit_to_Public_Node
          </Link>
        </div>
      </div>
    </div>
  );
}
