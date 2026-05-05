import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/60 p-8 shadow-2xl">
        <div className="mb-6">
          <Link
            href="/"
            className="font-mono text-[10px] uppercase tracking-widest text-white/30 hover:text-white transition-colors"
          >
            ← System_Return_Portal
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
