'use client';

import React from 'react';
import ContactDetails from './contact/ContactDetails';
import ContactForm from './contact/ContactForm';

const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="bg-white py-24 md:py-32 border-t border-black/5"
    >
      <span id="contato" className="sr-only" aria-hidden="true" />
      <div className="mx-auto w-full px-[clamp(1.5rem,5vw,6rem)] max-w-[1680px]">
        {/* Cabeçalho centralizado conforme referência */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-focus-ring mb-4">
            contato
          </h2>
          <p className="text-xl text-text-muted">
            Tem uma pergunta ou quer trabalhar junto?
          </p>
        </div>

        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:gap-24 items-start">
          <ContactDetails />
          <div className="relative">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
