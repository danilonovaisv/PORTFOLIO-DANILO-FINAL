'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CONTACT_INFO, SOCIALS } from '../../lib/constants';
import { ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section 
      id="contact" 
      aria-labelledby="contact-title" 
      className="py-24 bg-[#F4F5F7]"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Informações de Contato */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-10"
          >
            <div>
              <h2 
                id="contact-title" 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0057FF] mb-6 lowercase tracking-tight"
              >
                contato
              </h2>
              <p className="text-xl md:text-2xl text-[#111111] leading-relaxed max-w-md">
                Tem uma pergunta ou quer trabalhar junto?
              </p>
            </div>

            <div className="space-y-6">
              {CONTACT_INFO.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="flex items-center gap-5 text-[#111111] hover:text-[#0057FF] transition-colors text-lg md:text-xl font-medium group w-fit rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF]"
                >
                  <span className="p-4 bg-white rounded-full text-[#0057FF] shadow-sm group-hover:scale-110 transition-transform ring-1 ring-black/5">
                    {item.icon}
                  </span>
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              {SOCIALS.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white rounded-full text-[#111111] hover:text-[#0057FF] hover:scale-110 hover:shadow-md transition-all shadow-sm ring-1 ring-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF]"
                  aria-label={social.platform}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Formulário */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl shadow-black/5 ring-1 ring-black/5"
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
                  className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider"
                >
                  Seu nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-5 py-4 bg-[#F4F5F7] border-transparent rounded-xl text-[#111111] placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0057FF] transition-all"
                  placeholder="João da Silva"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider"
                >
                  Seu email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-5 py-4 bg-[#F4F5F7] border-transparent rounded-xl text-[#111111] placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0057FF] transition-all"
                  placeholder="joao@empresa.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider"
                >
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-5 py-4 bg-[#F4F5F7] border-transparent rounded-xl text-[#111111] placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0057FF] transition-all"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider"
                >
                  Sua mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full px-5 py-4 bg-[#F4F5F7] border-transparent rounded-xl text-[#111111] placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0057FF] transition-all resize-none"
                  placeholder="Conte-me sobre seu projeto..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0057FF] text-white font-bold py-4 px-6 rounded-full hover:bg-[#0046cc] hover:shadow-lg hover:shadow-[#0057FF]/30 transition-all flex items-center justify-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0057FF]"
              >
                Enviar Mensagem
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
