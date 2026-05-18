'use client';

import React from 'react';
import { m } from 'motion/react';
import { useMotionGate } from '@/hooks/useMotionGate';
import { viewportConfig, MOTION_TOKENS, GHOST_EASE } from '@/config/motion';
import { Mail, Phone, Globe } from 'lucide-react';
import {
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
} from '@/components/shared/icons/SocialIcons';

import { BRAND } from '@/config/brand';
import { HOME_CONTENT } from '@/config/content';
import { SOCIALS } from '@/config/navigation';
import ContactForm from '@/components/home/contact/ContactForm';
import { Container } from '@/components/layout/Container';

export default function ContactSection() {
  const reducedMotion = useMotionGate();

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
      aria-labelledby="contact-heading"
      className="bg-backgroundLight py-12 sm:py-16 md:py-24 lg:py-32 relative z-10"
    >
      <Container>
        <h2 id="contact-heading" className="sr-only">
          {HOME_CONTENT.contact.title}
        </h2>
        {/* Título mobile separado para manter ordem: título → formulário → canais */}
        <div className="lg:hidden text-center mb-10">
          <div
            aria-hidden="true"
            className="text-5xl md:text-6xl font-bold text-bluePrimary uppercase tracking-tighter mb-3 leading-[0.95]"
          >
            {HOME_CONTENT.contact.title}
          </div>
          <p className="text-textInverse text-lg font-medium max-w-md mx-auto">
            {HOME_CONTENT.contact.subtitle}
          </p>
        </div>
        {/* 2 & 3. Info & Form Grid */}
        <div className="flex flex-col gap-12 lg:grid lg:grid-cols-12 lg:gap-24 items-start">
          {/* Left Side: Headline + Contact Info */}
          <m.div
            initial={
              reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{
              duration: MOTION_TOKENS.duration.normal,
              delay: 0.1,
              ease: GHOST_EASE,
            }}
            className="lg:col-span-5 flex flex-col space-y-10 order-1 lg:order-0"
          >
            {/* Header */}
            <div className="hidden lg:block text-center lg:text-left mb-6 lg:mb-10">
              <div
                aria-hidden="true"
                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-bluePrimary uppercase tracking-tighter mb-4 leading-[0.9]"
              >
                {HOME_CONTENT.contact.title}
              </div>
              <p className="text-textInverse text-lg md:text-xl font-medium max-w-md mx-auto lg:mx-0">
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
                  <span
                    className="flex h-12 w-12 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-transparent border-2 border-bluePrimary text-bluePrimary will-change-transform group-hover:bg-bluePrimary group-hover:text-white group-active:bg-bluePrimary group-active:text-white group-active:translate-y-px"
                    style={{
                      transition: `all ${MOTION_TOKENS.duration.fast}s var(--ease-ghost)`,
                    }}
                  >
                    {link.icon}
                  </span>
                  <span
                    className="text-base sm:text-lg md:text-xl font-semibold text-textInverse group-hover:text-bluePrimary group-hover:underline group-hover:underline-offset-4"
                    style={{
                      transition: `all ${MOTION_TOKENS.duration.fast}s var(--ease-ghost)`,
                    }}
                  >
                    {link.label}
                  </span>
                </a>
              ))}
            </div>

            {/* Social Icons (Desktop) */}
            <div className="hidden lg:flex flex-wrap items-center gap-4 pt-10 border-t border-textInverse/20">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-textInverse/30 bg-transparent text-textInverse transition-all will-change-transform hover:border-bluePrimary hover:bg-bluePrimary hover:text-white hover:-translate-y-0.5"
                >
                  {social.icon}
                  <span className="sr-only">{social.label}</span>
                </a>
              ))}
            </div>
          </m.div>

          {/* Mobile Socials - Touch-optimized with 48px targets */}
          <div className="lg:hidden flex flex-wrap justify-center gap-3 sm:gap-4 py-6 sm:py-8 border-t border-textInverse/20 w-full order-2">
            {socialLinks.map((social) => (
              <a
                key={`mobile-${social.href}`}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-textInverse/30 bg-transparent text-textInverse shadow-sm transition-all duration-fast will-change-transform active:translate-y-px active:bg-bluePrimary active:border-bluePrimary active:text-white"
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
