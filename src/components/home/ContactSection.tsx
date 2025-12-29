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
import { SOCIALS, CONTACT_FORM } from '@/config/navigation';
import { HOME_CONTENT } from '@/config/content';

export default function ContactSection() {
  const reducedMotion = useReducedMotion();
  const contactLinks = [
    {
      label: SOCIALS.phone,
      href: `tel:${SOCIALS.phone}`,
      icon: <Phone className="h-5 w-5" aria-hidden="true" />,
      ariaLabel: 'Ligar para Danilo Novais',
    },
    {
      label: SOCIALS.emailSecondary,
      href: `mailto:${SOCIALS.emailSecondary}`,
      icon: <Mail className="h-5 w-5" aria-hidden="true" />,
      ariaLabel: 'Enviar email para danilo@portfoliodanilo.com',
    },
    {
      label: SOCIALS.emailPrimary,
      href: `mailto:${SOCIALS.emailPrimary}`,
      icon: <Mail className="h-5 w-5" aria-hidden="true" />,
      ariaLabel: 'Enviar email para dannovaisv@gmail.com',
    },
  ];

  const socialLinks = [
    {
      label: 'Instagram de Danilo Novais',
      href: SOCIALS.instagram,
      icon: <Instagram className="h-5 w-5" aria-hidden="true" />,
    },
    {
      label: 'LinkedIn de Danilo Novais',
      href: SOCIALS.linkedin,
      icon: <Linkedin className="h-5 w-5" aria-hidden="true" />,
    },
    {
      label: 'Facebook de Danilo Novais',
      href: SOCIALS.facebook,
      icon: <Facebook className="h-5 w-5" aria-hidden="true" />,
    },
    {
      label: 'Twitter de Danilo Novais',
      href: SOCIALS.twitter,
      icon: <Twitter className="h-5 w-5" aria-hidden="true" />,
    },
    {
      label: 'Portfólio de Danilo Novais',
      href: 'https://portfoliodanilo.com',
      icon: <Globe className="h-5 w-5" aria-hidden="true" />,
    },
  ];

  const formFieldVariants = reducedMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 14 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.35 },
        },
      };

  return (
    <section id="contact" aria-label="Contato" className="bg-white py-12">
      <div className="max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)]">
        <motion.div
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: reducedMotion ? 0 : 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl font-bold text-[#0057FF]">
            {HOME_CONTENT.contact.title}
          </h2>
          <p className="text-text-dark/80 mt-2">
            {HOME_CONTENT.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start md:items-center">
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
            className="space-y-6 text-text-dark"
          >
            <div className="space-y-3">
              {contactLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  aria-label={link.ariaLabel}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors duration-200 hover:text-[#0057FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  whileHover={reducedMotion ? undefined : { x: 4, scale: 1.01 }}
                  whileTap={reducedMotion ? undefined : { scale: 0.99 }}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0057FF]/10 text-[#0057FF]">
                    {link.icon}
                  </span>
                  <span className="text-lg font-medium">{link.label}</span>
                </motion.a>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-1">
              <span className="text-sm uppercase tracking-wide text-text-dark/60">
                redes & portfólio
              </span>
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-text-dark transition-colors duration-200 hover:text-[#0057FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    whileHover={
                      reducedMotion ? undefined : { scale: 1.1, y: -1 }
                    }
                    whileTap={reducedMotion ? undefined : { scale: 0.97 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.form
            action={CONTACT_FORM.action}
            method="POST"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: reducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 12 },
              show: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: reducedMotion ? 0 : 0.08 },
              },
            }}
            className="bg-[#f5f5f7] rounded-xl p-6 md:p-8 border border-black/5"
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />

            {[
              { label: 'Seu nome', name: 'name', type: 'text' },
              { label: 'Seu email', name: 'email', type: 'email' },
              { label: 'Telefone', name: 'phone', type: 'text' },
            ].map((f) => (
              <motion.label
                key={f.name}
                variants={formFieldVariants}
                className="block mb-4"
              >
                <span className="block text-sm text-text-dark/70 mb-1">
                  {f.label}
                </span>
                <input
                  name={f.name}
                  type={f.type}
                  required={f.name !== 'phone'}
                  title={f.label}
                  placeholder={f.label}
                  maxLength={100}
                  className="w-full rounded-lg px-4 py-3 bg-white border border-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f5f7]"
                />
              </motion.label>
            ))}

            <motion.label variants={formFieldVariants} className="block mb-5">
              <span className="block text-sm text-text-dark/70 mb-1">
                Sua mensagem
              </span>
              <textarea
                name="message"
                required
                rows={5}
                title="Sua mensagem"
                placeholder="Escreva sua mensagem aqui..."
                maxLength={500}
                className="w-full rounded-lg px-4 py-3 bg-white border border-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f5f7]"
              />
            </motion.label>

            <motion.button
              type="submit"
              whileHover={reducedMotion ? undefined : { scale: 1.02, y: -1 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
              className="w-full rounded-lg bg-[#0057FF] text-white py-3 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f5f7]"
            >
              Enviar Mensagem →
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
