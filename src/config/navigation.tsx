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

export const SOCIALS = {
  instagram: 'https://instagram.com/danilo_novais',
  facebook: 'https://facebook.com/danilonovaisvilela',
  linkedin: 'https://linkedin.com/in/danilonovais',
  twitter: 'https://twitter.com/danilo_novais',
  emailPrimary: 'dannovaisv@gmail.com',
  emailSecondary: 'danilo@portfoliodanilo.com',
  phone: '+5511983966838',
};

// Array version with icons for components
export const SOCIAL_LIST = [
  {
    platform: 'LinkedIn',
    url: SOCIALS.linkedin,
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    platform: 'Instagram',
    url: SOCIALS.instagram,
    icon: <Instagram className="w-5 h-5" />,
  },
  {
    platform: 'Twitter',
    url: SOCIALS.twitter,
    icon: <Twitter className="w-5 h-5" />,
  },
  {
    platform: 'Facebook',
    url: SOCIALS.facebook,
    icon: <Facebook className="w-5 h-5" />,
  },
];

export const CONTACT_INFO = [
  {
    label: SOCIALS.emailSecondary,
    href: `mailto:${SOCIALS.emailSecondary}`,
    icon: <Mail className="w-5 h-5" />,
  },
  {
    label: SOCIALS.phone,
    href: `tel:${SOCIALS.phone}`,
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
    { label: 'sobre', href: '/sobre' },
    { label: 'portfolio showcase', href: '/portfolio' },
    { label: 'contato', href: '#contact' },
  ],
};

// Header navigation links
export const NAV_LINKS = [
  { label: 'home', href: '/' },
  { label: 'portfolio showcase', href: '/portfolio' },
  { label: 'sobre', href: '/sobre' },
  { label: 'contato', href: '#contact' },
];

export const HEADER_LINKS_DESKTOP = [
  { label: 'home', href: '/', ariaLabel: 'Ir para a home' },
  { label: 'sobre', href: '/sobre', ariaLabel: 'Ir para sobre' },
  {
    label: 'portfolio',
    href: '/portfolio',
    ariaLabel: 'Ir para portfólio',
  },
  { label: 'contato', href: '#contact', ariaLabel: 'Ir para contato' },
];

export const HEADER_LINKS_MOBILE = [
  { label: 'home', href: '/', ariaLabel: 'Ir para a home' },
  { label: 'sobre', href: '/sobre', ariaLabel: 'Ir para sobre' },
  {
    label: 'portfolio',
    href: '/portfolio',
    ariaLabel: 'Ir para portfólio',
  },
  { label: 'contato', href: '#contact', ariaLabel: 'Ir para contato' },
];

export const NAVIGATION = {
  header: [
    { label: 'home', href: '/' },
    { label: 'sobre', href: '/sobre' },
    { label: 'portfolio showcase', href: '/portfolio' },
    { label: 'contato', href: '#contact' },
  ],
  footer: FOOTER,
};
