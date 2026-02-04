'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { InputField, TextAreaField } from './FormFields';
import { CONTACT_FORM } from '@/config/navigation';

const ContactForm: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
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
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await fetch(
        `${CONTACT_FORM.action.replace('formsubmit.co/', 'formsubmit.co/ajax/')}`,
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
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-[640px] mx-auto lg:ml-auto bg-white p-8 md:p-12 rounded-[24px] shadow-sm border border-textInverse/5"
    >
      <div className="p-0">
        {submitSuccess ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
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
            <h3 className="text-3xl font-bold text-textInverse mb-4">
              Mensagem Enviada!
            </h3>
            <p className="text-textInverse/60 text-lg">
              Obrigado pelo contato. Responderei o mais breve possível.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            action={CONTACT_FORM.action}
            method="POST"
            className="space-y-8"
          >
            <noscript>
              <p className="p-4 mb-4 text-sm text-amber-800 bg-amber-50 rounded-lg">
                JavaScript está desativado. O formulário será enviado via
                redirecionamento padrão.
              </p>
            </noscript>
            <input
              type="text"
              name="_honey"
              className="hidden"
              hidden
              aria-hidden="true"
              tabIndex={-1}
              title="Ignore this field"
              autoComplete="off"
            />
            <input type="hidden" name="_captcha" value="false" />

            <div className="grid grid-cols-1 gap-8">
              <InputField
                label="Seu nome"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
                autoComplete="name"
                placeholder="João da Silva"
              />

              <InputField
                label="Seu email"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
                autoComplete="email"
                placeholder="joao@empresa.com"
              />

              <InputField
                label="Telefone"
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                placeholder="(11) 99999-9999"
              />

              <TextAreaField
                label="Sua mensagem"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                required
                rows={4}
                placeholder="Conte-me sobre seu projeto..."
              />
            </div>

            {errors.submit && (
              <p className="text-sm text-red-500 font-bold uppercase">
                {errors.submit}
              </p>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ y: -1, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full h-[60px] md:h-[64px] flex items-center justify-center gap-3 bg-[#0048ff] text-white font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0048ff] focus-visible:ring-offset-2 tracking-tight text-lg shadow-[0_10px_30px_-10px_rgba(0,72,255,0.3)]"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
              {!isSubmitting && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              )}
            </motion.button>
          </form>
        )}
      </div>
    </motion.div>
  );
};

export default ContactForm;
