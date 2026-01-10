import type { Metadata } from 'next';
import PortfolioClient from './PortfolioClient';

export const metadata: Metadata = {
  title: 'Portfólio',
  description:
    'Explore uma seleção curada de projetos de Branding, Motion Design e Creative Development.',
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
