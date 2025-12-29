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
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-24">
          <ContactDetails />
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-500/5 blur-2xl rounded-full pointer-events-none" />
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
