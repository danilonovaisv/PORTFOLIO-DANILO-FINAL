'use client';

import React from 'react';
import ContactDetails from './contact/ContactDetails';
import ContactForm from './contact/ContactForm';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="bg-white py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-16">
          <ContactDetails />
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
