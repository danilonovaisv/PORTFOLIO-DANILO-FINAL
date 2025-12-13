'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CONTACT_INFO, SOCIALS } from '../../lib/constants';
import { ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="bg-[#F4F5F7] py-20 md:py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0057FF] mb-4 lowercase text-center md:text-left">
              contato
            </h2>
            <p className="text-xl text-dark mb-12 text-center md:text-left">
              Tem uma pergunta ou quer trabalhar junto?
            </p>

            <div className="space-y-6 mb-12 flex flex-col items-center md:items-start">
              {CONTACT_INFO.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="group flex items-center gap-4 text-lg font-medium text-dark transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F5F7] justify-center md:justify-start"
                >
                  <span className="rounded-full bg-white p-3 text-primary shadow-sm transition-transform group-hover:scale-110">
                    {item.icon}
                  </span>
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex gap-4 justify-center md:justify-start">
              {SOCIALS.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white p-3 text-dark shadow-sm transition-all duration-300 hover:scale-110 hover:opacity-80 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F5F7]"
                  aria-label={social.platform}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100 max-w-2xl w-full mx-auto md:mx-0"
          >
            <form
              action="https://formsubmit.co/danilo@portfoliodanilo.com"
              method="POST"
              className="space-y-6"
            >
              <input type="text" name="_honey" style={{ display: 'none' }} />
              <input type="hidden" name="_captcha" value="false" />

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-600 mb-2"
                >
                  Seu nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  placeholder="João da Silva"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-600 mb-2"
                >
                  Seu email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  placeholder="joao@empresa.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-600 mb-2"
                >
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-600 mb-2"
                >
                  Sua mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  placeholder="Conte-me sobre seu projeto..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-white transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary/20"
                aria-label="Open contact form"
              >
                Enviar Mensagem
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
