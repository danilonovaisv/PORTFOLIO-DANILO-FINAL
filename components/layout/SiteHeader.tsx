'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'home', href: '/#hero', ariaLabel: 'Ir para a seção Hero' },
  { label: 'sobre', href: '/sobre', ariaLabel: 'Ir para a página Sobre' },
  {
    label: 'portfolio showcase',
    href: '/portfolio',
    ariaLabel: 'Ir para a página Portfólio',
  },
  { label: 'contato', href: '/#contact', ariaLabel: 'Ir para a seção Contato' },
];

export default function SiteHeader() {
  const { scrollY } = useScroll();
  const paddingY = useTransform(scrollY, [0, 80], [20, 10]);
  const bgOpacity = useTransform(scrollY, [0, 80], [0.8, 0.97]);
  const shadowOpacity = useTransform(scrollY, [0, 80], [0, 0.12]);
  const backgroundColor = useTransform(
    bgOpacity,
    (o) => `rgba(255,255,255,${o})`
  );
  const boxShadow = useTransform(
    shadowOpacity,
    (o) => `0 10px 30px rgba(15,23,42,${o})`
  );

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      style={{
        paddingTop: paddingY,
        paddingBottom: paddingY,
        backgroundColor,
        boxShadow,
        backdropFilter: 'blur(10px)',
      }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          aria-label="Ir para a Home"
          className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
          <Image
            src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon-02.svg"
            alt="Logo Danilo Novais"
            width={96}
            height={32}
            className="h-6 w-auto"
            priority
          />
        </Link>
        <ul className="flex items-center gap-6 text-sm text-gray-700">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-label={item.ariaLabel}
                className="group relative inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <span className="transition-colors group-hover:text-[#0057FF]">
                  {item.label}
                </span>
                <motion.span
                  className="absolute inset-x-0 -bottom-1 h-[1px] origin-left bg-[#0057FF]"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
