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
import { Container } from '@/components/layout/Container';

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
      data-light-section
      aria-label="Contato"
      className="bg-[#f0f0f0] py-12 sm:py-16 md:py-24 lg:py-32 relative z-10"
    >
      <Container>
        {/* 2 & 3. Info & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          {/* Left Side: Headline + Contact Info */}
          <motion.div
            initial={
              reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col space-y-10 order-1 md:order-1 lg:order-0"
          >
            {/* Header */}
            <div className="text-center lg:text-left mb-6 lg:mb-10">
              <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#0057FF] uppercase tracking-tighter mb-4 leading-[0.9]">
                {HOME_CONTENT.contact.title}
              </h2>
              <p className="text-[#111111] text-lg md:text-xl font-medium max-w-md mx-auto lg:mx-0">
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
                  className="flex items-center gap-3 sm:gap-4 group w-fit py-2 active:opacity-80 transition-opacity"
                >
                  {/* Touch target: 48px minimum */}
                  <span className="flex h-12 w-12 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-transparent border-2 border-[#0057FF] text-[#0057FF] transition-all duration-200 group-hover:bg-[#0057FF] group-hover:text-white group-active:bg-[#0057FF] group-active:text-white group-active:scale-95">
                    {link.icon}
                  </span>
                  <span className="text-base sm:text-lg md:text-xl font-semibold text-[#111111] transition-all duration-200 group-hover:text-[#0057FF] group-hover:underline group-hover:underline-offset-4">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>

            {/* Social Icons (Desktop) */}
            <div className="hidden lg:flex flex-wrap items-center gap-4 pt-10 border-t border-[#0e0e0e]/20">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-[#0e0e0e]/30 bg-transparent text-[#0e0e0e] transition-all hover:border-[#0048ff] hover:bg-[#0048ff] hover:text-white hover:scale-110"
                >
                  {social.icon}
                  <span className="sr-only">{social.label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Mobile Socials - Touch-optimized with 48px targets */}
          <div className="lg:hidden flex flex-wrap justify-center gap-3 sm:gap-4 py-6 sm:py-8 border-t border-[#0e0e0e]/20 w-full order-2">
            {socialLinks.map((social) => (
              <a
                key={`mobile-${social.href}`}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#0e0e0e]/30 bg-transparent text-[#0e0e0e] shadow-sm transition-all duration-200 active:scale-90 active:bg-[#0048ff] active:border-[#0048ff] active:text-white"
              >
                {social.icon}
                <span className="sr-only">{social.label}</span>
              </a>
            ))}
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7 w-full order-3 lg:order-0">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
