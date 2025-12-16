'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CONTACT_INFO, SOCIALS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        return value.trim() ? '' : 'Nome é obrigatório';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? '' : 'Email inválido';
      case 'message':
        return value.trim().length >= 10
          ? ''
          : 'Mensagem deve ter pelo menos 10 caracteres';
      default:
        return '';
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to FormSubmit service
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await fetch(
        'https://formsubmit.co/ajax/danilo@portfoliodanilo.com',
        {
          method: 'POST',
          body: formDataToSend,
        }
      );

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      setErrors({
        submit: 'Falha ao enviar mensagem. Por favor tente novamente.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-[#F4F5F7] py-24 md:py-32">
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
                <Button
                  key={idx}
                  href={item.href}
                  variant="ghost"
                  className="justify-start text-lg font-medium text-dark hover:text-primary gap-4 h-auto py-3 px-4"
                >
                  <span className="rounded-full bg-white p-2 text-primary shadow-sm group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  {item.label}
                </Button>
              ))}
            </div>

            <div className="flex gap-4 justify-center md:justify-start">
              {SOCIALS.map((social) => (
                <Button
                  key={social.platform}
                  asExternal
                  href={social.url}
                  target="_blank"
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-white text-dark shadow-sm hover:text-primary h-12 w-12"
                  aria-label={social.platform}
                >
                  {social.icon}
                </Button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100 max-w-2xl w-full mx-auto md:mx-0"
          >
            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Mensagem Enviada!
                </h3>
                <p className="text-gray-600">
                  Obrigado por entrar em contato. Em breve retornarei sua
                  mensagem.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
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
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    className={`w-full rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200'} bg-gray-50 px-4 py-3 transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white`}
                    placeholder="João da Silva"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
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
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    className={`w-full rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} bg-gray-50 px-4 py-3 transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white`}
                    placeholder="joao@empresa.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
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
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    className={`w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white ${errors.phone ? 'focus-visible:ring-red-500' : ''}`}
                    placeholder="(11) 99999-9999"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
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
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className={`w-full resize-none rounded-xl border ${errors.message ? 'border-red-500' : 'border-gray-200'} bg-gray-50 px-4 py-3 transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white`}
                    placeholder="Conte-me sobre seu projeto..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.message}
                    </p>
                  )}
                </div>

                {errors.submit && (
                  <p className="text-sm text-red-500">{errors.submit}</p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full gap-2 rounded-xl py-4 font-bold"
                  aria-label="Send message"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                  {!isSubmitting && (
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
