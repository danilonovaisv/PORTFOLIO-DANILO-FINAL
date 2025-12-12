'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CONTACT_INFO, SOCIALS } from '../../lib/constants';
import { ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="bg-neutral-950 py-32 md:py-40">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, ease: 'easeOut' }}
        className="container mx-auto px-6 md:px-12"
      >
        <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="text-[clamp(2.25rem,4vw,3.75rem)] font-semibold text-white mb-4 lowercase">
              contato
            </h2>
            <p className="text-xl text-neutral-300 mb-12">
              Tem uma pergunta ou quer trabalhar junto?
            </p>

            <div className="space-y-6 mb-12">
              {CONTACT_INFO.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="flex items-center gap-4 text-white/80 hover:text-white transition-colors text-lg font-medium group"
                >
                  <span className="p-3 bg-white text-primary rounded-full shadow-md group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </span>
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex gap-4">
              {SOCIALS.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 rounded-full text-white hover:text-primary hover:bg-white transition-all duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  aria-label={social.platform}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
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
                  className="block text-sm font-semibold text-white/80 mb-2"
                >
                  Seu nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
                  placeholder="João da Silva"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-white/80 mb-2"
                >
                  Seu email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
                  placeholder="joao@empresa.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-white/80 mb-2"
                >
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-white/80 mb-2"
                >
                  Sua mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all resize-none"
                  placeholder="Conte-me sobre seu projeto..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="w-full inline-flex items-center justify-center gap-2 bg-white text-neutral-950 font-semibold py-4 rounded-xl shadow-lg hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all"
                aria-label="Enviar mensagem"
              >
                Enviar Mensagem
                <ArrowRight className="w-5 h-5 transition-transform duration-300" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
