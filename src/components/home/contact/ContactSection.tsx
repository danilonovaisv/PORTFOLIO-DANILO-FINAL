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

import { BRAND } from '@/config/brand';
import { HOME_CONTENT } from '@/config/content';
import { SOCIALS } from '@/config/navigation';
import ContactForm from './ContactForm';

export default function ContactSection() {
  const reducedMotion = useReducedMotion();

  const contactLinks = [
    {
      label: '+55 11 98396 6838',
      href: SOCIALS.phone,
      icon: <Phone className="h-5 w-5" aria-hidden="true" />,
      ariaLabel: 'Ligar para Danilo Novais',
    },
    {
      label: 'dannovaisv@gmail.com',
      href: SOCIALS.emailSecondary,
      icon: <Mail className="h-5 w-5" aria-hidden="true" />,
      ariaLabel: 'Enviar email para dannovaisv@gmail.com',
    },
    {
      label: 'danilo@portfoliodanilo.com',
      href: SOCIALS.emailPrimary,
      icon: <Mail className="h-5 w-5" aria-hidden="true" />,
      ariaLabel: 'Enviar email para danilo@portfoliodanilo.com',
    },
    {
      label: BRAND.domain,
      href: `https://${BRAND.domain}`,
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
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-[32px] md:text-[36px] font-bold text-primary uppercase tracking-tight">
            {HOME_CONTENT.contact.title}
          </h2>
          <p className="text-text-dark/80 mt-3 text-[18px] md:text-[20px] font-medium max-w-2xl mx-auto">
            {HOME_CONTENT.contact.subtitle}
          </p>
        </motion.div>

        {/* Content Structure for Mobile/Desktop */}
        <div className="flex flex-col items-center gap-12">
          {/* Contact Links & Socials Container */}
          <div className="flex flex-col items-center w-full lg:max-w-4xl lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
            {/* Left/Top: Contact Info + Socials */}
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
              className="flex flex-col items-center lg:items-start space-y-8 w-full"
            >
              {/* Vertical Contact List */}
              <div className="flex flex-col items-center lg:items-start gap-4 w-full">
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
                    className="flex items-center gap-4 group w-fit"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-primary shadow-sm transition-all group-hover:bg-primary group-hover:text-white">
                      {link.icon}
                    </span>
                    <span className="text-[17px] md:text-[18px] font-semibold text-text-dark/90 group-hover:text-primary transition-colors">
                      {link.label}
                    </span>
                  </motion.a>
                ))}
              </div>

              {/* Social Icons Row */}
              <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-text-dark/70 shadow-sm transition-all hover:border-primary hover:text-primary hover:scale-105 active:scale-95"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Right/Bottom: Form Card */}
            <div className="w-full max-w-[540px] mt-8 lg:mt-0">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
