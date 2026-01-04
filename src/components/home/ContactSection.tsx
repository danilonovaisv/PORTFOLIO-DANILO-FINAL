'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Phone,
  Mail,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Globe,
} from 'lucide-react';
import { SOCIALS } from '@/config/navigation';
import { HOME_CONTENT } from '@/config/content';
import ContactForm from './contact/ContactForm';

export default function ContactSection() {
  const reducedMotion = useReducedMotion();

  const contactLinks = [
    {
      label: '+55 11 98396 6838',
      href: `tel:${SOCIALS.phone}`,
      icon: <Phone className="h-5 w-5" aria-hidden="true" />,
      ariaLabel: 'Ligar para Danilo Novais',
    },
    {
      label: 'dannovaisv@gmail.com',
      href: `mailto:${SOCIALS.emailPrimary}`,
      icon: <Mail className="h-5 w-5" aria-hidden="true" />,
      ariaLabel: 'Enviar email para dannovaisv@gmail.com',
    },
    {
      label: 'danilo@portfoliodanilo.com',
      href: `mailto:${SOCIALS.emailSecondary}`,
      icon: <Mail className="h-5 w-5" aria-hidden="true" />,
      ariaLabel: 'Enviar email para danilo@portfoliodanilo.com',
    },
    {
      label: 'portfoliodanilo.com',
      href: 'https://portfoliodanilo.com',
      icon: <Globe className="h-5 w-5" aria-hidden="true" />,
      ariaLabel: 'Visitar portfólio',
    },
  ];

  const socialLinks = [
    {
      label: 'Instagram de Danilo Novais',
      href: SOCIALS.instagram,
      icon: <Instagram className="h-5 w-5" aria-hidden="true" />,
    },
    {
      label: 'Facebook de Danilo Novais',
      href: SOCIALS.facebook,
      icon: <Facebook className="h-5 w-5" aria-hidden="true" />,
    },
    {
      label: 'LinkedIn de Danilo Novais',
      href: SOCIALS.linkedin,
      icon: <Linkedin className="h-5 w-5" aria-hidden="true" />,
    },
    {
      label: 'Twitter de Danilo Novais',
      href: SOCIALS.twitter,
      icon: <Twitter className="h-5 w-5" aria-hidden="true" />,
    },
  ];

  return (
    <section
      id="contact"
      aria-label="Contato"
      data-light-section
      className="bg-section-contact py-16 md:py-24 relative z-10"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: reducedMotion ? 0 : 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-center mb-12"
        >
          <h2 className="text-[24px] md:text-[28px] font-semibold text-primary">
            {HOME_CONTENT.contact.title}
          </h2>
          <p className="text-text-dark/70 mt-2 text-[15px] md:text-[17px]">
            {HOME_CONTENT.contact.subtitle}
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Contact Info */}
          <motion.div
            initial={
              reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: reducedMotion ? 0 : 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="space-y-6"
          >
            {contactLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={
                  link.href.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined
                }
                aria-label={link.ariaLabel}
                className="flex items-center gap-5 group"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-primary shadow-sm transition-colors group-hover:bg-primary group-hover:text-white">
                  {link.icon}
                </span>
                <span className="text-[16px] md:text-[18px] font-semibold text-text-dark group-hover:text-primary transition-colors">
                  {link.label}
                </span>
              </motion.a>
            ))}

            {/* Social Icons (Desktop) */}
            <div className="hidden lg:flex items-center gap-4 pt-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-text-dark shadow-sm transition-all hover:border-primary hover:text-primary hover:scale-105"
                  whileHover={reducedMotion ? undefined : { scale: 1.1 }}
                  whileTap={reducedMotion ? undefined : { scale: 0.97 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <div className="w-full">
            <ContactForm />
          </div>

          {/* Social Icons (Mobile) */}
          <div className="lg:hidden flex items-center justify-center gap-4 pt-4 w-full">
            {socialLinks.map((social) => (
              <motion.a
                key={`mobile-${social.href}`}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-text-dark shadow-sm transition-all hover:border-primary hover:text-primary active:scale-95"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
