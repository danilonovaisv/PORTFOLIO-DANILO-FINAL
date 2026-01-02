'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Instagram, Linkedin, Twitter, Facebook } from 'lucide-react';
import { FOOTER, SOCIALS } from '@/config/navigation';
import Link from 'next/link';

const footerLinks = FOOTER.links;

const social = [
  {
    label: 'LinkedIn',
    href: SOCIALS.linkedin,
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    label: 'Instagram',
    href: SOCIALS.instagram,
    icon: <Instagram className="w-5 h-5" />,
  },
  {
    label: 'Facebook',
    href: SOCIALS.facebook,
    icon: <Facebook className="w-5 h-5" />,
  },
  {
    label: 'Twitter',
    href: SOCIALS.twitter,
    icon: <Twitter className="w-5 h-5" />,
  },
];

function isHashHref(href: string) {
  return href.startsWith('#');
}

function scrollToHash(hashHref: string) {
  const id = hashHref.replace('#', '');
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function SiteFooter() {
  const reducedMotion = useReducedMotion();

  return (
    <>
      {/* Desktop Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reducedMotion ? 0.2 : 0.8 }}
        className="hidden lg:block fixed bottom-0 left-0 right-0 w-full bg-primary py-6 z-50"
        aria-label="Footer"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex items-center justify-between text-white">
          {/* Copyright */}
          <p className="text-sm opacity-90">{FOOTER.copyright}</p>

          {/* Navigation Links */}
          <nav aria-label="Links do footer" className="flex items-center gap-8">
            {footerLinks.map((l, index) => {
              const isActive = index === 0; // "home" is underlined in reference

              if (l.href.startsWith('/')) {
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`text-white text-sm transition-all duration-200 hover:opacity-80 ${
                      isActive ? 'underline underline-offset-4' : ''
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              }

              return (
                <button
                  key={l.href}
                  type="button"
                  onClick={() => {
                    if (isHashHref(l.href)) scrollToHash(l.href);
                    else window.location.href = l.href;
                  }}
                  className={`text-white text-sm transition-all duration-200 hover:opacity-80 ${
                    isActive ? 'underline underline-offset-4' : ''
                  }`}
                >
                  {l.label}
                </button>
              );
            })}
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {social.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-all duration-200 hover:opacity-70"
                aria-label={`Abrir ${s.label}`}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </motion.footer>

      {/* Mobile Footer */}
      <footer
        className="lg:hidden bg-primary text-white py-8 relative z-10"
        aria-label="Footer"
      >
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-8">
          {/* Navigation Links */}
          <nav
            aria-label="Links do footer"
            className="flex flex-wrap justify-center gap-6"
          >
            {footerLinks.map((l) => {
              if (l.href.startsWith('/')) {
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-white text-sm hover:opacity-80 transition-opacity"
                  >
                    {l.label}
                  </Link>
                );
              }

              return (
                <button
                  key={l.href}
                  type="button"
                  onClick={() => {
                    if (isHashHref(l.href)) scrollToHash(l.href);
                    else window.location.href = l.href;
                  }}
                  className="text-white text-sm hover:opacity-80 transition-opacity"
                >
                  {l.label}
                </button>
              );
            })}
          </nav>

          {/* Social Icons */}
          <div className="flex justify-center gap-6">
            {social.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:opacity-70 transition-opacity"
                aria-label={`Abrir ${s.label}`}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-center text-xs opacity-80">{FOOTER.copyright}</p>
        </div>
      </footer>
    </>
  );
}
