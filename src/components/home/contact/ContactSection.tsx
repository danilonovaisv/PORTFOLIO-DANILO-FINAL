'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Mail,
  Phone,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Globe,
} from 'lucide-react';

import { BRAND } from '@/config/brand';
import { HOME_CONTENT } from '@/config/content';
import { SOCIALS } from '@/config/navigation';
import ContactForm from './ContactForm';

export default function ContactSection() {
  const reducedMotion = useReducedMotion();

  const contactLinks = [
    {
      label: SOCIALS.phone,
      href: `tel:${SOCIALS.phone.replace(/\D/g, '')}`,
      icon: <Phone className="h-5 w-5" aria-hidden="true" />,
      ariaLabel: `Ligar para ${SOCIALS.phone}`,
    },
    {
      label: SOCIALS.emailPrimary.replace('mailto:', ''),
      href: SOCIALS.emailPrimary,
      icon: <Mail className="h-5 w-5" aria-hidden="true" />,
      ariaLabel: `Enviar email para ${SOCIALS.emailPrimary.replace('mailto:', '')}`,
    },
    {
      label: SOCIALS.emailSecondary.replace('mailto:', ''),
      href: SOCIALS.emailSecondary,
      icon: <Mail className="h-5 w-5" aria-hidden="true" />,
      ariaLabel: `Enviar email para ${SOCIALS.emailSecondary.replace('mailto:', '')}`,
    },
  ];

  const socialLinks = [
    {
      label: 'Instagram',
      href: SOCIALS.instagram,
      icon: <Instagram className="h-5 w-5" aria-hidden="true" />,
    },
    {
      label: 'Facebook',
      href: SOCIALS.facebook,
      icon: <Facebook className="h-5 w-5" aria-hidden="true" />,
    },
    {
      label: 'LinkedIn',
      href: SOCIALS.linkedin,
      icon: <Linkedin className="h-5 w-5" aria-hidden="true" />,
    },
    {
      label: 'Twitter',
      href: SOCIALS.twitter,
      icon: <Twitter className="h-5 w-5" aria-hidden="true" />,
    },
    {
      label: 'Portfolio',
      href: `https://${BRAND.domain}`,
      icon: <Globe className="h-5 w-5" aria-hidden="true" />,
    },
  ];

  return (
    <section
      id="contact"
      aria-label="Contato"
      // Spec: bg-white (or neutralLight in themed)
      className="bg-backgroundLight py-16 md:py-24 lg:py-32 relative z-10"
    >
      <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-24">
        {/* 2 & 3. Info & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          {/* Left Side: Headline + Contact Info (Aligned with form) */}
          <motion.div
            initial={
              reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col space-y-10 order-1"
          >
            {/* Header moved inside grid for alignment */}
            <div className="text-left mb-6 lg:mb-10">
              <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-bluePrimary uppercase tracking-tighter mb-4 leading-[0.9]">
                {HOME_CONTENT.contact.title}
              </h2>
              <p className="text-textInverse/70 text-lg md:text-xl font-medium max-w-md">
                {HOME_CONTENT.contact.subtitle}
              </p>
            </div>

            {/* Direct Channels */}
            <div className="flex flex-col space-y-6">
              {contactLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    link.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  aria-label={link.ariaLabel}
                  className="flex items-center gap-4 group w-fit"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-transparent text-bluePrimary border border-bluePrimary/20 transition-all group-hover:bg-bluePrimary group-hover:text-white group-hover:border-bluePrimary scale-100 group-hover:scale-110">
                    {link.icon}
                  </span>
                  <span className="text-lg md:text-xl font-semibold text-textInverse group-hover:text-bluePrimary group-hover:underline decoration-2 underline-offset-4 transition-all duration-300">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>

            {/* Social Icons (Desktop view, shown separate on mobile) */}
            <div className="hidden lg:flex flex-wrap items-center gap-4 pt-10 border-t border-[#111111]/10">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-textInverse/20 bg-transparent text-textInverse transition-all hover:border-bluePrimary hover:text-bluePrimary hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Form (Starts at the same level as Title) */}
          <div className="lg:col-span-7 w-full order-2">
            <ContactForm />
          </div>

          {/* 4. Mobile Socials (Shown 4th on mobile) */}
          <div className="lg:hidden flex flex-wrap justify-center gap-4 py-8 border-t border-[#111111]/10 w-full order-3">
            {socialLinks.map((social) => (
              <a
                key={`mobile-${social.href}`}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-textInverse/20 bg-white text-textInverse shadow-sm active:scale-95 active:border-bluePrimary active:text-bluePrimary"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
