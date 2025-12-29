'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function ContactSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="contact" aria-label="Contato" className="bg-white py-12">
      <div className="max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: reducedMotion ? 0.2 : 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl font-bold text-[#0057FF]">contato</h2>
          <p className="text-[#111111]/80 mt-2">
            Tem uma pergunta ou quer trabalhar junto?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start">
          <div className="space-y-4 text-[#111111]">
            <a
              className="block hover:underline underline-offset-4"
              href="tel:+5511983966838"
            >
              +55 11 98396 6838
            </a>

            {/* Email primário primeiro (spec) */}
            <a
              className="block hover:underline underline-offset-4"
              href="mailto:danilo@portfoliodanilo.com"
            >
              danilo@portfoliodanilo.com
            </a>

            <a
              className="block hover:underline underline-offset-4"
              href="mailto:dannovaisv@gmail.com"
            >
              dannovaisv@gmail.com
            </a>

            <a
              className="block hover:underline underline-offset-4"
              href="https://portfoliodanilo.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              portfoliodanilo.com
            </a>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="https://instagram.com/danilo_novais"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#111111]/70 hover:text-[#111111]"
              >
                Instagram
              </a>
              <a
                href="https://facebook.com/danilonovaisvilela"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#111111]/70 hover:text-[#111111]"
              >
                Facebook
              </a>
              <a
                href="https://linkedin.com/in/danilonovais"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#111111]/70 hover:text-[#111111]"
              >
                LinkedIn
              </a>
              <a
                href="https://twitter.com/danilo_novais"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#111111]/70 hover:text-[#111111]"
              >
                Twitter
              </a>
            </div>
          </div>

          <motion.form
            action="https://formsubmit.co/danilo@portfoliodanilo.com"
            method="POST"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              show: {
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
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: reducedMotion ? 0.2 : 0.35 },
                  },
                }}
                className="block mb-4"
              >
                <span className="block text-sm text-[#111111]/70 mb-1">
                  {f.label}
                </span>
                <input
                  name={f.name}
                  type={f.type}
                  required={f.name !== 'phone'}
                  className="w-full rounded-lg px-4 py-3 bg-white border border-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f5f7]"
                />
              </motion.label>
            ))}

            <motion.label
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: reducedMotion ? 0.2 : 0.35 },
                },
              }}
              className="block mb-5"
            >
              <span className="block text-sm text-[#111111]/70 mb-1">
                Sua mensagem
              </span>
              <textarea
                name="message"
                required
                rows={5}
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
