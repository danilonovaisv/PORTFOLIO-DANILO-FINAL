import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
} from 'lucide-react';

export const SOCIALS = [
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/danilonovais',
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    platform: 'Instagram',
    url: 'https://instagram.com/danilo_novais',
    icon: <Instagram className="w-5 h-5" />,
  },
  {
    platform: 'Twitter',
    url: 'https://twitter.com/danilo_novais',
    icon: <Twitter className="w-5 h-5" />,
  },
  {
    platform: 'Facebook',
    url: 'https://facebook.com/danilonovaisvilela',
    icon: <Facebook className="w-5 h-5" />,
  },
];

export const CONTACT_INFO = [
  {
    label: 'danilo@portfoliodanilo.com',
    href: 'mailto:danilo@portfoliodanilo.com',
    icon: <Mail className="w-5 h-5" />,
  },
  {
    label: '+55 (11) 98396-6838',
    href: 'tel:+5511983966838',
    icon: <Phone className="w-5 h-5" />,
  },
  {
    label: 'São Paulo, SP',
    href: '#',
    icon: <MapPin className="w-5 h-5" />,
  },
];

export const CONTACT_FORM = {
  action: 'https://formsubmit.co/danilo@portfoliodanilo.com',
};

export const FOOTER = {
  copyright: '© 2025 Danilo Novais Vilela — todos os direitos reservados.',
  links: [
    { label: 'home', href: '/' },
    { label: 'portfolio showcase', href: '#portfolio-showcase' },
    { label: 'sobre', href: '/sobre' },
    { label: 'contato', href: '#contact' },
  ],
};

// Header navigation links (different from footer)
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contato', href: '#contact' },
];
