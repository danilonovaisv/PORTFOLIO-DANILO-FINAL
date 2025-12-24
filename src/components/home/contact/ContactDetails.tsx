import { FC } from 'react';
import { motion } from 'framer-motion';
import { CONTACT_INFO, SOCIAL_LIST } from '@/config/navigation';
import { Button } from '@/components/ui/Button';

const ContactDetails: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-[#0057FF] mb-4 text-center md:text-left">
        Contato
      </h2>
      <p className="text-xl text-[#111111] mb-12 text-center md:text-left">
        Tem uma pergunta ou quer trabalhar junto?
      </p>

      <div className="space-y-6 mb-12 flex flex-col items-center md:items-start">
        {CONTACT_INFO.map((item, idx) => (
          <Button
            key={idx}
            href={item.href}
            variant="ghost"
            className="justify-start text-lg font-medium text-[#111111] hover:text-[#0057FF] hover:bg-black/5 gap-4 h-auto py-3 px-4"
          >
            <span className="rounded-full bg-blue-50 p-2 text-[#0057FF] shadow-sm group-hover:scale-110 transition-transform">
              {item.icon}
            </span>
            {item.label}
          </Button>
        ))}
      </div>

      <div className="flex gap-4 justify-center md:justify-start">
        {SOCIAL_LIST.map((social) => (
          <Button
            key={social.platform}
            asExternal
            href={social.url}
            target="_blank"
            variant="secondary"
            size="icon"
            className="rounded-full bg-gray-100 text-[#111111] shadow-sm hover:text-[#0057FF] hover:bg-gray-200 h-12 w-12 border border-black/5"
            aria-label={social.platform}
          >
            {social.icon}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

export default ContactDetails;
