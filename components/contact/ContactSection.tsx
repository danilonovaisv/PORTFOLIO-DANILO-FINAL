'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function ContactSection() {
  const reduced = usePrefersReducedMotion();

  const sectionProps = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.6 },
      };

  return (
    <motion.section id="contact" className="bg-white py-16" {...sectionProps}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#0057FF]">contato</h2>
          <p className="mt-1 text-sm text-[#111111]">
            Tem uma pergunta ou quer trabalhar junto?
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)]">
          <div className="space-y-4 text-sm text-[#111111]">
            <div>
              <p className="font-medium">Telefone</p>
              <a
                href="tel:+5511983966838"
                className="text-[#0057FF] hover:underline"
              >
                +55 11 98396-6838
              </a>
            </div>
            <div>
              <p className="font-medium">E-mail</p>
              <div className="flex flex-col gap-1">
                <a
                  href="mailto:dannovaisv@gmail.com"
                  className="text-[#0057FF] hover:underline"
                >
                  dannovaisv@gmail.com
                </a>
                <a
                  href="mailto:danilo@portfoliodanilo.com"
                  className="text-[#0057FF] hover:underline"
                >
                  danilo@portfoliodanilo.com
                </a>
              </div>
            </div>
            <div>
              <p className="font-medium">Site</p>
              <a
                href="https://portfoliodanilo.com"
                className="text-[#0057FF] hover:underline"
              >
                portfoliodanilo.com
              </a>
            </div>
            <div>
              <p className="font-medium">Redes sociais</p>
              <ul className="mt-1 space-y-1">
                <li>
                  <a
                    href="https://instagram.com/danilo_novais"
                    className="text-[#0057FF] hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://facebook.com/danilonovaisvilela"
                    className="text-[#0057FF] hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/danilonovais"
                    className="text-[#0057FF] hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/danilo_novais"
                    className="text-[#0057FF] hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <motion.form
            action="https://formsubmit.co/danilo@portfoliodanilo.com"
            method="POST"
            className="space-y-4 text-sm"
            initial={reduced ? undefined : { opacity: 0, y: 24 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div>
              <label
                htmlFor="name"
                className="mb-1 block font-medium text-[#111111]"
              >
                Nome
              </label>
              <input
                id="name"
                name="name"
                required
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-1 block font-medium text-[#111111]"
              >
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="mb-1 block font-medium text-[#111111]"
              >
                Assunto
              </label>
              <input
                id="subject"
                name="subject"
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-1 block font-medium text-[#111111]"
              >
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              />
            </div>
            <motion.button
              type="submit"
              className="inline-flex items-center rounded-full bg-[#0057FF] px-6 py-2.5 text-sm font-medium text-white shadow-md transition-colors hover:bg-[#0044cc] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              whileHover={reduced ? undefined : { y: -1, scale: 1.02 }}
              whileTap={reduced ? undefined : { y: 0, scale: 0.98 }}
            >
              Enviar Mensagem
            </motion.button>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
}
