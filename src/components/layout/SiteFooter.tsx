import React from 'react';
import Link from 'next/link';
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import { NAVIGATION, SOCIALS } from '@/config/navigation';

/**
 * SiteFooter Component (Ghost Era Spec 4.7 & Workflow Footer)
 *
 * Protocol:
 * - Desktop (>=1024px): Fixed bar at bottom, 48-64px height, bg-[#0057FF].
 * - Mobile (<1024px): Static section, vertical stack (Copyright → Nav → Social), space-y-8, py-10.
 */
export default function SiteFooter() {
  const socialLinks = [
    {
      label: 'Instagram',
      href: SOCIALS.instagram,
      icon: <Instagram className="w-5 h-5 lg:w-4 lg:h-4" />,
    },
    {
      label: 'LinkedIn',
      href: SOCIALS.linkedin,
      icon: <Linkedin className="w-5 h-5 lg:w-4 lg:h-4" />,
    },
    {
      label: 'Twitter',
      href: SOCIALS.twitter,
      icon: <Twitter className="w-5 h-5 lg:w-4 lg:h-4" />,
    },
  ];

  return (
    <footer
      className="w-full bg-[#0057FF] text-white lg:fixed lg:bottom-0 lg:left-0 lg:z-10 relative z-0 footer-safe-area"
      aria-label="Rodapé do site"
    >
      <div className="std-grid flex flex-col lg:flex-row items-center justify-between py-12 lg:py-0 lg:h-[64px] gap-10 lg:gap-0">
        {/* 1. Copyright (Order 1 on Mobile, Left on Desktop) */}
        <div className="order-1 lg:order-0">
          <p className="text-[0.875rem] lg:text-[10px] font-medium tracking-[0.05em] uppercase opacity-90 lg:opacity-100 text-center lg:text-left">
            {NAVIGATION.footer.copyright}
          </p>
        </div>

        {/* 2. Navigation (Order 2 on Mobile, Center/Right on Desktop) */}
        <nav
          className="flex flex-row flex-wrap justify-center items-center gap-2 sm:gap-4 lg:gap-8 order-2 lg:order-0"
          aria-label="Navegação do rodapé"
        >
          {NAVIGATION.footer.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="group relative text-[11px] sm:text-[12px] font-bold uppercase tracking-widest hover:opacity-80 transition-opacity duration-200 py-4 px-3 sm:px-4 lg:py-0 lg:px-0 min-h-[48px] flex items-center"
            >
              {link.label}
              {/* Hover Underline (Desktop Only) */}
              <span className="absolute bottom-[-2px] left-0 w-0 h-px bg-white transition-all duration-200 ease-out group-hover:w-full hidden lg:block" />
            </Link>
          ))}
        </nav>

        {/* 3. Social Media (Order 3 on Mobile, Right on Desktop) */}
        <div
          className="flex flex-row items-center justify-center gap-4 order-3 lg:order-0"
          aria-label="Redes sociais"
        >
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105 transition-transform duration-200 opacity-100 lg:opacity-90 lg:hover:opacity-100 p-3 lg:p-0 flex items-center justify-center min-w-[48px] min-h-[48px] lg:min-w-0 lg:min-h-0"
              aria-label={social.label}
            >
              {social.icon}
              <span className="sr-only">{social.label}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
