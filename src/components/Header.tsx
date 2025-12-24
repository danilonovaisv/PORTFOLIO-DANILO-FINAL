'use client';

import Link from 'next/link';
import { useState } from 'react';

import { BRAND } from '@/config/brand';

const NAV_ITEMS = [
  { href: '/', label: 'home' },
  { href: '/about', label: 'sobre' },
  { href: '/portfolio', label: 'portfolio' },
  { href: '/contact', label: 'contato' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-8">
          {NAV_ITEMS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white hover:text-gray-300 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          type="button"
          className="md:hidden p-2"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <title>{isMenuOpen ? 'Fechar menu' : 'Abrir menu'}</title>
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            {NAV_ITEMS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-white hover:text-gray-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function Logo() {
  return (
    <Link
      href="/"
      className="text-white font-semibold text-lg uppercase tracking-widest"
      aria-label={`Ir para a home de ${BRAND.name}`}
    >
      {BRAND.name}
    </Link>
  );
}
