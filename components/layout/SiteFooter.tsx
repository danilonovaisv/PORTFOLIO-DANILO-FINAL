'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const FOOTER_LINKS = [
  { label: 'home', href: '#hero', ariaLabel: 'Ir para o início da página' },
  {
    label: 'portfólio showcase',
    href: '#portfolio-showcase',
    ariaLabel: 'Ir para seção Portfólio Showcase',
  },
  { label: 'sobre', href: '/sobre', ariaLabel: 'Ir para página Sobre' },
  { label: 'contato', href: '#contact', ariaLabel: 'Ir para seção Contato' },
];

const SOCIAL_LINKS = [
  {
    label: 'in',
    href: 'https://linkedin.com/in/danilonovais',
    ariaLabel: 'LinkedIn de Danilo Novais',
  },
  {
    label: 'ig',
    href: 'https://instagram.com/danilo_novais',
    ariaLabel: 'Instagram de Danilo Novais',
  },
  {
    label: 'fb',
    href: 'https://facebook.com/danilonovaisvilela',
    ariaLabel: 'Facebook de Danilo Novais',
  },
  {
    label: 'tw',
    href: 'https://twitter.com/danilo_novais',
    ariaLabel: 'Twitter de Danilo Novais',
  },
];

export default function SiteFooter() {
  return (
    <motion.footer
      className="fixed inset-x-0 bottom-0 z-40 bg-[#0057FF] text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-3 text-xs sm:flex-row sm:text-sm">
        <p className="text-center sm:text-left">
          © 2025 Danilo Novais Vilela — todos os direitos reservados.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
          <ul className="flex items-center gap-4">
            {FOOTER_LINKS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-label={item.ariaLabel}
                  className="group relative inline-flex items-center text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0057FF]"
                >
                  <span className="transition-colors group-hover:text-[#111111]">
                    {item.label}
                  </span>
                  <motion.span
                    className="absolute inset-x-0 -bottom-0.5 h-[1px] origin-left bg-white"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                  />
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex items-center gap-3">
            {SOCIAL_LINKS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.ariaLabel}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/40 text-[10px] uppercase tracking-wide transition-transform transition-colors hover:bg-white hover:text-[#0057FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0057FF]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.footer>
  );
}
