import { FC } from 'react';
import { motion } from 'framer-motion';
import { SOCIALS } from '@/config/navigation';
import { Button } from '@/components/ui/button';
import {
  Mail,
  MapPin,
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
} from 'lucide-react';

const ContactDetails: FC = () => {
  const contactInfo = [
    {
      label: SOCIALS.emailPrimary.replace('mailto:', ''),
      href: SOCIALS.emailPrimary,
      icon: <Mail className="w-5 h-5" />,
    },
    // {
    //   label: SOCIALS.phone?.replace('tel:', '') || '',
    //   href: SOCIALS.phone || '#',
    //   icon: <Phone className="w-5 h-5" />,
    // },
    {
      label: 'São Paulo, SP',
      href: '#',
      icon: <MapPin className="w-5 h-5" />,
    },
  ];

  /* Helper for social icons matching Footer logic or reusing specific list */
  const socialList = [
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
      platform: 'Facebook',
      url: SOCIALS.facebook,
      icon: <Facebook className="w-5 h-5" />,
    },
    {
      platform: 'Twitter',
      url: SOCIALS.twitter,
      icon: <Twitter className="w-5 h-5" />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="space-y-6 flex flex-col items-center md:items-start w-full">
        {contactInfo.map((item, idx) => (
          <Button
            key={idx}
            variant="ghost"
            asChild
            className="justify-start text-lg font-medium text-text-dark hover:text-primary hover:bg-black/5 gap-4 h-auto py-3 px-4"
          >
            <a href={item.href}>
              <span className="rounded-full bg-blue-50 p-2 text-primary shadow-sm group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              {item.label}
            </a>
          </Button>
        ))}
      </div>

      <div className="flex gap-4 justify-center md:justify-start">
        {socialList.map((social) => (
          <Button
            key={social.platform}
            variant="secondary"
            size="icon"
            asChild
            className="rounded-full bg-gray-100 text-text-dark shadow-sm hover:text-primary hover:bg-gray-200 h-12 w-12 border border-black/5"
          >
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.platform}
            >
              {social.icon}
            </a>
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

export default ContactDetails;
