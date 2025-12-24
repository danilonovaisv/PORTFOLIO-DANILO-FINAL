import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { InputField, TextAreaField } from './FormFields';
import { CONTACT_FORM } from '@/config/navigation';

const ContactForm: React.FC = () => {
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
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="bg-gray-50 p-8 md:p-10 rounded-3xl shadow-2xl border border-black/5 max-w-2xl w-full mx-auto md:mx-0"
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
          <h3 className="text-2xl font-bold text-[#111111] mb-2">
            Mensagem Enviada!
          </h3>
          <p className="text-[#666666]">
            Obrigado por entrar em contato. Em breve retornarei sua mensagem.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="_honey"
            className="hidden"
            aria-hidden="true"
            tabIndex={-1}
            title="Ignore this field"
            autoComplete="off"
          />
          <input type="hidden" name="_captcha" value="false" />

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
            autoComplete="tel"
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
  );
};

export default ContactForm;
