import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { HOME_CONTENT } from '@/config/content';
import { useSiteAssetsByPrefix } from '@/contexts/site-assets';
import { validateExternalUrl } from '@/lib/supabase/urls';

export default function ClientsBrandsSection() {
  const reducedMotion = useReducedMotion();
  const assets = useSiteAssetsByPrefix('clients.').filter(
    (asset) => asset.publicUrl
  );

  // Remove duplicatas baseado na key e publicUrl
  const uniqueAssets = Array.from(
    new Map(assets.map((asset) => [asset.key, asset])).values()
  );

  type LogoItem = {
    id: string | number;
    src: string;
    alt: string;
    href?: string | null;
  };

  // Garantir que sempre teremos pelo menos 8 logos
  const logos: LogoItem[] =
    uniqueAssets.length > 0
      ? uniqueAssets.slice(0, 8).map((asset) => ({
          id: asset.key,
          src: asset.publicUrl,
          alt: asset.description ?? asset.key,
          href: asset.href || null,
        }))
      : HOME_CONTENT.clients.logos.slice(0, 8).map((logo) => ({
          ...logo,
          href: null,
        }));

  // Forçar exibição de logos mesmo se não houver assets do Supabase
  const hasLogos = true;

  return (
    <section
      id="clients"
      className="bg-[#0048ff] py-4 md:py-20 lg:py-24 relative z-10 overflow-hidden"
      aria-label="marcas com as quais já trabalhei"
    >
      <div className="max-w-[1680px] mx-auto px-4 md:px-[clamp(24px,5vw,96px)]">
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="mb-8 md:mb-16 lg:mb-20"
        >
          <h2 className="text-white text-[1.5rem] md:text-[2rem] font-bold text-center tracking-tight leading-tight lowercase">
            {HOME_CONTENT.clients.title}
          </h2>
        </motion.div>

        {hasLogos ? (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10%' }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 md:gap-12 items-center justify-items-center w-full"
          >
            {logos.map((logo) => {
              const isSvg = logo.src?.toLowerCase().endsWith('.svg');

              // Renderizar como link se tiver href
              const LogoElement = ({
                children,
              }: {
                children: React.ReactNode;
              }) => {
                if (logo.href) {
                  const validatedHref = validateExternalUrl(logo.href);
                  if (validatedHref) {
                    return (
                      <a
                        href={validatedHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-32 h-16 md:w-40 md:h-20 flex items-center justify-center"
                        aria-label={logo.alt}
                      >
                        {children}
                      </a>
                    );
                  }
                }

                return (
                  <div
                    className="group relative w-32 h-16 md:w-40 md:h-20 flex items-center justify-center"
                    aria-label={logo.alt}
                  >
                    {children}
                  </div>
                );
              };

              return (
                <motion.div
                  key={logo.id}
                  variants={{
                    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
                    show: {
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                      transition: {
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                >
                  <LogoElement>
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      className="w-full h-full object-contain filter brightness-0 invert opacity-60 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110 will-change-transform"
                      sizes="(max-width: 768px) 128px, (max-width: 1200px) 160px, 160px"
                      loading="lazy"
                      unoptimized={isSvg}
                    />
                  </LogoElement>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <p
            role="status"
            className="text-center text-white/40 text-sm font-mono uppercase tracking-widest"
            aria-live="polite"
          >
            Nenhum parceiro cadastrado.
          </p>
        )}
      </div>
    </section>
  );
}
