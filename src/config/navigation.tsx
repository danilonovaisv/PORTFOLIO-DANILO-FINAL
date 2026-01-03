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
  emailPrimary: 'mailto:danilo@portfoliodanilo.com',
  emailSecondary: 'mailto:dannovaisv@gmail.com',
  phone: 'tel:+5511983966838',
};

export const CONTACT_FORM = {
  action: 'https://formsubmit.co/danilo@portfoliodanilo.com',
  buttonLabel: 'Enviar Mensagem',
};

export const NAVIGATION = {
  header: [
    { label: 'Home', href: '/#hero' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Portfólio', href: '/portfolio' },
    { label: 'Contato', href: '#contact' },
  ],
  footer: {
    copyright: '© 2025 Danilo Novais Vilela — todos os direitos reservados.',
    links: [
      { label: 'home', href: '#hero' },
      { label: 'portfólio showcase', href: '#portfolio-showcase' },
      { label: 'sobre', href: '/sobre' },
      { label: 'contato', href: '#contact' },
    ],
  },
};

// --- Helpers for Components (Deprecated: prefer using NAVIGATION directly) ---

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
    label: SOCIALS.emailPrimary.replace('mailto:', ''),
    href: SOCIALS.emailPrimary,
    icon: <Mail className="w-5 h-5" />,
  },
  {
    label: SOCIALS.phone.replace('tel:', ''),
    href: SOCIALS.phone,
    icon: <Phone className="w-5 h-5" />,
  },
  {
    label: 'São Paulo, SP',
    href: '#',
    icon: <MapPin className="w-5 h-5" />,
  },
];

export const FOOTER = NAVIGATION.footer;

// Legacy exports to avoid breaking imports
export const NAV_LINKS = NAVIGATION.header;
export const HEADER_LINKS_DESKTOP = NAVIGATION.header;
export const HEADER_LINKS_MOBILE = NAVIGATION.header;
