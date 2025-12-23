'use client';

import React from 'react';
import ContactDetails from './contact/ContactDetails';
import ContactForm from './contact/ContactForm';

const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="bg-[#050505] py-24 md:py-32 border-t border-white/5"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
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
