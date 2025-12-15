'use client';

import React from 'react';

export function Header() {
  return (
    <header className="h-16 border-b border-gray-800 bg-gray-900/50 flex items-center justify-between px-8 backdrop-blur-sm sticky top-0 z-40">
      <div className="text-sm text-gray-400">
        {/* Breadcrumbs or Page Title could go here */}
        Welcome back
      </div>
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-gray-700">
          AD
        </div>
      </div>
    </header>
  );
}
