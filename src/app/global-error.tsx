'use client';

import React from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset?: () => void;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="relative antialiased bg-[#040013] text-white">
        <main className="flex min-h-screen flex-col items-center justify-center">
          <div className="max-w-xl text-center space-y-4 px-4">
            <p className="font-mono text-sm text-[#94a3b8]">
              Something unexpected happened.
            </p>
            <h1 className="text-4xl font-bold">We hit an error.</h1>
            <p className="text-base leading-relaxed text-[#cbd5f5]">
              {error.message}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#040013] transition hover:bg-[#4fe6ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4fe6ff]"
              >
                Go back home
              </Link>
              {reset && (
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white transition hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4fe6ff]"
                >
                  Try again
                </button>
              )}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
