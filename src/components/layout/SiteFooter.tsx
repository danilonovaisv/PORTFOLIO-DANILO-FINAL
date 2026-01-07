'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import { NAVIGATION, SOCIALS } from '@/config/navigation';
import { useRouter, usePathname } from 'next/navigation';

const footerLinks = NAVIGATION.footer.links;
const footerCopyright = NAVIGATION.footer.copyright;

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
    label: 'Twitter',
    href: SOCIALS.twitter,
    icon: <Twitter className="w-5 h-5" />,
  },
];

function isHashHref(href: string) {
  return href.startsWith('#') || href.startsWith('/#');
}

export default function SiteFooter() {
  const router = useRouter();
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  const scrollToHash = (hashHref: string) => {
    const hash = hashHref.replace(/^\/?#/, '');
    const el = document.getElementById(hash);

    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      router.push(`/#${hash}`);
    }
  };

  const handleNavigate = (href: string) => {
    if (isHashHref(href)) {
      scrollToHash(href);
    } else {
      router.push(href);
    }
  };

  return (
    <>
      {/* Desktop Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reducedMotion ? 0.2 : 0.8 }}
        className="hidden lg:block w-full bg-section-footer py-6 fixed bottom-0 left-0 right-0 z-50"
        aria-label="Footer"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex items-center justify-between text-white">
          {/* Copyright */}
          <p className="text-sm opacity-90 font-medium">{footerCopyright}</p>

          {/* Navigation Links */}
          <nav aria-label="Links do footer" className="flex items-center gap-8">
            {footerLinks.map((l) => {
              const isLinkActive =
                l.href === pathname ||
                (l.href === '/#hero' && pathname === '/');

              return (
                <button
                  key={l.href}
                  type="button"
                  onClick={() => handleNavigate(l.href)}
                  className={`text-white text-sm transition-all duration-200 hover:opacity-100 font-medium cursor-pointer ${
                    isLinkActive
                      ? 'opacity-100 border-b-2 border-white'
                      : 'opacity-70'
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
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-section-footer shadow-sm transition-all duration-200 hover:opacity-80"
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
        className="lg:hidden bg-section-footer text-white py-12 relative z-10"
        aria-label="Footer"
      >
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col items-center gap-10">
          {/* Navigation Links */}
          <nav
            aria-label="Links do footer"
            className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4"
          >
            {footerLinks.map((l) => {
              const isLinkActive =
                l.href === pathname ||
                (l.href === '/#hero' && pathname === '/');
              const content = (
                <span
                  className={`text-[15px] font-medium tracking-tight transition-opacity hover:opacity-70 ${isLinkActive ? 'underline underline-offset-4 decoration-2' : ''}`}
                >
                  {l.label}
                </span>
              );

              return (
                <button
                  key={l.href}
                  type="button"
                  onClick={() => handleNavigate(l.href)}
                  className="min-h-[48px] px-4 flex items-center justify-center"
                >
                  {content}
                </button>
              );
            })}
          </nav>

          {/* Social Icons - White Circles */}
          <div className="flex justify-center gap-4">
            {social.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-sm transition-all hover:scale-105 active:scale-95"
                aria-label={`Abrir ${s.label}`}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-center text-[11px] font-medium opacity-80 leading-relaxed uppercase tracking-wider">
            {footerCopyright}
          </p>
        </div>
      </footer>
    </>
  );
}
