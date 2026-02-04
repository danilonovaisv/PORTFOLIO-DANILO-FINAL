import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/layout/SiteFooter';
import { BRAND } from '@/config/brand';

export const metadata: Metadata = {
  title: 'Política de Privacidade | Danilo Novais',
  description:
    'Entenda como os dados são tratados no portfólio de Danilo Novais. Transparência sobre coleta, uso e direitos de privacidade.',
  openGraph: {
    title: 'Política de Privacidade | Danilo Novais',
    description:
      'Informações sobre coleta, uso e proteção de dados no portfólio de Danilo Novais.',
    url: `https://${BRAND.domain}/privacidade`,
    siteName: BRAND.name,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Política de Privacidade | Danilo Novais',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Política de Privacidade | Danilo Novais',
    description:
      'Informações sobre coleta, uso e proteção de dados no portfólio de Danilo Novais.',
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: `https://${BRAND.domain}/privacidade`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="std-grid py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Política de Privacidade
          </h1>
          <p className="text-white/70 leading-relaxed">
            Esta política explica como as informações são tratadas neste
            portfólio. O objetivo é ser transparente, respeitar sua privacidade
            e manter uma experiência segura.
          </p>

          <div className="mt-10 space-y-6 text-white/80">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-2">
                Coleta de dados
              </h2>
              <p>
                Os dados enviados pelo formulário de contato (nome, e-mail,
                telefone e mensagem) são utilizados apenas para responder ao seu
                contato. Não há venda ou compartilhamento com terceiros.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-2">
                Uso das informações
              </h2>
              <p>
                As informações são usadas exclusivamente para comunicação sobre
                projetos, propostas ou dúvidas encaminhadas pelo usuário.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-2">
                Cookies e analytics
              </h2>
              <p>
                Caso sejam utilizados cookies de análise, eles servem apenas
                para entender o desempenho e melhorar a experiência. Você pode
                bloquear cookies nas configurações do seu navegador.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-2">
                Seus direitos
              </h2>
              <p>
                Você pode solicitar a atualização ou exclusão dos seus dados a
                qualquer momento. Entre em contato pela página de{' '}
                <Link href="/contato" className="text-bluePrimary underline">
                  contato
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
